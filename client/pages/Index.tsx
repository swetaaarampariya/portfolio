import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  useAnimation,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Moon,
  Sun,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Code,
  Zap,
  Star,
} from "lucide-react";

// Floating Particle Component
const FloatingParticle = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-2 h-2 bg-primary/20 rounded-full"
    animate={{
      y: [-100, -120, -100],
      x: [-10, 10, -10],
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.8, 0.3],
    }}
    transition={{
      duration: 4 + Math.random() * 2,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
);

// Magnetic Button Component
const MagneticButton = ({ children, className = "", ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Animated Card Component
const AnimatedCard = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateX: 0 }
          : { opacity: 0, y: 50, rotateX: 10 }
      }
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
      className={`transform-gpu ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};

// Text Animation Component
const AnimatedText = ({ text, className = "", delay = 0 }) => {
  return (
    <motion.div className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.03,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Skill Progress Component
const SkillProgress = ({ skill, level, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, delay }}
      className="mb-4"
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">{skill}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full relative"
        >
          <motion.div
            animate={{ x: [-100, 100] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Liquid Metal Morphing Transition Component
const LiquidMetalTransition = ({ isAnimating, isDarkMode, buttonPosition }) => {
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1920;
  const screenHeight =
    typeof window !== "undefined" ? window.innerHeight : 1080;
  const maxSize = Math.max(screenWidth, screenHeight) * 2;

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isAnimating ? 1 : 0 }}
      transition={{ duration: 0.1 }}
    >
      {/* Main Liquid Metal Blob */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: buttonPosition.x - 25,
          top: buttonPosition.y - 25,
          background: isDarkMode
            ? "radial-gradient(circle, #1a1a1a 0%, #0a0a0a 40%, #000000 100%)"
            : "radial-gradient(circle, #ffffff 0%, #f0f0f0 40%, #e0e0e0 100%)",
          boxShadow: isDarkMode
            ? "inset 0 0 50px rgba(100, 100, 100, 0.3), 0 0 100px rgba(0, 0, 0, 0.8)"
            : "inset 0 0 50px rgba(200, 200, 200, 0.5), 0 0 100px rgba(255, 255, 255, 0.8)",
        }}
        initial={{
          width: 50,
          height: 50,
          opacity: 0,
        }}
        animate={{
          width: isAnimating ? maxSize : 50,
          height: isAnimating ? maxSize : 50,
          opacity: isAnimating ? [0, 0.9, 1] : 0,
        }}
        transition={{
          duration: 1.8,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        {/* Chrome Reflection Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, rgba(120, 120, 120, 0.4) 0%, transparent 50%, rgba(80, 80, 80, 0.3) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 50%, rgba(200, 200, 200, 0.4) 100%)",
          }}
          animate={{
            rotate: isAnimating ? [0, 360, 720] : 0,
          }}
          transition={{
            duration: 1.8,
            ease: "linear",
          }}
        />

        {/* Metallic Highlight */}
        <motion.div
          className="absolute top-[20%] left-[20%] w-[30%] h-[30%] rounded-full"
          style={{
            background: isDarkMode
              ? "radial-gradient(circle, rgba(180, 180, 180, 0.6) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
          animate={{
            scale: isAnimating ? [0, 1.5, 1] : 0,
            opacity: isAnimating ? [0, 0.8, 0.6] : 0,
          }}
          transition={{
            duration: 1.8,
            ease: "easeOut",
          }}
        />
      </motion.div>

      {/* Liquid Metal Ripples */}
      {isAnimating && (
        <div className="absolute inset-0">
          {[...Array(6)].map((_, index) => {
            const delay = index * 0.1;
            const scale = 1 + index * 0.3;

            return (
              <motion.div
                key={index}
                className="absolute rounded-full border-2"
                style={{
                  left: buttonPosition.x - 30,
                  top: buttonPosition.y - 30,
                  borderColor: isDarkMode
                    ? "rgba(120, 120, 120, 0.4)"
                    : "rgba(180, 180, 180, 0.4)",
                }}
                initial={{
                  width: 60,
                  height: 60,
                  opacity: 0,
                }}
                animate={{
                  width: maxSize * scale,
                  height: maxSize * scale,
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 2,
                  delay: delay,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      )}

      {/* Metallic Particles */}
      {isAnimating && (
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => {
            const angle = (i / 15) * Math.PI * 2;
            const distance = 100 + Math.random() * 150;
            const size = 4 + Math.random() * 8;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: buttonPosition.x - size / 2,
                  top: buttonPosition.y - size / 2,
                  background: isDarkMode
                    ? "radial-gradient(circle, #6b7280 0%, #374151 100%)"
                    : "radial-gradient(circle, #e5e7eb 0%, #9ca3af 100%)",
                  boxShadow: isDarkMode
                    ? "0 0 10px rgba(107, 114, 128, 0.5)"
                    : "0 0 10px rgba(156, 163, 175, 0.5)",
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  opacity: [0, 1, 0.5, 0],
                  scale: [0, 1.5, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.02,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              />
            );
          })}
        </div>
      )}

      {/* Central Metallic Glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "200px",
          height: "200px",
          left: buttonPosition.x - 100,
          top: buttonPosition.y - 100,
          background: isDarkMode
            ? "radial-gradient(circle, rgba(75, 85, 99, 0.3) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(209, 213, 219, 0.4) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isAnimating ? [0, 1, 0] : 0,
          scale: isAnimating ? [0, 2, 3] : 0,
        }}
        transition={{
          duration: 1.8,
          ease: "easeOut",
        }}
      />

      {/* Liquid Metal Tendrils */}
      {isAnimating && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const length = 150 + Math.random() * 100;
            const width = 8 + Math.random() * 12;

            return (
              <motion.div
                key={i}
                className="absolute origin-left"
                style={{
                  left: buttonPosition.x,
                  top: buttonPosition.y - width / 2,
                  width: `${length}px`,
                  height: `${width}px`,
                  background: isDarkMode
                    ? "linear-gradient(90deg, rgba(55, 65, 81, 0.8) 0%, transparent 100%)"
                    : "linear-gradient(90deg, rgba(209, 213, 219, 0.8) 0%, transparent 100%)",
                  borderRadius: `${width / 2}px`,
                  transform: `rotate(${angle}rad)`,
                  filter: "blur(1px)",
                }}
                initial={{
                  scaleX: 0,
                  opacity: 0,
                }}
                animate={{
                  scaleX: [0, 1, 0.8, 0],
                  opacity: [0, 0.8, 0.6, 0],
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      )}

      {/* Edge Reflection */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: buttonPosition.x - 40,
          top: buttonPosition.y - 40,
          width: "80px",
          height: "80px",
          border: isDarkMode
            ? "2px solid rgba(156, 163, 175, 0.3)"
            : "2px solid rgba(209, 213, 219, 0.5)",
          background: "transparent",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isAnimating ? [0, maxSize / 80] : 0,
          opacity: isAnimating ? [0, 0.4, 0] : 0,
        }}
        transition={{
          duration: 1.8,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      />
    </motion.div>
  );
};

export default function Index() {
  const [isDark, setIsDark] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("hero");
  const [isThemeAnimating, setIsThemeAnimating] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const controls = useAnimation();
  const themeButtonRef = useRef(null);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth scroll function with animations
  const scrollToSection = async (sectionId) => {
    setActiveSection(sectionId);

    // Trigger click animation
    await controls.start({
      scale: [1, 0.95, 1],
      transition: { duration: 0.2 },
    });

    const element = document.getElementById(sectionId);
    if (element) {
      // Smooth scroll to element
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Add a visual indicator that we're navigating
      const navIndicator = document.createElement("div");
      navIndicator.className =
        "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary/20 rounded-full animate-ping z-50 pointer-events-none";
      document.body.appendChild(navIndicator);

      setTimeout(() => {
        document.body.removeChild(navIndicator);
      }, 1000);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const sections = [
      "hero",
      "about",
      "skills",
      "projects",
      "experience",
      "contact"
    ];

    const handleScroll = () => {
      const currentSection = sections.find((section) => {
        const element =
          document.getElementById(section) ||
          document.querySelector(`[id="${section}"]`);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const toggleTheme = async () => {
    // Get button position for liquid metal effect
    if (themeButtonRef.current) {
      const rect = themeButtonRef.current.getBoundingClientRect();
      setButtonPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }

    setIsThemeAnimating(true);

    // Change theme when liquid metal covers screen
    setTimeout(() => {
      setIsDark(!isDark);
      document.documentElement.classList.toggle("dark");
    }, 700);

    // End liquid metal animation
    setTimeout(() => {
      setIsThemeAnimating(false);
    }, 2000);
  };



  const skills = [
    { name: "React.js", level: 95 },
    { name: "TypeScript", level: 92 },
    { name: "Vue.js", level: 90 },
    { name: "Next.js", level: 88 },
    { name: "JavaScript (ES6+)", level: 95 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Material UI", level: 85 },
    { name: "Jest", level: 85 },
    { name: "Micro Frontends", level: 80 },
    { name: "Vite", level: 82 },
    { name: "Webpack", level: 78 },
    { name: "Figma", level: 75 },
  ];

  const projects = [
    {
      title: "Crest Connect – Property Management System",
      description:
        "A comprehensive web and mobile-based property management platform for streamlining property, user, and shift management.",
      detailedDescription: "Crest Connect is a web and mobile-based property management platform designed to streamline the management of properties, users, shifts, and employee-related requests. Administrators can create and manage multiple properties and assign users to them with specific shift schedules. The system allows admins to monitor user attendance and manage approvals for various employee requests such as leave applications, reimbursements, overtime, and uniform requests. Each user has access to a mobile application through which they can mark their attendance, apply for leave, submit reimbursement and other requests, and view their shift schedules. The platform enables smooth communication between the admin and field staff, ensuring efficient workforce management and operational transparency.",
      images: [
        "/crest/crest1.png",
        "/crest/crest2.png"
      ],
      tech: ["React.js", "React Native", "Node.js", "MongoDB", "Redux"],
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      title: "Gravitrain – Fitness Training Platform",
      description:
        "A web and mobile-based fitness training platform connecting trainers and trainees with three user types.",
      detailedDescription: "Gravitrain is a web and mobile-based fitness training platform that supports three types of users: Admin, Trainer, and Trainee. Trainers and Trainees can register independently and use the platform to connect with each other. Trainers can create their profiles, add training details, and schedule sessions, while Trainees can search for available trainers in their area and request training sessions. Once a trainer approves the request, the training sessions can be conducted. The platform also includes a built-in chat feature for seamless communication between trainers and trainees. On the admin side, there is a payment settlement module to manage platform fees and a coupon management module for promotional offers.",
      images: [
        "/gravitrain/gra1.png",
        "/gravitrain/gra2.png",
        "/gravitrain/gra3.png"
      ],
      tech: ["React.js", "React Native", "Node.js", "Socket.io", "Payment Gateway"],
      gradient: "from-emerald-500 to-green-600",
    },
    {
      title: "VShips Management System",
      description:
        "Developed shared frontend modules with Material UI, Redux, and Next.js. Architected micro-frontend-compatible structure for cross-project usage.",
      detailedDescription: "VShips Management System is a comprehensive ship management platform that handles complex maritime operations. I developed shared frontend modules using Material UI, Redux, and Next.js, creating a micro-frontend architecture that enables cross-project reusability. The system includes user management, reporting dashboards, and application modules that can be shared across different ship management projects. The architecture supports independent deployment of frontend modules while maintaining consistency in design and functionality. Key achievements include reducing development time by 40% through reusable components and establishing a scalable component library for future maritime applications.",
      images: [
        "/vship1.png",
        "/vship2.png",
        "/vship3.png"
      ],
      tech: ["Next.js", "Material UI", "Redux", "Micro-Frontend"],
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "HRMS Portal",
      description:
        "Built responsive UI components using Formik for seamless form handling. Established Jest-based test infrastructure to ensure component reliability.",
      detailedDescription: "HRMS Portal is a comprehensive Human Resource Management System designed to streamline all HR operations. I built responsive UI components using Formik for seamless form handling, implementing complex validation logic and dynamic form generation. The system includes employee management, attendance tracking, payroll processing, and performance evaluation modules. Established a robust Jest-based test infrastructure that ensures component reliability and reduces UI regression issues by 40%. The portal features advanced filtering, search capabilities, and real-time data synchronization. The responsive design ensures optimal user experience across desktop, tablet, and mobile devices.",
      images: [
        "/hrms1.png"
      ],
      tech: ["React.js", "Formik", "Jest", "Redux"],
      gradient: "from-green-500 to-teal-600",
    },
    {
      title: "TRYME E-Commerce Fashion Platform",
      description:
        "Integrated Square Payment Gateway and implemented advanced UI patterns. Led UI testing and code reviews across the frontend team.",
      detailedDescription: "TRYME is a modern e-commerce fashion platform that provides a seamless shopping experience for fashion enthusiasts. I integrated Square Payment Gateway for secure and efficient payment processing, implementing advanced UI patterns for product catalog, shopping cart, and checkout flows. The platform features advanced product filtering, size recommendations, and virtual try-on capabilities. Led comprehensive UI testing and code reviews across the frontend team, establishing best practices for component development and state management. The platform includes features like wishlist management, order tracking, and personalized recommendations based on user preferences and browsing history.",
      images: [
        "/tryme1.png",
        "/tryme2.png",
        "/tryme3.png"
      ],
      tech: ["React.js", "Styled Components", "Square Payment"],
      gradient: "from-orange-500 to-red-600",
    },
    {
      title: "Medicom",
      description:
        "Developed high-quality SPAs with Vue.js, TypeScript, and Jest. Integrated secure checkout with Stripe, supporting prescription-based ordering logic.",
      detailedDescription: "Medicom is a healthcare e-commerce platform specializing in prescription medications and medical supplies. I developed high-quality Single Page Applications using Vue.js, TypeScript, and Jest, ensuring type safety and comprehensive testing coverage. The platform integrates secure checkout with Stripe, supporting complex prescription-based ordering logic that validates prescriptions with healthcare providers. Features include medication reminders, dosage tracking, and secure prescription upload. The system implements strict security measures for handling sensitive medical data and complies with healthcare regulations. The platform also includes features for healthcare professionals to manage patient prescriptions and track medication adherence.",
      images: [
        "/medicom1.png",
        "/medicom2.png",
        "/medicom3.png",
        "/medicom4.png",
      ],
      tech: ["Vue.js", "TypeScript", "Stripe", "Jest"],
      gradient: "from-pink-500 to-rose-600",
    },
  ];

  const experiences = [
    {
      company: "Glasier Inc",
      role: "Frontend Developer",
      duration: "Nov 2024 - July 2025",
      location: "Ahmedabad, India",
      responsibilities: [
        "Spearheaded frontend architecture design using Micro-Frontend patterns in Next.js, improving modularity and reusability",
        "Played a key role in architecting and implementing shared modules like User Management, Reports, and Apps across complex ship management system (VShips)",
        "Closely collaborated with cross-functional teams and participated in client-facing discussions to understand requirements",
        "Aligned deliverables with business objectives across multiple enterprise platforms",
      ],
    },
    {
      company: "Shiv InfoTech",
      role: "Frontend Developer",
      duration: "June 2022 - June 2024",
      location: "Ahmedabad, India",
      responsibilities: [
        "Led development on large-scale HRMS and E-commerce platforms utilizing React.js, Formik, and Redux",
        "Implemented advanced component testing strategies using Jest, reducing UI regression issues by 40%",
        "Mentored junior developers and established internal best practices for scalable React development",
        "Delivered feature-rich, responsive interfaces for enterprise applications",
      ],
    },
    {
      company: "Shiv InfoTech",
      role: "Frontend Development Intern",
      duration: "Jan 2022 - June 2022",
      location: "Ahmedabad, India",
      responsibilities: [
        "Supported senior teams in building reusable components and implementing dynamic UIs using Vue.js and Vuetify",
        "Built foundational understanding of component life cycles, state management, and Vuex/Pinia integration",
        "Contributed to multiple projects while learning modern frontend development practices",
        "Gained hands-on experience with enterprise-level frontend architecture",
      ],
    },
  ];

  return (
    <div className={`min-h-screen overflow-x-hidden ${isDark ? "dark" : ""}`}>
      <div className="bg-background text-foreground relative">
        {/* Liquid Metal Transition Overlay */}
        <LiquidMetalTransition
          isAnimating={isThemeAnimating}
          isDarkMode={!isDark}
          buttonPosition={buttonPosition}
        />
        {/* Animated Cursor */}
        <motion.div
          className="fixed w-6 h-6 bg-primary/20 rounded-full pointer-events-none z-50 mix-blend-difference"
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />

        {/* Floating Particles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.2} />
          ))}
        </div>

        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50"
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.h2
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
            >
              Portfolio
            </motion.h2>
            <div className="flex items-center gap-6">
              {["About", "Skills", "Projects", "Experience", "Contact"].map(
                (item, index) => {
                  const sectionId = item.toLowerCase();
                  const isActive = activeSection === sectionId;

                  return (
                    <motion.button
                      key={item}
                      onClick={() => scrollToSection(sectionId)}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        color: isActive ? "hsl(var(--primary))" : "inherit",
                      }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{
                        scale: 1.1,
                        color: "hsl(var(--primary))",
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.95,
                        y: 0,
                      }}
                      className={`relative transition-colors cursor-pointer px-3 py-2 rounded-lg ${
                        isActive
                          ? "text-primary font-semibold"
                          : "hover:text-primary"
                      }`}
                    >
                      {item}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      <motion.div
                        className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />

                      {/* Click ripple effect */}
                      <motion.div
                        className="absolute inset-0 bg-primary/20 rounded-full -z-10"
                        initial={{ scale: 0, opacity: 1 }}
                        whileTap={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  );
                },
              )}
              <motion.div
                ref={themeButtonRef}
                whileHover={{
                  rotate: [0, -10, 10, -5, 5, 0],
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  disabled={isThemeAnimating}
                  className="relative overflow-hidden group"
                >
                  {/* Button Background Glow */}
                  <motion.div
                    className={`absolute inset-0 rounded-lg ${
                      isDark
                        ? "bg-gradient-to-r from-yellow-400/20 to-orange-400/20"
                        : "bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                    } opacity-0 group-hover:opacity-100`}
                    initial={{ scale: 0, rotate: 0 }}
                    whileHover={{ scale: 1, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon with Smooth Transition */}
                  <motion.div
                    animate={{
                      rotate: isThemeAnimating ? [0, 180, 360] : 0,
                      scale: isThemeAnimating ? [1, 1.3, 1] : 1,
                    }}
                    transition={{
                      duration: 1.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      times: [0, 0.5, 1],
                    }}
                    className="relative z-10"
                  >
                    <motion.div
                      key={isDark ? "sun" : "moon"}
                      initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isDark ? (
                        <Sun className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <Moon className="h-5 w-5 text-slate-400" />
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Click Ripple Effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-full ${
                      isDark ? "bg-yellow-400/40" : "bg-blue-400/40"
                    }`}
                    initial={{ scale: 0, opacity: 1 }}
                    whileTap={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section
          id="hero"
          className="relative pt-24 pb-16 px-4 min-h-screen flex items-center overflow-hidden"
        >
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
          />

          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative inline-block mb-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full blur-xl"
              />
              <AnimatedText
                text="Sweta Rampariya"
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent relative z-10"
                delay={0.5}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Code className="h-8 w-8 text-primary" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl text-muted-foreground">
                Senior Frontend Engineer | UI Architect
              </h2>
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Zap className="h-8 w-8 text-primary" />
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed text-muted-foreground"
            >
              Accomplished Frontend Engineer with extensive experience in
              architecting and delivering complex, scalable, and
              high-performance web applications. Proficient in JavaScript
              ecosystems with deep expertise in React.js, Vue.js, Next.js,
              TypeScript, and modern UI frameworks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <MagneticButton>
                <Button
                  size="lg"
                  className="text-lg px-8 relative overflow-hidden group"
                >
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  />
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 relative overflow-hidden group"
                  onClick={() => scrollToSection("contact")}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-primary/5"
                  />
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Floating Icons */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  animate={{
                    y: [-20, 20, -20],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + i * 10}%`,
                  }}
                >
                  <Star className="h-6 w-6 text-primary/20" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-4 bg-muted/50 relative">
          <motion.div
            className="section-content container mx-auto"
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              when: "beforeChildren",
              staggerChildren: 0.1,
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30, rotateX: -45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              About Me
            </motion.h2>
            <div className="max-w-4xl mx-auto">
              {[
                "Accomplished Frontend Engineer with extensive experience in architecting and delivering complex, scalable, and high-performance web applications. Proficient in JavaScript ecosystems with deep expertise in React.js, Vue.js, Next.js, TypeScript, and modern UI frameworks.",
                "Recognized for building maintainable component systems, introducing micro-frontend architectures, and leading full-cycle UI/UX initiatives from wireframes to production. Adept at collaborating cross-functionally with designers, product managers, and backend teams to align technology with business goals.",
                "Passionate about performance, accessibility, and developer experience. Strong communicator with client interaction experience and excellent team player with leadership and mentoring capabilities.",
              ].map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-lg leading-relaxed mb-6"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 px-4 relative">
          <motion.div
            className="section-content container mx-auto"
            initial={{ opacity: 0, y: 100, rotateX: -45 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              when: "beforeChildren",
              staggerChildren: 0.05,
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.5, rotateZ: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              Skills & Technologies
            </motion.h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <SkillProgress
                  key={skill.name}
                  skill={skill.name}
                  level={skill.level}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 px-4 bg-muted/50 relative">
          <motion.div
            className="section-content container mx-auto"
            initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
              when: "beforeChildren",
              staggerChildren: 0.1,
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -50, rotateY: 90 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              Featured Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {projects.map((project, index) => (
                <AnimatedCard key={index} delay={index * 0.1}>
                  <Card className="group overflow-hidden border-0 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                    <div className="relative aspect-video overflow-hidden">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover relative z-10 mix-blend-overlay"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/20 z-20 flex items-center justify-center"
                      >
                        <ExternalLink className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <motion.span
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {project.title}
                        </motion.span>
                      </CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, techIndex) => (
                          <motion.div
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: techIndex * 0.05 }}
                            viewport={{ once: true }}
                          >
                            <Badge variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* View Details Button */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button variant="outline" className="w-full">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                          </motion.div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                              {project.title}
                            </DialogTitle>
                          </DialogHeader>
                          
                          <div className="space-y-6">
                            {/* Project Image Carousel */}
                            <div className="relative group">
                              <Carousel 
                                className="w-full"
                                opts={{
                                  loop: true,
                                  align: "start",
                                }}
                                plugins={[
                                  Autoplay({
                                    delay: 3000,
                                    stopOnInteraction: false,
                                    stopOnMouseEnter: true,
                                  }),
                                ]}
                              >
                                <CarouselContent>
                                  {project.images.map((image, imageIndex) => (
                                    <CarouselItem key={imageIndex}>
                                      <div className="relative aspect-video overflow-hidden rounded-lg">
                                        <motion.div
                                          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}
                                        />
                                        <motion.img
                                          src={image}
                                          alt={`${project.title} - Image ${imageIndex + 1}`}
                                          className="w-full h-full object-cover relative z-10"
                                          initial={{ scale: 1.1 }}
                                          whileInView={{ scale: 1 }}
                                          transition={{ duration: 0.5 }}
                                        />
                                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                                          {imageIndex + 1} / {project.images.length}
                                        </div>
                                        
                                        {/* Auto-play indicator */}
                                        <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                                          <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            className="w-2 h-2 bg-green-400 rounded-full"
                                          />
                                          Auto
                                        </div>
                                      </div>
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Carousel>
                            </div>

                            {/* Project Description */}
                            <div>
                              <h4 className="font-semibold mb-3 text-lg">Project Overview</h4>
                              <p className="text-base leading-relaxed text-muted-foreground">
                                {project.detailedDescription}
                              </p>
                            </div>

                            {/* Technologies Used */}
                            <div>
                              <h4 className="font-semibold mb-3">Technologies Used:</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech, techIndex) => (
                                  <motion.div
                                    key={techIndex}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: techIndex * 0.1 }}
                                    viewport={{ once: true }}
                                  >
                                    <Badge variant="secondary" className="text-sm px-3 py-1">
                                      {tech}
                                    </Badge>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            {/* Key Features */}
                            <div>
                              <h4 className="font-semibold mb-3">Key Features:</h4>
                              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                {project.title.includes("Crest Connect") && (
                                  <>
                                    <li>Property and user management dashboard with real-time updates</li>
                                    <li>Shift scheduling and attendance monitoring with GPS tracking</li>
                                    <li>Comprehensive request approval system (leave, reimbursement, overtime, uniform)</li>
                                    <li>Mobile app for field staff with offline capabilities</li>
                                    <li>Real-time communication between admin and staff with push notifications</li>
                                    <li>Advanced reporting and analytics dashboard</li>
                                  </>
                                )}
                                {project.title.includes("Gravitrain") && (
                                  <>
                                    <li>Multi-user platform supporting Admin, Trainer, and Trainee roles</li>
                                    <li>Comprehensive trainer profile creation with certification verification</li>
                                    <li>Advanced session scheduling with calendar integration</li>
                                    <li>Location-based trainer search with filtering options</li>
                                    <li>Built-in chat system with file sharing capabilities</li>
                                    <li>Payment settlement and coupon management for promotional offers</li>
                                  </>
                                )}
                                {project.title.includes("VShips") && (
                                  <>
                                    <li>Micro-frontend architecture for scalable development</li>
                                    <li>Shared component modules across multiple projects</li>
                                    <li>Cross-project reusability reducing development time by 40%</li>
                                    <li>Material UI integration for consistent design</li>
                                    <li>Independent deployment of frontend modules</li>
                                    <li>Comprehensive user management and reporting dashboards</li>
                                  </>
                                )}
                                {project.title.includes("HRMS") && (
                                  <>
                                    <li>Responsive UI components for all device types</li>
                                    <li>Advanced form handling with Formik and complex validation</li>
                                    <li>Comprehensive Jest testing infrastructure</li>
                                    <li>Redux state management for complex data flows</li>
                                    <li>Employee management and attendance tracking</li>
                                    <li>Payroll processing and performance evaluation modules</li>
                                  </>
                                )}
                                {project.title.includes("TRYME") && (
                                  <>
                                    <li>Modern e-commerce fashion platform with advanced UI</li>
                                    <li>Square Payment Gateway integration for secure payments</li>
                                    <li>Advanced product filtering and size recommendations</li>
                                    <li>Virtual try-on capabilities and wishlist management</li>
                                    <li>Personalized recommendations based on user behavior</li>
                                    <li>Comprehensive order tracking and customer support</li>
                                  </>
                                )}
                                {project.title.includes("Medicom") && (
                                  <>
                                    <li>Healthcare e-commerce platform with Vue.js and TypeScript</li>
                                    <li>Stripe payment integration with prescription validation</li>
                                    <li>Secure prescription upload and healthcare provider integration</li>
                                    <li>Medication reminders and dosage tracking system</li>
                                    <li>Compliance with healthcare regulations and data security</li>
                                    <li>Healthcare professional dashboard for patient management</li>
                                  </>
                                )}
                              </ul>
                            </div>

                            {/* Project Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                  {project.title.includes("Crest Connect") && "100+"}
                                  {project.title.includes("Gravitrain") && "500+"}
                                  {project.title.includes("VShips") && "40%"}
                                  {project.title.includes("HRMS") && "40%"}
                                  {project.title.includes("TRYME") && "1000+"}
                                  {project.title.includes("Medicom") && "99.9%"}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {project.title.includes("Crest Connect") && "Properties Managed"}
                                  {project.title.includes("Gravitrain") && "Active Users"}
                                  {project.title.includes("VShips") && "Development Time Saved"}
                                  {project.title.includes("HRMS") && "UI Issues Reduced"}
                                  {project.title.includes("TRYME") && "Products Listed"}
                                  {project.title.includes("Medicom") && "Uptime"}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                  {project.title.includes("Crest Connect") && "24/7"}
                                  {project.title.includes("Gravitrain") && "3"}
                                  {project.title.includes("VShips") && "10+"}
                                  {project.title.includes("HRMS") && "1000+"}
                                  {project.title.includes("TRYME") && "50+"}
                                  {project.title.includes("Medicom") && "HIPAA"}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {project.title.includes("Crest Connect") && "Support Available"}
                                  {project.title.includes("Gravitrain") && "User Types"}
                                  {project.title.includes("VShips") && "Shared Modules"}
                                  {project.title.includes("HRMS") && "Employees"}
                                  {project.title.includes("TRYME") && "Brands"}
                                  {project.title.includes("Medicom") && "Compliant"}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                  {project.title.includes("Crest Connect") && "Mobile"}
                                  {project.title.includes("Gravitrain") && "Real-time"}
                                  {project.title.includes("VShips") && "Scalable"}
                                  {project.title.includes("HRMS") && "Responsive"}
                                  {project.title.includes("TRYME") && "Secure"}
                                  {project.title.includes("Medicom") && "Type-safe"}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {project.title.includes("Crest Connect") && "First Design"}
                                  {project.title.includes("Gravitrain") && "Chat System"}
                                  {project.title.includes("VShips") && "Architecture"}
                                  {project.title.includes("HRMS") && "Design"}
                                  {project.title.includes("TRYME") && "Payments"}
                                  {project.title.includes("Medicom") && "Development"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 px-4 relative">
          <motion.div
            className="section-content container mx-auto"
            initial={{ opacity: 0, y: -100, rotateZ: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              when: "beforeChildren",
              staggerChildren: 0.15,
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              initial={{ opacity: 0, x: -100, skewX: -10 }}
              whileInView={{ opacity: 1, x: 0, skewX: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              Work Experience
            </motion.h2>
            <div className="max-w-4xl mx-auto space-y-8 relative">
              {/* Timeline Line */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
                className="absolute left-4 md:left-8 top-0 w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full"
              />

              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative pl-12 md:pl-20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    className="absolute left-2 md:left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"
                  />

                  <AnimatedCard delay={index * 0.1}>
                    <Card className="relative overflow-hidden">
                      <motion.div
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                      />
                      <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <Briefcase className="h-5 w-5" />
                              {exp.role}
                            </CardTitle>
                            <CardDescription className="text-lg font-medium">
                              {exp.company}
                            </CardDescription>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {exp.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {exp.location}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((resp, respIndex) => (
                            <motion.li
                              key={respIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: respIndex * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-start gap-2"
                            >
                              <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: respIndex * 0.2,
                                }}
                                className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"
                              />
                              <span>{resp}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </AnimatedCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Education Section */}
        <section className="py-16 px-4 bg-muted/50 relative">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              Education
            </motion.h2>
            <div className="max-w-2xl mx-auto">
              <AnimatedCard>
                <Card className="relative overflow-hidden">
                  <motion.div
                    animate={{
                      background: [
                        "linear-gradient(45deg, transparent, rgba(var(--primary), 0.05), transparent)",
                        "linear-gradient(45deg, transparent, rgba(var(--primary), 0.1), transparent)",
                        "linear-gradient(45deg, transparent, rgba(var(--primary), 0.05), transparent)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0"
                  />
                  <CardHeader className="relative z-10">
                    <CardTitle className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity }}
                      >
                        <GraduationCap className="h-5 w-5" />
                      </motion.div>
                      Bachelor of Engineering in Computer Engineering
                    </CardTitle>
                    <CardDescription>
                      Gujarat Technological University
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-muted-foreground">
                      <span>Graduated: June 2022</span>
                      <span>Duration: July 2018 - June 2022</span>
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                      className="mt-4"
                    >
                      Focused on computer engineering fundamentals, software
                      development, and modern web technologies. Built strong
                      foundation in programming languages, algorithms, and
                      software architecture principles.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                      className="mt-4 p-3 bg-primary/10 rounded-lg"
                    >
                      <p className="text-sm font-medium text-primary">
                        🏆 Best Developer Award - Shiv InfoTech (2023)
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Consistently recognized for delivering pixel-perfect UI
                        and scalable architecture solutions.
                      </p>
                    </motion.div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-4 relative">
          <motion.div
            className="section-content container mx-auto"
            initial={{ opacity: 0, y: 100, rotateX: -45 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              when: "beforeChildren",
              staggerChildren: 0.1,
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.5, rotateZ: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              Get In Touch
            </motion.h2>
            
            <div className="max-w-4xl mx-auto">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
              >
                I'm always open to discussing new opportunities, interesting projects, 
                or just having a chat about technology. Feel free to reach out!
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Email Contact */}
                <AnimatedCard delay={0.1}>
                  <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                    <motion.div
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                    />
                    <CardContent className="p-6 relative z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto"
                      >
                        <Mail className="h-8 w-8 text-primary" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-center mb-2">Email</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Let's discuss your project
                      </p>
                      <motion.a
                        href="mailto:sweta.rampariya@example.com"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="block text-center text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        swetarampariya2001@gmail.com
                      </motion.a>
                    </CardContent>
                  </Card>
                </AnimatedCard>

                {/* Phone Contact */}
                <AnimatedCard delay={0.2}>
                  <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                    <motion.div
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                    />
                    <CardContent className="p-6 relative z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto"
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </motion.div>
                      </motion.div>
                      <h3 className="text-xl font-semibold text-center mb-2">Phone</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Available for calls
                      </p>
                      <motion.a
                        href="tel:+91-98765-43210"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="block text-center text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        +91 8140163708
                      </motion.a>
                    </CardContent>
                  </Card>
                </AnimatedCard>

                {/* LinkedIn Contact */}
                <AnimatedCard delay={0.3}>
                  <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                    <motion.div
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                    />
                    <CardContent className="p-6 relative z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto"
                      >
                        <motion.div
                          animate={{ y: [-2, 2, -2] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Linkedin className="h-8 w-8 text-primary" />
                        </motion.div>
                      </motion.div>
                      <h3 className="text-xl font-semibold text-center mb-2">LinkedIn</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Connect professionally
                      </p>
                      <motion.a
                        href="http://www.linkedin.com/in/sweta-rampariya2103"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="block text-center text-primary hover:text-primary/80 transition-colors font-medium flex items-center justify-center gap-2"
                      >
                        <span>sweta-rampariya2103</span>
                        <ExternalLink className="h-4 w-4" />
                      </motion.a>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </div>

              {/* Additional Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    Based in Ahmedabad, India • Available for remote work
                  </span>
                </div>
              </motion.div>


            </div>
          </motion.div>
        </section>


        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-8 px-4 border-t border-border relative"
        >
          <div className="container mx-auto text-center">
            <motion.p
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-muted-foreground"
            >
              © 2024 Sweta Rampariya. Built with React, TypeScript, and
              TailwindCSS.
            </motion.p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
