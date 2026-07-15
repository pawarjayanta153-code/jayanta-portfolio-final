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

  // Path to the resume PDF inside the public/ folder
  resumePath: '/resume/Jayanta_Rajendra_Pawar_Resume.pdf',

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
// status: 'comfortable' | 'familiar' | 'learning'
export const skills = [
  // Programming Languages
  { id: 'python', name: 'Python', category: 'programming', status: 'comfortable', icon: '🐍' },
  { id: 'javascript', name: 'JavaScript', category: 'programming', status: 'familiar', icon: '⚡' },
  { id: 'php', name: 'PHP', category: 'programming', status: 'familiar', icon: '🐘' },
  { id: 'sql', name: 'SQL', category: 'database', status: 'comfortable', icon: '🗄️' },

  // Frontend
  { id: 'html5', name: 'HTML5', category: 'frontend', status: 'comfortable', icon: '🌐' },
  { id: 'css3', name: 'CSS3', category: 'frontend', status: 'comfortable', icon: '🎨' },
  { id: 'responsive', name: 'Responsive Design', category: 'frontend', status: 'familiar', icon: '📱' },
  { id: 'jsdom', name: 'JavaScript DOM', category: 'frontend', status: 'familiar', icon: '🏗️' },

  // Backend & Database
  { id: 'python-backend', name: 'Python Backend Fundamentals', category: 'backend', status: 'learning', icon: '⚙️' },
  { id: 'php-backend', name: 'PHP Backend', category: 'backend', status: 'familiar', icon: '🔧' },
  { id: 'mysql', name: 'MySQL', category: 'database', status: 'comfortable', icon: '🐬' },
  { id: 'rest-api', name: 'REST API Fundamentals', category: 'backend', status: 'learning', icon: '🔌' },

  // AI
  { id: 'genai', name: 'Generative AI Fundamentals', category: 'ai', status: 'learning', icon: '🤖' },
  { id: 'prompt-eng', name: 'Prompt Engineering', category: 'ai', status: 'learning', icon: '✍️' },

  // Cyber Security
  { id: 'cs-fundamentals', name: 'Cyber Security Fundamentals', category: 'security', status: 'familiar', icon: '🔒' },
  { id: 'networking', name: 'Networking Basics', category: 'security', status: 'familiar', icon: '🌐' },
  { id: 'owasp', name: 'OWASP Basics', category: 'security', status: 'familiar', icon: '🛡️' },
  { id: 'security-awareness', name: 'Security Awareness', category: 'security', status: 'comfortable', icon: '👁️' },
  { id: 'doc-reporting', name: 'Documentation & Reporting', category: 'security', status: 'comfortable', icon: '📝' },

  // Tools
  { id: 'git', name: 'Git', category: 'tools', status: 'familiar', icon: '🌿' },
  { id: 'github', name: 'GitHub', category: 'tools', status: 'familiar', icon: '🐙' },
  { id: 'vscode', name: 'VS Code', category: 'tools', status: 'comfortable', icon: '💻' },
  { id: 'xampp', name: 'XAMPP', category: 'tools', status: 'familiar', icon: '🛠️' },
  { id: 'postman', name: 'Postman', category: 'tools', status: 'familiar', icon: '📮' },
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
// moduleStatus: 'learning' | 'practising' | 'completed'
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
        { name: 'Python Fundamentals', status: 'completed' },
        { name: 'Advanced Python', status: 'completed' },
        { name: 'Object-Oriented Programming', status: 'completed' },
        { name: 'File Handling', status: 'completed' },
        { name: 'Exception Handling', status: 'completed' },
        { name: 'Modules and Packages', status: 'completed' },
        { name: 'Python Automation', status: 'completed' },
        { name: 'Data Structures and Algorithms Fundamentals', status: 'completed' },
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: '🎨',
      modules: [
        { name: 'HTML5', status: 'completed' },
        { name: 'CSS3', status: 'completed' },
        { name: 'Responsive Web Design', status: 'completed' },
        { name: 'JavaScript ES6+', status: 'practising' },
        { name: 'DOM Manipulation', status: 'practising' },
        { name: 'API Integration', status: 'learning' },
        { name: 'React.js Fundamentals', status: 'learning' },
      ],
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: '⚙️',
      modules: [
        { name: 'Django', status: 'learning' },
        { name: 'Flask Fundamentals', status: 'learning' },
        { name: 'REST API Development', status: 'learning' },
        { name: 'Authentication and Authorization', status: 'learning' },
        { name: 'Server-Side Validation', status: 'learning' },
        { name: 'CRUD Applications', status: 'practising' },
      ],
    },
    {
      id: 'database',
      title: 'Database',
      icon: '🗄️',
      modules: [
        { name: 'SQL', status: 'completed' },
        { name: 'MySQL', status: 'completed' },
        { name: 'Database Design', status: 'practising' },
        { name: 'Joins', status: 'practising' },
        { name: 'Subqueries', status: 'learning' },
        { name: 'Normalization', status: 'learning' },
        { name: 'ORM Fundamentals', status: 'learning' },
      ],
    },
    {
      id: 'tools',
      title: 'Developer Tools',
      icon: '🛠️',
      modules: [
        { name: 'Git', status: 'practising' },
        { name: 'GitHub', status: 'practising' },
        { name: 'VS Code', status: 'completed' },
        { name: 'Postman', status: 'learning' },
        { name: 'XAMPP', status: 'completed' },
        { name: 'Deployment Basics', status: 'learning' },
      ],
    },
    {
      id: 'genai',
      title: 'Generative AI',
      icon: '🤖',
      modules: [
        { name: 'Generative AI Fundamentals', status: 'learning' },
        { name: 'Prompt Engineering', status: 'learning' },
        { name: 'LLM Fundamentals', status: 'learning' },
        { name: 'AI API Integration', status: 'learning' },
        { name: 'OpenAI-Compatible API Concepts', status: 'learning' },
        { name: 'LangChain Fundamentals', status: 'learning' },
        { name: 'Retrieval-Augmented Generation', status: 'learning' },
        { name: 'Vector Database Fundamentals', status: 'learning' },
        { name: 'AI Chatbot Development', status: 'learning' },
        { name: 'Document Question Answering', status: 'learning' },
        { name: 'AI Automation', status: 'learning' },
        { name: 'Responsible AI Fundamentals', status: 'learning' },
        { name: 'AI Agents Fundamentals', status: 'learning' },
      ],
    },
  ],
}

