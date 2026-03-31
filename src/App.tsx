/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Menu, Instagram, Facebook, Search, ArrowRight, Star, Sparkles, Send, Loader2 } from 'lucide-react';
import { PERFUMES } from './constants';
import { Product, CartItem } from './types';
import { getFragranceRecommendation } from './services/geminiService';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAiConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    
    setIsAiLoading(true);
    setAiResponse('');
    const recommendation = await getFragranceRecommendation(aiInput);
    setAiResponse(recommendation || '');
    setIsAiLoading(false);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredPerfumes = selectedCategory 
    ? PERFUMES.filter(p => p.category === selectedCategory)
    : PERFUMES;

  return (
    <div className="min-h-screen selection:bg-gold selection:text-white">
      {/* Navigation */}
      <nav 
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 flex items-center justify-between ${
          scrolled ? 'glass py-3' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center gap-8">
          <Menu className="w-5 h-5 cursor-pointer hover:text-gold transition-colors" id="mobile-menu-trigger" />
          <div className="hidden md:flex gap-6 text-xs uppercase tracking-widest font-medium">
            <a href="#coleccion" className="hover:text-gold transition-colors">Colección</a>
            <a href="#historia" className="hover:text-gold transition-colors">Historia</a>
            <a href="#contacto" className="hover:text-gold transition-colors">Contacto</a>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase serif absolute left-1/2 -translate-x-1/2">
          UrbanVibe
        </h1>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsAiOpen(true)}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest hover:text-gold transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Consultor IA</span>
          </button>
          <div 
            className="relative cursor-pointer group" 
            onClick={() => setIsCartOpen(true)}
            id="cart-trigger"
          >
            <ShoppingBag className="w-5 h-5 group-hover:text-gold transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden" id="hero">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1583467875263-d50dec37a88c?auto=format&fit=crop&q=80&w=1920" 
            alt="Luxury Perfume Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <div className="relative z-10 text-center text-white px-4">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="uppercase tracking-[0.4em] text-xs mb-6 font-medium"
          >
            Fragancias de Autor
          </motion.p>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-5xl md:text-8xl font-extralight serif mb-8 tracking-tight"
          >
            El Arte de la <br /> <span className="italic">Seducción Invisible</span>
          </motion.h2>
          <motion.button 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-white/50 px-10 py-4 text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-all duration-300"
            onClick={() => document.getElementById('coleccion')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explorar Colección
          </motion.button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/50">
          <div className="w-[1px] h-12 bg-white/30" />
          <p className="text-[10px] uppercase tracking-widest">Scroll</p>
        </div>
      </header>

      {/* Collection Section */}
      <section id="coleccion" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h3 className="text-4xl serif mb-4">Nuestra Selección</h3>
            <p className="text-sm text-gray-500 max-w-md">
              Cada fragancia es una obra maestra, destilada con los ingredientes más raros del mundo para crear una firma olfativa inolvidable.
            </p>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
            {['Floral', 'Amaderado', 'Cítrico', 'Oriental'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`px-6 py-2 text-[10px] uppercase tracking-widest border transition-all ${
                  selectedCategory === cat 
                    ? 'bg-ink text-white border-ink' 
                    : 'border-gray-200 hover:border-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredPerfumes.map((perfume, idx) => (
              <motion.div
                layout
                key={perfume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
                id={`perfume-${perfume.id}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
                  <img 
                    src={perfume.image} 
                    alt={perfume.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(perfume);
                    }}
                    className="absolute bottom-6 left-6 right-6 bg-white py-4 text-[10px] uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  >
                    Añadir al Carrito
                  </motion.button>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{perfume.brand}</p>
                    <h4 className="text-xl serif">{perfume.name}</h4>
                    <p className="text-xs text-gray-500 mt-1 italic">{perfume.notes.join(' · ')}</p>
                  </div>
                  <p className="text-sm font-medium">${perfume.price}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Quote Section */}
      <section className="bg-ink text-white py-32 px-6 text-center overflow-hidden relative" id="historia">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif italic whitespace-nowrap">
            UrbanVibe
          </div>
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <Star className="w-6 h-6 text-gold mx-auto mb-8" />
          <h3 className="text-3xl md:text-5xl serif italic leading-tight mb-8">
            "El perfume es el complemento indispensable de la personalidad de la mujer, el toque final de un vestido."
          </h3>
          <p className="uppercase tracking-[0.3em] text-[10px] text-white/50">— Christian Dior</p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-cream pt-24 pb-12 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl serif mb-6 tracking-widest uppercase">UrbanVibe</h2>
            <p className="text-sm text-gray-500 max-w-sm mb-8">
              Suscríbete para recibir noticias sobre lanzamientos exclusivos y eventos privados de perfumería.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="TU EMAIL" 
                className="bg-transparent border-b border-gray-300 py-2 text-xs focus:border-gold outline-none flex-grow tracking-widest"
              />
              <button className="text-[10px] uppercase tracking-widest hover:text-gold transition-colors">Unirse</button>
            </div>
          </div>
          
          <div>
            <h5 className="text-[10px] uppercase tracking-widest font-bold mb-6">Explorar</h5>
            <ul className="space-y-4 text-xs text-gray-500">
              <li><a href="#" className="hover:text-ink transition-colors">Nuevas Fragancias</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Sets de Regalo</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Muestras</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] uppercase tracking-widest font-bold mb-6">Síguenos</h5>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-gold transition-colors" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-gold transition-colors" />
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-400 uppercase tracking-widest">
          <p>© 2026 UrbanVibe. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-ink">Privacidad</a>
            <a href="#" className="hover:text-ink">Términos</a>
            <a href="#" className="hover:text-ink">Envíos</a>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 flex flex-col"
              id="cart-drawer"
            >
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl serif">Tu Carrito</h3>
                <X 
                  className="w-6 h-6 cursor-pointer hover:rotate-90 transition-transform duration-300" 
                  onClick={() => setIsCartOpen(false)}
                />
              </div>

              <div className="flex-grow overflow-y-auto no-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                    <ShoppingBag className="w-12 h-12 opacity-20" />
                    <p className="text-xs uppercase tracking-widest">Tu carrito está vacío</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-6">
                        <div className="w-24 h-32 bg-gray-100 overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow py-2">
                          <div className="flex justify-between mb-1">
                            <h4 className="serif text-lg">{item.name}</h4>
                            <p className="text-sm font-medium">${item.price}</p>
                          </div>
                          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">{item.brand}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-200 px-3 py-1 gap-4 text-xs">
                              <span>{item.quantity}</span>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="pt-8 border-t border-gray-100 mt-8">
                  <div className="flex justify-between items-end mb-8">
                    <p className="text-xs uppercase tracking-widest text-gray-400">Total Estimado</p>
                    <p className="text-3xl serif">${cartTotal}</p>
                  </div>
                  <button className="w-full bg-ink text-white py-5 text-xs uppercase tracking-[0.2em] hover:bg-gold transition-colors duration-500 flex items-center justify-center gap-4">
                    Finalizar Compra <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* AI Consultant Modal */}
      <AnimatePresence>
        {isAiOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAiOpen(false)}
              className="fixed inset-0 bg-black/60 z-[80] backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-cream z-[90] p-10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <h3 className="text-2xl serif">Sommelier de Fragancias</h3>
                </div>
                <X className="w-5 h-5 cursor-pointer" onClick={() => setIsAiOpen(false)} />
              </div>

              <p className="text-xs text-gray-500 mb-8 leading-relaxed">
                Describe qué aromas te gustan, una ocasión especial o simplemente cómo quieres sentirte hoy. Nuestra IA te recomendará la esencia perfecta.
              </p>

              <form onSubmit={handleAiConsult} className="space-y-6">
                <div className="relative">
                  <textarea 
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ej: Busco algo fresco para una boda en la playa..."
                    className="w-full bg-white border border-gray-200 p-4 text-sm outline-none focus:border-gold transition-colors min-h-[120px] resize-none"
                  />
                  <button 
                    type="submit"
                    disabled={isAiLoading}
                    className="absolute bottom-4 right-4 bg-ink text-white p-2 hover:bg-gold transition-colors disabled:opacity-50"
                  >
                    {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
              </form>

              {aiResponse && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-white border-l-2 border-gold italic text-sm text-gray-700 leading-relaxed"
                >
                  {aiResponse}
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
