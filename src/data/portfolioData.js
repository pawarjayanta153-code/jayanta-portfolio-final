/**
 * portfolioData.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for all personal information shown on the portfolio.
 * Edit this file to update any content without touching individual components.
 *
 * PLACEHOLDER VALUES are marked with  ← EDIT THIS
 * Replace them before publishing or sharing the URL.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Personal Info ────────────────────────────────────────────────────────────
export const personal = {
  name: 'Jayanta Rajendra Pawar',
  firstName: 'Jayanta',
  lastName: 'Pawar',
  primaryTitle: 'Python Full Stack Developer with Generative AI',
  tagline:
    'I am a BCA graduate and aspiring software engineer currently learning Python Full Stack Development with Generative AI. I enjoy building responsive web applications, database-driven systems, automation tools and practical AI-powered solutions.',

  /** ← EDIT THIS – your real email address */
  email: 'jayantapawar@example.com',

  /** ← EDIT THIS – your real phone number (or remove this key to hide it) */
  phone: '+91 XXXXX XXXXX',

  /** ← EDIT THIS – your public GitHub profile URL */
  github: 'https://github.com/jayantapawar',

  /** ← EDIT THIS – your LinkedIn profile URL */
  linkedin: 'https://linkedin.com/in/jayantapawar',

  location: 'Maharashtra, India',
  availability: 'Open to Entry-Level Roles and Internships',
  languages: ['Marathi', 'Hindi', 'English'],
  careerGoal: 'Software Engineer',

  // Path to the resume PDF inside the public/resume/ folder.
  // File on disk:  public/resume/Jayanta_Pawar_Resume.pdf
  // Download name shown to the user: "Jayanta Pawar Resume.pdf"
  resumePath: '/resume/Jayanta_Pawar_Resume.pdf',

  // Path to the profile photo inside public/images/
  profileImage: '/images/profile-placeholder.jpeg',
}

// ─── Hero Rotating Roles ─────────────────────────────────────────────────────
export const heroRoles = [
  'Python Full Stack Developer',
  'Generative AI Enthusiast',
  'Aspiring Software Engineer',
  'Web Developer',
]

// ─── Hero Stats Cards ─────────────────────────────────────────────────────────
export const heroStats = [
  { label: 'BCA Graduate', icon: 'GraduationCap' },
  { label: '6 Months Internship', icon: 'Briefcase' },
  { label: 'Full Stack + GenAI Learning', icon: 'Code2' },
  { label: 'Multiple Academic Projects', icon: 'FolderGit2' },
]

// ─── About Section ────────────────────────────────────────────────────────────
export const about = {
  bio: `Jayanta Rajendra Pawar is a BCA graduate with an interest in software engineering, full stack development, database management, automation and generative AI. He has experience building academic web applications using Python, JavaScript, PHP, HTML, CSS and MySQL.

He has also completed a cyber security internship where he contributed to security awareness, documentation and reporting activities.

He is currently strengthening his skills through a Python Full Stack Developer with Generative AI course and is looking for an entry-level software development or internship opportunity.`,

  details: [
    { label: 'Name', value: 'Jayanta Rajendra Pawar', icon: 'User' },
    { label: 'Education', value: 'Bachelor of Computer Applications', icon: 'GraduationCap' },
    { label: 'Location', value: 'Maharashtra, India', icon: 'MapPin' },
    { label: 'Career Goal', value: 'Software Engineer', icon: 'Target' },
    { label: 'Availability', value: 'Entry-Level Roles and Internships', icon: 'Briefcase' },
    { label: 'Languages', value: 'Marathi, Hindi and English', icon: 'Languages' },
  ],
}

// ─── Education ────────────────────────────────────────────────────────────────
export const education = [
  {
    id: 'bca',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Chhatrapati Shivaji Maharaj University, Kolhapur',
    duration: '2023 – 2026',
    status: 'Graduated',
    description:
      'Completed a full programme in programming, web development, databases, software concepts and computer application fundamentals.',
    highlights: [
      'Programming & Problem Solving',
      'Web Development Fundamentals',
      'Database Management Systems',
      'Software Engineering Concepts',
      'Computer Application Development',
    ],
    // Set to true to display percentage/marks prominently
    showMarks: false,
    marks: null,
  },
  {
    id: 'hsc',
    degree: 'Higher Secondary Certificate — HSC',
    institution: 'Maharashtra State Board',
    duration: '2023',
    status: 'Completed',
    description: 'Completed higher secondary education under the Maharashtra State Board.',
    highlights: [],
    showMarks: false,
    marks: null,
  },
]

