import { createSignal, Show } from "solid-js";

type PostActionsProps = {
  postId: number;
  currentTitle: string;
  currentContent: string;
  onEdit: (postId: number, title: string, content: string) => void;
  onDelete: (postId: number) => void;
};

const PostActions = (props: PostActionsProps) => {
  const [showEditModal, setShowEditModal] = createSignal(false);
  const [showDeleteModal, setShowDeleteModal] = createSignal(false);
  const [editTitle, setEditTitle] = createSignal(props.currentTitle);
  const [editContent, setEditContent] = createSignal(props.currentContent);
  const [isLoading, setIsLoading] = createSignal(false);

  const handleEdit = async () => {
    if (!editTitle().trim()) return;
    
    setIsLoading(true);
    try {
      await props.onEdit(props.postId, editTitle().trim(), editContent().trim());
      setShowEditModal(false);
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await props.onDelete(props.postId);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Boutons d'action */}
      <div class="flex gap-2">
        <button
          class="text-blue-500 hover:text-blue-700 text-sm"
          onClick={() => setShowEditModal(true)}
          title="Modifier"
        >
          <i class="fas fa-edit"></i>
        </button>
        <button
          class="text-red-500 hover:text-red-700 text-sm"
          onClick={() => setShowDeleteModal(true)}
          title="Supprimer"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>

      {/* Modal de modification */}
      <Show when={showEditModal()}>
        <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-xl max-w-lg w-full p-6">
            <h3 class="text-xl font-bold mb-4">Modifier le post</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Titre/Question
                </label>
                <input
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F76]"
                  value={editTitle()}
                  onInput={(e) => setEditTitle(e.currentTarget.value)}
                  disabled={isLoading()}
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Contenu
                </label>
                <textarea
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F76]"
                  rows={4}
                  value={editContent()}
                  onInput={(e) => setEditContent(e.currentTarget.value)}
                  disabled={isLoading()}
                />
              </div>
            </div>

            <div class="flex gap-3 mt-6">
              <button
                class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                onClick={() => setShowEditModal(false)}
                disabled={isLoading()}
              >
                Annuler
              </button>
              <button
                class="flex-1 px-4 py-2 bg-[#FF5F76] text-white rounded-lg hover:bg-[#FF4A6B] transition disabled:opacity-50"
                onClick={handleEdit}
                disabled={!editTitle().trim() || isLoading()}
              >
                {isLoading() ? (
                  <>
                    <i class="fas fa-spinner fa-spin mr-2"></i>
                    Modification...
                  </>
                ) : (
                  'Modifier'
                )}
              </button>
            </div>
          </div>
        </div>
      </Show>

      {/* Modal de suppression */}
      <Show when={showDeleteModal()}>
        <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-xl max-w-md w-full p-6">
            <h3 class="text-xl font-bold mb-4 text-red-600">Supprimer le post</h3>
            
            <p class="text-gray-700 mb-6">
              Êtes-vous sûr de vouloir supprimer ce post ? Cette action est irréversible.
            </p>

            <div class="flex gap-3">
              <button
                class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                onClick={() => setShowDeleteModal(false)}
                disabled={isLoading()}
              >
                Annuler
              </button>
              <button
                class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                onClick={handleDelete}
                disabled={isLoading()}
              >
                {isLoading() ? (
                  <>
                    <i class="fas fa-spinner fa-spin mr-2"></i>
                    Suppression...
                  </>
                ) : (
                  'Supprimer'
                )}
              </button>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
};

export default PostActions;