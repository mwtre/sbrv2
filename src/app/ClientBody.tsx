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
      
      // Suppress errors from same-runtime, inject.js, or generic object errors
      if (
        errorStack.includes('inject.js') ||
        errorStack.includes('same-runtime') ||
        errorMessage.includes('same-runtime') ||
        (event.reason && typeof event.reason === 'object' && !event.reason.message && !event.reason.stack)
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
