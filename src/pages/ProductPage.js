import React from 'react';
import { useParams, Link } from 'react-router-dom';
import menuItems from '../data/menu';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams(); // Pega o ID da URL
  const { addToCart } = useCart();

  // Encontra o item do menu correspondente ao ID
  const item = menuItems.find(item => item.id === parseInt(id));

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
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
        <div className="md:w-1/2">
          <img 
            src={item.image.replace('600x400', '800x600')} // Pede uma imagem maior
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
          <button
            onClick={() => addToCart(item)}
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
    </div>
  );
};

export default ProductPage;
