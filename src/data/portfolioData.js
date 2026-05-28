export const portfolioData = {
  personalInfo: {
    name: "Sneha Kumari",
    title: "Full Stack Developer",
    subtitle: "Building scalable web applications with MERN & AI integration",
    taglines: [
      "MERN Stack Developer",
      "Backend & API Developer",
      "DSA Enthusiast"
    ],
    avatarPlaceholder: "/profile.jpg",

    // Better to load from env
    resumeUrl: import.meta.env.VITE_RESUME_URL,

    bio: [
      "I am a Computer Science student at IIIT Una passionate about full-stack development, scalable backend systems, and AI-powered applications. I enjoy building impactful products using the MERN stack and solving complex DSA problems.",
      "I have experience working on real-world applications involving authentication systems, REST APIs, payment integrations, RBAC, and cloud-based document management systems."
    ],

    stats: [
      {
        label: "DSA Problems Solved",
        value: "950+",
        icon: "⚡",
        link: import.meta.env.VITE_LEETCODE,
        linkLabel: "View on Codolio"
      },
      {
        label: "LeetCode Rating",
        value: "1900+",
        icon: "🏆",
        link: import.meta.env.VITE_LEETCODE,
        linkLabel: "LeetCode Profile"
      },
      {
        label: "Hackathons",
        value: "6+",
        icon: "🚀",
        link: import.meta.env.VITE_GITHUB_URL,
        linkLabel: "GitHub Profile"
      },
      {
        label: "CGPA",
        value: "8.61",
        icon: "🎓",
        link: import.meta.env.VITE_LINKEDIN_URL,
        linkLabel: "LinkedIn Profile"
      }
    ]
  },

  skills: [
    {
      category: "Languages",
      items: [
        { name: "JavaScript", level: 90 },
        { name: "Python", level: 75 },
        { name: "C++", level: 80 },
        { name: "SQL", level: 80 }
      ]
    },
    {
      category: "Frontend",
      items: [
        { name: "React.js", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Redux", level: 80 },
        { name: "HTML/CSS", level: 95 }
      ]
    },
    {
      category: "Backend & APIs",
      items: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 85 },
        { name: "REST APIs", level: 90 },
        { name: "JWT Authentication", level: 85 },
        { name: "RBAC", level: 80 }
      ]
    },
    {
      category: "Databases & Tools",
      items: [
        { name: "MongoDB", level: 85 },
        { name: "MySQL", level: 75 },
        { name: "Docker", level: 70 },
        { name: "Git & GitHub", level: 90 },
        { name: "Postman", level: 85 },
        { name: "Linux", level: 75 }
      ]
    }
  ],

  experience: [
    {
      role: "Backend Developer",
      company: "DevTeams, IIIT Una",
      location: "IIIT Una",
      period: "Jan 2025 - Mar 2026",
      description: [
        "Migrated authentication from localStorage to HTTP-only cookies, improving application security and reducing XSS vulnerabilities.",
        "Designed and optimized RESTful APIs handling 500+ records and concurrent admin requests, improving response time by ~25%.",
        "Worked on scalable backend systems using Node.js, Express.js, MongoDB, and Redis."
      ],
      technologies: [
        "JavaScript",
        "TypeScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redis",
        "Docker"
      ]
    },
    {
      role: "Web Development Intern",
      company: "Infinito Comics",
      location: "Remote",
      period: "Jul 2025 - Sep 2025",
      description: [
        "Integrated Razorpay payment gateway with validation and error handling, achieving 95%+ transaction success rate.",
        "Built 10+ responsive UI components from Figma designs using React.js and Tailwind CSS.",
        "Improved responsiveness and cross-browser performance for production-ready web pages."
      ],
      technologies: [
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redux",
        "Razorpay"
      ]
    }
  ],

  projects: [
    {
      title: "CPMS – College Placement Management System",
      description: "A role-based full-stack placement platform supporting multiple user roles with AI chatbot integration, Cloudinary document management, and secure authentication.",
      image: "/projects/cpms.png",
      tech: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "JWT",
        "Cloudinary",
        "Redux",
        "OpenAI API"
      ],
      github: import.meta.env.VITE_CPMS_GITHUB,
      demo: import.meta.env.VITE_CPMS_DEMO,
      category: "Full Stack",
      featured: true
    },
    {
      title: "Grevion – Parali Management Platform",
      description: "Hackathon project featuring RBAC, OTP authentication, modular dashboards, REST APIs, and automated email notifications.",
      image: "/projects/grevion.png",
      tech: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "Nodemailer"
      ],
      github: import.meta.env.VITE_GREVION_GITHUB,
      demo: import.meta.env.VITE_GREVION_DEMO,
      category: "Full Stack",
      featured: true
    },
    {
      title: "MarkMyFile – Backend System",
      description:
        "A backend system for managing and tracking files with secure data operations, RESTful APIs, and ML-powered plagiarism detection for content similarity analysis.",
      image: "/projects/markmyfile.png",
      tech: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Machine Learning",
        "REST API"
      ],
      github: "https://github.com/Snehaaa-Kri/MarkMyFile-Backend.git",
      demo: "",
      category: "Backend",
      featured: false
    },
    {
      title: "GTA-Themed Portfolio Website",
      description:
        "A modern GTA-inspired portfolio website with immersive UI, smooth animations, responsive layouts, interactive sections, and dynamic project showcases.",
      image: "/projects/gta-portfolio.png",
      tech: [
        "React.js",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
        "JavaScript",
        "Lucide React",
        "Nodemailer",
        "Vercel"
      ],
      github: "https://github.com/Snehaaa-Kri/PortfolioWebsite",
      demo: "https://portfolio-chi-six-ftiawtfif6.vercel.app/",
      category: "Frontend",
      featured: true
    },
    {
      title: "AirConnect – Airline Booking System",
      description:
        "A full-stack airline booking platform with role-based access, flight management, secure authentication, booking workflows, and complete MERN stack integration.",
      image: "/projects/airconnect.png",
      tech: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
        "Tailwind CSS"
      ],
      github: "https://github.com/Snehaaa-Kri/AirlineBookingSystem.git",
      demo: "",
      category: "Full Stack",
      featured: false
    }
  ],

  achievements: [
    {
      title: "1900+ LeetCode Rating",
      issuer: "LeetCode",
      date: "2026",
      description: "Achieved Top 3.56% ranking with 950+ DSA problems solved across LeetCode and GFG.",
      link: import.meta.env.VITE_LEETCODE
    },
    {
      title: "3rd Place - Meraki Hackathon 2025",
      issuer: "Progothon, IIIT Una",
      date: "2025",
      description: "Secured 3rd place for building Grevion – Parali Management Platform.",
      link: import.meta.env.VITE_HACKATHON_CERTIFICATE
    },
    {
      title: "Devteams Certificate of Appreciation",
      issuer: "IIIT Una",
      date: "2025",
      description: "Received Certificate of Appreciation during Institute Day 2025 for contributions and active involvement in Devteams.",
      link: "https://drive.google.com/file/d/1zzMNwRmGhL7NOogLPGrcmeuzEzX8YAVM/view?usp=drive_link"
    },
    {
      title: "MERN Stack Certification",
      issuer: "Apna College",
      date: "2025",
      description: "Completed DSA and MERN Full Stack Web Development certifications.",
      link: import.meta.env.VITE_CERTIFICATE
    }
  ]
};