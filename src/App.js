import React from 'react';
import MenuItemCard from './components/MenuItemCard';
import Cart from './components/Cart';
import Header from './components/Header';
import Footer from './components/Footer';

import menuItems from './data/menu';
import { useCart } from './context/CartContext';

// --- Componente Principal da Aplicação ---
export default function App() {
  const { addToCart } = useCart();

  return (
    <div className="bg-gray-900 min-h-screen font-sans text-white p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <Header />

        {/* Conteúdo Principal: Cardápio e Carrinho */}
        <main className="flex flex-col lg:flex-row gap-12">
          
          {/* Coluna do Cardápio */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-6">Nosso Cardápio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
              {menuItems.map(item => (
                <MenuItemCard key={item.id} item={item} onAddToCart={() => addToCart(item)} />
              ))}
            </div>
          </div>

          {/* Coluna do Carrinho */}
          <Cart />
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
