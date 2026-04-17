/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  Mail, 
  Linkedin, 
  ChevronRight, 
  Award, 
  BookOpen, 
  Briefcase, 
  TrendingUp, 
  Globe, 
  Cpu, 
  Shield, 
  Rocket,
  X,
  Menu,
  Calendar,
  MapPin,
  GraduationCap,
  Users,
  Home,
  FileText
} from 'lucide-react';
import portfolioData from './data/portfolio.json';

// --- Types ---
type Expertise = typeof portfolioData.profile.expertise[0];

// --- Components ---

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3"
    >
      <span className="w-8 h-1 bg-electric-blue rounded-full"></span>
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-space-slate max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const Modal = ({ isOpen, onClose, expertise }: { isOpen: boolean; onClose: () => void; expertise: Expertise | null }) => {
  if (!expertise) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-space-navy/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl glass-panel rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-electric-blue">{expertise.title}</h3>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-6 h-6 text-space-slate" />
                </button>
              </div>
              <p className="text-lg text-white mb-8 leading-relaxed">{expertise.description}</p>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-space-slate">Key Achievements & Details</h4>
                <ul className="space-y-3">
                  {expertise.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-space-light">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-electric-blue flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [activeExpertise, setActiveExpertise] = useState<Expertise | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (exp: Expertise) => {
    setActiveExpertise(exp);
    setIsModalOpen(true);
  };

  const navLinks = [
    { name: 'Expertise', href: '#expertise' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Investment', href: '#investment' },
    { name: 'Activity', href: '#activity' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-grid-pattern selection:bg-electric-blue/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled || isMobileMenuOpen ? 'glass-panel py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 md:w-6 md:h-6 text-electric-blue" />
            <span className="text-lg md:text-xl font-bold tracking-tighter text-white">
              {portfolioData.profile.name} <span className="text-electric-blue font-light hidden sm:inline">| {portfolioData.profile.englishName}</span>
            </span>
            <div className="flex items-center gap-3 ml-2 md:ml-4">
              <a 
                href={`mailto:${portfolioData.profile.email}`}
                className="p-1.5 text-space-slate hover:text-electric-blue transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a 
                href={`https://${portfolioData.profile.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-space-slate hover:text-electric-blue transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-space-slate">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-electric-blue transition-colors">{link.name}</a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-white hover:text-electric-blue transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-panel border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4 text-sm font-medium uppercase tracking-widest text-space-slate">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-electric-blue transition-colors py-2"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-4 md:px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-electric-blue/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
              A&D Future Strategist
              <span className="block text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light mt-2 text-electric-blue/80">
                (Aerospace & Defense)
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-space-slate mb-10 font-light max-w-2xl mx-auto px-4">
              {portfolioData.profile.subHeadline.includes('&') ? (
                <>
                  {portfolioData.profile.subHeadline.split('&')[0]}& 
                  <br className="sm:hidden" />
                  {portfolioData.profile.subHeadline.split('&')[1]}
                </>
              ) : (
                portfolioData.profile.subHeadline
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 px-4">
              {portfolioData.profile.expertise.map((exp, idx) => (
                <span key={idx} className="px-3 md:px-4 py-1.5 md:py-2 rounded-full glass-panel text-[10px] md:text-xs font-semibold uppercase tracking-widest text-electric-blue">
                  {exp.title}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 px-4">
              <a 
                href="#expertise" 
                className="px-8 py-4 bg-electric-blue text-space-navy font-bold rounded-lg hover:bg-white transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(0,209,255,0.3)] text-center"
              >
                View Portfolio
              </a>
              <a 
                href="#contact" 
                className="px-8 py-4 glass-panel text-white font-bold rounded-lg hover:bg-white/10 transition-all transform hover:-translate-y-1 text-center"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-space-slate"
        >
          <div className="w-6 h-10 border-2 border-space-slate/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-electric-blue rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Core Expertise */}
      <section id="expertise" className="py-20 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <SectionTitle 
          title="Core Expertise" 
          subtitle="항공우주 및 방위산업 전반을 꿰뚫는 독보적인 전문성과 전략적 인사이트를 제공합니다." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {portfolioData.profile.expertise.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => openModal(exp)}
              className="group glass-panel p-6 md:p-8 rounded-2xl cursor-pointer hover:border-electric-blue/50 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 md:p-3 bg-electric-blue/10 rounded-xl text-electric-blue group-hover:bg-electric-blue group-hover:text-space-navy transition-colors">
                  {idx === 0 && <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />}
                  {idx === 1 && <Cpu className="w-5 h-5 md:w-6 md:h-6" />}
                  {idx === 2 && <Globe className="w-5 h-5 md:w-6 md:h-6" />}
                  {idx === 3 && <Users className="w-5 h-5 md:w-6 md:h-6" />}
                </div>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-space-slate group-hover:text-electric-blue transition-colors" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-electric-blue transition-colors">{exp.title}</h3>
              <p className="text-sm md:text-base text-space-slate line-clamp-2">{exp.description}</p>
              <div className="mt-4 md:mt-6 text-xs md:text-sm font-bold text-space-slate/40 group-hover:text-electric-blue transition-colors">
                View Details
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Professional Journey */}
      <section id="timeline" className="py-20 md:py-24 px-4 md:px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Professional Journey" 
            subtitle="18년 이상의 A&D 도메인 마스터로서 걸어온 전략적 성장과 혁신의 기록입니다." 
          />
          
          <div className="space-y-12">
            {portfolioData.experience.map((exp, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-center gap-3 md:gap-4 mb-8">
                  <div className="p-2.5 md:p-3 bg-electric-blue text-space-navy rounded-xl">
                    <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white">{exp.company}</h3>
                      {exp.company === "한국항공우주산업 (KAI)" && (
                        <a 
                          href="https://www.koreaaero.com/KO/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-space-slate hover:text-electric-blue transition-colors"
                          title="KAI 홈페이지 방문"
                        >
                          <Home className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                      )}
                    </div>
                    <p className="text-electric-blue font-mono text-xs md:text-sm">{exp.period}</p>
                  </div>
                </div>
                
                <div className="ml-4 md:ml-6 border-l-2 border-white/10 pl-6 md:pl-10 space-y-10">
                  {exp.roles.map((role, rIdx) => (
                    <motion.div 
                      key={rIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="absolute -left-[35px] md:-left-[51px] top-1.5 md:top-2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-space-navy border-2 border-electric-blue" />
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4">
                        <h4 className="text-lg md:text-xl font-bold text-white">{role.title}</h4>
                        <span className="text-space-slate font-mono text-[10px] md:text-sm mt-1 md:mt-0">{role.period}</span>
                      </div>
                      <ul className="space-y-2">
                        {role.achievements.map((ach, aIdx) => {
                          const isObject = typeof ach === 'object' && ach !== null;
                          const text = isObject ? (ach as any).text : ach;
                          const isHighlighted = isObject && (ach as any).highlight;
                          
                          return (
                            <li key={aIdx} className={`text-sm md:text-base flex items-start gap-2 md:gap-3 ${isHighlighted ? 'text-electric-blue font-semibold' : 'text-space-light'}`}>
                              <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${isHighlighted ? 'bg-electric-blue' : 'bg-space-slate'}`} />
                              {text}
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

            {/* Board Experience */}
            <div className="relative pt-12">
              <div className="flex items-center gap-3 md:gap-4 mb-8">
                <div className="p-2.5 md:p-3 bg-purple-500 text-white rounded-xl">
                  <Award className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Board Experience</h3>
                </div>
              </div>
              <div className="ml-4 md:ml-6 border-l-2 border-white/10 pl-6 md:pl-10">
                {portfolioData.boardExperience.map((board, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel p-5 md:p-6 rounded-xl"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4">
                      <h4 className="text-lg md:text-xl font-bold text-white">{board.company}</h4>
                      <span className="text-electric-blue font-mono text-[10px] md:text-sm mt-1 md:mt-0">{board.period}</span>
                    </div>
                    <p className="text-sm md:text-base text-space-slate mb-2 font-semibold">{board.role}</p>
                    <p className="text-sm md:text-base text-space-light">{board.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment & Alliances */}
      <section id="investment" className="py-20 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <SectionTitle 
          title="Investment & Alliances" 
          subtitle="미래 기술 생태계 확장을 위한 전략적 투자와 글로벌 파트너십 성과입니다." 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-electric-blue" />
              Investment Portfolio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolioData.investments.map((inv, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="group glass-panel p-5 md:p-6 rounded-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-2 py-0.5 md:py-1 rounded text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${inv.type === 'M&A' ? 'bg-red-500/20 text-red-400' : 'bg-electric-blue/20 text-electric-blue'}`}>
                        {inv.type}
                      </span>
                      <span className="text-space-slate font-mono text-[10px] md:text-xs">{inv.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-base md:text-lg font-bold text-white">{inv.company}</h4>
                      {inv.homepage_url && (
                        <a 
                          href={inv.homepage_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-space-slate hover:text-electric-blue transition-colors"
                          title="홈페이지 방문"
                        >
                          <Home className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-space-light mb-4">{inv.summary}</p>
                  </div>
                  <a 
                    href={inv.news_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-space-slate/40 group-hover:text-electric-blue transition-colors"
                  >
                    관련기사 <ExternalLink className="w-3 h-3" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Partnerships */}
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 mb-8">
              <Globe className="w-5 h-5 text-electric-blue" />
              Strategic Alliances
            </h3>
            <div className="space-y-6">
              {portfolioData.partnerships.map((partner, idx) => (
                <div key={idx} className="group relative pl-5 md:pl-6 border-l border-white/10">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-electric-blue" />
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-base font-bold text-white">{partner.partner}</h4>
                    <span className="text-space-slate font-mono text-[10px] ml-2">{partner.date}</span>
                  </div>
                  <p className="text-[11px] md:text-xs text-space-light mb-2">{partner.summary}</p>
                  <a 
                    href={partner.news_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-space-slate/40 group-hover:text-electric-blue transition-colors flex items-center gap-1"
                  >
                    관련기사 <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Innovation & Insights */}
      <section id="activity" className="py-20 md:py-24 px-4 md:px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Open Innovation & Insights" 
            subtitle="스타트업과의 PoC 협업 및 학술 활동을 통해 산업의 미래를 구체화합니다." 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* PoC Records */}
            <div className="space-y-8">
              <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 mb-8">
                <Rocket className="w-5 h-5 text-electric-blue" />
                Open Innovation (PoC)
              </h3>
              <div className="space-y-6">
                {portfolioData.pocRecord.map((poc, idx) => (
                  <div key={idx} className="group relative pl-5 md:pl-6 border-l border-white/10">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-electric-blue" />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h4 className="font-bold text-white text-sm">{poc.title}</h4>
                      <span className="text-space-slate font-mono text-[10px] whitespace-nowrap mt-1 sm:mt-0 sm:ml-4">{poc.date}</span>
                    </div>
                    <ul className="space-y-1 mb-3">
                      {poc.items.map((item, iIdx) => (
                        <li key={iIdx} className="text-[11px] md:text-xs text-space-light flex items-start gap-2">
                          <span className="mt-1 text-electric-blue">›</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    {poc.news_url && (
                      <a 
                        href={poc.news_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold text-space-slate/40 group-hover:text-electric-blue transition-colors flex items-center gap-1"
                      >
                        관련기사 <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Publications */}
            <div className="space-y-8">
              <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 mb-8">
                <BookOpen className="w-5 h-5 text-electric-blue" />
                Publications
              </h3>
              <div className="space-y-6">
                {portfolioData.publications.map((pub, idx) => (
                  <div key={idx} className="group relative pl-5 md:pl-6 border-l border-white/10">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-electric-blue" />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                      <h4 className="font-bold text-white text-sm leading-snug">{pub.content}</h4>
                      <span className="text-space-slate font-mono text-[10px] whitespace-nowrap mt-1 sm:mt-0 sm:ml-4">{pub.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[10px] md:text-xs text-electric-blue">{pub.title}</p>
                      {(pub as any).news_url && (
                        <a 
                          href={(pub as any).news_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-space-slate/60 hover:text-white transition-colors"
                          title="상세 문서 보기"
                        >
                          <FileText className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Awards Section - Highlighted Card Style */}
          <div className="pt-12 mb-16">
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 mb-8">
              <Award className="w-5 h-5 text-electric-blue" />
              Honors & Awards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolioData.awards.map((award, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="glass-panel p-5 md:p-6 rounded-xl flex flex-col justify-between border-t-2 border-electric-blue/50"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-electric-blue/20 text-electric-blue px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                        Award
                      </span>
                      <span className="text-space-slate font-mono text-[10px] md:text-xs">{award.date}</span>
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-white mb-2">{award.title}</h4>
                    <p className="text-xs md:text-sm text-space-light">{award.reason}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Professional Activity Section (Advisory & Presenter) */}
          <div className="pt-12 border-t border-white/5">
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 mb-10">
              <Users className="w-5 h-5 text-electric-blue" />
              Professional Activity
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Advisory */}
              <div>
                <h4 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-electric-blue/70" />
                  Advisory & Evaluation
                </h4>
                <div className="space-y-6">
                  {portfolioData.advisory.map((adv, idx) => (
                    <div key={idx} className="relative pl-5 md:pl-6 border-l border-white/10">
                      <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-electric-blue" />
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                        <h4 className="font-bold text-white text-sm leading-snug">{adv.title}</h4>
                        <span className="text-space-slate font-mono text-[10px] whitespace-nowrap mt-1 sm:mt-0 sm:ml-4">{adv.date}</span>
                      </div>
                      <p className="text-[10px] md:text-xs text-electric-blue">{adv.org}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Presenter */}
              <div>
                <h4 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-electric-blue/70" />
                  Presentations
                </h4>
                <div className="space-y-6">
                  {portfolioData.presenter.map((pres, idx) => (
                    <div key={idx} className="group relative pl-5 md:pl-6 border-l border-white/10">
                      <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-electric-blue" />
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                        <h4 className="font-bold text-white text-sm leading-snug">{pres.topic}</h4>
                        <span className="text-space-slate font-mono text-[10px] whitespace-nowrap mt-1 sm:mt-0 sm:ml-4">{pres.date}</span>
                      </div>
                      <p className="text-[10px] md:text-xs text-electric-blue mb-2">{pres.title}</p>
                      {(pres as any).news_url && (
                        <a 
                          href={(pres as any).news_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold text-space-slate/40 group-hover:text-electric-blue transition-colors flex items-center gap-1"
                        >
                          관련기사 <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certs */}
      <section className="py-20 md:py-24 px-4 md:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3 mb-8">
            <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-electric-blue" />
            Education
          </h3>
          <div className="space-y-6">
            {portfolioData.education.map((edu, idx) => (
              <div key={idx} className="relative pl-5 md:pl-6 border-l border-white/10">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-electric-blue" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                  <h4 className="font-bold text-white text-sm md:text-base">{edu.degree}</h4>
                  <span className="text-space-slate font-mono text-[10px] md:text-xs mt-1 sm:mt-0 sm:ml-4">{edu.date}</span>
                </div>
                <p className="text-xs md:text-sm text-electric-blue mb-1">{edu.school}</p>
                {edu.thesis && (
                  <p className="text-[10px] md:text-xs text-space-slate italic">Thesis: {edu.thesis}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3 mb-8">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-electric-blue" />
            Certifications
          </h3>
          <div className="space-y-4">
            {portfolioData.certifications.map((cert, idx) => (
              <div key={idx} className="glass-panel p-4 md:p-5 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-white text-sm md:text-base mb-1">{cert.title}</h4>
                  <p className="text-[10px] md:text-xs text-electric-blue">{cert.org}</p>
                </div>
                <span className="text-space-slate font-mono text-[10px] md:text-xs ml-4">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-24 px-4 md:px-6 bg-electric-blue text-space-navy">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 tracking-tighter uppercase leading-tight">Let's Build the Future Together</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
            <a 
              href={`mailto:${portfolioData.profile.email}`}
              className="flex items-center gap-3 text-lg md:text-2xl font-bold hover:underline break-all px-4"
            >
              <Mail className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
              {portfolioData.profile.email}
            </a>
            <a 
              href={`https://${portfolioData.profile.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg md:text-2xl font-bold hover:underline"
            >
              <Linkedin className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
              LinkedIn Profile
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-white/5">
        <p className="text-space-slate text-[10px] md:text-sm font-mono">
          © {new Date().getFullYear()} {portfolioData.profile.name}. Powered by Google AI Studio, GitHub & Vercel.
        </p>
      </footer>

      {/* Expertise Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        expertise={activeExpertise} 
      />
    </div>
  );
}
