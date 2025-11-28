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

    // Suppress console errors from browser extensions and third-party services
    const originalError = console.error;
    const originalWarn = console.warn;
    
    const shouldSuppress = (args: unknown[]): boolean => {
      const message = args.map(arg => String(arg)).join(' ').toLowerCase();
      
      // Suppress errors from:
      // - Chrome extensions
      // - Azure Application Insights
      // - Stripe iframes
      // - Browser extension injection scripts
      return (
        message.includes('chrome-extension://') ||
        message.includes('denying load of') ||
        message.includes('web_accessible_resources') ||
        message.includes('applicationinsights') ||
        message.includes('net::err_blocked_by_client') ||
        message.includes('net::err_failed') ||
        message.includes('addlistener') ||
        message.includes('inject.js') ||
        message.includes('same-runtime') ||
        message.includes('stripe.network') ||
        message.includes('stripe.com/v3/m-outer')
      );
    };

    console.error = (...args: unknown[]) => {
      if (!shouldSuppress(args)) {
        originalError.apply(console, args);
      }
    };

    console.warn = (...args: unknown[]) => {
      if (!shouldSuppress(args)) {
        originalWarn.apply(console, args);
      }
    };

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Suppress known errors that don't affect functionality
      const errorMessage = event.reason?.message || String(event.reason || '');
      const errorStack = event.reason?.stack || '';
      const errorCode = event.reason?.code;
      const errorString = JSON.stringify(event.reason || '').toLowerCase();
      
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
        errorStack.includes('content.') ||
        errorMessage.includes('same-runtime') ||
        errorMessage.includes('chrome-extension') ||
        errorCode === -32603 || // JSON-RPC internal error (often from Stripe iframes)
        errorString.includes('applicationinsights') ||
        errorString.includes('chrome-extension') ||
        errorString.includes('net::err') ||
        (event.reason && typeof event.reason === 'object' && !event.reason.message && !event.reason.stack && !errorCode)
      ) {
        event.preventDefault();
        return;
      }
      
      // Log other errors for debugging but don't crash
      originalWarn('Unhandled promise rejection:', event.reason);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      // Restore original console methods
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return <div className="antialiased">{children}</div>;
}
