import { Component, createSignal } from 'solid-js';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Logo from "../../assets/Logo.png"
import { A } from '@solidjs/router';




const AuthPage: Component = () => {
  const [mode, setMode] = createSignal<'login' | 'register'>('login');

  return (
    
    <div class="min-h-screen flex items-center justify-center bg-[#f5f5f7] px-4">
      <A
         href="/"
        class="fixed top-10 left-10 px-4 py-2 bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white rounded-full shadow-lg text-sm font-semibold z-50 hover:shadow-xl transition duration-300"
      >
        ← Home
      </A>
      <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <div class="flex items-center justify-center text-5xl font-bold mb-6">
          <img src={Logo} alt="Ember Logo" class="w-17 h-17 mr-3" />
          <span class="bg-gradient-to-r from-[#FF5F76] to-[#FF914D] bg-clip-text text-transparent">Ember</span>
        </div>

        {mode() === 'login' ? <LoginForm /> : <RegisterForm />}

        <div class="mt-6 text-sm text-[#232a34]">
          {mode() === 'login' ? (
            <p>
              Not registered yet?{' '}
              <button
                class="font-semibold hover:underline bg-gradient-to-r from-[#FF5F76] to-[#FF914D] bg-clip-text text-transparent"
                onClick={() => setMode('register')}
              >
                Create an account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                class="font-semibold hover:underline bg-gradient-to-r from-[#FF5F76] to-[#FF914D] bg-clip-text text-transparent"
                onClick={() => setMode('login')}
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
