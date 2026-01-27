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
  { id: 'interest-bg', label: 'Creative' },
  { id: 'interest', label: 'Interest' },
  { id: 'contact', label: 'Contact' },
];

const experiences = [
  'Frontend Web Projects',
  'Academic Projects',
  'Internship & Practical Development',
  'UI & Interaction Design',
];

const skills = [
  { name: 'HTML / CSS / JavaScript', level: 90 },
  { name: 'GSAP & ScrollTrigger', level: 85 },
  { name: 'React / Vue', level: 80 },
  { name: 'UI Animation & Motion Design', level: 85 },
];

const interests = [
  { title: 'UI/UX Design', icon: 'globe' },
  { title: 'Motorcycle', icon: 'scroll' },
  { title: 'Film Inspired Interfaces', icon: 'film' },
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
    scroll: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
        <path d="M19 3H9a2 2 0 0 0-2 2v14" />
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

  // Loading animation
  useEffect(() => {
    const loadingTl = gsap.timeline();

    // Animate loading counter
    const counter = { value: 0 };
    gsap.to(counter, {
      value: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        setLoadingProgress(Math.round(counter.value));
      },
    });

    loadingTl
      .to('.loading-logo span', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.out',
      })
      .to('.loading-text', {
        opacity: 1,
        duration: 0.5,
      }, '-=0.3')
      .to('.loading-bar', {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut',
      }, '-=0.5')
      .to('.loading-screen', {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
        onComplete: () => {
          setIsLoading(false);
          createParticles();
          createInteractiveParticles();
        },
      }, '+=0.3')
      .set('.loading-screen', { display: 'none' });
  }, [createParticles]);

  // Main animations
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Show nav dots
      gsap.to('.nav-dots', {
        opacity: 1,
        duration: 1,
        delay: 0.5,
      });

      // Progress bar
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
      const heroTl = gsap.timeline({ delay: 0.2 });

      // Animate circles
      heroTl
        .to('.hero-circle', {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power4.out',
        })
        .to('.hero-rotating-text', {
          opacity: 1,
          duration: 1,
        }, '-=1')
        .to('.hero-name h1', {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
        }, '-=0.8')
        .to('.hero-subtitle p', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.5')
        .to('.hero-tagline span', {
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: 'power2.out',
        }, '-=0.3')
        .to('.hero-scroll-hint', {
          opacity: 1,
          duration: 1,
        }, '-=0.3');

      // Hero parallax
      gsap.to('.hero-content', {
        yPercent: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.hero-circle', {
        scale: 1.5,
        opacity: 0,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // =====================
      // ORIGIN SECTION
      // =====================
      const originTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.origin',
          start: 'top 70%',
          end: 'center center',
          scrub: 1,
        },
      });

      originTl
        .to('.origin-grid', {
          opacity: 1,
          duration: 1,
        })
        .to('.origin-label span', {
          opacity: 1,
          duration: 0.5,
        }, '-=0.5')
        .to('.origin-place h2', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
        }, '-=0.3')
        .to('.origin-date h3', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
        }, '-=0.5')
        .to('.origin-divider', {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.3')
        .to('.origin-narrative p', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.3');

      // =====================
      // ABOUT SECTION
      // =====================
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.about',
          start: 'top 70%',
          end: 'center center',
          scrub: 1,
        },
      });

      aboutTl
        .to('.section-label span', {
          opacity: 1,
          duration: 0.5,
        })
        .to('.about .section-title h2', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
        }, '-=0.3')
        .to('.about-text p', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.5')
        .to('.about-description p', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.3');

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

      gsap.to('.education-dot', {
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.education',
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      const educationTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.education',
          start: 'top 60%',
          end: 'center center',
          scrub: 1,
        },
      });

      educationTl
        .to('.education .section-title h2', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
        })
        .to('.education-main h3', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.5')
        .to('.education-sub p', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.3')
        .to('.education-narrative p', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.3');

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
          scrub: 1,
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
          scrub: 1,
        },
      });

      const journeyTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.journey',
          start: 'top 60%',
          end: 'center center',
          scrub: 1,
        },
      });

      journeyTl
        .to('.journey .section-title h2', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
        })
        .to('.journey-age h3', {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power4.out',
        }, '-=0.5')
        .to('.journey-label span', {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.8')
        .to('.journey-narrative p', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.3');

      // =====================
      // EXPERIENCE SECTION
      // =====================
      gsap.to('.experience .section-title h2', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.experience',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to('.experience-item', {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.experience-list',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to('.experience-narrative p', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.experience-narrative',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // =====================
      // STACK SECTION
      // =====================
      gsap.to('.stack .section-title h2', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.stack',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to('.stack-item', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stack-list',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      document.querySelectorAll('.stack-bar-fill').forEach((bar, index) => {
        gsap.to(bar, {
          width: `${skills[index].level}%`,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // =====================
      // INTEREST SECTION
      // =====================
      gsap.to('.interest .section-title h2', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.interest',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to('.interest-item', {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.interest-list',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to('.interest-narrative p', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.interest-narrative',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate the background text to slide in
      gsap.to('.interest-bg-text.top', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.interest-bg-text-section',
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to('.interest-bg-text.bottom', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.interest-bg-text-section',
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      });

      // Create rotating orb animation
      const tl = gsap.timeline({
        scrollTrigger: {
          scrub: 1,
          trigger: '.interest-bg-text-section',
          start: 'top center',
          end: 'bottom center',
        },
      });

      tl.to('#rotating-orb', {
        rotation: 1080, // 3 full rotations (360 * 3)
        ease: 'none',
      });

      // Parallax text for interest section
      gsap.to('.interest-bg-text.top', {
        xPercent: 20,
        scrollTrigger: {
          trigger: '.interest',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.interest-bg-text.bottom', {
        xPercent: -20,
        scrollTrigger: {
          trigger: '.interest',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });


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
          scrub: 1,
        },
      });

      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact',
          start: 'top 60%',
          end: 'center center',
          scrub: 1,
        },
      });

      contactTl
        .to('.contact-main h2', {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
        })
        .to('.contact-sub p', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.5')
        .to('.contact-link', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }, '-=0.3');

      // Navigation dots
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

    // Update abstract circle animations based on scroll state
    if (isScrolling) {
      document.body.classList.add('scrolling');
      document.body.classList.remove('not-scrolling');
    } else {
      document.body.classList.add('not-scrolling');
      document.body.classList.remove('scrolling');
    }

    // Add parallax effect to existing floating orbs
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.02; // Different speed for each orb

      // Create scroll trigger for parallax effect
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // Smooth scrubbing
        onUpdate: (self) => {
          // Calculate offset based on scroll progress and speed
          const offset = self.progress * 100 * speed;
          gsap.set(orb, {
            y: `-=${offset * 0.5}`, // Move opposite direction of scroll
            x: `+=${offset * 0.2}`, // Small horizontal movement
          });
        }
      });
    });
  }, [isLoading, isScrolling]);

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
        <div className="loading-logo">
          {'DIMAS'.split('').map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </div>
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

      {/* Background Effects */}
      <div className="floating-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
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
                      FRONTEND DEVELOPER • INTERACTIVE WEB • MOTION DESIGN • CREATIVE CODE •
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
              <p className="interactive-text">Frontend Developer & Interactive Web Enthusiast</p>
            </div>
            <div className="hero-tagline">
              <span className="interactive-text">Building immersive digital experiences through motion and code.</span>
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
              <p>A student and developer who enjoys turning ideas into interactive web experiences.</p>
            </div>
            <div className="about-description">
              <p>Passionate about frontend development, animations, and clean user interfaces.</p>
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
              <h3>Informatics Engineering</h3>
            </div>
            <div className="education-sub">
              <p>Undergraduate Student</p>
            </div>
            <div className="education-narrative">
              <p>Learning how logic, systems, and design come together in software development.</p>
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
            <div className="journey-age">
              <h3>20s</h3>
            </div>
            <div className="journey-label">
              <span>Early Twenties</span>
            </div>
            <div className="journey-narrative">
              <p>A phase of exploration, experimentation, and continuous learning.</p>
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

        {/* INTEREST - BACKGROUND TEXT PART */}
        <section className="interest-bg-text-section" id="interest-bg">
          <div className="interest-bg">
            <div className="interest-bg-text top gradient-text">Creative</div>
            <div className="interest-bg-text bottom gradient-text">Passion</div>
          </div>
          <div className="rotating-elements-container">
            <div className="rotating-orb rotating-orb-1" id="rotating-orb-1"></div>
            <div className="rotating-orb rotating-orb-2" id="rotating-orb-2"></div>
            <div className="rotating-orb rotating-orb-3" id="rotating-orb-3"></div>
            <div className="rotating-orb rotating-orb-4" id="rotating-orb-4"></div>
            <div className="rotating-orb rotating-orb-5" id="rotating-orb-5"></div>
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
              <p>Inspired by immersive worlds, games, and cinematic experiences.</p>
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
              <a href="mailto:hello@example.com" className="contact-link">Email</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="contact-link">Instagram</a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>&copy; 2024 Dimas Imam Ghifari. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}

export default App;
