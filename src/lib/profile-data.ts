export const profile = {
    name: "Swayam Prakash Panda",
    title: "B.Tech CSE (AI & ML) student at VIT Bhopal",
    location: "Daman, India",
    cgpa: "8.63 / 10.00",
    graduation: "May 2027",
    email: "swayam.panda200@gmail.com",
    phone: "+91 99896 54631",
    website: "https://swayam200.me/",
    github: "https://github.com/Swayam200",
    linkedin: "https://www.linkedin.com/in/swayam200",
    summary:
        "Undergraduate B.Tech student in Computer Science and Engineering (AI & ML) at VIT Bhopal with experience across NLP, computer vision, and full-stack systems. Author of IEEE work on cross-platform misinformation detection and biological-entropy random number generation, with current interests in machine learning systems, RAG applications, and scalable web platforms.",
};

export const education = [
    {
        institution: "Vellore Institute of Technology (VIT Bhopal)",
        degree: "Bachelor of Technology, Computer Science and Engineering (AI & ML)",
        location: "Bhopal, India",
        period: "2023 - 2027",
        details: `CGPA: ${profile.cgpa} | Expected graduation: ${profile.graduation}`,
    },
    {
        institution: "S S D Smt Shobhaben P Patel Day Boarding School",
        degree: "Senior Secondary (CBSE)",
        location: "Valsad, India",
        period: "2023",
        details: "PCM, 84.6%",
    },
    {
        institution: "S S D Smt Shobhaben P Patel Day Boarding School",
        degree: "Secondary (CBSE)",
        location: "Valsad, India",
        period: "2021",
        details: "94.4%",
    },
];

export const experiences = [
    {
        company: "Indian Institute of Technology, Bombay",
        role: "Summer Intern (FOSSEE)",
        period: "May 2026 - Present",
        location: "Mumbai, India",
        color: "bg-sky-500",
        roleColor: "text-sky-400",
        bullets: [
            "Engineered an interactive 3D plotting interface for the Osdag Plate Girder module using Python and Plotly.",
            "Optimized UI performance via QWebChannel, reducing plot manipulation latency by 45% and removing redundant backend re-renders.",
            "Synchronized the PySide/Qt Output Dock with the plotting widget, reducing manual user configuration steps by 60%.",
        ],
    },
    {
        company: "TechMasterAI Digi Pvt. Ltd.",
        role: "Python Development Intern",
        period: "Jan 2026 - Feb 2026",
        location: "Remote",
        color: "bg-violet-500",
        roleColor: "text-violet-400",
        bullets: [
            "Engineered a FastAPI text moderation API with a dictionary layer and ML fallback, achieving sub-1ms latency.",
            "Developed a CPU-native Speech-to-Text microservice using Vosk and WebSockets with under 50ms chunking latency.",
            "Orchestrated an AWS and Vercel migration that reduced infrastructure cost by 45% and deployment time by 70% using Docker-based CI/CD.",
        ],
    },
    {
        company: "Indian Institute of Technology, Ropar",
        role: "Winter Intern (NPTEL)",
        period: "Dec 2025 - Jan 2026",
        location: "Remote",
        color: "bg-purple-500",
        roleColor: "text-purple-400",
        bullets: [
            "Studied MERN-stack application architecture and open-source systems.",
            "Analyzed IIT Ropar projects including ViBe and Ajrasakha for API design and integration patterns.",
            "Prepared MERN case studies with architectural observations and best practices.",
        ],
    },
    {
        company: "GeeksforGeeks VIT Bhopal Chapter",
        role: "Student Coordinator",
        period: "Jan 2025 - Present",
        location: "Bhopal, India",
        color: "bg-green-500",
        roleColor: "text-green-400",
        bullets: [
            "Led a 50-member technical core team to organize campus-scale events.",
            "Conceived and executed Borderlands: Survive the Chaos during AdVITya 2026 with 200+ participants.",
            "Built the event platform and club website using React, Node.js, and Socket.IO.",
        ],
    },
    {
        company: "VITB AI Innovators Hub",
        role: "Technical Team Lead",
        period: "Sep 2025 - Present",
        location: "Bhopal, India",
        color: "bg-blue-500",
        roleColor: "text-blue-400",
        bullets: [
            "Coordinated a cross-functional team of 75+ members.",
            "Managed task allocation, sprint planning, and development workflow.",
        ],
    },
];

