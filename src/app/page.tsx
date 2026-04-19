import Link from "next/link";
import { getFeaturedBeats } from "@/data/beats";
import BeatCard from "@/components/BeatCard";
import { ArrowRightIcon, PlayIcon, ShieldCheckIcon, CurrencyDollarIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const featuredBeats = getFeaturedBeats();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-black to-indigo-950/30" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600/20 border border-violet-500/30 rounded-full text-violet-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            Новые биты каждую неделю
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Твой бит.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              Твоя музыка.
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Профессиональные биты в стилях Trap, Drill, R&B, Hip-Hop и других жанрах. 
            Лицензия — и ты готов к релизу.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/beats"
              className="flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-2xl transition-all hover:scale-105 shadow-lg shadow-violet-900/50"
            >
              <PlayIcon className="w-5 h-5" />
              Слушать биты
            </Link>
            <Link
              href="/beats"
              className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-2xl transition-all border border-white/20"
            >
              Посмотреть каталог
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 mt-16">
            {[
              { label: "Битов", value: "100+" },
              { label: "Жанров", value: "10+" },
              { label: "Продаж", value: "500+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Beats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white">Популярные биты</h2>
            <p className="text-gray-400 mt-2">Лучшие треки этой недели</p>
          </div>
          <Link
            href="/beats"
            className="flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium transition-colors"
          >
            Все биты <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredBeats.map((beat) => (
            <BeatCard key={beat.id} beat={beat} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white/[0.02] border-y border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white">Как это работает</h2>
            <p className="text-gray-400 mt-3">Три простых шага до твоего трека</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <PlayIcon className="w-8 h-8" />,
                step: "01",
                title: "Слушай",
                desc: "Прослушай биты в каталоге, найди тот, что подходит твоему стилю",
              },
              {
                icon: <ShieldCheckIcon className="w-8 h-8" />,
                step: "02",
                title: "Выбери лицензию",
                desc: "Базовая, Премиум или Эксклюзив — выбери нужный формат использования",
              },
              {
                icon: <CurrencyDollarIcon className="w-8 h-8" />,
                step: "03",
                title: "Скачай и твори",
                desc: "Оплати и получи файлы мгновенно. Создавай музыку без ограничений",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-violet-500/30 transition-colors"
              >
                <div className="text-violet-400 mb-4">{item.icon}</div>
                <div className="text-6xl font-black text-white/5 absolute top-6 right-8">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* License Types */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white">Типы лицензий</h2>
          <p className="text-gray-400 mt-3">Выбери подходящий формат для своего проекта</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Базовая",
              price: "от $25",
              color: "border-white/20",
              badge: null,
              features: [
                "MP3 файл (320 kbps)",
                "До 2,000 копий",
                "Стриминговые платформы",
                "Некоммерческое использование",
              ],
            },
            {
              name: "Премиум",
              price: "от $65",
              color: "border-violet-500",
              badge: "Популярный",
              features: [
                "MP3 + WAV файлы",
                "До 10,000 копий",
                "Все платформы",
                "Коммерческое использование",
                "Музыкальные клипы",
              ],
            },
            {
              name: "Эксклюзив",
              price: "от $250",
              color: "border-amber-500/50",
              badge: "Полные права",
              features: [
                "MP3 + WAV + Stems",
                "Неограниченные копии",
                "Полные права",
                "Бит снимается с продажи",
                "Персональная поддержка",
              ],
            },
          ].map((license) => (
            <div
              key={license.name}
              className={`p-8 bg-white/5 rounded-2xl border ${license.color} relative`}
            >
              {license.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-violet-600 text-white text-xs font-semibold rounded-full">
                    {license.badge}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <MusicalNoteIcon className="w-5 h-5 text-violet-400" />
                <h3 className="text-xl font-bold text-white">{license.name}</h3>
              </div>
              <p className="text-3xl font-black text-violet-400 my-4">{license.price}</p>
              <ul className="space-y-3">
                {license.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/beats"
                className="mt-8 w-full flex items-center justify-center py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl transition-colors"
              >
                Выбрать
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

