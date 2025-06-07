import { APIEvent } from "@solidjs/start/server";
import { register } from '../../../lib/localauth'; // Assurez-vous que le chemin est correct
import { createSession } from "../../../lib/session"; // Assurez-vous que le chemin est correct

export const POST = async (event: APIEvent) => {
  'use server';
  const formData = await event.request.formData();
  const result = await register(formData);

  if (result?.error) {
    return new Response("Error: " + result.error, { status: 400 });
  }

  // Nettoie les espaces et met un tiret entre prénom et nom
  const slug = `${result.firstName.trim().replace(/\s+/g, '-')}-${result.lastName.trim().replace(/\s+/g, '-')}`.toLowerCase();
  return await createSession(slug, event, `/pages/${slug}/feed`);
};

