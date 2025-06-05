import { Component } from 'solid-js';

const LoginForm: Component = () => {
  return (
    <>
      <h2 class="text-2xl font-semibold mb-4 text-center text-[#FF5F76]">Log in</h2>
      <form class="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          required
          class="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none text-black"
        />
        <input
          type="password"
          placeholder="Password"
          required
          class="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none text-black"
        />
        <button
          type="submit"
          class="w-full py-3 bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white rounded-full font-semibold text-lg shadow-md hover:-translate-y-1 hover:shadow-lg transition duration-300"
        >
          Log in
        </button>
      </form>
    </>
  );
};

export default LoginForm;
