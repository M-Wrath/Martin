// Central content model for the site, sourced from Martin's CV.
// Edit this file to update the portfolio — components only render it.
// Every fact here traces back to the CV; nothing is invented.

export const profile = {
  name: "Martin Sevov",
  firstName: "Martin",
  lastName: "Sevov",
  roles: ["IT administration", "automation", "cybersecurity", "data science"],
  rolesLong: [
    "IT Administration & Automation",
    "MSc Student in Cybersecurity & Resilience",
    "BSc Applied Informatics & Data Science",
  ],
  headline:
    "Turning technical requirements into working systems — from IT administration and process automation to data pipelines and resilient infrastructure.",
  location: "Austria",
  currently: "MSc Cybersecurity & Resilience — FH St. Pölten",
  status: "Open to working-student roles, internships and collaboration.",
  email: "ms.sevov@gmail.com",
  github: "https://github.com/mssevov18",
  githubHandle: "mssevov18",
  linkedin: "https://linkedin.com/in/martin-sevov",
  linkedinHandle: "martin-sevov",
  cvHref: "/Martin-Sevov-CV.pdf",
  summaryLead:
    "Bachelor of Science in Engineering graduate in Applied Informatics and Data Science from IMC Krems, with experience in research data automation, IT administration, process automation and software prototyping.",
  summaryRest:
    "Skilled in Python, C++, C#/.NET, databases, Linux, Docker and automation tools including Power Automate and Power Apps. Experienced in turning technical requirements into working prototypes across research, education and enterprise IT environments.",
};

export type Stat = { value: number; suffix?: string; label: string };

export const stats: Stat[] = [
  { value: 6, suffix: "+", label: "years of Python" },
  { value: 5, label: "selected projects" },
  { value: 2, label: "first-place finishes" },
  { value: 3, label: "languages spoken" },
];

export type Experience = {
  index: string;
  role: string;
  org: string;
  orgShort: string;
  period: string;
  start: string; // YYYY-MM
  end: string; // YYYY-MM
  location: string;
  bullets: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    index: "3.1",
    role: "IT & System Administrator Intern",
    org: "Concircle",
    orgShort: "Concircle",
    period: "Jul 2025 — Jan 2026",
    start: "2025-07",
    end: "2026-01",
    location: "Vienna, Austria · Full-time",
    bullets: [
      "Worked on established and new Power Automate workflows for internal process automation.",
      "Upgraded an existing SharePoint-based CRM with a Power Apps offer-approval workflow.",
      "Assisted the IT administration team with research, support and low-complexity implementation tasks.",
      "Practiced virtualisation server management using vSphere and Proxmox.",
    ],
    tags: ["Power Automate", "Power Apps", "SharePoint", "vSphere", "Proxmox"],
  },
  {
    index: "3.2",
    role: "Research Assistant",
    org: "University of Applied Sciences IMC Krems — DigiCare4CE",
    orgShort: "IMC Krems · DigiCare4CE",
    period: "Sep 2024 — Aug 2025",
    start: "2024-09",
    end: "2025-08",
    location: "Krems an der Donau, Austria · Part-time",
    bullets: [
      "Prepared and processed survey data for the DigiCare4CE research project.",
      "Created automation scripts to streamline data preparation, analysis and formatting of findings.",
      "Established a data automation pipeline to support analysis and insight generation.",
      "Published a 3D visualisation website with self-made 3D models and analysis artifacts.",
    ],
    tags: ["Python", "Data automation", "3D visualisation", "Research"],
  },
  {
    index: "3.3",
    role: "Programming Teacher",
    org: "Vocational High School for Computer Programming and Innovation",
    orgShort: "VSCPI · teaching",
    period: "Jul 2022 — Aug 2022",
    start: "2022-07",
    end: "2022-08",
    location: "Burgas, Bulgaria",
    bullets: [
      "Taught programming to children aged 7 to 16 using Scratch.",
      "Led groups of up to 16 students using a self-made teaching syllabus.",
    ],
    tags: ["Scratch", "Teaching", "Curriculum design"],
  },
  {
    index: "3.4",
    role: "Student Internship Project",
    org: "Musala Soft & VSCPI",
    orgShort: "Musala Soft",
    period: "Feb 2022 — Jun 2022",
    start: "2022-02",
    end: "2022-06",
    location: "Burgas, Bulgaria",
    bullets: [
      "Developed a C# MVC banking service with multiple clients, a central server and a database.",
      "Worked through multiple iterations following Agile methodology.",
      "Debugged TCP traffic using Wireshark.",
      "Applied unit testing and the repository pattern.",
    ],
    tags: ["C#", "MVC", "SQL", "Agile", "Wireshark"],
  },
  {
    index: "3.5",
    role: "Student Internship Project",
    org: "Technologica & VSCPI",
    orgShort: "Technologica",
    period: "Jul 2021",
    start: "2021-07",
    end: "2021-07",
    location: "Burgas, Bulgaria",
    bullets: ["Created an Angular weather widget that presents scraped data from official sources."],
    tags: ["Angular", "Web scraping"],
  },
];

