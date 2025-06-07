import { Component, createSignal, onMount } from 'solid-js';
import { A, useNavigate, useLocation } from '@solidjs/router';
import Logo from '../../assets/Logo.png';

const Navbar: Component = () => {
  const [showNav, setShowNav] = createSignal(true);
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
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/pages/auth'; // Redirige vers la page de login
  };

  // Détection des pages "app"
  const isAppPage = () =>
    ['/feed', '/question', '/profil'].some(path =>
      location.pathname.includes(path)
    );

  const isAuthPage = () => location.pathname === "/pages/auth";

  return (
    <nav
      class={`fixed top-0 left-0 w-full px-5 py-3 z-50 bg-transparent backdrop-blur-md transition-transform duration-300 ${
        showNav() ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div class="w-full max-w-6xl mx-auto flex justify-between items-center">
        <div class="flex items-center font-bold">
          <img src={Logo} alt="Ember Logo" class="w-17 h-17 mr-3" />
          <span class="ml-2 text-5xl bg-gradient-to-r from-[#FF5F76] to-[#FF914D] bg-clip-text text-transparent">
            Ember
          </span>
        </div>

        {isAppPage() ? (
          <div class="flex gap-6 text-lg">
            <A href="/feed" title="Feed">
              <i class="fas fa-stream text-[#232a34]"></i>
            </A>
            <A href="/question" title="Question">
              <i class="fas fa-question-circle text-[#232a34]"></i>
            </A>
            <A href="/profil" title="Profil">
              <i class="fas fa-user text-[#232a34]"></i>
            </A>
            <button onClick={handleLogout} title="Logout">
              <i class="fas fa-power-off text-[#FF5F76]"></i>
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
