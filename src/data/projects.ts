import { ProjectItem } from '../types';

// Fill these in as you ship things. `image` can point at a file you drop in
// `public/projects/` (e.g. "/projects/wordcraft.png") or any external URL.
// `liveUrl` / `repoUrl` are both optional — omit whichever doesn't apply.
export const projectsData: ProjectItem[] = [
  {
    title: 'Wordcraft',
    description:
      'Word combining game deployed on Firebase and Render. Uses multiple LLM providers for word generation.',
    image: './projects/wordcraft.jpg',
    tags: ['TypeScript', 'Node.js', 'React', 'SQLite', 'LLM'],
    liveUrl: 'https://wordcraft-7d912.web.app/',
    repoUrl: 'https://github.com/f-gee/wordcraft',
    featured: true,
  },
  {
    title: 'Enclave',
    description:
      'Multi-tenant SaaS starter with tenant-isolated auth, RBAC, and Postgres RLS — Node/Express + React, real-time via Socket.io',
    image: './projects/enclave.jpg',
    tags: ['Multi-tenancy', 'SaaS', 'TypeScript', 'Node.js', 'React', 'PostgreSQL'],
    liveUrl: 'https://f-gee.github.io/enclave',
    repoUrl: 'https://github.com/f-gee/enclave',
    featured: true,
  },
  {
    title: 'turkish-inflect',
    description:
      'Turkish noun and verb inflection library — vowel harmony, consonant mutation, and case/tense suffixes.',
    image: './projects/turkish-inflect.png',
    tags: ['Node.js', 'TypeScript'],
    repoUrl: 'https://github.com/f-gee/turkish-inflect',
  },
  {
    title: 'React Wordle',
    description:
      'Wordle clone made with React.js',
    image: './projects/wordle.jpg',
    tags: ['Node.js', 'React', 'TypeScript'],
    repoUrl: 'https://github.com/f-gee/react-wordle',
    liveUrl: 'https://f-gee.github.io/react-wordle/',
  },
  {
    title: 'Password Manager',
    description:
      'Offline password manager and generator made with React.js',
    image: './projects/password-manager.jpg',
    tags: ['Node.js', 'React', 'TypeScript'],
    repoUrl: 'https://github.com/f-gee/password-manager',
    liveUrl: 'https://f-gee.github.io/password-manager/',
  },
];
