import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../components/Button'; // Importa o novo componente

const CheckoutPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur'
  });

  const [paymentMethod, setPaymentMethod] = useState('credit');

  const handlePlaceOrder = (data) => {
    if (cartItems.length === 0) {
      toast.error("Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.");
      navigate('/');
      return;
    }

    console.log("Pedido finalizado:", {
      items: cartItems,
      delivery: data,
      payment: paymentMethod,
    });

    toast.success("Pedido realizado com sucesso! Em breve seu pedido chegará.");
    cartItems.forEach(item => removeFromCart(item.id));
    navigate('/');
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + (cartItems.length > 0 ? 2.50 : 0);

  // Combina as classes base com as de erro/validação
  const getInputClasses = (fieldName) => {
    return `input-base ${errors[fieldName] ? 'input-error' : 'input-valid'}`;
  };

  return (
    <div className="py-12">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Finalizar Pedido</h1>
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 lg:p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Seu Pedido</h2>
        {/* ... (Resumo do Pedido - sem alteração) ... */}
        
        <form onSubmit={handleSubmit(handlePlaceOrder)} className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Informações de Entrega</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Nome Completo</label>
              <input
                {...register("name", { required: "O nome é obrigatório" })}
                className={getInputClasses("name")}
                placeholder="Seu nome"
              />
              {errors.name && <p className="text-red-500 text-xs italic mt-2">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-300 text-sm font-bold mb-2">Endereço</label>
              <input
                {...register("address", { required: "O endereço é obrigatório" })}
                className={getInputClasses("address")}
                placeholder="Rua, Número, Bairro, Cidade"
              />
              {errors.address && <p className="text-red-500 text-xs italic mt-2">{errors.address.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-300 text-sm font-bold mb-2">Telefone</label>
              <input
                {...register("phone", { 
                  required: "O telefone é obrigatório",
                  pattern: { value: /^\(\d{2}\)\s\d{4,5}-\d{4}$/, message: "Use (XX) XXXXX-XXXX" }
                })}
                className={getInputClasses("phone")}
                placeholder="(XX) XXXXX-XXXX"
              />
              {errors.phone && <p className="text-red-500 text-xs italic mt-2">{errors.phone.message}</p>}
            </div>
          </div>

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

          {/* Usando o novo componente Button */}
          <Button 
            type="submit" 
            variant="success" 
            disabled={cartItems.length === 0} 
            className="w-full mt-8 text-lg py-3"
          >
            Confirmar Pedido
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;