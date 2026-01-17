import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowUpRight, 
  MapPin, 
  Building2, 
  TrendingUp, 
  Phone, 
  Menu, 
  X,
  Maximize2,
  Navigation,
  Globe,
  Waves
} from 'lucide-react';

// --- Types ---
interface Property {
  id: number;
  title: string;
  district: string;
  price: string;
  image: string;
  category: string;
}

// --- Data ---
const properties: Property[] = [
  {
    id: 1,
    title: "Empire City Thu Thiem",
    district: "Quận 2",
    price: "Từ $8,000/m²",
    image: "https://images.unsplash.com/photo-1541339905195-032873525081?auto=format&fit=crop&q=80&w=1200",
    category: "Căn hộ siêu sang"
  },
  {
    id: 2,
    title: "The Marq District 1",
    district: "Quận 1",
    price: "Từ $12,000/m²",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    category: "Penthouse"
  },
  {
    id: 3,
    title: "Grand Marina Saigon",
    district: "Quận 1",
    price: "Từ $18,000/m²",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1200",
    category: "Branded Residences"
  },
  {
    id: 4,
    title: "Vinhomes Golden River",
    district: "Quận 1",
    price: "Từ $7,500/m²",
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=1200",
    category: "Thượng lưu"
  }
];

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#D4AF37] pointer-events-none z-[10000]"
        animate={{ 
          x: position.x - 16, 
          y: position.y - 16,
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? "rgba(212, 175, 55, 0.1)" : "transparent"
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#D4AF37] rounded-full pointer-events-none z-[10001]"
        animate={{ x: position.x - 3, y: position.y - 3 }}
        transition={{ type: 'spring', damping: 30, stiffness: 500, mass: 0.1 }}
      />
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-end mix-blend-difference">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-be text-2xl font-black tracking-tighter"
      >
        METRO<span className="text-[#D4AF37]">POLIS</span>
      </motion.div>
      
      <div className="hidden md:flex space-x-12 font-be text-xs uppercase tracking-[0.2em] font-bold">
        <a href="#" className="hover:text-[#D4AF37] transition-colors">Dự Án</a>
        <a href="#" className="hover:text-[#D4AF37] transition-colors">Đầu Tư</a>
        <a href="#" className="hover:text-[#D4AF37] transition-colors">Vị Trí</a>
        <a href="#" className="hover:text-[#D4AF37] transition-colors font-bold text-[#D4AF37]">Liên Hệ</a>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-0 w-full bg-[#050505] p-8 border-b border-white/10 flex flex-col space-y-6 md:hidden"
          >
            <a href="#" className="text-3xl font-be font-black italic">Dự Án</a>
            <a href="#" className="text-3xl font-be font-black italic">Đầu Tư</a>
            <a href="#" className="text-3xl font-be font-black italic">Vị Trí</a>
            <a href="#" className="text-3xl font-be font-black italic text-[#D4AF37]">Kết Nối</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden kinetic-grid">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex items-center space-x-2 px-4 py-2 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[#D4AF37] text-[10px] font-be font-bold tracking-[0.3em] uppercase">Ho Chi Minh City Market 2024</span>
          </motion.div>

          <motion.h1 
            style={{ y: y1 }}
            className="vn-title text-[10vw] md:text-[12vw] font-black italic uppercase text-white mb-6"
          >
            SÀI GÒN <br />
            <span className="text-stroke italic-fix">VÔ CỰC</span>
          </motion.h1>

          <motion.p 
            style={{ y: y2 }}
            className="max-w-2xl text-white/50 text-base md:text-lg font-normal leading-loose mb-12 px-4"
          >
            Kiến tạo tương lai tại trung tâm kinh tế năng động bậc nhất Châu Á. Khám phá những tuyệt tác bất động sản mang tính biểu tượng tại HCMC.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
          >
            <button className="group relative px-12 py-5 bg-[#D4AF37] text-black font-be font-black uppercase tracking-widest flex items-center overflow-hidden">
              <span className="relative z-10">Sở Hữu Ngay</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <ArrowUpRight className="ml-2 relative z-10" />
            </button>
            <button className="px-12 py-5 border border-white/20 hover:border-white transition-colors font-be font-black uppercase tracking-widest">
              Xem Video
            </button>
          </motion.div>
        </div>
      </div>

      {/* Kinetic Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/2 -right-20 w-80 h-80 bg-[#D4AF37]/10 blur-[120px] rounded-full"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full"
      />
    </section>
  );
};

const MarqueeText = () => {
  return (
    <div className="py-16 border-y border-white/5 overflow-hidden whitespace-nowrap bg-white/5 flex">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="flex space-x-20 items-center text-4xl md:text-6xl font-be font-black italic uppercase text-white/10"
      >
        <span className="px-4">Thu Thiem New City</span>
        <span className="text-[#D4AF37] text-stroke px-4">District 1 Central</span>
        <span className="px-4">Luxury Penthouses</span>
        <span className="text-[#D4AF37] text-stroke px-4">Investment Grade</span>
        <span className="px-4">Empire City</span>
        <span className="text-[#D4AF37] text-stroke px-4">Metropole</span>
      </motion.div>
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="flex space-x-20 items-center text-4xl md:text-6xl font-be font-black italic uppercase text-white/10"
      >
        <span className="px-4">Thu Thiem New City</span>
        <span className="text-[#D4AF37] text-stroke px-4">District 1 Central</span>
        <span className="px-4">Luxury Penthouses</span>
        <span className="text-[#D4AF37] text-stroke px-4">Investment Grade</span>
        <span className="px-4">Empire City</span>
        <span className="text-[#D4AF37] text-stroke px-4">Metropole</span>
      </motion.div>
    </div>
  );
};

const Features = () => {
  const stats = [
    { label: "Vị Trí Đắc Địa", val: "Quận 1 - Q2", icon: MapPin },
    { label: "Tăng Trưởng Hàng Năm", val: "12%+", icon: TrendingUp },
    { label: "Tiêu Chuẩn Sống", val: "6 Sao", icon: Building2 },
    { label: "Tầm Nhìn", val: "Hướng Sông", icon: Waves },
  ];

  return (
    <section className="py-24 bg-[#050505] relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 border border-white/5 bg-white/[0.02] flex flex-col items-start"
            >
              <stat.icon className="text-[#D4AF37] mb-6" size={32} />
              <h3 className="text-white/40 text-[10px] font-be font-bold uppercase tracking-[0.2em] mb-4">{stat.label}</h3>
              <p className="text-xl md:text-2xl font-be font-black italic leading-tight">{stat.val}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PropertyGrid = () => {
  return (
    <section className="py-32 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-3xl">
            <h2 className="vn-title text-5xl md:text-8xl font-black italic uppercase mb-4">
              BỘ SƯU TẬP <br />
              <span className="text-[#D4AF37] italic-fix">BIỂU TƯỢNG</span>
            </h2>
          </div>
          <p className="max-w-md text-white/50 text-right leading-loose font-light">
            Tuyển chọn những dự án tiêu biểu nhất, định hình phong cách sống thượng lưu tại trung tâm Sài Gòn sôi động.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          {properties.map((prop, idx) => (
            <motion.div 
              key={prop.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx % 2 * 0.2 }}
              className={`group cursor-pointer ${idx % 2 !== 0 ? 'md:mt-48' : ''}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-8">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                  src={prop.image} 
                  alt={prop.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute top-8 left-8">
                   <span className="px-5 py-2 bg-black/90 backdrop-blur-xl text-[#D4AF37] text-[10px] font-be font-black uppercase tracking-[0.2em]">
                     {prop.category}
                   </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-8 right-8 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                   <div className="w-16 h-16 bg-[#D4AF37] flex items-center justify-center rounded-full text-black shadow-2xl">
                      <Maximize2 size={24} />
                   </div>
                </div>
              </div>
              <div className="flex justify-between items-start border-b border-white/10 pb-8">
                <div className="pr-6">
                  <h3 className="text-3xl font-be font-black italic mb-3 group-hover:text-[#D4AF37] transition-colors leading-tight">{prop.title}</h3>
                  <div className="flex items-center text-white/40 space-x-3">
                    <MapPin size={14} className="text-[#D4AF37]" />
                    <span className="text-xs font-bold uppercase tracking-widest">{prop.district}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                   <p className="text-[#D4AF37] font-be font-black italic text-2xl leading-none">{prop.price}</p>
                   <p className="text-[10px] text-white/30 uppercase tracking-[0.1em] mt-3 font-bold">Giá niêm yết</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section className="py-40 relative overflow-hidden bg-white text-black">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
          <div>
            <h2 className="vn-title text-6xl md:text-9xl font-black italic uppercase tracking-tighter mb-16">
              KẾT NỐI <br />
              <span className="italic-fix">TẦM VÓC.</span>
            </h2>
            <div className="space-y-12">
              <div className="flex items-center space-x-8 group cursor-pointer">
                <div className="w-20 h-20 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-be font-bold uppercase tracking-[0.3em] text-black/30 mb-2">Hotline Chuyên Gia</p>
                  <p className="text-2xl md:text-3xl font-be font-black">+84 901 234 567</p>
                </div>
              </div>
              <div className="flex items-center space-x-8 group cursor-pointer">
                <div className="w-20 h-20 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                  <Globe size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-be font-bold uppercase tracking-[0.3em] text-black/30 mb-2">Trụ Sở Chính</p>
                  <p className="text-2xl md:text-3xl font-be font-black italic leading-tight">Bitexco Financial Tower, Quận 1</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black p-12 md:p-16 text-white relative shadow-2xl">
            <p className="text-2xl font-be font-semibold italic mb-16 leading-relaxed">
              Để lại thông tin để nhận hồ sơ đầu tư chi tiết và lịch tham quan dự án đặc quyền.
            </p>
            <form className="space-y-10">
              <div className="border-b border-white/20 pb-6 group focus-within:border-[#D4AF37] transition-colors">
                <input 
                  type="text" 
                  placeholder="HỌ VÀ TÊN QUÝ KHÁCH" 
                  className="w-full bg-transparent border-none outline-none font-be text-xs font-bold tracking-[0.2em] placeholder:text-white/10 uppercase"
                />
              </div>
              <div className="border-b border-white/20 pb-6 group focus-within:border-[#D4AF37] transition-colors">
                <input 
                  type="email" 
                  placeholder="ĐỊA CHỈ EMAIL" 
                  className="w-full bg-transparent border-none outline-none font-be text-xs font-bold tracking-[0.2em] placeholder:text-white/10 uppercase"
                />
              </div>
              <div className="border-b border-white/20 pb-6 group focus-within:border-[#D4AF37] transition-colors">
                <textarea 
                  rows={2}
                  placeholder="DỰ ÁN QUÝ KHÁCH QUAN TÂM" 
                  className="w-full bg-transparent border-none outline-none font-be text-xs font-bold tracking-[0.2em] placeholder:text-white/10 uppercase resize-none"
                />
              </div>
              <button className="w-full py-8 bg-[#D4AF37] text-black font-be font-black uppercase tracking-[0.4em] text-xs hover:bg-white transition-all duration-500 transform hover:-translate-y-1">
                GỬI YÊU CẦU NGAY
              </button>
            </form>
          </div>
        </div>
      </div>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-48 -right-48 w-[600px] h-[600px] border-[1px] border-black/5 rounded-full pointer-events-none"
      />
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 bg-[#050505] border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="font-be text-2xl font-black italic tracking-tighter">
          METRO<span className="text-[#D4AF37]">POLIS</span> <span className="text-white/20 font-light text-sm ml-4 uppercase tracking-[0.2em]">Estate © 2024</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-white/30 text-[10px] font-be font-bold uppercase tracking-[0.3em]">
          <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
          <a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a>
          <a href="#" className="hover:text-white transition-colors">Tư vấn pháp lý</a>
        </div>
        <div className="flex items-center space-x-6">
          <button className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">FB</button>
          <button className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">IG</button>
          <button className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">LI</button>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050505] z-[99999] flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: "circInOut" }}
              className="w-64 h-[1px] bg-[#D4AF37] mb-8"
            />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-be text-xs font-black tracking-[0.6em] text-[#D4AF37] uppercase"
            >
              METROPOLIS HCMC
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <MarqueeText />
        <Features />
        <PropertyGrid />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}