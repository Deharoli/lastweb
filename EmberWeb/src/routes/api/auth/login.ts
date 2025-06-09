import { APIEvent } from "@solidjs/start/server";
import { login } from '../../../lib/localauth';
import { createSession } from "../../../lib/session";

export const POST = async (event: APIEvent) => {
  'use server';
  const formData = await event.request.formData();
  const result = await login(formData);

  if (result?.error) {
    return new Response("Error: " + result.error, { status: 400 });
  }

  // Stocke l'EMAIL dans la session, pas le slug
  const slug = `${result.firstName.trim().replace(/\s+/g, '-')}-${result.lastName.trim().replace(/\s+/g, '-')}`.toLowerCase();
  return await createSession(result.email, event, `/pages/${slug}/feed`); // Passe result.email
};