export type Education = {
  index: string;
  degree: string;
  org: string;
  orgShort: string;
  period: string;
  start: string;
  end: string;
  location: string;
  note?: string;
  courses?: string[];
};

export const education: Education[] = [
  {
    index: "2.1",
    degree: "MSc in Cybersecurity and Resilience",
    org: "University of Applied Sciences St. Pölten",
    orgShort: "FH St. Pölten · MSc",
    period: "Sep 2026 — Jul 2028",
    start: "2026-09",
    end: "2028-07",
    location: "St. Pölten, Austria",
    note: "Ongoing",
  },
  {
    index: "2.2",
    degree: "BSc Eng. in Informatics and Data Science",
    org: "University of Applied Sciences IMC Krems",
    orgShort: "IMC Krems · BSc",
    period: "Sep 2023 — Jul 2026",
    start: "2023-09",
    end: "2026-07",
    location: "Krems an der Donau, Austria",
    courses: [
      "Statistics with R and Python",
      "Computer networks and distributed systems",
      "Databases and relational algebra",
      "Formal logic and automata theory",
      "Software engineering and organisational methodologies",
      "Agile and SCRUM methodologies",
      "Multi-OMICS analysis and visualisation",
      "Small-scale classification models",
    ],
  },
  {
    index: "2.3",
    degree: "Vocational secondary education in computer programming",
    org: "Vocational High School for Computer Programming and Innovation (ПГКПИ Бургас)",
    orgShort: "PGKPI Burgas",
    period: "Sep 2018 — Jun 2023",
    start: "2018-09",
    end: "2023-06",
    location: "Burgas, Bulgaria",
    note: "Graduated with honours · 5.88 / 6",
  },
];

export type SkillSet = {
  name: string;
  /** TeX for the set symbol, e.g. \mathcal{P} */
  symbol: string;
  items: string[];
};

export const skillSets: SkillSet[] = [
  {
    name: "Programming",
    symbol: String.raw`\mathcal{P}`,
    items: ["Python", "C++", "C# / .NET", "JavaScript", "Rust", "Embedded C", "HTML & CSS"],
  },
  {
    name: "Data & Databases",
    symbol: String.raw`\mathcal{D}`,
    items: [
      "R",
      "SQLite",
      "MS SQL",
      "Relational algebra",
      "Data visualisation",
      "Classification models",
      "Multi-OMICS analysis",
    ],
  },
  {
    name: "Systems & Automation",
    symbol: String.raw`\mathcal{S}`,
    items: ["Linux", "Docker", "CI/CD", "Power Automate", "Power Apps", "SharePoint", "Multi-OS home lab"],
  },
  {
    name: "Software Engineering",
    symbol: String.raw`\mathcal{E}`,
    items: ["Agile", "SCRUM", "REST", "Test-driven development", "Unit testing", "Git"],
  },
  {
    name: "Frameworks & Platforms",
    symbol: String.raw`\mathcal{F}`,
    items: [
      "FastAPI",
      "Django",
      "Flask",
      "pandas",
      "NumPy",
      ".NET MAUI",
      "WPF",
      "EF Core",
      "vSphere",
      "Proxmox",
      "SAP ecosystem",
    ],
  },
  {
    name: "Design & 3D",
    symbol: String.raw`\mathcal{G}`,
    items: ["Photoshop", "Krita", "Blender", "SolidWorks", "FreeCAD"],
  },
];

export type SkillYears = { name: string; years: number };

// Years of use per language, straight from the CV's "Programming" line.
export const skillYears: SkillYears[] = [
  { name: "Python", years: 6 },
  { name: "C++", years: 4 },
  { name: "C# / .NET", years: 3 },
  { name: "JavaScript", years: 2 },
  { name: "Rust", years: 1 },
  { name: "Embedded C", years: 1 },
];

export type Project = {
  index: string;
  name: string;
  context: string;
  description: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    index: "5.1",
    name: "Octolab",
    context: "Self-hosted home lab",
    description:
      "Multi-machine home lab used for experimentation with Linux systems, user services, networking, containerised services, automation and infrastructure management. DNS, reverse proxy, monitoring and cloud storage as core services.",
    tags: ["Linux", "Docker", "Networking", "DNS", "Reverse proxy", "Monitoring"],
  },
  {
    index: "5.2",
    name: "WebAssembly Build Server",
    context: "IMC Krems thesis · Concircle prototype",
    description:
      "Build-server prototype related to thesis work at IMC Krems and internal prototyping at Concircle.",
    tags: ["WebAssembly", "Build systems", "Prototyping"],
  },
  {
    index: "5.3",
    name: "bookmarker",
    context: "Rust-based shell bookmarker",
    description: "Rust-based bookmarking utility for faster terminal movement.",
    tags: ["Rust", "CLI", "Shell"],
  },
  {
    index: "5.4",
    name: "C# Banking System",
    context: "VSCPI thesis · student internship",
    description:
      "C# MVC banking service with multiple clients, a central server and a database, developed through Agile iterations.",
    tags: ["C#", "MVC", "SQL", "Agile"],
  },
  {
    index: "5.5",
    name: "Python Dataframe Navigator",
    context: "Data tooling",
    description: "Python tool for navigating and working with dataframe-based data.",
    tags: ["Python", "pandas", "Data tools"],
  },
];

