"use client";

import { use } from "react";
import { getBeatById } from "@/data/beats";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useHydrated } from "@/hooks/useHydrated";
import { License } from "@/types";
import { useState } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import {
  ShoppingCartIcon,
  CheckIcon,
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BeatDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const beat = getBeatById(id);
  const hydrated = useHydrated();
  const { addItem, isInCart } = useCartStore();
  const inCart = hydrated && beat ? isInCart(beat.id) : false;
  const [selectedLicense, setSelectedLicense] = useState<License | null>(
    beat ? beat.licenses[1] : null
  );

  if (!beat || !selectedLicense) return notFound();

  const handleAddToCart = () => {
    addItem(beat, selectedLicense);
  };

  const licenseColors: Record<string, string> = {
    basic: "border-gray-600 hover:border-gray-400",
    premium: "border-violet-500 hover:border-violet-400",
    exclusive: "border-amber-500 hover:border-amber-400",
  };

  const licenseSelectedColors: Record<string, string> = {
    basic: "bg-gray-700/50 border-gray-400",
    premium: "bg-violet-600/20 border-violet-500",
    exclusive: "bg-amber-600/20 border-amber-500",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back */}
      <Link
        href="/beats"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Назад к каталогу
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Cover + Player */}
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <Image
              src={beat.coverImage}
              alt={beat.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Audio Player */}
          <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
            <AudioPlayer audioUrl={beat.audioUrl} />
          </div>

          {/* Beat Meta */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { label: "BPM", value: beat.bpm },
              { label: "Тональность", value: beat.key },
              { label: "Жанр", value: beat.genre },
            ].map((item) => (
              <div key={item.label} className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className="text-white font-semibold">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {beat.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400 text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Info + Purchase */}
        <div>
          {/* Title */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-0.5 bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-medium rounded-full">
                  {beat.genre}
                </span>
              </div>
              <h1 className="text-4xl font-black text-white">{beat.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <MusicalNoteIcon className="w-4 h-4 text-violet-400" />
                <p className="text-gray-400">{beat.producer}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-white/5 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-colors">
                <HeartIcon className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white/5 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-colors">
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* License Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Выберите лицензию</h2>
            <div className="space-y-3">
              {beat.licenses.map((license) => (
                <button
                  key={license.type}
                  onClick={() => setSelectedLicense(license)}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${
                    selectedLicense.type === license.type
                      ? licenseSelectedColors[license.type]
                      : `bg-white/[0.03] ${licenseColors[license.type]}`
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedLicense.type === license.type
                            ? "border-violet-500 bg-violet-500"
                            : "border-gray-600"
                        }`}
                      >
                        {selectedLicense.type === license.type && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="text-white font-semibold text-lg">{license.name}</span>
                    </div>
                    <span className="text-violet-400 font-bold text-xl">${license.price}</span>
                  </div>
                  <ul className="grid grid-cols-2 gap-1">
                    {license.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-gray-400 text-xs">
                        <CheckIcon className="w-3 h-3 text-violet-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>

          {/* Purchase Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all ${
                inCart
                  ? "bg-green-600/20 text-green-400 border border-green-600/30 cursor-default"
                  : "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/50 hover:scale-[1.01]"
              }`}
            >
              {inCart ? (
                <>
                  <CheckIcon className="w-5 h-5" />
                  Добавлено в корзину
                </>
              ) : (
                <>
                  <ShoppingCartIcon className="w-5 h-5" />
                  Добавить в корзину — ${selectedLicense.price}
                </>
              )}
            </button>

            {inCart && (
              <Link
                href="/cart"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg bg-violet-600 hover:bg-violet-500 text-white transition-all"
              >
                Перейти в корзину
              </Link>
            )}

            <p className="text-center text-gray-500 text-sm mt-4">
              🔒 Безопасная оплата. Мгновенная доставка файлов.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
