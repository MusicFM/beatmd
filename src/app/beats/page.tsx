"use client";

import { useState, useMemo } from "react";
import { beats, genres } from "@/data/beats";
import BeatCard from "@/components/BeatCard";
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BeatsContent() {
  const searchParams = useSearchParams();
  const initialGenre = searchParams.get("genre") || "Все";

  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "price_asc" | "price_desc">("popular");

  const filtered = useMemo(() => {
    let result = [...beats];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.genre.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedGenre !== "Все") {
      result = result.filter((b) => b.genre === selectedGenre);
    }

    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.plays - a.plays);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "price_asc":
        result.sort((a, b) => a.licenses[0].price - b.licenses[0].price);
        break;
      case "price_desc":
        result.sort((a, b) => b.licenses[0].price - a.licenses[0].price);
        break;
    }

    return result;
  }, [search, selectedGenre, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">Каталог битов</h1>
        <p className="text-gray-400 mt-2">
          {filtered.length} {filtered.length === 1 ? "бит" : filtered.length < 5 ? "бита" : "битов"} доступно
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Поиск по названию, жанру, тегу..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors appearance-none cursor-pointer"
          >
            <option value="popular" className="bg-gray-900">По популярности</option>
            <option value="newest" className="bg-gray-900">Сначала новые</option>
            <option value="price_asc" className="bg-gray-900">Цена: по возрастанию</option>
            <option value="price_desc" className="bg-gray-900">Цена: по убыванию</option>
          </select>
        </div>
      </div>

      {/* Genre Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
              selectedGenre === genre
                ? "bg-violet-600 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Beat Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">Биты не найдены</p>
          <p className="text-gray-600 mt-2">Попробуйте другой запрос или жанр</p>
          <button
            onClick={() => { setSearch(""); setSelectedGenre("Все"); }}
            className="mt-6 px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-colors"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((beat) => (
            <BeatCard key={beat.id} beat={beat} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BeatsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <BeatsContent />
    </Suspense>
  );
}
