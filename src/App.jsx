import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Coffee, ShoppingCart } from "lucide-react";

const MENU = [
  {
    id: 1,
    category: "Coffee",
    name: "Latte",
    price: "3.20",
    desc: "Espresso topped with steamed milk.",
    img: "/coffee.jpg",
  },
  {
    id: 2,
    category: "Coffee",
    name: "Cappuccino",
    price: "3.50",
    desc: "Equal parts espresso, steamed milk, and foam.",
    img: "/coffee.jpg",
  },
  {
    id: 3,
    category: "Coffee",
    name: "Espresso",
    price: "2",
    desc: "A classic.",
    img: "/coffee.jpg",
  },
  {
    id: 4,
    category: "Pastries",
    name: "Almond Croissant",
    price: "2.80",
    desc: "Buttery croissant filled with almond paste.",
    img: "/crossaint.jpg",
  },
  {
    id: 5,
    category: "Pastries",
    name: "Red Velvet",
    price: "2.20",
    desc: "Light cocoa infused sponge cake, layered with frosting.",
    img: "/crossaint.jpg",
  },
  {
    id: 6,
    category: "Cold Drinks",
    name: "Mojito",
    price: "3.10",
    desc: "Refreshing concoction of zesty lime, cool mint, and a splash of soda.",
    img: "/drink.jpg",
  },
  {
    id: 7,
    category: "Cold Drinks",
    name: "Orange Juice",
    price: "2.90",
    desc: "Freshly squeezed orange juice. Can't go wrong with it!",
    img: "/drink.jpg",
  },
];

const CATEGORIES = ["All", "Coffee", "Pastries", "Cold Drinks"];

export default function App() {
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState(null);

  const filtered =
    category === "All" ? MENU : MENU.filter((m) => m.category === category);

  function toggleFav(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 font-sans text-amber-900 flex flex-col items-center">
      <header className="w-full max-w-5xl py-12 px-6 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-serif font-semibold">Café Aroma</h1>
          <p className="text-sm text-amber-700 mt-1">Fresh, hand-crafted, and deeply therapeutic</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-xl shadow-sm">
            <Coffee size={18} />
            <span className="text-sm">Open • 8:00 — 18:00</span>
          </div>
          <button className="flex items-center gap-2 bg-amber-700 text-white px-3 py-2 rounded-xl shadow hover:opacity-95">
            <ShoppingCart size={16} />
            <span className="text-sm">Order</span>
          </button>
        </div>
      </header>

      <main className="w-full max-w-5xl px-6 pb-20 flex flex-col items-center">
        <section className="mb-8">
          <nav className="flex gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all
                  ${category === cat ? "bg-amber-700 text-white" : "bg-white/70 text-amber-800"}`}
              >
                {cat}
              </button>
            ))}
          </nav>

        </section>

        <section>
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((item) => (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md"
                >
                  <div className="relative">
                    <img src={item.img} alt={item.name} className="w-full h-44 object-cover" />
                    <button
                      onClick={() => toggleFav(item.id)}
                      className="absolute top-3 right-3 bg-white/70 p-2 rounded-full shadow"
                      aria-label={`Toggle favorite ${item.name}`}
                    >
                      <Heart size={18} className={`${favorites.includes(item.id) ? "text-rose-500" : "text-amber-800"}`} />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-xl">{item.name}</h3>
                        <p className="text-xs text-amber-600 mt-1">{item.desc}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">${item.price}</div>
                        <button
                          onClick={() => setSelected(item)}
                          className="mt-3 text-sm bg-amber-700 text-white px-3 py-2 rounded-lg shadow"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      {/* pop up window */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layout
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <img src={selected.img} alt={selected.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-serif mb-2">{selected.name}</h2>
                  <p className="text-sm text-amber-700 mb-4">{selected.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-amber-500">Price</div>
                      <div className="text-2xl font-semibold">${selected.price}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleFav(selected.id)}
                        className="px-4 py-2 bg-amber-100 rounded-lg border flex flex-row gap-1"
                      >
                        <Heart size={18} /> {favorites.includes(selected.id) ? "Favorited" : "Favorite"}
                      </button>
                      <button
                        className="px-4 py-2 rounded-lg text-white"
                        onClick={() => alert('Order placed')}
                      >
                        Order
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 text-right">
                    <button
                      onClick={() => setSelected(null)}
                      className="px-5 text-sm bg-r bg-black text-white"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
