import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden">
      {children}
    </main>
  );
};

export default Container;
