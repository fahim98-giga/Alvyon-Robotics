import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Tag, Box, Code, Plus, Search, Filter } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

interface CodeListing {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  code_content: string;
}

const ProductCard = ({ product, onPurchase }: { product: Product, onPurchase: (id: number, type: string, amount: number) => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="glass rounded-3xl overflow-hidden border-white/5 hover:border-neon-blue/30 transition-all group"
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={product.image_url} 
        alt={product.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-neon-blue uppercase tracking-widest border border-white/10">
        {product.category}
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-display font-bold text-lg mb-2">{product.name}</h3>
      <p className="text-white/40 text-xs mb-6 line-clamp-2">{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-display font-black text-neon-blue">৳{Math.round(product.price * 115)}</span>
        <button 
          onClick={() => onPurchase(product.id, 'product', Math.round(product.price * 115))}
          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-neon-blue hover:text-black transition-all border border-white/10"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  </motion.div>
);

export const Marketplace = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [codeListings, setCodeListings] = useState<CodeListing[]>([]);
  const [search, setSearch] = useState('');
  const [purchaseStatus, setPurchaseStatus] = useState<{ success: boolean, message: string } | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));

    fetch('/api/marketplace/code')
      .then(res => res.json())
      .then(data => setCodeListings(data))
      .catch(err => console.error(err));
  }, []);

  const handlePurchase = async (itemId: number, itemType: string, amount: number) => {
    try {
      const res = await fetch('/api/marketplace/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, itemType, amount, userId: 1 }),
      });
      const data = await res.json();
      if (data.success) {
        setPurchaseStatus({ success: true, message: `Successfully purchased! Order ID: ${data.orderId}` });
        setTimeout(() => setPurchaseStatus(null), 5000);
      }
    } catch (error) {
      setPurchaseStatus({ success: false, message: "Purchase failed. Please try again." });
      setTimeout(() => setPurchaseStatus(null), 5000);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {purchaseStatus && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl border ${
              purchaseStatus.success ? 'bg-neon-green/10 border-neon-green text-neon-green' : 'bg-red-500/10 border-red-500 text-red-500'
            } backdrop-blur-md shadow-2xl`}
          >
            {purchaseStatus.message}
          </motion.div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-4 uppercase">ROBOTICS <span className="text-neon-blue">MARKETPLACE</span></h1>
            <p className="text-white/50 text-lg">Premium hardware and software for Bangladeshi engineers.</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="Search components..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-neon-blue/50 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button 
              onClick={() => alert("Filtering system initializing... Category selection will be available in the next update.")}
              className="glass p-3 rounded-2xl border-white/10 hover:text-neon-blue transition-all"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-2 mb-8">
            <Box className="w-6 h-6 text-neon-blue" />
            <h2 className="font-display font-bold text-2xl uppercase tracking-tighter">Hardware Kits</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((product) => (
              <ProductCard key={product.id} product={product} onPurchase={handlePurchase} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-8">
            <Code className="w-6 h-6 text-neon-purple" />
            <h2 className="font-display font-bold text-2xl uppercase tracking-tighter">Code Marketplace</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {codeListings.map((listing) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-[32px] border-white/5 hover:border-neon-purple/30 transition-all group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-neon-purple/20 flex items-center justify-center">
                    <Code className="w-6 h-6 text-neon-purple" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg">{listing.title}</h3>
                    <span className="text-xs text-neon-purple font-bold uppercase tracking-widest">{listing.category}</span>
                  </div>
                </div>
                <p className="text-white/40 text-sm mb-8 leading-relaxed">{listing.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-display font-black text-white">৳{Math.round(listing.price * 115)}</span>
                  <button 
                    onClick={() => handlePurchase(listing.id, 'code', Math.round(listing.price * 115))}
                    className="bg-neon-purple text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-[0_0_15px_rgba(188,19,254,0.3)] hover:brightness-110 transition-all"
                  >
                    Buy Code
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
