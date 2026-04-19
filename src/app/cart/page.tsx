"use client";

import { useCartStore } from "@/store/cartStore";
import { useHydrated } from "@/hooks/useHydrated";
import Image from "next/image";
import Link from "next/link";
import { TrashIcon, ShoppingBagIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function CartPage() {
  const hydrated = useHydrated();
  const { items, removeItem, clearCart, getTotalPrice } = useCartStore();

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <ShoppingBagIcon className="w-20 h-20 text-gray-700 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white mb-3">Корзина пуста</h1>
        <p className="text-gray-400 mb-8">Добавьте биты из каталога, чтобы купить их</p>
        <Link
          href="/beats"
          className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-2xl transition-all"
        >
          Перейти к каталогу
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-white">Корзина</h1>
        <button
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-red-400 transition-colors"
        >
          Очистить корзину
        </button>
      </div>

      <div className="space-y-4 mb-10">
        {items.map(({ beat, license }) => (
          <div
            key={beat.id}
            className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 group"
          >
            {/* Cover */}
            <Link href={`/beats/${beat.id}`} className="flex-shrink-0">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                <Image src={beat.coverImage} alt={beat.title} fill className="object-cover" sizes="64px" />
              </div>
            </Link>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <Link href={`/beats/${beat.id}`} className="hover:text-violet-300 transition-colors">
                <h3 className="text-white font-semibold truncate">{beat.title}</h3>
              </Link>
              <p className="text-gray-500 text-sm">{beat.producer}</p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                    license.type === "basic"
                      ? "bg-gray-700 text-gray-300"
                      : license.type === "premium"
                      ? "bg-violet-600/30 text-violet-300"
                      : "bg-amber-600/20 text-amber-400"
                  }`}
                >
                  {license.name}
                </span>
                <span className="text-xs text-gray-500">{beat.genre}</span>
              </div>
            </div>

            {/* Price & Remove */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <span className="text-violet-400 font-bold text-lg">${license.price}</span>
              <button
                onClick={() => removeItem(beat.id)}
                className="p-2 text-gray-600 hover:text-red-400 transition-colors rounded-xl hover:bg-red-400/10"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Итого</h2>
        <div className="space-y-2 mb-6">
          {items.map(({ beat, license }) => (
            <div key={beat.id} className="flex justify-between text-sm">
              <span className="text-gray-400 truncate max-w-[60%]">{beat.title} ({license.name})</span>
              <span className="text-gray-300 font-medium">${license.price}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-4 flex justify-between items-center mb-6">
          <span className="text-white font-semibold text-lg">Итого к оплате:</span>
          <span className="text-violet-400 font-black text-2xl">${getTotalPrice().toFixed(2)}</span>
        </div>
        <Link
          href="/checkout"
          className="w-full flex items-center justify-center gap-2 py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold text-lg rounded-2xl transition-all hover:scale-[1.01]"
        >
          Оформить заказ
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
        <p className="text-center text-gray-500 text-xs mt-4">
          🔒 Ваши данные защищены. Мгновенная доставка после оплаты.
        </p>
      </div>
    </div>
  );
}