// ─── Projects ─────────────────────────────────────────────────────────────────
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
    /** ← EDIT THIS – add your real repo link when ready */
    github: null,
    liveDemo: null,
    featured: true,
  },
  {
    id: 'ai-chat',
    title: 'AI Chat Application',
    categories: ['ai', 'web'],
    image: '/images/project-ai-chat.svg',
    technologies: ['Python', 'JavaScript', 'HTML', 'CSS', 'API Integration'],
    shortDescription:
      'A conversational web application designed to provide AI-powered responses through a clean chat interface.',
    description:
      'A conversational web application designed to provide AI-powered responses through a clean chat interface. The project explores AI API integration with a responsive frontend.',
    features: [
      'Chat interface',
      'User message history',
      'API-ready structure',
      'Responsive layout',
      'Error and loading states',
    ],
    problem: 'Explore how to connect a web frontend to an AI response API and present results in a usable chat UI.',
    challenges: [
      'Handling asynchronous API calls gracefully',
      'Managing conversation context',
      'Building a responsive chat layout',
    ],
    learningOutcomes: [
      'JavaScript async/await patterns',
      'REST API integration from the frontend',
      'UX design for conversational interfaces',
    ],
    github: null,
    liveDemo: null,
    featured: true,
  },
  {
    id: 'ngo-portal',
    title: 'NGO Donation Portal',
    categories: ['web', 'database'],
    image: '/images/project-ngo.svg',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    shortDescription:
      'A donation management portal designed to connect contributors with social causes and maintain donation-related information.',
    description:
      'A donation management portal designed to connect contributors with social causes and maintain donation-related information. Built as an academic full stack project.',
    features: [
      'Donor registration',
      'Donation form',
      'Cause information pages',
      'Database storage',
      'Responsive user interface',
    ],
    problem: 'Build a practical web application that handles form submissions, stores records and presents cause information.',
    challenges: [
      'Designing a donor registration and data storage flow',
      'Handling form validation on both client and server side',
    ],
    learningOutcomes: [
      'PHP form handling and MySQL integration',
      'Responsive layout design with HTML/CSS',
    ],
    github: null,
    liveDemo: null,
    featured: false,
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
    id: 'xai-demo',
    title: 'Explainable AI Demonstration',
    categories: ['ai', 'python'],
    image: '/images/project-xai.svg',
    technologies: ['Python', 'Machine Learning Fundamentals', 'LIME', 'SHAP'],
    shortDescription:
      'An academic project exploring how model predictions can be interpreted using explainable AI techniques.',
    description:
      'An academic project exploring how model predictions can be interpreted using explainable AI techniques including LIME and SHAP. The project does not claim production machine learning expertise.',
    features: [
      'Model prediction visualization',
      'LIME explanation output',
      'SHAP value exploration',
      'Academic documentation',
    ],
    problem: 'Understand why machine learning models produce specific predictions by applying XAI interpretation techniques.',
    challenges: [
      'Understanding LIME and SHAP library APIs',
      'Visualising explanation outputs clearly',
    ],
    learningOutcomes: [
      'Explainable AI fundamentals',
      'Python ML library usage',
      'Academic reporting and analysis',
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
export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'web', label: 'Web' },
  { id: 'python', label: 'Python' },
  { id: 'ai', label: 'AI' },
  { id: 'database', label: 'Database' },
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
