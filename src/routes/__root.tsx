import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { COMPANY } from "@/lib/content";
import { SmoothScroll } from "@/components/SmoothScroll";
import { NeuronBurst } from "@/components/NeuronBurst";
import { PageTransition } from "@/components/PageTransition";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">404</p>
        <h1 className="font-display text-5xl font-light text-foreground">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="btn-accent inline-flex items-center justify-center px-6 py-3 text-sm font-medium"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">Error</p>
        <h1 className="font-display text-4xl font-light tracking-tight text-foreground">
          Something went wrong
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          An unexpected error occurred. You can try refreshing or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-accent inline-flex items-center justify-center px-6 py-3 text-sm font-medium"
          >
            Try again
          </button>
          <a
            href="/"
            className="btn-ghost inline-flex items-center justify-center px-6 py-3 text-sm font-medium"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${COMPANY.name} | ${COMPANY.tagline}` },
      { name: "description", content: COMPANY.description },
      { name: "author", content: COMPANY.name },
      { name: "theme-color", content: "#000000" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: COMPANY.name },
      { property: "og:title", content: `${COMPANY.name} | ${COMPANY.tagline}` },
      { property: "og:description", content: COMPANY.description },
      { property: "og:image", content: "/graybit-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: COMPANY.twitter },
      { name: "twitter:title", content: `${COMPANY.name} | ${COMPANY.tagline}` },
      { name: "twitter:description", content: COMPANY.description },
      { name: "twitter:image", content: "/graybit-logo.png" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/graybit-logo.png" },
      { rel: "apple-touch-icon", href: "/graybit-logo.png" },
      { rel: "preload", as: "image", href: "/graybit-logo.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <NeuronBurst />
      <PageTransition routeKey={pathname}>
        <Outlet />
      </PageTransition>
    </QueryClientProvider>
  );
}
