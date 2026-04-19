"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useHydrated } from "@/hooks/useHydrated";
import { ShoppingCartIcon, MusicalNoteIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Header() {
  const hydrated = useHydrated();
  const itemCount = useCartStore((s) => s.getItemCount());
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = hydrated ? itemCount : 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center group-hover:bg-violet-500 transition-colors">
              <MusicalNoteIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Beat<span className="text-violet-400">MD</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Главная
            </Link>
            <Link href="/beats" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Биты
            </Link>
            <Link href="/beats?genre=Trap" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Trap
            </Link>
            <Link href="/beats?genre=R%26B" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              R&B
            </Link>
          </nav>

          {/* Cart & Mobile */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2 text-gray-300 hover:text-white transition-colors">
              <ShoppingCartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm font-medium">
            Главная
          </Link>
          <Link href="/beats" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm font-medium">
            Биты
          </Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm font-medium">
              Корзина {hydrated && cartCount > 0 && `(${cartCount})`}
            </Link>
        </div>
      )}
    </header>
  );
}
