
// Mock question bank for dynamic generation
const questionBank = {
    // Core CS
    DSA: ["Explain BFS vs DFS.", "What is the time complexity of QuickSort?", "How does a Hash Map work?", "Detect a cycle in a linked list."],
    OOP: ["Explain Polymorphism with an example.", "What is the Diamond Problem in Multiple Inheritance?", "Difference between Abstract Class and Interface."],
    DBMS: ["Explain ACID properties.", "What is Normalization?", "Explain Indexing and when it helps."],
    OS: ["Process vs Thread.", "Explain Deadlock and how to avoid it.", "What is Paging?"],
    Networks: ["Explain the OSI Model layers.", "TCP vs UDP.", "What happens when you type a URL in the browser?"],

    // Languages
    Java: ["Explain JVM architecture.", "What is the difference between equal() and ==?", "Explain Garbage Collection."],
    Python: ["Explain list comprehension.", "What are decorators?", "Explain GIL (Global Interpreter Lock)."],
    JavaScript: ["Explain Closures.", "What is the Event Loop?", "Explain 'this' keyword behavior."],
    TypeScript: ["Interface vs Type.", "Explain Generics in TypeScript.", "What are Decorators?"],
    "C++": ["Explain Virtual Functions.", "What are Smart Pointers?", "Explain RAII."],

    // Web
    React: ["Explain Virtual DOM.", "What are Hooks? List common ones.", "Explain State Management options (Redux/Context)."],
    "Next.js": ["SSR vs SSG vs ISR.", "How does routing work in Next.js?", "Explain API Routes."],
    "Node.js": ["Explain the Event Loop in Node.js.", "Difference between process.nextTick() and setImmediate()."],
    Express: ["What is Middleware?", "How to handle errors in Express?"],

    // Data
    SQL: ["Explain JOINs (Inner, Left, Right).", "Difference between WHERE and HAVING.", "How to optimize SQL queries?"],
    MongoDB: ["SQL vs NoSQL.", "Explain Aggregation Pipeline.", "What is Sharding?"],
    PostgreSQL: ["Explain Vacuuming.", "What are JSONB columns?", "Explain MVCC."],

    // Cloud/DevOps
    AWS: ["Explain EC2 vs Lambda.", "What is S3?", "Explain VPC."],
    Docker: ["Container vs VM.", "Explain Dockerfile commands.", "What is Docker Compose?"],
    Kubernetes: ["Pod vs Node.", "Explain Deployments and Services.", "What is Ingress?"],

    // Testing
    Testing: ["Unit vs Integration Testing.", "What is TDD?", "Explain Mocking."]
};


// Expanded keywords list
const skillCategories = {
    "coreCS": ["DSA", "Data Structures", "Algorithms", "OOP", "Object Oriented", "DBMS", "Database Management", "OS", "Operating System", "Networks", "Computer Networks"],
    "languages": ["Java", "Python", "JavaScript", "JS", "TypeScript", "TS", "C++", "C#", "Go", "Golang", "Rust", "Swift", "Kotlin"],
    "web": ["React", "React.js", "Next.js", "Vue", "Angular", "Node", "Node.js", "Express", "NestJS", "HTML", "CSS", "Tailwind", "Bootstrap", "REST", "GraphQL"],
    "data": ["SQL", "MySQL", "PostgreSQL", "Postgres", "MongoDB", "NoSQL", "Redis", "Elasticsearch", "Cassandra", "Kafka"],
    "cloud": ["AWS", "Amazon Web Services", "Azure", "GCP", "Google Cloud", "Docker", "Kubernetes", "K8s", "Jenkins", "Git", "GitHub", "CI/CD", "Linux", "Bash"],
    "testing": ["Selenium", "Cypress", "Playwright", "Jest", "Mocha", "JUnit", "PyTest"]
};

// Map categories to display titles for legacy/internal use if needed
const categoryTitles = {
    coreCS: "Core CS",
    languages: "Languages",
    web: "Web",
    data: "Data",
    cloud: "Cloud/DevOps",
    testing: "Testing",
    other: "Other"
};

