import React, { useState, useMemo } from 'react';

// --- Ícones em SVG para uma interface mais limpa ---
// Ícone de Lixeira para remover itens
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 hover:text-red-500">
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

// Ícone de Carrinho de Compras
const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
);


// --- Dados do Cardápio (Mock) ---
// Em uma aplicação real, isso viria de uma API
const menuItems = [
  {
    id: 1,
    name: 'Gemini Burger Clássico',
    description: 'Pão brioche, hambúrguer de 150g, queijo cheddar, alface, tomate e nosso molho especial.',
    price: 25.50,
    image: 'https://placehold.co/600x400/f97316/white?text=Burger',
  },
  {
    id: 2,
    name: 'Batatas Fritas Crocantes',
    description: 'Porção generosa de batatas fritas sequinhas e crocantes, temperadas com sal.',
    price: 12.00,
    image: 'https://placehold.co/600x400/facc15/white?text=Fritas',
  },
  {
    id: 3,
    name: 'Refrigerante Gelado',
    description: 'Escolha entre as opções de refrigerante em lata (350ml).',
    price: 6.50,
    image: 'https://placehold.co/600x400/22d3ee/white?text=Refri',
  },
  {
    id: 4,
    name: 'Sundae de Caramelo',
    description: 'Sorvete de baunilha cremoso com uma calda de caramelo irresistível e amendoim.',
    price: 15.00,
    image: 'https://placehold.co/600x400/a78bfa/white?text=Sundae',
  },
  {
    id: 5,
    name: 'Combo Duplo Gemini',
    description: '2 Gemini Burgers, 1 batata grande e 2 refrigerantes. Perfeito para dividir!',
    price: 65.00,
    image: 'https://placehold.co/600x400/ef4444/white?text=Combo',
  },
];

// --- Componente do Cardápio ---
function MenuItemCard({ item, onAddToCart }) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
      <img 
        className="w-full h-48 object-cover" 
        src={item.image} 
        alt={`Imagem de ${item.name}`}
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/cccccc/ffffff?text=Imagem+Indispon%C3%ADvel'; }}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
        <p className="text-gray-400 text-sm flex-grow">{item.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-2xl font-black text-yellow-400">
            R$ {item.price.toFixed(2).replace('.', ',')}
          </p>
          <button
            onClick={() => onAddToCart(item)}
            className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors duration-300"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Componente do Carrinho ---
function Cart({ cartItems, onUpdateCart, onRemoveFromCart }) {
    
  // Calcula o subtotal e o total usando useMemo para otimização
  const { subtotal, total } = useMemo(() => {
    const sub = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // Em um app real, a taxa pode ter uma lógica mais complexa
    const tax = sub > 0 ? 2.50 : 0; 
    return { subtotal: sub, total: sub + tax };
  }, [cartItems]);

  const handlePlaceOrder = () => {
      // Em uma aplicação real, aqui você enviaria o pedido para um backend.
      // Por enquanto, apenas exibimos uma mensagem e limpamos o carrinho.
      console.log("Pedido finalizado:", { cartItems, total });
      alert(`Pedido finalizado com sucesso! Total: R$ ${total.toFixed(2).replace('.', ',')}`);
      // Limpa o carrinho (simulando que o pedido foi enviado)
      cartItems.forEach(item => onRemoveFromCart(item.id, true));
  };

  return (
    <div className="lg:w-2/5 xl:w-1/3 w-full bg-gray-800 rounded-xl shadow-2xl p-6 sticky top-8">
      <div className="flex items-center mb-6">
        <ShoppingCartIcon />
        <h2 className="text-2xl font-bold text-white ml-3">Seu Pedido</h2>
      </div>
      
      {cartItems.length === 0 ? (
        <p className="text-gray-400 text-center py-10">Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover mr-4"/>
                    <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-yellow-400 font-bold">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-gray-800 rounded-full">
                    <button onClick={() => onUpdateCart(item.id, item.quantity - 1)} className="px-3 py-1 text-lg font-bold text-white hover:bg-gray-600 rounded-l-full">-</button>
                    <span className="px-3 font-mono">{item.quantity}</span>
                    <button onClick={() => onUpdateCart(item.id, item.quantity + 1)} className="px-3 py-1 text-lg font-bold text-white hover:bg-gray-600 rounded-r-full">+</button>
                  </div>
                  <button onClick={() => onRemoveFromCart(item.id, true)}>
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 mt-6 pt-6 space-y-3">
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

          <button 
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-green-600 text-white font-bold py-3 rounded-lg text-lg hover:bg-green-500 transition-colors duration-300"
          >
            Finalizar Pedido
          </button>
        </>
      )}
    </div>
  );
}

// --- Componente Principal da Aplicação ---
export default function App() {
  const [cartItems, setCartItems] = useState([]);

  // Adiciona um item ao carrinho ou incrementa sua quantidade
  const handleAddToCart = (itemToAdd) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        // Se o item já existe, aumenta a quantidade
        return prevItems.map(item =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Se é um item novo, adiciona ao carrinho com quantidade 1
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
  };

  // Atualiza a quantidade de um item no carrinho
  const handleUpdateCart = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      // Se a quantidade for menor que 1, remove o item
      handleRemoveFromCart(itemId, true);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };
  
  // Remove um item do carrinho
  const handleRemoveFromCart = (itemId, removeAll = false) => {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };


  return (
    <div className="bg-gray-900 min-h-screen font-sans text-white p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        {/* Cabeçalho */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white mb-2">
            <span className="text-yellow-400">Gemini</span> Fast Food 🍔
          </h1>
          <p className="text-lg text-gray-400">O sabor do futuro, na velocidade da luz!</p>
        </header>

        {/* Conteúdo Principal: Cardápio e Carrinho */}
        <main className="flex flex-col lg:flex-row gap-12">
          
          {/* Coluna do Cardápio */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-6">Nosso Cardápio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
              {menuItems.map(item => (
                <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </div>

          {/* Coluna do Carrinho */}
          <Cart 
            cartItems={cartItems} 
            onUpdateCart={handleUpdateCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        </main>
        
        {/* Rodapé */}
        <footer className="text-center mt-16 text-gray-500 text-sm">
            <p>&copy; 2024 Gemini Fast Food. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
