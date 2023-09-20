

import React from 'react';



function ErrorComponent() {
  return (
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Error
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Something went wrong.
        </p>
      </div>
    </div>
  );
}

export default ErrorComponent;