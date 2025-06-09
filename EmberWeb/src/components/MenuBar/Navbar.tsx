import { Component, createSignal, onMount } from 'solid-js';
import { A, useNavigate, useLocation } from '@solidjs/router';
import Logo from '../../assets/Logo.png';

const Navbar: Component = () => {
  const [showNav, setShowNav] = createSignal(true);
  const [isLoggingOut, setIsLoggingOut] = createSignal(false);
  const navigate = useNavigate();
  const location = useLocation();
  let lastScrollY = 0;

  onMount(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleLogout = async () => {
    if (isLoggingOut()) return; // Évite les double-clics

    setIsLoggingOut(true);

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Important pour envoyer les cookies
      });

      if (response.ok) {
        // Redirige vers la page de login
        window.location.href = '/pages/auth';
      } else {
        console.error('Erreur lors de la déconnexion:', response.statusText);
        // Force la redirection même en cas d'erreur
        window.location.href = '/pages/auth';
      }
    } catch (error) {
      console.error('Erreur réseau lors de la déconnexion:', error);
      // Force la redirection même en cas d'erreur réseau
      window.location.href = '/pages/auth';
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Détection des pages "app"
  const isAppPage = () =>
    ['/feed', '/question', '/profil'].some((path) =>
      location.pathname.includes(path)
    );

  const isAuthPage = () => location.pathname === '/pages/auth';

  return (
    <nav
      class={`fixed top-0 left-0 w-full px-5 py-3 z-50 bg-transparent backdrop-blur-md transition-transform duration-300 ${
        showNav() ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div class="w-full max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div class="flex items-center font-bold">
          <img src={Logo} alt="Ember Logo" class="w-17 h-17 mr-3" />
          <span class="ml-2 text-5xl bg-gradient-to-r from-[#FF5F76] to-[#FF914D] bg-clip-text text-transparent">
            Ember
          </span>
        </div>

        {/* Zone de recherche centrée conditionnelle */}
        {isAppPage() && (
          <div class="flex-1 flex justify-center">
            <input
              type="text"
              placeholder="Search people or posts..."
              class="w-full max-w-md px-4 py-2 rounded-full border border-white bg-white text-[#232a34] focus:outline-none focus:ring-2 focus:ring-[#FF5F76] transition"
            />
          </div>
        )}

        {/* Boutons à droite */}
        {isAppPage() ? (
          <div class="flex gap-6 text-lg">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut()}
              title="Logout"
              class={`transition ${
                isLoggingOut()
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-110'
              }`}
            >
              <i
                class={`fas ${
                  isLoggingOut() ? 'fa-spinner fa-spin' : 'fa-power-off'
                } text-[#FF5F76]`}
              ></i>
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              isAuthPage() ? navigate('/') : navigate('/pages/auth');
            }}
            class="px-6 py-2 bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white rounded-full font-semibold text-xl hover:shadow-md transition duration-300"
          >
            {isAuthPage() ? '← Back' : 'Login / Sign Up'}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
