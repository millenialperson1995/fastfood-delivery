import React from 'react';
import Cart from '../components/Cart';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { cartItems } = useCart();

    return (
        <div className="py-12">
            <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Seu Carrinho</h1>
            <div className="max-w-4xl mx-auto">
                <Cart />
                {cartItems.length > 0 && (
                     <div className="mt-8 flex justify-center">
                        <Link to="/" className="text-yellow-400 hover:text-yellow-300 text-lg">
                            &larr; Continuar comprando
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;