import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur' // Valida quando o campo perde o foco
  });

  const [paymentMethod, setPaymentMethod] = useState('credit');

  const handlePlaceOrder = (data) => {
    if (cartItems.length === 0) {
      toast.error("Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.");
      navigate('/');
      return;
    }

    // Simulação de finalização de pedido
    console.log("Pedido finalizado com as seguintes informações:", {
      items: cartItems,
      delivery: data,
      payment: paymentMethod,
    });

    toast.success("Pedido realizado com sucesso! Em breve seu pedido chegará.");
    cartItems.forEach(item => removeFromCart(item.id)); // Limpa o carrinho
    navigate('/');
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + (cartItems.length > 0 ? 2.50 : 0);

  return (
    <div className="py-12">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Finalizar Pedido</h1>

      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 lg:p-8 max-w-3xl mx-auto">
        {/* Seção de Resumo do Pedido (igual a antes) */}
        <h2 className="text-2xl font-bold text-white mb-6">Seu Pedido</h2>
        {cartItems.length > 0 ? (
          <>
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-white">
                  <span>{item.name} x {item.quantity}</span>
                  <span>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
            </div>
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
          </>
        ) : (
          <p className="text-gray-400 text-center py-10">Seu carrinho está vazio para o checkout.</p>
        )}
        
        {/* Seção do Formulário */}
        <form onSubmit={handleSubmit(handlePlaceOrder)} className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Informações de Entrega</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Nome Completo</label>
              <input
                {...register("name", { required: "O nome é obrigatório" })}
                className={`shadow appearance-none border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white ${errors.name ? 'border-red-500' : 'border-gray-600'}`}
                placeholder="Seu nome"
              />
              {errors.name && <p className="text-red-500 text-xs italic mt-2">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-300 text-sm font-bold mb-2">Endereço</label>
              <input
                {...register("address", { required: "O endereço é obrigatório" })}
                className={`shadow appearance-none border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white ${errors.address ? 'border-red-500' : 'border-gray-600'}`}
                placeholder="Rua, Número, Bairro, Cidade"
              />
              {errors.address && <p className="text-red-500 text-xs italic mt-2">{errors.address.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-300 text-sm font-bold mb-2">Telefone</label>
              <input
                {...register("phone", { 
                  required: "O telefone é obrigatório",
                  pattern: {
                    value: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
                    message: "Formato de telefone inválido. Use (XX) XXXXX-XXXX"
                  }
                })}
                className={`shadow appearance-none border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white ${errors.phone ? 'border-red-500' : 'border-gray-600'}`}
                placeholder="(XX) XXXXX-XXXX"
              />
              {errors.phone && <p className="text-red-500 text-xs italic mt-2">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Seção de Pagamento */}
          <h2 className="text-2xl font-bold text-white mt-8 mb-6">Forma de Pagamento</h2>
          <div className="space-y-3">
            <label className={`flex items-center p-4 rounded-lg border cursor-pointer ${paymentMethod === 'credit' ? 'border-yellow-500 bg-gray-700' : 'border-gray-600'}`}>
              <input type="radio" name="payment" value="credit" checked={paymentMethod === 'credit'} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
              <span className="text-white">💳 Cartão de Crédito</span>
            </label>
            <label className={`flex items-center p-4 rounded-lg border cursor-pointer ${paymentMethod === 'pix' ? 'border-yellow-500 bg-gray-700' : 'border-gray-600'}`}>
              <input type="radio" name="payment" value="pix" checked={paymentMethod === 'pix'} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
              <span className="text-white">✨ Pix</span>
            </label>
            <label className={`flex items-center p-4 rounded-lg border cursor-pointer ${paymentMethod === 'cash' ? 'border-yellow-500 bg-gray-700' : 'border-gray-600'}`}>
              <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
              <span className="text-white">💵 Dinheiro</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={cartItems.length === 0}
            className="w-full mt-8 bg-green-600 text-white font-bold py-3 rounded-lg text-lg hover:bg-green-500 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Confirmar Pedido
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;