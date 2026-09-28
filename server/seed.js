export const courses = [
  {
    id: 'technology-fundamentals',
    slug: 'technology-fundamentals',
    title: 'Technology Fundamentals',
    summary:
      'An introductory program that builds a solid foundation in essential digital and technology skills.',
    description:
      'Start with how computers, the internet, files, and everyday software actually fit together. You will leave able to set up a simple, safe digital workflow for study or work.',
    level: 'Beginner',
    category: 'Foundations',
    hours: 6,
    image: 'hero',
    outcomes: [
      'Explain how devices, networks, and the cloud work together',
      'Organize files so you can find them again',
      'Choose everyday tools with confidence',
    ],
    lessons: [
      {
        id: 'tf-1',
        title: 'Devices, networks, and the cloud',
        minutes: 35,
        body: 'Map the path from your laptop to a website, and learn the words people use when something breaks.',
      },
      {
        id: 'tf-2',
        title: 'Files, folders, and cloud storage',
        minutes: 40,
        body: 'Name files clearly, build a folder system, and know when a file lives on your device versus online.',
      },
      {
        id: 'tf-3',
        title: 'Everyday software you will actually use',
        minutes: 45,
        body: 'Practice the small set of tools that cover writing, spreadsheets, browsing, and collaboration.',
      },
      {
        id: 'tf-4',
        title: 'Accounts, passwords, and a first workflow',
        minutes: 30,
        body: 'Lock down the accounts you just created and stitch the lessons into one repeatable routine.',
      },
    ],
  },
  {
    id: 'practical-digital-skills',
    slug: 'practical-digital-skills',
    title: 'Practical Digital Skills',
    summary:
      'Learn essential tools and techniques to apply technology across education, career, and daily tasks.',
    description:
      'Move from “I can open the app” to “I can finish the task.” This course is built around documents, communication, and the habits that make digital work less stressful.',
    level: 'Beginner',
    category: 'Workplace',
    hours: 5,
    image: 'skills',
    outcomes: [
      'Produce clean documents and simple spreadsheets',
      'Communicate clearly in email and chat',
      'Build a weekly system for digital tasks',
    ],
    lessons: [
      {
        id: 'pd-1',
        title: 'Documents that people can read',
        minutes: 40,
        body: 'Structure headings, lists, and links so a document is easy to scan and easy to share.',
      },
      {
        id: 'pd-2',
        title: 'Spreadsheets for real lists',
        minutes: 45,
        body: 'Sort, filter, and total a list without turning it into a mess.',
      },
      {
        id: 'pd-3',
        title: 'Email and chat that get a reply',
        minutes: 30,
        body: 'Write short messages with a clear ask, and know what does not belong in chat.',
      },
      {
        id: 'pd-4',
        title: 'A week of digital work',
        minutes: 35,
        body: 'Plan tasks, capture notes, and close the loop so nothing lives only in your head.',
      },
    ],
  },
  {
    id: 'web-foundations',
    slug: 'web-foundations',
    title: 'Web Foundations',
    summary: 'See how a modern web page is structured, styled, and shipped to a browser.',
    description:
      'A practical first look at HTML, CSS, and the idea of components. You will read a small page, change it, and understand what the browser is doing.',
    level: 'Beginner',
    category: 'Development',
    hours: 8,
    image: 'about',
    outcomes: [
      'Read and edit simple HTML and CSS',
      'Explain what a component is',
      'Preview a page locally and describe your change',
    ],
    lessons: [
      {
        id: 'wf-1',
        title: 'What the browser receives',
        minutes: 30,
        body: 'Follow a request from the address bar to the pixels on screen.',
      },
      {
        id: 'wf-2',
        title: 'Structure with HTML',
        minutes: 50,
        body: 'Mark up a short article with headings, paragraphs, links, and images.',
      },
      {
        id: 'wf-3',
        title: 'Layout and type with CSS',
        minutes: 55,
        body: 'Space a page, set type, and make a layout that works on a phone and a laptop.',
      },
      {
        id: 'wf-4',
        title: 'From page to component',
        minutes: 40,
        body: 'Split a repeated card into a reusable piece and render it from a list of data.',
      },
    ],
  },
  {
    id: 'data-literacy',
    slug: 'data-literacy',
    title: 'Data Literacy',
    summary: 'Read charts, question numbers, and turn a messy table into a decision.',
    description:
      'You do not need to become an analyst. You need to know when a number is useful, when it is misleading, and how to summarize a table for someone else.',
    level: 'Intermediate',
    category: 'Data',
    hours: 7,
    image: 'connection',
    outcomes: [
      'Read a chart without being misled by the axis',
      'Clean a small table and compute a useful summary',
      'Write a short recommendation from evidence',
    ],
    lessons: [
      {
        id: 'dl-1',
        title: 'Questions before charts',
        minutes: 30,
        body: 'Start from the decision you need to make, then decide which numbers matter.',
      },
      {
        id: 'dl-2',
        title: 'Tables, types, and messy cells',
        minutes: 45,
        body: 'Spot missing values, mixed units, and columns that do not mean what their header says.',
      },
      {
        id: 'dl-3',
        title: 'Averages, ranges, and comparisons',
        minutes: 40,
        body: 'Choose a summary that matches the question, and say what it does not prove.',
      },
      {
        id: 'dl-4',
        title: 'Telling someone what you found',
        minutes: 35,
        body: 'Write a one-page note: the question, the evidence, and the next step.',
      },
    ],
  },
  {
    id: 'security-basics',
    slug: 'security-basics',
    title: 'Security Basics',
    summary: 'Protect accounts, spot common scams, and build habits that survive a busy week.',
    description:
      'A calm introduction to personal and workplace security: passwords, phishing, updates, and what to do when something looks wrong.',
    level: 'Beginner',
    category: 'Security',
    hours: 4,
    image: 'certificate',
    outcomes: [
      'Use a password manager and multi-factor authentication',
      'Recognize common phishing patterns',
      'Know the first three steps when an account looks compromised',
    ],
    lessons: [
      {
        id: 'sb-1',
        title: 'Accounts worth protecting',
        minutes: 30,
        body: 'Rank the accounts that unlock everything else, then lock those first.',
      },
      {
        id: 'sb-2',
        title: 'Passwords and second factors',
        minutes: 35,
        body: 'Stop reusing passwords and turn on a second check for email, banking, and work tools.',
      },
      {
        id: 'sb-3',
        title: 'Phishing, without the panic',
        minutes: 30,
        body: 'Look at sender, link, and urgency. Practice pausing before you click or pay.',
      },
      {
        id: 'sb-4',
        title: 'Updates and what to do next',
        minutes: 25,
        body: 'Keep software current, and follow a short checklist if you think an account was accessed.',
      },
    ],
  },
  {
    id: 'ai-tools-for-work',
    slug: 'ai-tools-for-work',
    title: 'AI Tools for Work',
    summary: 'Use assistants for drafts and research while keeping judgment, sources, and privacy.',
    description:
      'Learn where an AI assistant helps, where it invents, and how to write prompts that produce something you can actually check.',
    level: 'Intermediate',
    category: 'AI',
    hours: 5,
    image: 'chatbot',
    outcomes: [
      'Write prompts that include context, constraints, and a format',
      'Check an answer before you rely on it',
      'Keep private data out of tools that should not see it',
    ],
    lessons: [
      {
        id: 'ai-1',
        title: 'What these tools are doing',
        minutes: 30,
        body: 'A plain explanation of prediction, confidence, and why a fluent answer can still be wrong.',
      },
      {
        id: 'ai-2',
        title: 'Prompts for real tasks',
        minutes: 40,
        body: 'Ask for a draft, a checklist, or a rewrite — and specify the audience and the length.',
      },
      {
        id: 'ai-3',
        title: 'Checking the work',
        minutes: 35,
        body: 'Verify names, numbers, and citations. Treat the assistant as a junior colleague.',
      },
      {
        id: 'ai-4',
        title: 'Privacy and workplace rules',
        minutes: 25,
        body: 'Decide what you can paste into a tool, and what should stay inside your organization.',
      },
    ],
  },
]

export function summarizeCourse(course) {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    summary: course.summary,
    level: course.level,
    category: course.category,
    hours: course.hours,
    lessonCount: course.lessons.length,
    image: course.image,
    outcomes: course.outcomes,
  }
}
