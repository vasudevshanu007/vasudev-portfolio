// ─── Personal Info ───────────────────────────────────────────────────────────
export const personalInfo = {
  name: 'Vasudev Kumar',
  role: 'Full Stack Developer',
  location: 'India',
  email: 'vasudevshanu07@gmail.com',
  phone: '+91 8235916360',
  bio: "Hi! I'm Vasudev Kumar — a goal-oriented Full Stack Developer with a passion for problem-solving. Graduating from Birla Institute of Technology, Mesra, I build modern web applications and enjoy competitive programming. I strive to make a positive impact through clean, efficient code.",
  github: 'https://github.com/vasudevshanu007',
  linkedin: 'https://www.linkedin.com/in/vasudev-kumar-46a654258/',
  twitter: 'https://x.com/mightystriker?t=V_GAr93PxVGKP2vv9d8zwA&s=09',
  instagram: 'https://instagram.com/VASUDEV_007SHARMA',
  facebook: 'https://www.facebook.com/profile.php?id=100087670578388&mibextid=ZbWKwL',
  codeforces: 'https://codeforces.com/profile/dslr',
  leetcode: 'https://leetcode.com/u/vasudevshanu07/',
  resumeUrl: '/resume.pdf',
  roles: ['Full Stack Developer', 'Problem Solver', 'Competitive Programmer', 'React Developer'],
};

// ─── Stats ───────────────────────────────────────────────────────────────────
export const stats = [
  { label: 'DSA Problems', value: '500+' },
  { label: 'Projects Built', value: '5+' },
  { label: 'Codeforces Rating', value: '1494' },
  { label: 'CGPA', value: '8.7' },
];

// ─── Skills (Progress Bars) ───────────────────────────────────────────────────
export const skillBars = [
  { name: 'C',           percentage: 70, category: 'Languages' },
  { name: 'C++',         percentage: 65, category: 'Languages' },
  { name: 'Java',        percentage: 60, category: 'Languages' },
  { name: 'Python',      percentage: 50, category: 'Languages' },
  { name: 'JavaScript',  percentage: 55, category: 'Languages' },
  { name: 'React.js',    percentage: 75, category: 'Frontend'  },
  { name: 'Node.js',     percentage: 65, category: 'Backend'   },
  { name: 'Bootstrap',   percentage: 45, category: 'Frontend'  },
  { name: 'OOPs',        percentage: 70, category: 'Concepts'  },
];

// ─── Tech Stack Tags ──────────────────────────────────────────────────────────
export const techStack = [
  { name: 'React.js',    icon: 'SiReact',      color: '#61DAFB' },
  { name: 'Node.js',     icon: 'SiNodedotjs',  color: '#339933' },
  { name: 'MongoDB',     icon: 'SiMongodb',    color: '#47A248' },
  { name: 'Express.js',  icon: 'SiExpress',    color: '#000000' },
  { name: 'JavaScript',  icon: 'SiJavascript', color: '#F7DF1E' },
  { name: 'Python',      icon: 'SiPython',     color: '#3776AB' },
  { name: 'C++',         icon: 'SiCplusplus',  color: '#00599C' },
  { name: 'Java',        icon: 'SiJava',       color: '#ED8B00' },
  { name: 'Git',         icon: 'SiGit',        color: '#F05032' },
  { name: 'Tailwind',    icon: 'SiTailwindcss',color: '#06B6D4' },
  { name: 'Bootstrap',   icon: 'SiBootstrap',  color: '#7952B3' },
  { name: 'REST API',    icon: 'TbApi',        color: '#f07484' },
  { name: 'MongoDB',     icon: 'SiMongodb',    color: '#47A248' },
  { name: 'JWT Auth',    icon: 'SiJsonwebtokens', color: '#000000' },
];

// ─── Education ───────────────────────────────────────────────────────────────
export const education = [
  {
    institution: 'Birla Institute of Technology, Mesra, Ranchi',
    degree: 'B.Tech — Computer Science',
    duration: '2022 – Present',
    grade: 'CGPA: 8.7',
    type: 'college',
  },
  {
    institution: 'DAV KAPILDEV Public School, Ranchi',
    degree: 'Class 12 (Science)',
    duration: '2022',
    grade: '95.4%',
    type: 'school',
  },
  {
    institution: 'Lala Lajpat Rai Sr. Sec. School, Ranchi',
    degree: 'Class 10',
    duration: '2020',
    grade: '94.6%',
    type: 'school',
  },
];

