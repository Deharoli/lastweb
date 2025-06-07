import { APIEvent } from "@solidjs/start/server";
import { destroySession } from "../../../lib/session";

export const POST = async (event: APIEvent) => {
  'use server';
  return await destroySession(event);
};