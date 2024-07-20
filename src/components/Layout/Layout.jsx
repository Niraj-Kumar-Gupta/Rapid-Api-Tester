import React from 'react';
import Navbar from './Navbar/Navbar';

export default function Layout({ onOpenModal, children }) {
  return (
    <>
      <main className=" min-h-screen overflow-hidden">
        <Navbar onOpenModal={onOpenModal} />
        <div className="flex flex-col items-center justify-center max-w-6xl mx-auto px-5 bg-white shadow-lg rounded-lg">
          <div className="w-full px-5 py-7">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
