import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import menuItems from '../data/menu';
import { useCart } from '../context/CartContext';
import MenuItemCard from '../components/MenuItemCard';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart, updateCart } = useCart(); // Adicionando updateCart
  const [quantity, setQuantity] = useState(1);

  const item = menuItems.find(item => item.id === parseInt(id));

  const relatedItems = useMemo(() => {
    if (!item) return [];
    return menuItems.filter(
      relatedItem => relatedItem.category === item.category && relatedItem.id !== item.id
    ).slice(0, 4); // Limita a 4 itens relacionados
  }, [item]);


  const handleAddToCart = () => {
    addToCart({ ...item, quantity });
  };

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };


  if (!item) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl text-white font-bold mb-4">Produto não encontrado!</h2>
        <Link to="/" className="text-yellow-400 hover:text-yellow-300">
          &larr; Voltar ao Cardápio
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
        <div className="md:w-1/2">
          <img 
            src={item.image.replace('600x400', '800x600')}
            alt={`Imagem de ${item.name}`}
            className="w-full h-auto rounded-2xl shadow-2xl object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x600/cccccc/ffffff?text=Imagem+Indispon%C3%ADvel'; }}
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">{item.name}</h1>
          <p className="text-gray-300 text-lg mb-6">{item.description}</p>
          <div className="flex items-center justify-center md:justify-start gap-8 mb-8">
            <p className="text-4xl font-black text-yellow-400">
              R$ {item.price.toFixed(2).replace('.', ',')}
            </p>
          </div>
          <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
            <span className="font-bold">Quantidade:</span>
            <div className="flex items-center bg-gray-800 rounded-full">
              <button onClick={() => handleQuantityChange(-1)} className="px-4 py-2 text-lg font-bold text-white hover:bg-gray-600 rounded-l-full">-</button>
              <span className="px-5 font-mono text-lg">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="px-4 py-2 text-lg font-bold text-white hover:bg-gray-600 rounded-r-full">+</button>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-yellow-500 text-gray-900 font-bold py-3 px-10 rounded-lg text-lg hover:bg-yellow-400 transition-colors duration-300"
          >
            Adicionar ao Carrinho
          </button>
           <div className="mt-8">
             <Link to="/" className="text-yellow-400 hover:text-yellow-300">
                &larr; Voltar ao Cardápio
             </Link>
           </div>
        </div>
      </div>
      {/* Seção de Produtos Relacionados */}
      {relatedItems.length > 0 && (
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white mb-6">Você também pode gostar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedItems.map(related => (
              <MenuItemCard key={related.id} item={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;