// ─── Achievements ─────────────────────────────────────────────────────────────
export const achievements = [
  {
    title: 'Codeforces Specialist',
    description: 'Reached a rating of 1494 on Codeforces',
    link: 'https://codeforces.com/profile/dslr',
    icon: '🏆',
  },
  {
    title: 'Top 10% on Codeforces',
    description: 'Consistently ranked in the top 10% in Codeforces contests',
    link: '',
    icon: '🎯',
  },
  {
    title: '500+ DSA Problems',
    description: 'Solved 500+ problems across Codeforces, LeetCode & GFG',
    link: 'https://leetcode.com/u/vasudevshanu07/',
    icon: '💡',
  },
  {
    title: 'Academic Excellence',
    description: 'Scored 95.4% in Class 12th Board Exams',
    link: '',
    icon: '🎓',
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: 'Hospital Management System',
    description:
      'Full-stack hospital management system with patient registration, doctor scheduling, appointments, and JWT-based authentication. Features real-time data and a clean admin dashboard.',
    image: '/img/download.jfif',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Bootstrap'],
    category: 'Web',
    liveUrl: '',
    githubUrl: 'https://github.com/vasudevshanu007/hospital-management-system',
    featured: true,
  },
  {
    id: 2,
    title: 'Bhagvatgita APK App',
    description:
      'Cross-platform mobile app built with React Native, presenting the complete Bhagavad Gita with beautiful UI, chapter navigation, and verse-by-verse reading.',
    image: '/img/screenshot.png',
    tech: ['React Native', 'JavaScript', 'Kotlin', 'Ruby'],
    category: 'Mobile',
    liveUrl: 'https://bhagvatgita-apk.vercel.app/',
    githubUrl: 'https://github.com/vasudevshanu007/BHAGVATGITA',
    featured: true,
  },
  {
    id: 3,
    title: 'IPL Win Predictor',
    description:
      'ML-powered web app predicting IPL match outcomes using XGBoost and Random Forest with 85%+ accuracy. Built with Streamlit and deployed for real-time predictions.',
    image: '/img/IPL.jpg',
    tech: ['Python', 'Streamlit', 'Pandas', 'NumPy', 'XGBoost', 'Random Forest'],
    category: 'ML/AI',
    liveUrl: '',
    githubUrl: 'https://github.com/vasudevshanu007/IPL-win-predictor-',
    featured: true,
  },
  {
    id: 4,
    title: 'Word Counter Timer',
    description:
      'A sleek, real-time word and character counter with a built-in countdown timer. Features dark mode, clipboard copy, and export functionality.',
    image: '/img/counter.png',
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    category: 'Web',
    liveUrl: 'https://word-counter-main-zeta.vercel.app',
    githubUrl: '',
    featured: false,
  },
  {
    id: 5,
    title: 'Personal Portfolio',
    description:
      'This very portfolio! A modern, responsive portfolio built with React, Tailwind CSS, and Framer Motion featuring dark/light mode, animations, and full contact form.',
    image: '/img/portfolioImage.png',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Node.js'],
    category: 'Web',
    liveUrl: '#',
    githubUrl: '',
    featured: false,
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────
export const experiences = [
  {
    id: 1,
    role: 'SDE Intern',
    company: 'OZI TECHNOLOGY PRIVATE LIMITED',
    duration: 'Feb 2025 – Present',
    type: 'On-site',
    description: [
      'Developing and maintaining an Order Management System (OMS) that handles end-to-end inventory tracking, order processing, and stock management workflows.',
      'Building scalable RESTful APIs using Node.js and Express.js to support real-time inventory updates, order lifecycle management, and warehouse operations.',
      'Designing responsive and type-safe frontend interfaces with React.js and TypeScript for efficient product catalog and order dashboard views.',
      'Writing optimized SQL queries and managing relational database schemas to handle complex inventory and order relationships at scale.',
      'Integrating AWS Lambda for serverless function execution, event-driven processing, and scalable backend operations.',
    ],
    tech: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'SQL', 'AWS Lambda'],
  },
  {
    id: 2,
    role: 'Summer Intern',
    company: 'NIT ROURKELA',
    duration: 'May 2025 – July 2025',
    type: 'On-site',
    description: [
      'Developed "Nut Diaries" — an organic dry fruits e-commerce website using Shopify and Liquid with custom themes, payment integration, and responsive design.',
      'Built a full-stack Hospital Management System using React.js, Node.js, and MongoDB featuring patient registration, doctor scheduling, appointments, and JWT authentication.',
    ],
    tech: ['Shopify', 'Liquid', 'React.js', 'Node.js', 'MongoDB', 'JWT'],
  },
  {
    id: 3,
    role: 'Summer Intern (Remote)',
    company: 'IIT PATNA',
    duration: 'May 2025 – July 2025',
    type: 'Remote',
    description: [
      'Built an AI model to automate university exam seating plans, reducing manual effort by 80%.',
      'Created a Python-based interface to input exam data and generate real-time seating maps.',
      'Used Pandas and NumPy to clean and preprocess data for accurate seat allocation.',
      'Achieved 95% conflict-free seating arrangement using rule-based optimization logic.',
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'AI/ML', 'Optimization'],
  },
];
