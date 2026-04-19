"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useHydrated } from "@/hooks/useHydrated";
import Link from "next/link";
import { CheckCircleIcon, ArrowLeftIcon, CreditCardIcon } from "@heroicons/react/24/outline";

export default function CheckoutPage() {
  const hydrated = useHydrated();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let value = e.target.value;
    if (name === "cardNumber") {
      value = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    }
    if (name === "expiry") {
      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 3);
    }
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000));
    clearCart();
    setStep("success");
    setLoading(false);
  };

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0 && step !== "success") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Корзина пуста</h1>
        <Link href="/beats" className="text-violet-400 hover:text-violet-300">
          Перейти к каталогу
        </Link>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircleIcon className="w-14 h-14 text-green-400" />
        </div>
        <h1 className="text-4xl font-black text-white mb-4">Оплата прошла!</h1>
        <p className="text-gray-400 mb-2 text-lg">
          Спасибо за покупку. Файлы отправлены на ваш email.
        </p>
        <p className="text-gray-500 text-sm mb-10">
          Проверьте почтовый ящик — там будут ссылки на скачивание битов и лицензионные договоры.
        </p>
        <Link
          href="/beats"
          className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-2xl transition-all"
        >
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/cart" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeftIcon className="w-4 h-4" />
        Назад в корзину
      </Link>

      <h1 className="text-3xl font-bold text-white mb-10">Оформление заказа</h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <h2 className="text-lg font-bold text-white mb-5">Контактная информация</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Имя</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Иван Иванов"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 mb-5">
              <CreditCardIcon className="w-5 h-5 text-violet-400" />
              <h2 className="text-lg font-bold text-white">Платёжные данные</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Номер карты</label>
                <input
                  type="text"
                  name="cardNumber"
                  required
                  value={form.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors font-mono tracking-wider"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Срок действия</label>
                  <input
                    type="text"
                    name="expiry"
                    required
                    value={form.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    required
                    value={form.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 bg-violet-600 hover:bg-violet-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-lg rounded-2xl transition-all"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Обработка...
              </>
            ) : (
              <>
                <CreditCardIcon className="w-5 h-5" />
                Оплатить ${getTotalPrice().toFixed(2)}
              </>
            )}
          </button>

          <p className="text-center text-gray-600 text-xs">
            🔒 Данные карты защищены шифрованием. Демо-режим — реальная оплата не производится.
          </p>
        </form>

        {/* Order Summary */}
        <div className="h-fit sticky top-24">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <h2 className="text-lg font-bold text-white mb-5">Ваш заказ</h2>
            <div className="space-y-3">
              {items.map(({ beat, license }) => (
                <div key={beat.id} className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{beat.title}</p>
                    <p className="text-gray-500 text-xs">{license.name}</p>
                  </div>
                  <span className="text-violet-400 font-semibold flex-shrink-0">${license.price}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-center">
              <span className="text-white font-semibold">Итого:</span>
              <span className="text-violet-400 font-black text-2xl">${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
