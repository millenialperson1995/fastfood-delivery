import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon } from './icons';

const Header = () => {
  const { totalItemsInCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (totalItemsInCart > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500); // Duração da animação
      return () => clearTimeout(timer);
    }
  }, [totalItemsInCart]);

  return (
    <header className="flex justify-between items-center text-center mb-12 py-4">
      <div>{/* Espaço em branco para alinhar o título ao centro */}
        <Link to="/" className="text-2xl font-bold text-white">&nbsp;</Link>
      </div>
      <div className="flex-grow text-center">
        <Link to="/">
          <h1 className="text-4xl font-extrabold text-white">
            <span className="text-yellow-400">Gemini</span> Fast Food 🍔
          </h1>
        </Link>
      </div>
      <div className="relative">
        <Link to="/carrinho">
          <div className={`relative p-2 rounded-full transition-colors duration-300 ${isAnimating ? 'shake-animation' : ''}`}>
            <ShoppingCartIcon />
            {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {totalItemsInCart}
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;