// ─── Experience ───────────────────────────────────────────────────────────────
export const experience = [
  {
    id: 'quickheal-intern',
    role: 'Cyber Security Intern / Volunteer',
    organisation: 'Quick Heal Foundation',
    duration: '6 Months',
    /** ← EDIT THIS – approximate dates if available */
    period: '2024',
    type: 'Internship / Volunteer',
    responsibilities: [
      'Assisted with cyber security awareness activities',
      'Supported documentation and reporting',
      'Learned cyber security fundamentals',
      'Participated in responsible digital safety initiatives',
      'Developed communication and teamwork skills',
    ],
    tags: ['Cyber Security', 'Awareness', 'Documentation', 'Reporting'],
  },
]

// ─── Skills ───────────────────────────────────────────────────────────────────
/**
 * HOW TO UPDATE SKILLS
 * ─────────────────────────────────────────────────────────────────────────────
 * Each entry has:
 *   id       – unique key (no spaces)
 *   name     – display label shown on the card
 *   category – used by filter tabs: 'programming' | 'frontend' | 'backend' |
 *              'database' | 'ai' | 'security' | 'tools'
 *   status   – ONE of these exact uppercase strings:
 *                'COMFORTABLE'  → green-ish "Comfortable" badge
 *                'FAMILIAR'     → purple  "Familiar" badge
 *                'LEARNING'     → amber   "Currently Learning" badge
 *   icon     – emoji shown on the card
 *
 * To update a skill: change ONLY the `status` value.
 * The badge label, colour, and legend update automatically.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const skills = [
  // ── Programming Languages ──────────────────────────────────────────────
  { id: 'python',      name: 'Python',      category: 'programming', status: 'COMFORTABLE', icon: '🐍' },
  { id: 'javascript',  name: 'JavaScript',  category: 'programming', status: 'FAMILIAR',    icon: '⚡' },
  { id: 'php',         name: 'PHP',         category: 'programming', status: 'FAMILIAR',    icon: '🐘' },
  { id: 'sql',         name: 'SQL',         category: 'database',    status: 'COMFORTABLE', icon: '🗄️' },

  // ── Frontend ───────────────────────────────────────────────────────────
  { id: 'html5',       name: 'HTML5',             category: 'frontend', status: 'COMFORTABLE', icon: '🌐' },
  { id: 'css3',        name: 'CSS3',              category: 'frontend', status: 'COMFORTABLE', icon: '🎨' },
  { id: 'responsive',  name: 'Responsive Design', category: 'frontend', status: 'FAMILIAR',    icon: '📱' },
  { id: 'jsdom',       name: 'JavaScript DOM',    category: 'frontend', status: 'FAMILIAR',    icon: '🏗️' },

  // ── Backend & Database ─────────────────────────────────────────────────
  { id: 'python-backend', name: 'Python Backend Fundamentals', category: 'backend',   status: 'LEARNING',    icon: '⚙️' },
  { id: 'php-backend',    name: 'PHP Backend',                 category: 'backend',   status: 'FAMILIAR',    icon: '🔧' },
  { id: 'mysql',          name: 'MySQL',                       category: 'database',  status: 'COMFORTABLE', icon: '🐬' },
  { id: 'rest-api',       name: 'REST API Fundamentals',       category: 'backend',   status: 'LEARNING',    icon: '🔌' },

  // ── AI ─────────────────────────────────────────────────────────────────
  { id: 'genai',       name: 'Generative AI Fundamentals', category: 'ai', status: 'LEARNING', icon: '🤖' },
  { id: 'prompt-eng',  name: 'Prompt Engineering',         category: 'ai', status: 'LEARNING', icon: '✍️' },

  // ── Cyber Security ─────────────────────────────────────────────────────
  { id: 'cs-fundamentals',   name: 'Cyber Security Fundamentals', category: 'security', status: 'FAMILIAR',    icon: '🔒' },
  { id: 'networking',        name: 'Networking Basics',           category: 'security', status: 'FAMILIAR',    icon: '🌐' },
  { id: 'owasp',             name: 'OWASP Basics',                category: 'security', status: 'FAMILIAR',    icon: '🛡️' },
  { id: 'security-awareness',name: 'Security Awareness',          category: 'security', status: 'COMFORTABLE', icon: '👁️' },
  { id: 'doc-reporting',     name: 'Documentation & Reporting',   category: 'security', status: 'COMFORTABLE', icon: '📝' },

  // ── Tools ──────────────────────────────────────────────────────────────
  { id: 'git',     name: 'Git',     category: 'tools', status: 'FAMILIAR',    icon: '🌿' },
  { id: 'github',  name: 'GitHub',  category: 'tools', status: 'FAMILIAR',    icon: '🐙' },
  { id: 'vscode',  name: 'VS Code', category: 'tools', status: 'COMFORTABLE', icon: '💻' },
  { id: 'xampp',   name: 'XAMPP',   category: 'tools', status: 'FAMILIAR',    icon: '🛠️' },
  { id: 'postman', name: 'Postman', category: 'tools', status: 'FAMILIAR',    icon: '📮' },
]

// Skill filter categories
export const skillFilters = [
  { id: 'all', label: 'All' },
  { id: 'programming', label: 'Programming' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'ai', label: 'AI' },
  { id: 'security', label: 'Security' },
  { id: 'tools', label: 'Tools' },
]

// ─── Current Learning Course ──────────────────────────────────────────────────
/**
 * HOW TO UPDATE COURSE MODULES
 * ─────────────────────────────────────────────────────────────────────────────
 * Each module entry has:
 *   name    – display label shown inside the card
 *   status  – ONE of these exact uppercase strings:
 *               'COMPLETED'   → green  ✓ icon, "Completed" label, counts toward progress bar
 *               'PRACTISING'  → blue   ↻ icon, "Practising" label
 *               'LEARNING'    → amber  ⟳ icon, "Learning" label
 *
 * To update a topic: change ONLY the `status` value.
 * The progress bar, completed/total counter, icon and label update automatically.
 *
 * Progress bar formula (auto-calculated in the UI):
 *   completed = modules where status === 'COMPLETED'
 *   progress  = Math.round((completed / total) * 100)
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const currentCourse = {
  title: 'Python Full Stack Development with Generative AI',
  provider: 'Ongoing Professional Course',
  status: 'Currently Learning',
  disclaimer:
    'The following technologies represent the current learning roadmap and course curriculum. They should not be interpreted as professional-level work experience unless demonstrated in completed projects.',

  categories: [
    {
      id: 'python-prog',
      title: 'Python & Programming',
      icon: '🐍',
      modules: [
        { name: 'Python Fundamentals',                       status: 'COMPLETED' },
        { name: 'Advanced Python',                           status: 'COMPLETED' },
        { name: 'Object-Oriented Programming',               status: 'COMPLETED' },
        { name: 'File Handling',                             status: 'COMPLETED' },
        { name: 'Exception Handling',                        status: 'COMPLETED' },
        { name: 'Modules and Packages',                      status: 'COMPLETED' },
        { name: 'Python Automation',                         status: 'COMPLETED' },
        { name: 'Data Structures and Algorithms Fundamentals', status: 'COMPLETED' },
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: '🎨',
      modules: [
        { name: 'HTML5',                  status: 'COMPLETED'  },
        { name: 'CSS3',                   status: 'COMPLETED'  },
        { name: 'Responsive Web Design',  status: 'COMPLETED'  },
        { name: 'JavaScript ES6+',        status: 'PRACTISING' },
        { name: 'DOM Manipulation',       status: 'PRACTISING' },
        { name: 'API Integration',        status: 'LEARNING'   },
        { name: 'React.js Fundamentals',  status: 'LEARNING'   },
      ],
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: '⚙️',
      modules: [
        { name: 'Django',                        status: 'LEARNING'   },
        { name: 'Flask Fundamentals',            status: 'LEARNING'   },
        { name: 'REST API Development',          status: 'LEARNING'   },
        { name: 'Authentication and Authorization', status: 'LEARNING' },
        { name: 'Server-Side Validation',        status: 'LEARNING'   },
        { name: 'CRUD Applications',             status: 'PRACTISING' },
      ],
    },
    {
      id: 'database',
      title: 'Database',
      icon: '🗄️',
      modules: [
        { name: 'SQL',              status: 'COMPLETED'  },
        { name: 'MySQL',            status: 'COMPLETED'  },
        { name: 'Database Design',  status: 'PRACTISING' },
        { name: 'Joins',            status: 'PRACTISING' },
        { name: 'Subqueries',       status: 'LEARNING'   },
        { name: 'Normalization',    status: 'LEARNING'   },
        { name: 'ORM Fundamentals', status: 'LEARNING'   },
      ],
    },
    {
      id: 'tools',
      title: 'Developer Tools',
      icon: '🛠️',
      modules: [
        { name: 'Git',               status: 'PRACTISING' },
        { name: 'GitHub',            status: 'PRACTISING' },
        { name: 'VS Code',           status: 'COMPLETED'  },
        { name: 'Postman',           status: 'LEARNING'   },
        { name: 'XAMPP',             status: 'COMPLETED'  },
        { name: 'Deployment Basics', status: 'LEARNING'   },
      ],
    },
    {
      id: 'genai',
      title: 'Generative AI',
      icon: '🤖',
      modules: [
        { name: 'Generative AI Fundamentals',       status: 'LEARNING' },
        { name: 'Prompt Engineering',               status: 'LEARNING' },
        { name: 'LLM Fundamentals',                 status: 'LEARNING' },
        { name: 'AI API Integration',               status: 'LEARNING' },
        { name: 'OpenAI-Compatible API Concepts',   status: 'LEARNING' },
        { name: 'LangChain Fundamentals',           status: 'LEARNING' },
        { name: 'Retrieval-Augmented Generation',   status: 'LEARNING' },
        { name: 'Vector Database Fundamentals',     status: 'LEARNING' },
        { name: 'AI Chatbot Development',           status: 'LEARNING' },
        { name: 'Document Question Answering',      status: 'LEARNING' },
        { name: 'AI Automation',                    status: 'LEARNING' },
        { name: 'Responsible AI Fundamentals',      status: 'LEARNING' },
        { name: 'AI Agents Fundamentals',           status: 'LEARNING' },
      ],
    },
  ],
}

// ─── Projects ─────────────────────────────────────────────────────────────────
// To add a project: copy one entry and fill in the fields.
// github / liveDemo: use null when the link is not yet available.
// The UI shows "Coming Soon" automatically for null links.
export const projects = [
  {
    id: 'ticket-booking',
    title: 'Multi Trip Ticket Booking System',
    categories: ['fullstack', 'web', 'database'],
    image: '/images/project-ticket-booking.svg',
    technologies: ['PHP', 'JavaScript', 'HTML', 'CSS', 'MySQL'],
    shortDescription:
      'A database-driven travel booking application that allows users to explore and book bus, train and airline tickets.',
    description:
      'A database-driven travel booking application that allows users to explore and book bus, train and airline tickets. Built with a PHP backend and MySQL database, the system handles user authentication, booking workflows and feedback submission.',
    features: [
      'User registration and login',
      'Bus, train and airline booking options',
      'Ticket booking workflow',
      'Feedback section',
      'About page',
      'MySQL database integration',
      'Admin-oriented data management foundation',
    ],
    problem: 'Students required a practical full stack project demonstrating CRUD operations, user auth and database design.',
    challenges: [
      'Designing a relational database schema for multiple transport types',
      'Implementing secure user authentication with PHP sessions',
      'Creating a consistent UI across all booking flows',
    ],
    learningOutcomes: [
      'PHP session management and backend routing',
      'MySQL relational schema design',
      'Full stack integration from UI to database',
    ],
    github: null,
    liveDemo: null,
    featured: true,
  },
  {
    id: 'mental-health-chatbot',
    title: 'Mental Health Support Chatbot',
    categories: ['ai', 'python'],
    image: '/images/project-mental-health.svg',
    technologies: ['Python', 'Natural Language Processing Fundamentals', 'Web UI'],
    shortDescription:
      'An educational chatbot concept designed to provide supportive information and encourage users to seek appropriate professional help.',
    description:
      'An educational chatbot concept designed to provide supportive information and encourage users to seek appropriate professional help. This is a learning project exploring NLP fundamentals.',
    disclaimer:
      'This project is educational and is not a replacement for professional medical advice, diagnosis or emergency support.',
    features: [
      'Conversational UI',
      'Rule-based and basic NLP responses',
      'Encouraging professional help prompts',
      'Educational resource links',
    ],
    problem: 'Explore basic NLP and rule-based chatbot design in the context of a socially meaningful topic.',
    challenges: [
      'Handling sensitive topic areas responsibly',
      'Building meaningful fallback responses when intent is unclear',
    ],
    learningOutcomes: [
      'Python NLP fundamentals',
      'Responsible AI and ethical design considerations',
      'Chatbot conversation flow design',
    ],
    github: null,
    liveDemo: null,
    featured: false,
  },
  {
    id: 'student-management',
    title: 'Student Management System',
    categories: ['python', 'database'],
    image: '/images/project-student-management.svg',
    technologies: ['Python', 'MySQL'],
    shortDescription:
      'A CRUD-based application for managing student records in a structured database.',
    description:
      'A CRUD-based application for managing student records in a structured database. Built with Python and MySQL, the system supports core data management operations.',
    features: [
      'Add student',
      'Update student',
      'Delete student',
      'Search student',
      'View records',
      'Database validation',
    ],
    problem: 'Practise Python-MySQL integration and CRUD operation design in a real-world record management context.',
    challenges: [
      'Connecting Python to MySQL reliably',
      'Input validation and error handling for database operations',
    ],
    learningOutcomes: [
      'Python database connectivity (mysql-connector)',
      'CRUD operation design patterns',
      'Data validation in backend applications',
    ],
    github: null,
    liveDemo: null,
    featured: false,
  },
]

// Project filter categories
// Only include filters that match at least one project's categories array.
export const projectFilters = [
  { id: 'all',      label: 'All'       },
  { id: 'fullstack',label: 'Full Stack' },
  { id: 'web',      label: 'Web'       },
  { id: 'python',   label: 'Python'    },
  { id: 'ai',       label: 'AI'        },
  { id: 'database', label: 'Database'  },
]

// ─── Voice Assistant Scripts ───────────────────────────────────────────────────
export const voiceScripts = {
  english: `Hello and welcome to Jayanta Pawar's portfolio.
Jayanta is a BCA graduate and an aspiring software engineer.
He is currently pursuing Python Full Stack Development with Generative AI.
He has worked with Python, JavaScript, PHP, SQL, HTML, CSS and MySQL,
and has completed a cyber security internship.
Explore this portfolio to learn about his skills, projects, education and professional goals.`,

  marathi: `नमस्कार, जयंत पवार यांच्या पोर्टफोलिओमध्ये तुमचे स्वागत आहे.
जयंत हे बीसीए पदवीधर असून सध्या पायथन फुल स्टॅक डेव्हलपमेंट विथ जनरेटिव्ह एआय शिकत आहेत.
त्यांनी वेब डेव्हलपमेंट, डेटाबेस, पायथन आणि सायबर सिक्युरिटीशी संबंधित प्रकल्पांवर काम केले आहे.
त्यांची कौशल्ये, प्रकल्प आणि अनुभव पाहण्यासाठी पोर्टफोलिओ एक्सप्लोर करा.`,
}

// ─── Contact Section ───────────────────────────────────────────────────────────
export const contactInfo = {
  heading: "Let's Build Something Valuable",
  description:
    'I am open to entry-level software development roles, internships, collaborative projects and learning opportunities.',

  /**
   * EmailJS configuration
   * Leave all values as empty strings to fall back to mailto.
   * ← EDIT THIS – fill these in after creating a free EmailJS account
   */
  emailjs: {
    serviceId: '',
    templateId: '',
    publicKey: '',
  },
}

// ─── Navigation Links ─────────────────────────────────────────────────────────
export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

// ─── Footer Links ─────────────────────────────────────────────────────────────
export const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]
