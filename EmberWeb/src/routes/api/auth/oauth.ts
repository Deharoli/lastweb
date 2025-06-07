import { APIEvent } from "@solidjs/start/server";
import { getLoginUrl } from "../../../lib/oauth";

export async function GET(event: APIEvent) {
  'use server';
  const { url, headers } = await getLoginUrl(event.request);
  return new Response(null, {
    status: 302,
    headers: {
      Location: url,
      ...headers,
    },
  });
}