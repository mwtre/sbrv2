"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Suppress known errors that don't affect functionality
      const errorMessage = event.reason?.message || String(event.reason || '');
      const errorStack = event.reason?.stack || '';
      const errorCode = event.reason?.code;
      const errorString = JSON.stringify(event.reason || '');
      
      // Suppress errors from:
      // - Browser extensions (inject.js, chrome-extension)
      // - same-runtime issues
      // - Stripe iframe errors (JSON-RPC errors)
      // - Azure Application Insights (blocked by ad blockers)
      // - Generic object errors without useful info
      if (
        errorStack.includes('inject.js') ||
        errorStack.includes('same-runtime') ||
        errorStack.includes('chrome-extension') ||
        errorMessage.includes('same-runtime') ||
        errorMessage.includes('chrome-extension') ||
        errorCode === -32603 || // JSON-RPC internal error (often from Stripe iframes)
        errorString.includes('applicationinsights') ||
        errorString.includes('chrome-extension') ||
        (event.reason && typeof event.reason === 'object' && !event.reason.message && !event.reason.stack && !errorCode)
      ) {
        event.preventDefault();
        return;
      }
      
      // Log other errors for debugging but don't crash
      console.warn('Unhandled promise rejection:', event.reason);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return <div className="antialiased">{children}</div>;
}
