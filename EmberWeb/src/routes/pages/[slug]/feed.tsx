// routes/[slug]/feed.tsx
import { createServerData$ } from "solid-start/server";
import { useRouteData, useParams } from "@solidjs/router";
import { redirect } from "solid-start";
import { getSession } from "../../../lib/session";
import LandingPage from "../../../components/LandingPage/LandingPage";
import Feed from "../../../components/Feed/Feed";

export function routeData({ request, params }: { request: Request; params: Record<string, string> }) {
  return createServerData$(
    async () => {
      const sessionSlug = await getSession({ request });
      if (!sessionSlug || sessionSlug !== params.slug) {
        throw redirect("/");
      }
      return sessionSlug;
    },
    { key: () => ["feed-auth"] }
  );
}

export default function FeedPage() {
  return <Feed />;
}
