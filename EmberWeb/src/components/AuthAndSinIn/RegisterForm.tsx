import { Component, createSignal } from 'solid-js';

const RegisterForm: Component = () => {
  const [firstName, setFirstName] = createSignal('');
  const [lastName, setLastName] = createSignal('');

  return (
    <>
      <h2 class="text-4xl font-bold mb-4 text-center text-[#FF914D]">Create an account</h2>
      <form method="post" action="/api/auth/register" class="space-y-4">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            required
            value={firstName()}
            onInput={e => setFirstName(e.currentTarget.value.replace(/\s+/g, ''))}
            class="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none text-black"
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            required
            value={lastName()}
            onInput={e => setLastName(e.currentTarget.value.replace(/\s+/g, ''))}
            class="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none text-black"
          />
          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            class="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none text-black"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            class="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none text-black"
          />
          <button
            type="submit"
            class="w-full py-3 bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white rounded-full font-semibold text-lg shadow-md hover:-translate-y-1 hover:shadow-lg transition duration-300"
          >
            S'inscrire
          </button>
        </form>
    </>
  );
};

export default RegisterForm;
