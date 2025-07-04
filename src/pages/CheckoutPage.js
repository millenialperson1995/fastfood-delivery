import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.");
      navigate('/');
      return;
    }

    if (!deliveryInfo.name || !deliveryInfo.address || !deliveryInfo.phone) {
      toast.error("Por favor, preencha todas as informações de entrega.");
      return;
    }

    // Simulação de finalização de pedido
    console.log("Pedido finalizado com as seguintes informações:", {
      items: cartItems,
      delivery: deliveryInfo,
    });

    toast.success("Pedido realizado com sucesso! Em breve seu pedido chegará.");
    cartItems.forEach(item => removeFromCart(item.id)); // Limpa o carrinho
    navigate('/'); // Redireciona para a página inicial
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + (cartItems.length > 0 ? 2.50 : 0);

  return (
    <div className="py-12">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Finalizar Pedido</h1>

      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 lg:p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Seu Pedido</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-400 text-center py-10">Seu carrinho está vazio.</p>
        ) : (
          <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center text-white">
                <span>{item.name} x {item.quantity}</span>
                <span>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-gray-700 pt-4 mt-4">
          <div className="flex justify-between text-gray-300 mb-2">
            <span>Subtotal</span>
            <span>R$ {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between text-gray-300 mb-2">
            <span>Taxa de Serviço</span>
            <span>R$ 2,50</span>
          </div>
          <div className="flex justify-between text-white font-bold text-xl">
            <span>Total</span>
            <span>R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-6">Informações de Entrega</h2>
        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={deliveryInfo.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              placeholder="Seu nome"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-300 text-sm font-bold mb-2">Endereço de Entrega</label>
            <input
              type="text"
              id="address"
              name="address"
              value={deliveryInfo.address}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              placeholder="Rua, Número, Bairro, Cidade"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-300 text-sm font-bold mb-2">Telefone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={deliveryInfo.phone}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              placeholder="(XX) XXXXX-XXXX"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-green-600 text-white font-bold py-3 rounded-lg text-lg hover:bg-green-500 transition-colors duration-300"
          >
            Confirmar Pedido
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
