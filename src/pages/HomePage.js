import React, { useState, useMemo } from 'react';
import MenuItemCard from '../components/MenuItemCard';
import menuItems from '../data/menu';

// Função para destacar o termo de busca
const Highlighted = ({ text = '', highlight = '' }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="bg-yellow-400 text-gray-900">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};


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

  const categorizedItems = useMemo(() => {
    return filteredMenuItems.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {});
  }, [filteredMenuItems]);

  return (
    <main className="flex flex-col">
      <div className="w-full">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar por nome ou descrição..."
            className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {Object.keys(categorizedItems).length > 0 ? (
          Object.entries(categorizedItems).map(([category, items]) => (
            <div key={category} className="mb-10">
              <h2 className="text-3xl font-bold text-white mb-6">
                <Highlighted text={category} highlight={searchTerm} />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {items.map(item => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">Nenhum item encontrado para "{searchTerm}".</p>
        )}
      </div>
    </main>
  );
};

export default HomePage;