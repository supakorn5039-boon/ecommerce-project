import { ROUTES } from '@/constants/RouteConst';
import { ProductService } from '@/services/Product.service';
import { useCartStore } from '@/store/features/cart/useCartStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast } from '../Toast/Toast';

export default function CartDrawer(): React.ReactElement {
  const { items, isCartOpen, closeCart, removeFromCart, clearCart, updateQuantity } =
    useCartStore();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const checkoutMutation = useMutation({
    mutationFn: () =>
      ProductService.checkoutProduct(
        items.map((item) => ({ id: item.id, quantity: item.quantity })),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductService.QUERY_KEY] });
      closeCart();
      clearCart();
      navigate(ROUTES.SHOP);
      showSuccessToast('Checkout successful!');
    },
  });

  const handleCheckout = (): void => {
    checkoutMutation.mutateAsync();
  };

  return (
    <>
      {isCartOpen && <div onClick={closeCart} className="fixed inset-0 bg-black/40 z-[90]" />}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white dark:bg-gray-900 shadow-2xl z-[100] transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🛒 Your Cart</h2>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Close cart"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto max-h-[calc(100%-200px)] space-y-6">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg font-medium">Your cart is empty.</p>
              <p className="text-sm mt-2">Add something delightful ☕</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-start rounded-lg p-4 shadow-sm bg-gray-50 dark:bg-gray-800"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {item.price} ฿ x {item.quantity} ={' '}
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {item.price * item.quantity} ฿
                    </span>
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() =>
                        item.quantity > 1
                          ? updateQuantity(item.id, item.quantity - 1)
                          : removeFromCart(item.id)
                      }
                      className="p-1.5 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                      aria-label="Decrease quantity"
                    >
                      <FaMinus className="text-xs" />
                    </button>

                    <span className="px-3 py-1 bg-white dark:bg-gray-900 rounded text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                      aria-label="Increase quantity"
                    >
                      <FaPlus className="text-xs" />
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto flex items-center gap-1 text-red-600 font-medium hover:bg-red-100 px-2 py-1 rounded transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-5 border-t dark:border-gray-700">
          <div className="flex justify-between items-center mb-5">
            <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">{total} ฿</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={clearCart}
              className="w-1/2 bg-red-500 text-white py-2 rounded-md font-medium hover:bg-red-600 transition"
            >
              Clear
            </button>
            <button
              onClick={handleCheckout}
              disabled={items.length === 0}
              className={`w-1/2 py-2 rounded-md font-medium text-white transition ${
                items.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