export function analyzeJobDescription(jdText, company = "", role = "") {
    const extractedSkills = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: []
    };

    let baseScore = 35; // Initial base score

    if (!jdText) {
        return { error: "No Job Description provided" };
    }

    const jdLower = jdText.toLowerCase();
    let anySkillFound = false;

    // 1. Skill Extraction
    Object.entries(skillCategories).forEach(([category, keywords]) => {
        const found = keywords.filter(k =>
            new RegExp(`\\b${k.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(jdLower)
        );

        if (found.length > 0) {
            extractedSkills[category] = [...new Set(found)];
            anySkillFound = true;
            baseScore += 5; // +5 per category present
        }
    });

    // 3. Default behavior if no skills detected
    if (!anySkillFound) {
        extractedSkills.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
        // We don't increment anySkillFound here to let other parts know we are using defaults
    }

    // Score Calculations (Base Score only computed on analyze)
    if (company.trim().length > 0) baseScore += 10;
    if (role.trim().length > 0) baseScore += 10;
    if (jdText.length > 800) baseScore += 10;
    if (jdText.length > 2000) baseScore += 5;

    if (baseScore > 90) baseScore = 90; // Leave room for improvement via skills

    // Initial finalScore is same as baseScore
    const finalScore = baseScore;

    // Prepare Skill Confidence Map (all default to "practice")
    const skillConfidenceMap = {};
    Object.values(extractedSkills).forEach(skills => {
        skills.forEach(skill => {
            skillConfidenceMap[skill] = "practice";
        });
    });

    const allSkillsFound = Object.values(extractedSkills).flat();

    // 2. Round Mapping
    const roundMapping = [
        {
            roundTitle: "Round 1: Aptitude & Basics",
            focusAreas: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability"],
            whyItMatters: "Initial screening to test problem-solving speed and basic communication."
        },
        {
            roundTitle: "Round 2: Technical & Coding",
            focusAreas: [
                ...(extractedSkills.languages.length > 0 ? extractedSkills.languages : ["Programming Fundamentals"]),
                ...(extractedSkills.coreCS.length > 0 ? extractedSkills.coreCS : ["Problem Solving"])
            ],
            whyItMatters: "Core technical assessment to evaluate implementation skills and theoretical knowledge."
        },
        {
            roundTitle: "Round 3: Advanced Domain",
            focusAreas: [
                ...(extractedSkills.web.length > 0 ? ["Web Architecture"] : []),
                ...(extractedSkills.data.length > 0 ? ["Database Design"] : []),
                ...(extractedSkills.cloud.length > 0 ? ["DevOps/Cloud"] : []),
                ...(extractedSkills.other.length > 0 && !anySkillFound ? ["Project Presentation"] : []),
                "System Design & Scalability"
            ].filter(Boolean),
            whyItMatters: "Deep dive into specific project experience and specialized tech stack."
        }
    ];

    // 3. Checklist Generation
    const checklist = [
        {
            roundTitle: "Aptitude & Basics",
            items: [
                "Review Quantitative Aptitude (Time & Work, Profit/Loss)",
                "Practice Logical Reasoning puzzles",
                "Brush up on basic English grammar",
                `Revise ${extractedSkills.languages[0] || 'basic programming'} syntax`
            ]
        },
        {
            roundTitle: "Technical Deep Dive",
            items: [
                ...(extractedSkills.coreCS.length > 0 ? extractedSkills.coreCS.map(s => `Revise ${s} concepts`) : ["Practice standard Array/String problems"]),
                "Solve 5 medium LeetCode problems",
                "Review complexity analysis (Time & Space)"
            ]
        },
        {
            roundTitle: "Behavioral & Projects",
            items: [
                "STAR method for behavioral questions",
                "Explain your most challenging project",
                ...(anySkillFound ? ["Link project tech stack to JD requirements"] : ["Prepare detailed walkthrough of 2 major projects"]),
                "Research company values and culture"
            ]
        }
    ];

    // 4. 7-Day Plan
    const plan7Days = [
        { day: "Day 1-2", focus: "Fundamentals", tasks: ["Review DSA", "Solve basic problems", "Revise core concepts"] },
        {
            day: "Day 3-4", focus: "Domain Specific", tasks: [
                ...(anySkillFound
                    ? ["Focus on " + (extractedSkills.web[0] || extractedSkills.data[0] || extractedSkills.cloud[0] || "primary tech")]
                    : ["Focus on Communication and Problem Solving"]),
                "Mock coding rounds"
            ]
        },
        { day: "Day 5", focus: "Projects", tasks: ["Deep dive into personal projects", "Prepare architecture diagrams"] },
        { day: "Day 6", focus: "Mocks", tasks: ["Full length mock interview", "Behavioral questions practice"] },
        { day: "Day 7", focus: "Review", tasks: ["Quick revision of all formulas/notes", "Final check of resume"] }
    ];

    // 5. Questions Generation
    const questions = [];

    Object.keys(questionBank).forEach(key => {
        if (allSkillsFound.some(tag => tag.toLowerCase() === key.toLowerCase() || (key === 'JS' && tag.toLowerCase() === 'javascript') || (key === 'TS' && tag.toLowerCase() === 'typescript'))) {
            questions.push(...questionBank[key]);
        }
    });

    if (questions.length < 5) {
        questions.push("Describe a challenging project you worked on.", "Explain a situation where you handled conflict in a team.", "What is your greatest technical strength?");
    }

    if (questions.length < 10) {
        questions.push("Where do you see yourself in 5 years?", "Why do you want to join this company?", "Describe your ideal work environment.");
    }

    const finalQuestions = [...new Set(questions)].sort(() => 0.5 - Math.random()).slice(0, 10);

    return {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company,
        role,
        jdText,
        extractedSkills,
        roundMapping,
        checklist,
        plan7Days,
        questions: finalQuestions,
        baseScore,
        skillConfidenceMap,
        finalScore
    };
}
