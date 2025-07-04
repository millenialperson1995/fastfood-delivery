import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function MenuItemCard({ item }) {
  const { addToCart } = useCart();
  const [isFlying, setIsFlying] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);

    // Inicia a animação
    setIsFlying(true);
    setTimeout(() => {
      setIsFlying(false);
    }, 700); // Duração da animação
  };

  return (
    <Link to={`/produto/${item.id}`} className="block bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
      <div className="relative">
        {isFlying && (
          <div className="fly-to-cart-animation">
            <img 
              className="w-full h-48 object-cover rounded-xl" 
              src={item.image} 
              alt={`Imagem animada de ${item.name}`}
            />
          </div>
        )}
        <img 
          className="w-full h-48 object-cover" 
          src={item.image} 
          alt={`Imagem de ${item.name}`}
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/cccccc/ffffff?text=Imagem+Indispon%C3%ADvel'; }}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
        <p className="text-gray-400 text-sm flex-grow">{item.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-2xl font-black text-yellow-400">
            R$ {item.price.toFixed(2).replace('.', ',')}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors duration-300 z-10 relative"
          >
            Adicionar
          </button>
        </div>
      </div>
    </Link>
  );
}

export default MenuItemCard;