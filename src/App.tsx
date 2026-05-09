/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Zap, 
  ShieldCheck, 
  Droplet, 
  BarChart3, 
  Settings, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Clock, 
  Menu, 
  X,
  CheckCircle2,
  TrendingUp,
  Cpu
} from 'lucide-react';

const SERVICES = [
  {
    title: "Solar Panel Installation",
    description: "Expert end-to-end installation services for residential and commercial rooftops with high-efficiency PV panels.",
    icon: <Zap className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?auto=format&fit=crop&q=80&w=1000",
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Solar Panel Cleaning",
    description: "Professional cleaning to ensure maximum sunlight absorption and prevent dirt buildup that reduces efficiency.",
    icon: <Droplet className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?auto=format&fit=crop&q=80&w=1000",
    color: "from-cyan-400 to-teal-400"
  },
  {
    title: "Operating & Maintenance",
    description: "Comprehensive system checks, repairs, and preventive maintenance to keep your solar plant running optimally.",
    icon: <Settings className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000",
    color: "from-teal-400 to-emerald-400"
  },
  {
    title: "Plant Monitoring",
    description: "24/7 real-time monitoring of energy production and system health with detailed technical dashboards.",
    icon: <BarChart3 className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=1000",
    color: "from-emerald-400 to-green-500"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to send message. Please try again.');
        setFormStatus('idle');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please check your connection and try again.');
      setFormStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-900">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-amber-400 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-slate-900/50 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-10 py-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-amber-400 to-orange-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.5)]">
              <Sun className="w-6 h-6 text-white" strokeWidth={3} />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase text-white">SOLAR <span className="text-amber-400">TECHNICIAN</span></span>
          </motion.div>

          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-slate-300">
            <div className="px-5 py-2 bg-amber-400 text-slate-900 rounded-full font-bold text-xs tracking-widest shadow-lg ml-4">
              CALL: 8502903503
            </div>
          </div>

          <button 
            className="md:hidden p-2 text-white/60 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            id="mobile-menu-toggle"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-black/95 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-bold uppercase tracking-tighter">
              <a 
                href="#home" 
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-amber-400"
              >
                Home
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-amber-400"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden px-6 lg:px-10 py-20 lg:py-0">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-30">
            <div className="absolute top-1/2 right-10 w-64 lg:w-96 h-64 lg:h-96 bg-amber-500 rounded-full blur-[80px] lg:blur-[120px]" />
            <div className="absolute top-1/4 right-32 w-48 lg:w-64 h-48 lg:h-64 bg-blue-500 rounded-full blur-[70px] lg:blur-[100px]" />
          </div>
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2000" 
              className="w-full h-full object-cover grayscale brightness-50"
              alt="Solar farm landscape"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-3 text-center lg:text-left"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-white mb-6">
              POWERING <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-600">
                YOUR FUTURE
              </span><br/>
              TODAY.
            </h1>
            <p className="max-w-md mx-auto lg:mx-0 text-slate-400 text-base md:text-lg mb-8 leading-relaxed">
              Premier solar solutions for a sustainable world. We bring high-efficiency clean energy to your doorstep in Kishangarh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#contact" 
                className="px-8 py-4 bg-amber-400 text-slate-900 font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-amber-500/20"
                id="hero-cta"
              >
                Contact
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* 3D Floating Services Grid Overlay */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3 lg:gap-4 perspective-1200 lg:rotate-y-neg-12 px-4 lg:px-0">
            {SERVICES.map((service, i) => (
              <motion.a 
                href="#contact"
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`bg-slate-800/80 p-4 lg:p-6 rounded-2xl border border-slate-700 shadow-2xl hover:translate-z-10 transition-transform ${i % 2 !== 0 ? 'lg:mt-6' : ''} block hover:border-amber-400/30 group`}
              >
                <div className="mb-4">
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-2xl bg-slate-900/50 border border-slate-700/50 shadow-inner group-hover:border-amber-400/30 transition-colors`}>
                    <div className={`${i === 0 ? 'text-amber-400' : i === 1 ? 'text-blue-400' : i === 2 ? 'text-emerald-400' : 'text-sky-400'} drop-shadow-sm`}>
                      {React.cloneElement(service.icon as React.ReactElement, { className: 'w-5 h-5 lg:w-6 lg:h-6' })}
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-white mb-1 lg:mb-2 uppercase text-[10px] lg:text-xs tracking-tighter">{service.title.split(' ').slice(-1)}</h3>
                <p className="text-[9px] lg:text-[10px] text-slate-400 leading-tight lg:leading-relaxed line-clamp-2">{service.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-24 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-12">
          {[
            { icon: <ShieldCheck className="w-10 h-10 text-amber-400" />, title: "Certified Expert", desc: "Our team consists of certified solar technicans with years of field experience in Rajasthan." },
            { icon: <Clock className="w-10 h-10 text-amber-400" />, title: "Precision Maintenance", desc: "Meticulous attention to detail in every cleaning and inspection task for maximum yield." },
            { icon: <TrendingUp className="w-10 h-10 text-amber-400" />, title: "Guaranteed ROI", desc: "We focus on maximum efficiency to ensure your solar investment pays off faster." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="flex flex-col gap-4 p-8 bg-slate-900/40 border border-slate-800 rounded-3xl text-center md:text-left items-center md:items-start"
            >
              <div className="mb-2">{feature.icon}</div>
              <h3 className="text-xl font-bold uppercase tracking-tighter text-white">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Solar Section */}
      <section className="py-32 px-6 lg:px-10 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative z-10 rounded-[2.5rem] overflow-hidden border-8 border-slate-900 shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000"
                  alt="Solar energy benefits"
                  className="w-full aspect-square object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-amber-400 rounded-2xl shadow-xl shadow-amber-500/20">
                      <TrendingUp className="w-6 h-6 text-slate-900" />
                    </div>
                    <span className="text-xl font-bold text-white uppercase tracking-tighter">Energy Independence</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Reduce your reliance on the grid and lock in your energy costs for the next 25+ years.
                  </p>
                </div>
              </motion.div>
              {/* Background Shapes */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/10 rounded-full blur-[100px]" />
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="space-y-10">
              <div>
                <span className="text-amber-400 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Future Proof Your Home</span>
                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white mb-6">Why Switch to <br />Solar Energy?</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Solar is no longer just an environmental choice—it's the smartest financial decision for property owners in Rajasthan.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  { 
                    icon: <CheckCircle2 className="text-amber-400" />, 
                    title: "Drastic Bill Reduction", 
                    desc: "Monthly savings of up to 90% on electricity costs from day one of installation." 
                  },
                  { 
                    icon: <CheckCircle2 className="text-amber-400" />, 
                    title: "Asset Appreciation", 
                    desc: "Homes and businesses with solar installations have higher resale values." 
                  },
                  { 
                    icon: <CheckCircle2 className="text-amber-400" />, 
                    title: "Zero Carbon Footprint", 
                    desc: "Reduce tons of CO2 emissions and join the movement towards a cleaner planet." 
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-tight mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20 text-center md:text-left">
            <div>
              <span className="text-amber-400 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Engineered Solutions</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">Full Spectrum <br />Solar Plant O&M</h2>
            </div>
            <p className="max-w-md text-slate-400 text-sm leading-relaxed mb-4">
              Reliable, Efficient, and Affordable energy solutions. We ensure your solar asset is performing at its absolute peak with 24/7 technical support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-[2rem] bg-slate-900 border border-slate-800 shadow-xl"
              >
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80`} />
                </div>
                <div className="p-8">
                  <motion.div 
                    whileHover={{ 
                      y: -10, 
                      scale: 1.15,
                      rotateX: 10,
                      rotateY: 10,
                      boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.3)"
                    }}
                    className={`w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 group-hover:border-amber-400/50 transition-all cursor-default relative z-10`}
                  >
                    <div className="text-amber-400">{React.cloneElement(service.icon as React.ReactElement, { className: 'w-6 h-6' })}</div>
                  </motion.div>
                  <h3 className="text-2xl font-bold uppercase tracking-tighter text-white mb-3">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <a href="#contact" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-400 group-hover:gap-4 transition-all border-b border-amber-400/20 pb-1">
                    Enquiry Form <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-10 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-5xl font-bold text-white mb-4 uppercase tracking-tighter leading-none">Solar <br />Technician</h2>
              <p className="text-slate-400 text-lg max-w-sm mb-12 italic">
                Your local solar partner in Kishangarh. Reliable, Efficient, and Affordable energy solutions.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-900 transition-all">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-[10px] mb-1 text-slate-500">Office Address</h4>
                    <p className="text-sm font-medium text-slate-200">
                      Khalbdaniya Market, Kali Dungari,<br /> 
                      Makrana Road, Kishangarh Ajmer 305801
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-900 transition-all">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-[10px] mb-1 text-slate-500">Call Us</h4>
                    <p className="text-xl font-bold text-white tracking-widest">
                      +91 8502903503
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-900 transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-[10px] mb-1 text-slate-500">Email Support</h4>
                    <p className="text-sm font-medium text-slate-200">solartechnicianajmer@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-600 uppercase tracking-[0.4em] mt-12 font-bold">© 2026 SOLAR TECHNICIAN. Engineered for Excellence.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner"
          >
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/30">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-white uppercase tracking-tighter">Inquiry Sent Successfully!</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Thank you for contacting Solar Technician. Our team will get back to you at solartechnicianajmer@gmail.com shortly.
                  </p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="text-xs font-bold text-amber-400 uppercase tracking-widest hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Enquiry Form</h4>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <input 
                          type="text" 
                          name="name"
                          required
                          placeholder="Your Name"
                          className="w-full px-5 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-400 text-white placeholder:text-slate-600 text-xs transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <input 
                          type="email" 
                          name="email"
                          required
                          placeholder="Email Address"
                          className="w-full px-5 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-400 text-white placeholder:text-slate-600 text-xs transition-colors"
                        />
                      </div>
                    </div>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      placeholder="Phone Number"
                      className="w-full px-5 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-400 text-white placeholder:text-slate-600 text-xs transition-colors"
                    />
                    <textarea 
                      rows={3}
                      name="message"
                      required
                      placeholder="Project details..."
                      className="w-full px-5 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-400 text-white placeholder:text-slate-600 text-xs resize-none transition-colors"
                    />
                    <button 
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold uppercase tracking-[0.2em] text-xs rounded-lg hover:brightness-110 transition-all disabled:opacity-50 shadow-lg shadow-amber-500/10"
                      id="form-submit"
                    >
                      {formStatus === 'submitting' ? 'Processing...' : 'Send Message'}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 text-center px-10 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-amber-400 p-1.5 rounded-lg shadow-lg shadow-amber-500/20">
              <Sun className="w-4 h-4 text-slate-900" strokeWidth={3} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-white">SOLAR <span className="text-amber-400">TECHNICIAN</span></span>
          </div>
          <p className="text-[10px] text-slate-600 uppercase font-black tracking-[0.5em]">
            Rajasthan's Choice for Clean Energy
          </p>
          <div className="flex gap-6 text-[10px] uppercase font-bold tracking-widest text-slate-500">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
