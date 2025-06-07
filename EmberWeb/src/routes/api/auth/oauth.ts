import { ActionFunction, redirect } from "@solidjs/router";
import { getLoginUrl } from "../../lib/oauth";

export const action: ActionFunction = async ({ request }) => {
    'use server'
  const { url, headers } = await getLoginUrl(request);
  return redirect(url, { headers });
};