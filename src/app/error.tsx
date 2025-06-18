'use client';

import { useEffect } from 'react';
import { logError } from '@/utils/errorHandling';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logError(error, 'Global error page');
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl p-8 space-y-6 border border-gray-200">
        <h1 className="text-4xl font-semibold text-red-600 mb-4">
          Oops! Something went wrong… 🧐
        </h1>
        <p className="text-lg text-gray-700">
          We encountered an issue on our end. Don&apos;t worry, we&apos;re working on it! 
          You can try again, or if it persists, contact support. 🚧
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold text-red-400 mb-4">
              Error Details (Don&apos;t Panic!): 🛸
            </h2>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto">
              {error.message}
            </pre>
            {error.stack && (
              <pre className="text-sm text-gray-700 whitespace-pre-wrap mt-3">
                {error.stack}
              </pre>
            )}
            {error.digest && (
              <p className="text-sm text-gray-500 mt-4">
                Secret Error ID: <span className="font-semibold">{error.digest}</span> — 
                We&apos;re on the case! 🕵️‍♂️
              </p>
            )}
          </div>
        )}
        
        <div className="flex gap-6 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg transition-all transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
          >
            Try Again (I believe in you! 💪)
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-gray-600 text-white rounded-lg transition-all transform hover:bg-gray-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-lg"
          >
            Go Home (It&apos;s safe there 🏡)
          </button>
        </div>
      </div>
    </div>
  );
}