export const publications = [
    {
        title: "True Random Number Generator using Biological Entropy",
        venue: "IEEE ASSIC 2026 - Advanced Smart Systems and Intelligent Computing, KIIT University",
        date: "Aug 8-10, 2026",
        status: "Accepted",
        description:
            "Research on using biological entropy for true random number generation. To be published in IEEE Xplore and indexed in Scopus and Web of Science.",
        link: "https://github.com/Swayam200/goldfish_password_generator",
    },
    {
        title: "Evaluating the Portability of BERT-based Misinformation Detection from Twitter to Bluesky",
        venue: "IEEE RCSM 2025 - Recent Trends in Computing and Smart Mobility, MANIT Bhopal",
        date: "Dec 5-6, 2025",
        status: "Published",
        description:
            "IEEE Xplore-indexed paper studying cross-platform transfer of BERT-based misinformation detection models. DOI: 10.1109/RCSM67767.2025.11507728. Supervisor: Dr. Ajay Kumar Phulre.",
        link: "https://doi.org/10.1109/RCSM67767.2025.11507728",
    },
];

export type ProjectStatus = "completed" | "in-progress" | "archived";

export const projects: Array<{
    id: number;
    name: string;
    description: string;
    tech: string[];
    github: string;
    live: string | null;
    status: ProjectStatus;
    featured: boolean;
    image: string;
    color: string;
    date: string;
    highlights: string[];
}> = [
    {
        id: 1,
        name: "PDFChat",
        description:
            "Full-stack PDF RAG application that lets users upload documents, generate embeddings, and chat with the PDF using context-aware Gemini responses.",
        tech: ["Next.js", "TypeScript", "FastAPI", "LangChain", "ChromaDB", "Gemini", "Tailwind CSS"],
        github: "https://github.com/Swayam200/pdfchat",
        live: "https://pdfchat-brown.vercel.app/",
        status: "completed",
        featured: true,
        image: "/projects/pdfchat.svg",
        color: "blue",
        date: "May 2026",
        highlights: [
            "Built PDF upload, chunking, vector search, and chat over document context.",
            "Added automatic document summaries and suggested questions.",
            "Added an optional Tavily web-search toggle to supplement PDF-only RAG.",
        ],
    },
    {
        id: 2,
        name: "Goldfish-Based Password Generation System",
        description:
            "True random number generation experiment using biological entropy from swimming patterns, converting OpenCV motion tracking data into secure 256-bit cryptographic seeds.",
        tech: ["Python", "OpenCV", "NumPy", "SHA-256", "NIST STS"],
        github: "https://github.com/Swayam200/goldfish_password_generator",
        live: null,
        status: "completed",
        featured: true,
        image: "/projects/goldfish-rng.png",
        color: "green",
        date: "Dec 2024",
        highlights: [
            "Validated generated sequences with the NIST Statistical Test Suite, passing 13 of 14 benchmarks.",
            "Accepted as IEEE ASSIC 2026 research on biological entropy based TRNG.",
        ],
    },
    {
        id: 3,
        name: "Khel Saarthi",
        description:
            "Mobile-first sports community platform connecting grassroots athletes with local organizers for event discovery, registration, and real-time communication.",
        tech: ["React Native", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT"],
        github: "https://github.com/Madhuram2901/Khel-Saarthi",
        live: null,
        status: "completed",
        featured: true,
        image: "/projects/khel_saarthi.png",
        color: "cyan",
        date: "Sep 2025",
        highlights: [
            "Implemented role-based authentication with JWT and persistent sessions.",
            "Delivered event discovery, registration workflows, and real-time chat with Socket.IO.",
        ],
    },
    {
        id: 4,
        name: "Leptospirosis Risk Predictor",
        description:
            "Machine learning dashboard for predicting leptospirosis outbreak risk across 26 European nations by combining epidemiological and climate data.",
        tech: ["Python", "Scikit-learn", "React", "Node.js", "PostgreSQL", "ERA5", "ECDC"],
        github: "https://github.com/Swayam200/Leptospirosis-Predictor",
        live: "https://leptospirosis-predictor.vercel.app/",
        status: "completed",
        featured: true,
        image: "/projects/lepto-predictor.png",
        color: "yellow",
        date: "Mar 2025",
        highlights: [
            "Trained a Random Forest regression model with an R2 score of 0.833.",
            "Built geospatial map views for real-time risk visualization.",
        ],
    },
];

export const skillCategories = [
    {
        label: "// Languages",
        color: "text-yellow-300",
        skills: ["Python", "JavaScript", "TypeScript", "C++", "SQL", "HTML/CSS"],
    },
    {
        label: "// AI/ML & Data",
        color: "text-purple-300",
        skills: ["Scikit-learn", "Pandas", "NumPy", "OpenCV", "BERT", "RAG", "LLM Pipelines", "Vosk", "Plotly", "PySide/Qt"],
    },
    {
        label: "// Backend & Cloud",
        color: "text-blue-300",
        skills: ["FastAPI", "Node.js", "Express.js", "Docker", "GitHub Actions", "AWS", "Vercel", "Firebase", "Cloudflare", "Nginx"],
    },
    {
        label: "// Tools",
        color: "text-green-300",
        skills: ["Git", "PostgreSQL", "MongoDB", "Postman", "VS Code", "Agile/Scrum"],
    },
];

export const achievements = [
    {
        id: 1,
        title: "IEEE ASSIC 2026 Paper Accepted",
        organization: "IEEE ASSIC / KIIT University",
        date: "Aug 2026",
        description:
            "True Random Number Generator using Biological Entropy accepted at IEEE ASSIC 2026, to be published in IEEE Xplore and indexed in Scopus and Web of Science.",
        type: "publication" as const,
        link: "https://github.com/Swayam200/goldfish_password_generator",
    },
    {
        id: 2,
        title: "IEEE RCSM 2025 Paper Published",
        organization: "IEEE / MANIT Bhopal",
        date: "Dec 2025",
        description:
            "Evaluating the Portability of BERT-based Misinformation Detection from Twitter to Bluesky, indexed in IEEE Xplore with DOI 10.1109/RCSM67767.2025.11507728.",
        type: "publication" as const,
        link: "https://doi.org/10.1109/RCSM67767.2025.11507728",
    },
    {
        id: 3,
        title: "Summer Intern - FOSSEE",
        organization: "Indian Institute of Technology, Bombay",
        date: "May 2026",
        description:
            "Engineering interactive 3D plotting for Osdag Plate Girder using Python, Plotly, QWebChannel, and PySide/Qt.",
        type: "award" as const,
    },
    {
        id: 4,
        title: "Python Development Internship",
        organization: "TechMasterAI Digi Pvt. Ltd.",
        date: "Jan 2026",
        description:
            "Built FastAPI moderation and Vosk STT services, then supported AWS and Vercel migration with Docker-based CI/CD.",
        type: "award" as const,
    },
    {
        id: 5,
        title: "Google Data Analytics Professional Certificate",
        organization: "Google",
        date: "Jul 2025",
        description:
            "Completed the Google Data Analytics Professional Certificate covering data cleaning, visualization, SQL, and data-driven decision making.",
        type: "certification" as const,
        link: "https://www.coursera.org/account/accomplishments/specialization/2WTU1CI54SZD",
    },
    {
        id: 6,
        title: "Cloud Computing - NPTEL",
        organization: "NPTEL",
        date: "May 2025",
        description:
            "Completed NPTEL Cloud Computing certification covering cloud architectures, virtualization, and deployment models.",
        type: "certification" as const,
        link: "https://internalapp.nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS11S105230248404255066",
    },
    {
        id: 7,
        title: "Applied Machine Learning in Python",
        organization: "University of Michigan",
        date: "Dec 2024",
        description:
            "Completed the Applied Machine Learning in Python course covering supervised and unsupervised learning, model evaluation, and scikit-learn workflows.",
        type: "certification" as const,
        link: "https://www.coursera.org/account/accomplishments/verify/9Z5KW70AP9J5",
    },
    {
        id: 8,
        title: "Startup Star Season 1 - 7th Place",
        organization: "Startupvapi",
        date: "Feb 2022",
        description:
            "Secured 7th place among applicants across Valsad district after pitching Petmania, an all-in-one pet care solution.",
        type: "hackathon" as const,
    },
];

export function getPortfolioContext() {
    const lines = [
        `Name: ${profile.name}`,
        `Title: ${profile.title}`,
        `Location: ${profile.location}`,
        `CGPA: ${profile.cgpa}`,
        `Graduation: ${profile.graduation}`,
        `Email: ${profile.email}`,
        `Website: ${profile.website}`,
        `GitHub: ${profile.github}`,
        `LinkedIn: ${profile.linkedin}`,
        `Summary: ${profile.summary}`,
        "",
        "Education:",
        ...education.map((item) => `- ${item.degree}, ${item.institution}, ${item.period}, ${item.details}`),
        "",
        "Experience:",
        ...experiences.map((item) => `- ${item.role}, ${item.company}, ${item.period}. ${item.bullets.join(" ")}`),
        "",
        "Publications:",
        ...publications.map((item) => `- ${item.title}. ${item.status} at ${item.venue}, ${item.date}. ${item.description}`),
        "",
        "Projects:",
        ...projects.map((item) => `- ${item.name}: ${item.description} Tech: ${item.tech.join(", ")}. Highlights: ${item.highlights.join(" ")}`),
        "",
        "Skills:",
        ...skillCategories.map((category) => `- ${category.label.replace("// ", "")}: ${category.skills.join(", ")}`),
        "",
        "Achievements:",
        ...achievements.map((item) => `- ${item.title}, ${item.organization}, ${item.date}. ${item.description}`),
    ];

    return lines.join("\n");
}

export const searchableFacts = getPortfolioContext()
    .split("\n")
    .filter((line) => line.trim().length > 0);
