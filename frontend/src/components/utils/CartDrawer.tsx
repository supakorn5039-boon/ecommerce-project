import { ROUTES } from '@/constants/RouteConst';
import { ProductService } from '@/services/Product.service';
import { useCartStore } from '@/store/features/cart/useCartStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
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
    <React.Fragment>
      {isCartOpen && <div onClick={closeCart} className="fixed inset-0 bg-black/40 z-[90]" />}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 shadow-xl z-[100] transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">🛒 Your Cart</h2>
          <button onClick={closeCart} className="text-gray-500 hover:text-red-500">
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(100%-200px)] space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-red-500">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 border rounded-lg p-3 dark:border-gray-700"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.price} ฿ x {item.quantity} ={' '}
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {item.price * item.quantity} ฿
                    </span>
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() =>
                        item.quantity > 1
                          ? updateQuantity(item.id, item.quantity - 1)
                          : removeFromCart(item.id)
                      }
                      className="p-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <FaMinus className="text-xs" />
                    </button>

                    <span className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <FaPlus className="text-xs" />
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-bold text-gray-800 dark:text-white">Total:</p>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">{total} ฿</p>
          </div>
          <div className="flex justify-between gap-2">
            <button
              onClick={clearCart}
              className="w-1/2 bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Clear
            </button>
            <button
              onClick={handleCheckout}
              disabled={items.length === 0}
              className={`w-1/2 py-2 rounded text-white ${
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
    </React.Fragment>
  );
}
