import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from './Button'; // Importa o novo componente

function MenuItemCard({ item }) {
  const { addToCart } = useCart();
  const [isFlying, setIsFlying] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
    
    setIsFlying(true);
    setTimeout(() => setIsFlying(false), 700);
  };

  return (
    // Usando a nova classe .card-base
    <Link to={`/produto/${item.id}`} className="card-base">
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
          {/* Usando o novo componente Button */}
          <Button onClick={handleAddToCart} className="z-10 relative">
            Adicionar
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default MenuItemCard;