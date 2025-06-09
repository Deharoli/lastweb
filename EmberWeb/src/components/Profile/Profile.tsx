import { createSignal } from "solid-js";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import ProfileContent from "./ProfileContent";

type ProfilePageProps = {
  profileData?: {
    user: {
      id: number;
      name: string;
      email: string;
      officialID: string | null;
      createdAt: Date;
    };
    posts: Array<{
      id: number;
      title: string;
      content: string | null;
      mediaType: string | null;
      mediaUrl: string | null;
      createdAt: Date;
      isLikedByCurrentUser: boolean; // ✅ Ajout
      author: {
        name: string;
      };
      _count: {
        likes: number;
        comments: number;
      }; // ✅ Ajout
      comments: Array<{
        id: number;
        content: string;
        user: { name: string };
        createdAt: string;
      }>; // ✅ Ajout
    }>;
    stats: {
      totalPosts: number;
      totalLikes: number;
      activeDays: number;
    };
  } | null;
};

export default function ProfilePage(props: ProfilePageProps) {
  const [activeTab, setActiveTab] = createSignal("all");

  return (
    <div class="min-h-screen bg-[#f5f5f7] pt-20">
      <div class="w-full max-w-4xl mx-auto px-4 py-6 pb-24">
        <ProfileHeader 
          user={props.profileData?.user} 
          stats={props.profileData?.stats} 
        />
        <ProfileTabs activeTab={activeTab()} setActiveTab={setActiveTab} />
        <ProfileContent 
          activeTab={activeTab()} 
          posts={props.profileData?.posts}
        />
      </div>
    </div>
  );
}