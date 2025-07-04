import React, { useMemo, useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { TrashIcon, ShoppingCartIcon } from './icons';
import { Link } from 'react-router-dom';

function Cart() {
  // lastChangedId será usado para aplicar a animação
  const { cartItems, updateCart, removeFromCart, lastChangedId } = useCart();
  const [isFlashing, setIsFlashing] = useState(null);

  const { subtotal, total } = useMemo(() => {
    const sub = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = sub > 0 ? 2.50 : 0;
    return { subtotal: sub, total: sub + tax };
  }, [cartItems]);

  // Ativa a animação quando um item muda
  useEffect(() => {
    if (lastChangedId) {
      setIsFlashing(lastChangedId);
      const timer = setTimeout(() => setIsFlashing(null), 700); // Duração da animação
      return () => clearTimeout(timer);
    }
  }, [lastChangedId, cartItems]); // Re-acionar se o ID ou os itens mudarem

  return (
    <div className="w-full bg-gray-800 rounded-xl shadow-2xl p-6 lg:p-8">
      <div className="flex items-center mb-6">
        <ShoppingCartIcon />
        <h2 className="text-2xl font-bold text-white ml-3">Resumo do Pedido</h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400 text-lg mb-4">Seu carrinho está vazio.</p>
          <Link to="/" className="bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-300">
            Ver Cardápio
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {cartItems.map(item => (
              <div key={item.id} className={`flex items-center justify-between bg-gray-700 p-3 rounded-lg ${isFlashing === item.id ? 'flash-animation' : ''}`}>
                <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover mr-4"/>
                    <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-yellow-400 font-bold">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-gray-800 rounded-full">
                    <button onClick={() => updateCart(item.id, item.quantity - 1)} className="px-3 py-1 text-lg font-bold text-white hover:bg-gray-600 rounded-l-full">-</button>
                    <span className="px-3 font-mono">{item.quantity}</span>
                    <button onClick={() => updateCart(item.id, item.quantity + 1)} className="px-3 py-1 text-lg font-bold text-white hover:bg-gray-600 rounded-r-full">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={`border-t border-gray-700 mt-6 pt-6 space-y-3 ${isFlashing ? 'flash-animation' : ''}`}>
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Taxa de Serviço</span>
              <span>R$ 2,50</span>
            </div>
            <div className="flex justify-between text-white font-bold text-xl">
              <span>Total</span>
              <span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="w-full mt-6 bg-green-600 text-white font-bold py-3 rounded-lg text-lg hover:bg-green-500 transition-colors duration-300 block text-center"
          >
            Ir para o Checkout
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;