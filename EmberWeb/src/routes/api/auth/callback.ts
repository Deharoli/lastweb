import { APIEvent } from "@solidjs/start/server";
import { handleOAuthCallback } from "../../lib/oauth";

export async function GET(event: APIEvent) {
    'use server'
  return handleOAuthCallback(event.request);
}