export type Award = { index: string; name: string; result?: string; year: string; detail?: string };

export const awards: Award[] = [
  {
    index: "6.1",
    name: "ÖBB Hackathon",
    result: "1st place",
    year: "2024",
    detail: "Created a prototype using company-provided resources and endpoints.",
  },
  {
    index: "6.2",
    name: "ХТМУ Annual Conference and Project Presentation",
    result: "1st place",
    year: "2023",
    detail:
      "Presented a smart-home system with fast reconfiguration and user authorisation at a university fair in front of a committee.",
  },
  {
    index: "6.3",
    name: "Adobe World Championship",
    year: "2022",
  },
];

export type Certification = { issuer: string; name: string };

export const certifications: Certification[] = [
  { issuer: "Cisco", name: "IT Essentials" },
  { issuer: "Cambridge English", name: "C1 Advanced (2022)" },
  { issuer: "Microsoft Technology Associate", name: "Python, HTML & CSS, Databases, Excel, Word" },
  { issuer: "Microsoft Certified", name: "Azure Fundamentals" },
  { issuer: "Adobe", name: "Professional Visual Design, Photoshop, Illustrator" },
];

export type Language = { name: string; level: string; cefr: number }; // cefr 1..6 (A1..C2)

export const languages: Language[] = [
  { name: "Bulgarian", level: "Native", cefr: 6 },
  { name: "English", level: "C1 Advanced · certified", cefr: 5 },
  { name: "German", level: "A2 · studying", cefr: 2 },
];

export type Testimonial = { quote: string; name: string; role: string };

// Reference contact details from the CV are intentionally not published —
// only the attributed quotes are shown.
export const testimonials: Testimonial[] = [
  {
    quote: "Martin is a hard-working, honest, and very good informatics student.",
    name: "Prof. (FH) Dipl. Ing. Dr. techn. Deepak Dhungana",
    role: "Professor (FH), IMC Krems",
  },
  {
    quote: "Martin has a proactive approach to problem-solving, and strong technical skills.",
    name: "Markus Pferscher",
    role: "Team Lead Digital Enterprise Core, Concircle",
  },
];

export type Equation = { name: string; tex: string };

// The ticker between the hero and the paper: a mix of the classics and the
// mathematics behind Martin's fields — statistics, classification, security.
export const equations: Equation[] = [
  { name: "Euler's identity", tex: String.raw`e^{i\pi} + 1 = 0` },
  { name: "Bayes' theorem", tex: String.raw`P(A \mid B) = \dfrac{P(B \mid A)\,P(A)}{P(B)}` },
  { name: "Shannon entropy", tex: String.raw`H(X) = -\sum_{x} p(x)\,\log_{2} p(x)` },
  { name: "Gaussian integral", tex: String.raw`\int_{-\infty}^{\infty} e^{-x^{2}}\,dx = \sqrt{\pi}` },
  { name: "Logistic function", tex: String.raw`\sigma(z) = \dfrac{1}{1 + e^{-z}}` },
  { name: "Basel problem", tex: String.raw`\sum_{n=1}^{\infty} \dfrac{1}{n^{2}} = \dfrac{\pi^{2}}{6}` },
  { name: "RSA encryption", tex: String.raw`c \equiv m^{e} \pmod{n}` },
  {
    name: "Fourier transform",
    tex: String.raw`\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x)\,e^{-2\pi i x \xi}\,dx`,
  },
  { name: "Eigenvalues", tex: String.raw`\det(A - \lambda I) = 0` },
  { name: "Cauchy–Schwarz", tex: String.raw`\lvert\langle u, v\rangle\rvert \le \lVert u\rVert\,\lVert v\rVert` },
  { name: "Definition of e", tex: String.raw`\lim_{n \to \infty}\left(1 + \dfrac{1}{n}\right)^{n} = e` },
  { name: "Expected value", tex: String.raw`\mathbb{E}[X] = \sum_{x} x\,p(x)` },
  { name: "Euler's formula", tex: String.raw`e^{i\theta} = \cos\theta + i\sin\theta` },
  { name: "Pythagoras", tex: String.raw`a^{2} + b^{2} = c^{2}` },
];

export type TimelineItem = {
  label: string;
  detail: string;
  start: string;
  end: string;
  kind: "work" | "education";
};

export const timeline: TimelineItem[] = [
  ...experience.map((e) => ({
    label: e.orgShort,
    detail: `${e.role} — ${e.period}`,
    start: e.start,
    end: e.end,
    kind: "work" as const,
  })),
  ...education.map((e) => ({
    label: e.orgShort,
    detail: `${e.degree} — ${e.period}`,
    start: e.start,
    end: e.end,
    kind: "education" as const,
  })),
];

/** Used for the "now" marker on the timeline. Update when the CV is updated. */
export const today = "2026-09";
