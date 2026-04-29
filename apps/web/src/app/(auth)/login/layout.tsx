import React from 'react';

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      {children}
    </div>
  );
}
