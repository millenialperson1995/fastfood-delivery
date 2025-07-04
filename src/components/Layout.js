import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="bg-gray-900 min-h-screen font-sans text-white p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <Header />
        <main>
          <Outlet /> {/* O conteúdo da rota atual será renderizado aqui */}
        </main>
        <Footer />
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default Layout;
