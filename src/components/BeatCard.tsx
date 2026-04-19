"use client";

import Image from "next/image";
import Link from "next/link";
import { Beat } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useHydrated } from "@/hooks/useHydrated";
import AudioPlayer from "./AudioPlayer";
import { ShoppingCartIcon, CheckIcon } from "@heroicons/react/24/outline";

interface BeatCardProps {
  beat: Beat;
}

function formatNumber(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}

export default function BeatCard({ beat }: BeatCardProps) {
  const hydrated = useHydrated();
  const { addItem, isInCart } = useCartStore();
  const inCart = hydrated && isInCart(beat.id);
  const basicLicense = beat.licenses[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inCart) {
      addItem(beat, basicLicense);
    }
  };

  return (
    <Link href={`/beats/${beat.id}`} className="group block">
      <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-900/20">
        {/* Cover */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={beat.coverImage}
            alt={beat.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <AudioPlayer audioUrl={beat.audioUrl} compact />
          </div>

          {/* Genre badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 bg-violet-600/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
              {beat.genre}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-base truncate group-hover:text-violet-300 transition-colors">
            {beat.title}
          </h3>
          <p className="text-gray-400 text-sm mt-0.5">{beat.producer}</p>

          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span>{beat.bpm} BPM</span>
            <span>•</span>
            <span>{beat.key}</span>
            <span>•</span>
            <span>{formatNumber(beat.plays)} прослушиваний</span>
          </div>

          {/* Price & Cart */}
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-xs text-gray-500">от</p>
              <p className="text-violet-400 font-bold text-lg">${basicLicense.price}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                inCart
                  ? "bg-green-600/20 text-green-400 border border-green-600/30"
                  : "bg-violet-600 hover:bg-violet-500 text-white"
              }`}
            >
              {inCart ? (
                <>
                  <CheckIcon className="w-4 h-4" />
                  В корзине
                </>
              ) : (
                <>
                  <ShoppingCartIcon className="w-4 h-4" />
                  Купить
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
