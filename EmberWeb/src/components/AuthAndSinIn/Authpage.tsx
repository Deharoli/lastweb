import { Component, createSignal } from 'solid-js';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage: Component = () => {
  const [mode, setMode] = createSignal<'login' | 'register'>('login');

  return (
    <div class="min-h-screen flex items-center justify-center bg-[#f5f5f7] px-4">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">

        {mode() === 'login' ? <LoginForm /> : <RegisterForm />}

        <div class="mt-10 text-sm text-[#232a34]">
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
