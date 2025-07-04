import React, { useState, useMemo } from 'react';
import MenuItemCard from '../components/MenuItemCard';
import menuItems from '../data/menu';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMenuItems = useMemo(() => {
    if (!searchTerm) {
      return menuItems;
    }
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return menuItems.filter(item =>
      item.name.toLowerCase().includes(lowercasedSearchTerm) ||
      item.description.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [searchTerm]);

  return (
    <main className="flex flex-col">
      {/* Coluna do Cardápio */}
      <div className="w-full">
        <h2 className="text-3xl font-bold text-white mb-6">Nosso Cardápio</h2>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar itens do cardápio..."
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-full">Nenhum item encontrado para "{searchTerm}".</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;