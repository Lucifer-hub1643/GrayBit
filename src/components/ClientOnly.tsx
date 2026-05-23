import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders children only on the client. Useful for SSR-incompatible
 * components like WebGL canvases.
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return <>{mounted ? children : fallback}</>;
}
