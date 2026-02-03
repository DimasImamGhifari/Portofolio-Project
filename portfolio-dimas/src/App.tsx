import { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const sections = [
  { id: 'hero', label: 'Identity' },
  { id: 'origin', label: 'Origin' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'journey', label: 'Journey' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'interest', label: 'Interest' },
  { id: 'contact', label: 'Contact' },
];

const experiences = [
  'Frontend Web Projects',
  'Backend Web Projects',
  'Academic Projects',
  'UI & Interaction Design',
];

const skills = [
  { name: 'HTML / CSS / JavaScript', level: 70 },
  { name: 'Flutter', level: 40 },
  { name: 'React / Vue', level: 75 },
  { name: 'UI Animation & Motion Design', level: 55 },
];

const projects = [
  {
    title: 'Inventaris Barang - Dinas Kominfo HSU',
    description: 'Inventory Management Website for Dinas Komunikasi Informatika dan Persandian Hulu Sungai Utara',
    tech: ['PHP', 'VUE', 'Laravel'],
    link: 'https://github.com/DimasImamGhifari11/Website-Inventaris-Barang',
  },
  {
    title: 'ShopZone – Group Project Mobile Shopping App',
    description: 'ShopZone is a simple mobile shopping application built with Flutter as a group project. It focuses on basic e-commerce features and a clean, user-friendly interface.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    link: 'https://github.com/aryakusuma1/ShopZone-project',
  },
  {
    title: 'Personal Portfolio Website',
    description: 'A personal portfolio website designed to present my projects, technical skills, and academic background in a clean and structured layout.',
    tech: ['React', 'TypeScript', 'CSS'],
    link: 'https://github.com/DimasImamGhifari11/Portofolio-Project',
  },
  {
    title: 'Pixelzone - Game Website Project',
    description: 'Pixel Zone is a game website created as an academic assignment to showcase and sell a game through an attractive and user-friendly interface.',
    tech: ['PHP', 'VUE', 'Laravel'],
    link: 'https://github.com/DimasImamGhifari11/Pixelzone-project',
  },
];

const interests = [
  { title: 'Web Development', icon: 'globe' },
  { title: 'Motorcycle', icon: 'motorcycle' },
  { title: 'Film', icon: 'film' },
  { title: 'Game', icon: 'gamepad' },
];

// Particle component
const Particle = ({ delay }: { delay: number }) => {
  const style = {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${delay}s`,
  };
  return <div className="particle" style={style} />;
};

// Icon component
const Icon = ({ name }: { name: string }) => {
  const icons: Record<string, JSX.Element> = {
    globe: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    motorcycle: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="17" r="3" />
        <circle cx="19" cy="17" r="3" />
        <path d="M5 14l4-7h4l3 3h3" />
        <path d="M9 7l-2 3" />
        <path d="M14 10l5 4" />
      </svg>
    ),
    film: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
    ),
    gamepad: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="12" x2="10" y2="12" />
        <line x1="8" y1="10" x2="8" y2="14" />
        <line x1="15" y1="13" x2="15.01" y2="13" />
        <line x1="18" y1="11" x2="18.01" y2="11" />
        <rect x="2" y="6" width="20" height="12" rx="2" />
      </svg>
    ),
  };
  return icons[name] || null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const scrollLineRef = useRef<SVGPathElement>(null);

  // Create particles
  const createParticles = useCallback(() => {
    if (!particlesRef.current) return;

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particlesRef.current.appendChild(particle);

      gsap.to(particle, {
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: Math.random() * 2,
      });

      gsap.to(particle, {
        y: `${(Math.random() - 0.5) * 100}`,
        x: `${(Math.random() - 0.5) * 50}`,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
    }
  }, []);

  // Create interactive particles for hero section
  const createInteractiveParticles = useCallback(() => {
    if (!heroRef.current) return;

    const heroContent = heroRef.current.querySelector('.hero-content');
    if (!heroContent) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'hero-particles';
    heroContent.appendChild(particleContainer);

    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'hero-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.width = `${Math.random() * 3 + 1}px`;
      particle.style.height = particle.style.width;
      particleContainer.appendChild(particle);

      // Random floating animation
      gsap.to(particle, {
        y: `+=${(Math.random() - 0.5) * 50}`,
        x: `+=${(Math.random() - 0.5) * 50}`,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2,
      });

      // Pulsing animation
      gsap.to(particle, {
        scale: Math.random() * 0.5 + 0.8,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2,
      });
    }
  }, []);

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    // Track scrolling activity
    lenis.on('scroll', () => {
      setIsScrolling(true);

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to mark as not scrolling after 150ms of inactivity
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Custom cursor with trail
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    const trailElements: HTMLDivElement[] = [];
    const trailCount = 5;

    // Create trail elements
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.opacity = `${0.3 - i * 0.05}`;
      trail.style.transform = `translate(-50%, -50%) scale(${1 - i * 0.15})`;
      document.body.appendChild(trail);
      trailElements.push(trail);
    }

    let mouseX = 0;
    let mouseY = 0;
    const trailPositions = trailElements.map(() => ({ x: 0, y: 0 }));

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.5,
        ease: 'power3.out',
      });

      gsap.to(cursorDot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
      });
    };

    // Animate trail
    const animateTrail = () => {
      trailPositions.forEach((pos, index) => {
        const target = index === 0 ? { x: mouseX, y: mouseY } : trailPositions[index - 1];
        pos.x += (target.x - pos.x) * (0.3 - index * 0.03);
        pos.y += (target.y - pos.y) * (0.3 - index * 0.03);
        trailElements[index].style.left = `${pos.x}px`;
        trailElements[index].style.top = `${pos.y}px`;
      });
      requestAnimationFrame(animateTrail);
    };

    animateTrail();

    const handleMouseEnter = () => cursor.classList.add('hover');
    const handleMouseLeave = () => cursor.classList.remove('hover');

    window.addEventListener('mousemove', moveCursor);

    const interactiveElements = document.querySelectorAll('a, button, .nav-dot, .experience-item, .interest-item, .contact-link');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      trailElements.forEach((el) => el.remove());
    };
  }, [isLoading]);

  // =============================================
  // LOADING ANIMATION — clipPath wipe exit
  // =============================================
  useEffect(() => {
    const loadingTl = gsap.timeline();

    const counter = { value: 0 };
    gsap.to(counter, {
      value: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        setLoadingProgress(Math.round(counter.value));
      },
    });

    gsap.set('.loading-screen', { clipPath: 'inset(0% 0% 0% 0%)' });

    loadingTl
      .fromTo('.loading-text',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4'
      )
      .to('.loading-bar', {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut',
      }, '-=0.5')
      .to('.loading-screen', {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 1.2,
        ease: 'power4.inOut',
        onComplete: () => {
          setIsLoading(false);
          createParticles();
          createInteractiveParticles();
        },
      }, '+=0.3')
      .set('.loading-screen', { display: 'none' });
  }, [createParticles]);

  // =============================================
  // MAIN ANIMATIONS — madewithgsap.com style
  // clipPath reveals, individual ScrollTriggers,
  // premium easing, one-by-one card reveals
  // =============================================
  useEffect(() => {
    if (isLoading) return;

    let glitchIntervalId: number | undefined;

    const ctx = gsap.context(() => {

      // --- Nav dots slide in ---
      gsap.fromTo('.nav-dots',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
      );

      // --- Progress bar ---
      gsap.to(progressRef.current, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });

      // =====================
      // HERO SECTION
      // =====================
      const heroTl = gsap.timeline({ delay: 0.3 });

      // Glitch animation function — dramatic chromatic split
      const glitchText = (element: Element) => {
        const tl = gsap.timeline();
        const text = element.textContent || '';
        element.setAttribute('data-text', text);

        tl.to(element, {
          duration: 0.03,
          opacity: 1,
          ease: 'power4.inOut',
          onStart: () => element.classList.add('glitch-active'),
        })
        .to(element, { duration: 0.05, x: -15, scaleX: 1.03, ease: 'power4.inOut' })
        .to(element, { duration: 0.04, x: 12, skewX: 20, ease: 'power4.inOut' })
        .to(element, { duration: 0.05, x: -10, skewX: -15, scaleX: 0.97, ease: 'power4.inOut' })
        .to(element, { duration: 0.03, x: 14, skewX: 12, ease: 'power4.inOut' })
        .to(element, { duration: 0.04, x: -8, skewX: -8, scaleX: 1.02, ease: 'power4.inOut' })
        .to(element, { duration: 0.03, x: 10, skewX: 6, ease: 'power4.inOut' })
        .to(element, { duration: 0.04, x: -5, skewX: -3, ease: 'power4.inOut' })
        .to(element, { duration: 0.03, x: 6, skewX: 2, ease: 'power4.inOut' })
        .to(element, {
          duration: 0.2,
          x: 0,
          skewX: 0,
          scaleX: 1,
          ease: 'elastic.out(1, 0.3)',
          onComplete: () => {
            setTimeout(() => element.classList.remove('glitch-active'), 500);
          },
        });

        return tl;
      };

      heroTl
        .fromTo('.hero-circle',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2, stagger: 0.2, ease: 'elastic.out(1, 0.6)' }
        )
        .fromTo('.hero-rotating-text',
          { opacity: 0, scale: 0.7, rotation: -20 },
          { opacity: 1, scale: 1, rotation: 0, duration: 1.5, ease: 'power3.out' }, '-=1.5'
        )
        .fromTo('.hero-name h1',
          { clipPath: 'inset(100% 0 0 0)', y: 80 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: 'power4.out' }, '-=1'
        )
        .add(() => {
          const nameElements = document.querySelectorAll('.hero-name h1');
          nameElements.forEach((el, index) => {
            setTimeout(() => glitchText(el), index * 150);
          });
        }, '-=0.3')
        .fromTo('.hero-subtitle p',
          { clipPath: 'inset(100% 0 0 0)', y: 40 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.7'
        )
        .fromTo('.hero-tagline span',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.02, ease: 'power2.out' }, '-=0.5'
        )
        .fromTo('.hero-scroll-hint',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.5'
        );

      // Hero parallax on scroll
      gsap.to('.hero-content', {
        yPercent: 50,
        opacity: 0,
        scale: 0.95,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to('.hero-circle', {
        scale: 1.5,
        opacity: 0,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Recurring subtle glitch on hero name
      glitchIntervalId = window.setInterval(() => {
        const nameEls = document.querySelectorAll('.hero-name h1');
        if (nameEls.length === 0) return;
        const randomIndex = Math.floor(Math.random() * nameEls.length);
        const el = nameEls[randomIndex];
        if (el) glitchText(el);
      }, 5000);

      // =====================
      // ORIGIN SECTION
      // =====================
      const originTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.origin',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      originTl
        .to('.origin-grid', { opacity: 1, duration: 1.5, ease: 'power2.out' })
        .fromTo('.origin-label span',
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'power3.inOut' }, '-=1'
        )
        .fromTo('.origin-place h2',
          { clipPath: 'inset(100% 0 0 0)', y: 100 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }, '-=0.4'
        )
        .fromTo('.origin-date h3',
          { clipPath: 'inset(100% 0 0 0)', y: 60 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, '-=0.6'
        )
        .fromTo('.origin-divider',
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.inOut' }, '-=0.4'
        )
        .fromTo('.origin-narrative p',
          { clipPath: 'inset(100% 0 0 0)', y: 30 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.3'
        );

      // =====================
      // ABOUT SECTION
      // =====================
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.about',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      aboutTl
        .fromTo('.section-label span',
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'power3.inOut' }
        )
        .fromTo('.about .section-title h2',
          { clipPath: 'inset(100% 0 0 0)', y: 80 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }, '-=0.4'
        )
        .fromTo('.about-text p',
          { clipPath: 'inset(100% 0 0 0)', y: 50 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5'
        )
        .fromTo('.about-description p',
          { clipPath: 'inset(100% 0 0 0)', y: 30 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3'
        );

      // =====================
      // EDUCATION SECTION
      // =====================
      gsap.to('.education-path-fill-left', {
        height: '100%',
        scrollTrigger: {
          trigger: '.education',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.education-path-fill-right', {
        height: '100%',
        scrollTrigger: {
          trigger: '.education',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.fromTo('.education-dot',
        { opacity: 0, scale: 0 },
        {
          opacity: 1, scale: 1, stagger: 0.2, duration: 0.6, ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.education',
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const educationTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.education',
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      });

      educationTl
        .fromTo('.education .section-title h2',
          { clipPath: 'inset(100% 0 0 0)', y: 80 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
        )
        .fromTo('.education-main h3',
          { clipPath: 'inset(100% 0 0 0)', y: 60, scale: 0.95 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.5'
        )
        .fromTo('.education-main h4',
          { clipPath: 'inset(100% 0 0 0)', y: 40 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4'
        )
        .fromTo('.education-sub p',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3'
        )
        .fromTo('.education-narrative p',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3'
        );

      // =====================
      // JOURNEY SECTION
      // =====================
      gsap.to('.journey-glow', {
        opacity: 1,
        scale: 1.2,
        scrollTrigger: {
          trigger: '.journey',
          start: 'top center',
          end: 'bottom center',
          scrub: 1.5,
        },
      });

      gsap.to('.journey-ring', {
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        rotation: 360,
        scrollTrigger: {
          trigger: '.journey',
          start: 'top center',
          end: 'bottom center',
          scrub: 1.5,
        },
      });

      const journeyTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.journey',
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      });

      journeyTl
        .fromTo('.journey .section-title h2',
          { clipPath: 'inset(100% 0 0 0)', y: 80 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
        )
        .fromTo('.journey-label span',
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'power3.inOut' }, '-=0.5'
        )
        .fromTo('.journey-timeline-line',
          { scaleY: 0 },
          { scaleY: 1, duration: 1.2, ease: 'power2.out' }, '-=0.3'
        )
        .fromTo('.journey-step',
          { clipPath: 'inset(0 100% 0 0)', x: -30, opacity: 0 },
          { clipPath: 'inset(0 0% 0 0)', x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.5'
        )
        .fromTo('.journey-narrative p',
          { clipPath: 'inset(100% 0 0 0)', y: 30 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3'
        );

      // =====================
      // EXPERIENCE SECTION
      // =====================
      gsap.fromTo('.experience .section-title h2',
        { clipPath: 'inset(100% 0 0 0)', y: 80 },
        {
          clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 1.2, ease: 'power4.out',
          scrollTrigger: {
            trigger: '.experience',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      document.querySelectorAll('.experience-item').forEach((item, index) => {
        gsap.fromTo(item,
          { clipPath: 'inset(0 100% 0 0)', x: -60, opacity: 0 },
          {
            clipPath: 'inset(0 0% 0 0)', x: 0, opacity: 1,
            duration: 1, ease: 'power3.out',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      gsap.fromTo('.experience-narrative p',
        { clipPath: 'inset(100% 0 0 0)', y: 30 },
        {
          clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1,
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.experience-narrative',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // =====================
      // STACK SECTION
      // =====================
      gsap.fromTo('.stack .section-title h2',
        { clipPath: 'inset(100% 0 0 0)', y: 80 },
        {
          clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1,
          duration: 1.2, ease: 'power4.out',
          scrollTrigger: {
            trigger: '.stack',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      document.querySelectorAll('.stack-item').forEach((item, index) => {
        gsap.fromTo(item,
          { clipPath: 'inset(100% 0 0 0)', y: 50, opacity: 0 },
          {
            clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1,
            duration: 0.8, ease: 'power3.out',
            delay: index * 0.08,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      document.querySelectorAll('.stack-bar-fill').forEach((bar, index) => {
        gsap.to(bar, {
          width: `${skills[index].level}%`,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // =====================
      // PROJECTS SECTION — one-by-one card reveal
      // =====================
      gsap.fromTo('.projects .section-title h2',
        { clipPath: 'inset(100% 0 0 0)', y: 80 },
        {
          clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1,
          duration: 1.2, ease: 'power4.out',
          scrollTrigger: {
            trigger: '.projects',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Each project card appears individually as you scroll
      document.querySelectorAll('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
          {
            clipPath: 'inset(100% 0 0 0)',
            y: 100,
            opacity: 0,
          },
          {
            clipPath: 'inset(0% 0 0 0)',
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // =====================
      // INTEREST SECTION
      // =====================
      gsap.fromTo('.interest .section-title h2',
        { clipPath: 'inset(100% 0 0 0)', y: 80 },
        {
          clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1,
          duration: 1.2, ease: 'power4.out',
          scrollTrigger: {
            trigger: '.interest',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      document.querySelectorAll('.interest-item').forEach((item, index) => {
        gsap.fromTo(item,
          { clipPath: 'inset(100% 0 0 0)', y: 60, rotateX: -15, opacity: 0 },
          {
            clipPath: 'inset(0% 0 0 0)', y: 0, rotateX: 0, opacity: 1,
            duration: 1, ease: 'power3.out',
            delay: index * 0.12,
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      gsap.fromTo('.interest-narrative p',
        { clipPath: 'inset(100% 0 0 0)', y: 30 },
        {
          clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1,
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.interest-narrative',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // =====================
      // CONTACT SECTION
      // =====================
      gsap.to('.contact-glow', {
        opacity: 1,
        scale: 1.5,
        scrollTrigger: {
          trigger: '.contact',
          start: 'top center',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });

      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact',
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      });

      contactTl
        .fromTo('.contact-main h2',
          { clipPath: 'inset(100% 0 0 0)', y: 100 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 1.4, ease: 'power4.out' }
        )
        .fromTo('.contact-sub p',
          { clipPath: 'inset(100% 0 0 0)', y: 40 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6'
        )
        .fromTo('.contact-link',
          { clipPath: 'inset(100% 0 0 0)', y: 30, opacity: 0 },
          { clipPath: 'inset(0% 0 0 0)', y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.4'
        );

      // =====================
      // SCROLL GUIDE LINE — draw on scroll
      // =====================
      if (scrollLineRef.current) {
        const lineLength = scrollLineRef.current.getTotalLength();

        gsap.set('.scroll-line-glow', {
          strokeDasharray: lineLength,
          strokeDashoffset: lineLength,
          opacity: 0.12,
        });
        gsap.set('.scroll-line-path', {
          strokeDasharray: lineLength,
          strokeDashoffset: lineLength,
          opacity: 0.25,
        });

        gsap.to('.scroll-line-path, .scroll-line-glow', {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: mainRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        });
      }

      // Navigation dots — active section tracking
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: `#${section.id}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(index),
          onEnterBack: () => setActiveSection(index),
        });
      });

    }, mainRef);

    // Mouse move parallax effect for hero section
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

      const heroCircles = heroRef.current.querySelectorAll('.parallax-element');
      heroCircles.forEach((el, index) => {
        const speed = (index + 1) * 0.05;
        (el as HTMLElement).style.transform = `translate(-50%, -50%) translate(${xAxis * speed}px, ${yAxis * speed}px) translateZ(${index * -50}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // =====================================================
    // CINEMATIC SCROLL-DRIVEN MOTION SYSTEM
    // Single master timeline — 100% scroll-controlled
    // Scroll stops → all freeze. Scroll up → perfect reverse.
    // Heavy, cinematic, smooth parallax depth illusion.
    // =====================================================

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.8, // heavy, cinematic scrub
      }
    });

    // --- Layer 1: Far backdrop orbs — slowest, heaviest drift ---
    masterTl.to('.geo-1',  { x: 120,  y: -350, scale: 1.25, ease: "none" }, 0);
    masterTl.to('.geo-2',  { x: -180, y: 280,  scale: 0.8,  ease: "none" }, 0);
    masterTl.to('.geo-3',  { x: 160,  y: -280, scale: 1.2,  ease: "none" }, 0);
    masterTl.to('.geo-4',  { x: -100, y: -400, scale: 0.75, ease: "none" }, 0);

    // --- Layer 2: Mid shapes — moderate drift + rotation ---
    masterTl.to('.geo-5',  { x: 220,  y: -200, rotation: 120,  scale: 1.15, ease: "none" }, 0);
    masterTl.to('.geo-6',  { x: -140, y: -420, scale: 1.1,  ease: "none" }, 0);
    masterTl.to('.geo-7',  { x: 180,  y: -300, rotation: -90,  scale: 0.85, ease: "none" }, 0);
    masterTl.to('.geo-8',  { x: -200, y: -260, scale: 1.2,  ease: "none" }, 0);
    masterTl.to('.geo-9',  { x: 140,  y: -350, rotation: 150,  scale: 0.9,  ease: "none" }, 0);
    masterTl.to('.geo-10', { x: -110, y: -240, rotation: -60,  scale: 1.12, ease: "none" }, 0);

    // --- Layer 3: Near shapes — faster drift, more rotation ---
    masterTl.to('.geo-11', { x: -280, y: -500, rotation: 210,  scale: 1.15, ease: "none" }, 0);
    masterTl.to('.geo-12', { x: 320,  y: -420, rotation: -120, scale: 0.85, ease: "none" }, 0);
    masterTl.to('.geo-13', { x: -160, y: -580, scale: 1.1,  ease: "none" }, 0);
    masterTl.to('.geo-14', { x: 260,  y: -460, rotation: 80,   scale: 0.9,  ease: "none" }, 0);
    masterTl.to('.geo-15', { x: -220, y: -380, rotation: -150, scale: 1.15, ease: "none" }, 0);
    masterTl.to('.geo-16', { x: 190,  y: -520, rotation: 180,  scale: 0.82, ease: "none" }, 0);
    masterTl.to('.geo-17', { x: -150, y: -440, rotation: -45,  scale: 1.18, ease: "none" }, 0);
    masterTl.to('.geo-18', { x: 110,  y: -320, scale: 0.88, ease: "none" }, 0);

    // --- Layer 4: Foreground accents — fastest parallax ---
    masterTl.to('.geo-19', { x: -400, y: -680, rotation: 360,  ease: "none" }, 0);
    masterTl.to('.geo-20', { x: 480,  y: -600, rotation: -240, ease: "none" }, 0);
    masterTl.to('.geo-21', { x: -350, y: -750, rotation: 300,  ease: "none" }, 0);
    masterTl.to('.geo-22', { x: 300,  y: -640, rotation: -360, ease: "none" }, 0);
    masterTl.to('.geo-23', { x: -420, y: -560, rotation: 210,  ease: "none" }, 0);
    masterTl.to('.geo-24', { x: 360,  y: -700, ease: "none" }, 0);
    masterTl.to('.geo-25', { x: -260, y: -620, rotation: -120, ease: "none" }, 0);

    // --- Rings — slow majestic rotation + gentle drift ---
    masterTl.to('.geo-26', { x: -100, y: -300, rotation: 220,  scale: 1.2,  ease: "none" }, 0);
    masterTl.to('.geo-27', { x: 130,  y: -380, rotation: -160, scale: 0.85, ease: "none" }, 0);
    masterTl.to('.geo-28', { x: -160, y: -280, rotation: 130,  scale: 1.15, ease: "none" }, 0);
    masterTl.to('.geo-29', { x: 80,   y: -220, rotation: -80,  scale: 0.8,  ease: "none" }, 0);
    masterTl.to('.geo-30', { x: -120, y: -340, rotation: 180,  scale: 1.1,  ease: "none" }, 0);

    // --- Extra scattered accents — diagonal cinematic drift ---
    masterTl.to('.geo-31', { x: -320, y: -480, rotation: 120,  scale: 1.15, ease: "none" }, 0);
    masterTl.to('.geo-32', { x: 250,  y: -540, rotation: -80,  scale: 0.9,  ease: "none" }, 0);
    masterTl.to('.geo-33', { x: -280, y: -420, rotation: 60,   ease: "none" }, 0);
    masterTl.to('.geo-34', { x: 210,  y: -620, ease: "none" }, 0);
    masterTl.to('.geo-35', { x: -180, y: -500, rotation: -110, scale: 1.12, ease: "none" }, 0);

    // --- Line accents — slow horizontal + vertical drift ---
    masterTl.to('.geo-line-1', { x: 300,  y: -150, rotation: 5,   ease: "none" }, 0);
    masterTl.to('.geo-line-2', { x: -250, y: -200, rotation: -3,  ease: "none" }, 0);
    masterTl.to('.geo-line-3', { x: 180,  y: -350, rotation: 8,   ease: "none" }, 0);
    masterTl.to('.geo-line-4', { x: -200, y: -100, rotation: -6,  ease: "none" }, 0);
    masterTl.to('.geo-line-5', { x: 150,  y: -280, rotation: 4,   ease: "none" }, 0);

    return () => {
      ctx.revert();
      masterTl.kill();
      if (glitchIntervalId) clearInterval(glitchIntervalId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isLoading]);

  // Scroll state class toggling (separate from animations)
  useEffect(() => {
    if (isScrolling) {
      document.body.classList.add('scrolling');
      document.body.classList.remove('not-scrolling');
    } else {
      document.body.classList.add('not-scrolling');
      document.body.classList.remove('scrolling');
    }
  }, [isScrolling]);


  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { duration: 1.5 });
    }
  };

  return (
    <>
      {/* Loading Screen */}
      <div className="loading-screen">
        <div className="loading-counter">{loadingProgress}%</div>
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
        <span className="loading-text">Loading Experience</span>
      </div>

      {/* Abstract Circular Animations */}
      <div className="abstract-circles">
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
      </div>

      {/* ============================================
          Scroll-Driven Geometric Motion Background
          35 decorative elements across 4 depth layers
          ============================================ */}
      <div className="geometric-motion-bg">
        {/* Layer 1: Far — large blurred orbs (depth backdrop) */}
        <div className="geo-el geo-orb geo-purple geo-far geo-2xl geo-1"></div>
        <div className="geo-el geo-orb geo-blue   geo-far geo-xl  geo-2"></div>
        <div className="geo-el geo-orb geo-cyan   geo-far geo-2xl geo-3"></div>
        <div className="geo-el geo-orb geo-pink   geo-far geo-xl  geo-4"></div>

        {/* Layer 2: Mid — medium shapes */}
        <div className="geo-el geo-box geo-grad-pb geo-mid geo-lg geo-5"></div>
        <div className="geo-el geo-orb geo-purple  geo-mid geo-lg geo-6"></div>
        <div className="geo-el geo-tri geo-grad-cp geo-mid geo-lg geo-7"></div>
        <div className="geo-el geo-orb geo-blue    geo-mid geo-md geo-8"></div>
        <div className="geo-el geo-box geo-grad-cp geo-mid geo-md geo-9"></div>
        <div className="geo-el geo-diamond geo-grad-pb geo-mid geo-lg geo-10"></div>

        {/* Layer 3: Near — smaller geometric shapes */}
        <div className="geo-el geo-tri     geo-grad-pb  geo-near geo-md geo-11"></div>
        <div className="geo-el geo-box     geo-solid-w  geo-near geo-sm geo-12"></div>
        <div className="geo-el geo-orb     geo-cyan     geo-near geo-md geo-13"></div>
        <div className="geo-el geo-hex     geo-grad-cp  geo-near geo-md geo-14"></div>
        <div className="geo-el geo-diamond geo-solid-w  geo-near geo-sm geo-15"></div>
        <div className="geo-el geo-tri     geo-grad-cp  geo-near geo-sm geo-16"></div>
        <div className="geo-el geo-box     geo-grad-pb  geo-near geo-md geo-17"></div>
        <div className="geo-el geo-orb     geo-gray     geo-near geo-sm geo-18"></div>

        {/* Layer 4: Foreground — tiny sharp accents */}
        <div className="geo-el geo-orb     geo-white geo-fg geo-xs geo-19"></div>
        <div className="geo-el geo-box     geo-solid-w geo-fg geo-xs geo-20"></div>
        <div className="geo-el geo-tri     geo-solid-w geo-fg geo-xs geo-21"></div>
        <div className="geo-el geo-cross   geo-solid-w geo-fg geo-xs geo-22"></div>
        <div className="geo-el geo-diamond geo-white   geo-fg geo-xs geo-23"></div>
        <div className="geo-el geo-orb     geo-gray    geo-fg geo-sm geo-24"></div>
        <div className="geo-el geo-hex     geo-solid-w geo-fg geo-xs geo-25"></div>

        {/* Rings — outlined circles for subtle depth */}
        <div className="geo-el geo-ring geo-ring-w geo-mid geo-xl  geo-26"></div>
        <div className="geo-el geo-ring geo-ring-p geo-near geo-lg geo-27"></div>
        <div className="geo-el geo-ring geo-ring-c geo-mid geo-md  geo-28"></div>
        <div className="geo-el geo-ring geo-ring-w geo-far geo-2xl geo-29"></div>
        <div className="geo-el geo-ring geo-ring-p geo-near geo-md geo-30"></div>

        {/* Extra scattered accents */}
        <div className="geo-el geo-orb  geo-cyan    geo-mid  geo-sm geo-31"></div>
        <div className="geo-el geo-tri  geo-grad-pb geo-near geo-sm geo-32"></div>
        <div className="geo-el geo-box  geo-grad-cp geo-fg   geo-xs geo-33"></div>
        <div className="geo-el geo-orb  geo-white   geo-fg   geo-xs geo-34"></div>
        <div className="geo-el geo-hex  geo-grad-pb geo-mid  geo-md geo-35"></div>

        {/* Line accents — thin futuristic UI lines */}
        <div className="geo-el geo-line geo-line-h geo-line-w geo-mid geo-line-1"></div>
        <div className="geo-el geo-line geo-line-v geo-line-p geo-near geo-line-2"></div>
        <div className="geo-el geo-line geo-line-d geo-line-c geo-fg geo-line-3"></div>
        <div className="geo-el geo-line geo-line-h geo-line-p geo-far geo-line-4"></div>
        <div className="geo-el geo-line geo-line-v geo-line-w geo-mid geo-line-5"></div>
      </div>

      <div className="particles" ref={particlesRef}></div>
      <div className="noise"></div>

      {/* Cursor */}
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-dot" ref={cursorDotRef}></div>

      {/* Progress bar */}
      <div className="progress-bar" ref={progressRef}></div>

      {/* Navigation */}
      <nav className="nav-dots">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`nav-dot ${activeSection === index ? 'active' : ''}`}
            data-label={section.label}
            onClick={() => scrollToSection(section.id)}
            aria-label={`Navigate to ${section.label}`}
          />
        ))}
      </nav>

      {/* Main content */}
      <main className="main-container" ref={mainRef}>

        {/* Scroll Guide Line */}
        <svg className="scroll-line-svg" viewBox="0 0 200 3000" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e88bcd" />
              <stop offset="50%" stopColor="#f0a8d8" />
              <stop offset="100%" stopColor="#e88bcd" />
            </linearGradient>
          </defs>
          <path
            className="scroll-line-glow"
            d="M 10,250 C 55,450 15,650 50,850 C 90,1050 40,1250 90,1450 C 140,1650 85,1850 135,2050 C 180,2250 145,2450 190,2650 C 198,2780 200,2900 195,3000"
            stroke="url(#lineGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            opacity="0"
          />
          <path
            ref={scrollLineRef}
            className="scroll-line-path"
            d="M 10,250 C 55,450 15,650 50,850 C 90,1050 40,1250 90,1450 C 140,1650 85,1850 135,2050 C 180,2250 145,2450 190,2650 C 198,2780 200,2900 195,3000"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0"
          />
        </svg>

        {/* HERO */}
        <section className="hero" id="hero">
          <div className="hero-bg">
            <div className="hero-layer">
              <div className="parallax-element hero-circle hero-circle-1" style={{ transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }}></div>
              <div className="parallax-element hero-circle hero-circle-2" style={{ transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }}></div>
              <div className="parallax-element hero-circle hero-circle-3" style={{ transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }}></div>
              <div className="parallax-element hero-rotating-text" style={{ opacity: 0 }}>
                <svg viewBox="0 0 500 500">
                  <defs>
                    <path id="textPath" d="M250,250 m-200,0 a200,200 0 1,1 400,0 a200,200 0 1,1 -400,0" fill="none" />
                  </defs>
                  <text>
                    <textPath href="#textPath">
                      INFORMATICS ENGINEERING STUDENT • FRONTEND DEVELOPER • FIGMA DESIGN • UI/UX DESIGNER •
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>

          <div className="hero-content">
            <div className="hero-name">
              <h1 className="gradient-text interactive-text">Dimas</h1>
              <h1 className="gradient-text interactive-text">Imam</h1>
              <h1 className="gradient-text interactive-text">Ghifari</h1>
            </div>
            <div className="hero-subtitle">
              <p className="interactive-text">informatics engineering students</p>
            </div>
            <div className="hero-tagline">
              <span className="interactive-text">Not graduated yet, but already fighting bugs.</span>
            </div>
            <div className="hero-cta">
              <button className="hero-button gradient-border">
                <span>Explore My Work</span>
              </button>
            </div>
          </div>

          <div className="hero-scroll-hint">
            <div className="line"></div>
          </div>
        </section>

        {/* ORIGIN */}
        <section className="origin" id="origin">
          <div className="origin-bg">
            <div className="origin-grid"></div>
          </div>
          <div className="origin-content">
            <div className="origin-label">
              <span>Where It All Began</span>
            </div>
            <div className="origin-place">
              <h2>Born in Amuntai</h2>
            </div>
            <div className="origin-date">
              <h3>11 June 2004</h3>
            </div>
            <div className="origin-divider"></div>
            <div className="origin-narrative">
              <p>A starting point of a journey shaped by curiosity and creativity.</p>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="about" id="about">
          <div className="about-marquee">
            <div className="about-marquee-inner">
              <span>ABOUT</span>
              <span>ABOUT</span>
              <span>ABOUT</span>
              <span>ABOUT</span>
            </div>
          </div>
          <div className="about-content">
            <div className="section-label">
              <span>Who I Am</span>
            </div>
            <div className="section-title">
              <h2 className="gradient-text">About</h2>
            </div>
            <div className="about-text">
              <p>An Informatics student passionate about web development, powered by coffee.
                Currently improving frontend and backend skills with Laravel and Vue through real projects, debugging sessions, and continuous learning.</p>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="education" id="education">
          <div className="education-bg">
            <div className="education-path-left">
              <div className="education-path-bg"></div>
              <div className="education-path-fill education-path-fill-left"></div>
            </div>
            <div className="education-path-right">
              <div className="education-path-bg"></div>
              <div className="education-path-fill education-path-fill-right"></div>
            </div>
            <div className="education-dot education-dot-left education-dot-1"></div>
            <div className="education-dot education-dot-right education-dot-2"></div>
            <div className="education-dot education-dot-left education-dot-3"></div>
            <div className="education-floating education-floating-1"></div>
            <div className="education-floating education-floating-2"></div>
          </div>
          <div className="education-content">
            <div className="section-title">
              <h2 className="gradient-text">Education</h2>
            </div>
            <div className="education-main">
              <h3>Informatics Engineering'22</h3>
              <h4>Undergraduate Student at Universitas Muhammadiyah Malang</h4>
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section className="journey" id="journey">
          <div className="journey-bg">
            <div className="journey-glow animated-gradient"></div>
            <div className="journey-rings">
              <div className="journey-ring journey-ring-1"></div>
              <div className="journey-ring journey-ring-2"></div>
              <div className="journey-ring journey-ring-3"></div>
            </div>
          </div>
          <div className="journey-content">
            <div className="section-title">
              <h2 className="gradient-text">Journey</h2>
            </div>
            <div className="journey-label">
              <span>Where It All Started</span>
            </div>
            <div className="journey-timeline">
              <div className="journey-timeline-line"></div>
              <div className="journey-step">
                <div className="journey-step-dot"></div>
                <div className="journey-step-content">
                  <span className="journey-step-stage">Kindergarten</span>
                  <h4>TKIT Nurul Ilmi</h4>
                </div>
              </div>
              <div className="journey-step">
                <div className="journey-step-dot"></div>
                <div className="journey-step-content">
                  <span className="journey-step-stage">Elementary School</span>
                  <h4>SDIT Ihsanul Amal</h4>
                </div>
              </div>
              <div className="journey-step">
                <div className="journey-step-dot"></div>
                <div className="journey-step-content">
                  <span className="journey-step-stage">Junior High School</span>
                  <h4>SMPIT Ihsanul Amal</h4>
                </div>
              </div>
              <div className="journey-step">
                <div className="journey-step-dot"></div>
                <div className="journey-step-content">
                  <span className="journey-step-stage">Senior High School</span>
                  <h4>MAN 2 HSU</h4>
                </div>
              </div>
            </div>
            <div className="journey-narrative">
              <p>Every chapter shaped the path toward technology and creativity.</p>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="experience" id="experience">
          <div className="experience-content">
            <div className="section-title">
              <h2 className="gradient-text">Experience</h2>
            </div>
            <ul className="experience-list">
              {experiences.map((exp, index) => (
                <li key={index} className="experience-item">
                  <div className="experience-item-inner">
                    <h4>{exp}</h4>
                    <div className="experience-item-number">0{index + 1}</div>
                    <div className="experience-item-arrow"></div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="experience-narrative">
              <p>Translating ideas into functional, interactive, and meaningful interfaces.</p>
            </div>
          </div>
        </section>

        {/* STACK */}
        <section className="stack" id="stack">
          <div className="stack-content">
            <div className="section-title">
              <h2 className="gradient-text">Stack</h2>
            </div>
            <ul className="stack-list">
              {skills.map((skill, index) => (
                <li key={index} className="stack-item">
                  <div className="stack-item-header">
                    <h4>{skill.name}</h4>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="stack-bar">
                    <div className="stack-bar-fill"></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="projects" id="projects">
          <div className="projects-content">
            <div className="section-title">
              <h2 className="gradient-text">Projects</h2>
            </div>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <a
                  key={index}
                  href={project.link}
                  className="project-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="project-card-number">0{index + 1}</div>
                  <div className="project-card-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-card-tech">
                      {project.tech.map((t, i) => (
                        <span key={i}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="project-card-arrow">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* INTEREST - CONTENT PART */}
        <section className="interest" id="interest">
          <div className="interest-content">
            <div className="section-title">
              <h2 className="gradient-text">Interest</h2>
            </div>
            <ul className="interest-list">
              {interests.map((interest, index) => (
                <li key={index} className="interest-item">
                  <div className="interest-item-icon">
                    <Icon name={interest.icon} />
                  </div>
                  <h4>{interest.title}</h4>
                </li>
              ))}
            </ul>
            <div className="interest-narrative">
              <p>I am interested in web development, where I enjoy building functional and responsive websites. I also have a strong interest in UI design, focusing on creating clean and user-friendly interfaces.
Outside of coding, I enjoy exploring games and motorcycles, which inspire my creativity, problem-solving skills, and attention to detail.</p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact" id="contact">
          <div className="contact-bg">
            <div className="contact-glow animated-gradient"></div>
            <div className="contact-lines">
              <div className="contact-line contact-line-h contact-line-h-1"></div>
              <div className="contact-line contact-line-h contact-line-h-2"></div>
              <div className="contact-line contact-line-v contact-line-v-1"></div>
              <div className="contact-line contact-line-v contact-line-v-2"></div>
            </div>
          </div>
          <div className="contact-content">
            <div className="contact-main">
              <h2 className="gradient-text">Let's create something immersive.</h2>
            </div>
            <div className="contact-sub">
              <p>Get in touch</p>
            </div>
            <div className="contact-links">
              <a href="mailto:imamghifaridimas@gmail.com" className="contact-link">Email</a>
              <a href="https://github.com/DimasImamGhifari11" target="_blank" rel="noopener noreferrer" className="contact-link">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>
              <a href="https://instagram.com/dimasghfri" target="_blank" rel="noopener noreferrer" className="contact-link">Instagram</a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>&copy; 2026 Dimas Imam Ghifari. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}

export default App;
