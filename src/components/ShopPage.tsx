"use client";

import { useState } from "react";
import { products, categories, getFeaturedProducts, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ShopPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const featured = getFeaturedProducts();
  const filtered = products.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.origin.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAdd = (product: Product) => {
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#c9a96e]/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.4em] mb-3">Exclusive Collection</p>
          <p className="font-[family-name:var(--font-great-vibes)] text-[#c9a96e]/60 text-3xl mb-2">Purveyors of Fine Liquors</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight">
            Fine Spirits,<br />
            <span className="text-[#c9a96e]">Delivered to You</span>
          </h1>
          <p className="text-white/50 mt-4 max-w-lg">
            Browse our curated selection of premium liquors, wines and champagnes.
            As an exclusive WestBev client, enjoy priority access and diplomatic pricing.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-xs uppercase tracking-[0.3em] text-[#c9a96e] mb-6">Featured Selections</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {featured.map((p) => (
            <button
              key={p.id}
              onClick={() => handleAdd(p)}
              className="group bg-[#141414] border border-[#252525] rounded-xl p-3 hover:border-[#c9a96e]/40 transition-all text-left"
            >
              <div className="aspect-[3/4] rounded-lg mb-3 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-[10px] text-[#c9a96e] uppercase tracking-wider truncate">{p.category}</div>
              <div className="text-xs font-medium text-white mt-0.5 line-clamp-2 leading-snug">{p.name}</div>
              <div className="text-xs font-bold text-[#c9a96e] mt-1">GHS {p.price.toLocaleString()}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-y border-[#252525]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search spirits, wines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#141414] border border-[#252525] rounded-lg px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c9a96e] w-64 transition-colors"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition-all ${
                    category === cat
                      ? "bg-[#c9a96e] text-black font-bold"
                      : "bg-[#141414] text-white/50 hover:text-white border border-[#252525] hover:border-[#c9a96e]/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-white">
            {category === "All" ? "All Products" : category}
          </h2>
          <span className="text-white/40 text-sm">{filtered.length} products</span>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <p className="text-lg">No products match your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="group bg-[#141414] border border-[#252525] rounded-2xl overflow-hidden hover:border-[#c9a96e]/30 transition-all"
              >
                <div className="aspect-[3/4] bg-gradient-to-b from-[#1a1a1a] to-[#0e0e0e] relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between gap-1">
                    <span className="bg-black/70 backdrop-blur-sm text-[#c9a96e] text-[9px] uppercase tracking-wide px-2 py-0.5 rounded-full truncate max-w-[60%]">
                      {p.category}
                    </span>
                    {p.abv && (
                      <span className="bg-black/70 backdrop-blur-sm text-white/60 text-[9px] px-2 py-0.5 rounded-full flex-shrink-0">
                        {p.abv}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium line-clamp-2 leading-snug">{p.name}</h3>
                  <div className="text-[10px] text-white/30 uppercase tracking-wider mt-0.5">{p.origin}</div>
                  <p className="text-white/40 text-xs mt-1 line-clamp-2">{p.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[#c9a96e] font-bold text-lg">GHS {p.price.toLocaleString()}</span>
                    <button
                      onClick={() => handleAdd(p)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                        addedId === p.id
                          ? "bg-green-500 text-white"
                          : "bg-[#c9a96e] text-black hover:bg-[#d4b57a]"
                      }`}
                    >
                      {addedId === p.id ? "Added!" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-[#252525] mt-12">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-serif text-xl font-bold text-white">WestBev Africa</div>
              <div className="text-white/30 text-xs mt-1">Purveyors of Fine Liquors, Wines & Champagnes in West Africa</div>
            </div>
            <div className="text-white/30 text-xs text-right">
              <div>GL-154-5127, Light Industrial Area, Spintex, Accra, Ghana</div>
              <div className="mt-1">info@westbev.africa | (233) 245-325489</div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-[#252525] text-center text-white/20 text-xs">
            Enjoy Responsibly. Do not forward to anyone under legal drinking age.
          </div>
        </div>
      </footer>
    </main>
  );
}
