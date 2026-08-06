require('dotenv').config();
const connectDB = require('./db');
const Project = require('./models/Project');

const projects = [
  {
    slug: 'distworkspace',
    path: '~/projects/distworkspace',
    title: 'DistWorkspace',
    status: 'shipped',
    description:
      "A real-time collaborative workspace built from scratch: Raft consensus for a distributed key-value store, an RGA CRDT engine for conflict-free collaborative text editing, a Kafka-style event streaming broker, and a fault-tolerant job scheduler with leader election — all wired together over a shared async TCP transport. 15/15 tests pass, including a live 3-node cluster smoke test.",
    tags: ['Python', 'Raft consensus', 'CRDT', 'Event streaming', 'Distributed systems'],
    repoLink: 'https://github.com/Nikhil-creat/distworkspace',
    order: 1
  },
  {
    slug: 'neuroscan-ai',
    path: '~/projects/neuroscan-ai',
    title: 'NeuroScan AI',
    status: 'shipped',
    description:
      "Final-year mini project — an explainable clinical decision support system for brain MRI diagnosis. A CNN classifies scans into Brain Tumor, Alzheimer's Disease, or Normal Anatomy; Grad-CAM highlights the regions driving each prediction; and a RAG module retrieves relevant clinical knowledge to explain the result. Delivered as a Django web app with a patient upload portal and a clinician review dashboard.",
    tags: ['Python', 'CNN', 'Grad-CAM', 'RAG', 'Django', 'MySQL'],
    repoLink: '',
    order: 2
  },
  {
    slug: 'chat-with-your-data',
    path: '~/projects/chat-with-your-data',
    title: 'Chat With Your Data',
    status: 'progress',
    description:
      'An AI agent that lets you ask questions about your data in plain English. It translates natural language into SQL, runs the query, and surfaces auto-generated insights — turning "what were our top products last quarter?" into an answer, not a query editor.',
    tags: ['Python', 'NL → SQL', 'LLM agents', 'Auto-insights'],
    repoLink: '',
    order: 3
  },
  {
    slug: 'voice-console',
    path: '~/projects/voice-console',
    title: 'AI Voice Console',
    status: 'progress',
    description:
      'A voice assistant that speaks with a cloned version of my own voice, built to handle client conversations end to end — customer support, sales and lead qualification, a spoken portfolio walkthrough, and scheduling — reachable by phone and web widget.',
    tags: ['Voice cloning', 'Conversational AI', 'Automation'],
    repoLink: '',
    order: 4
  }
];

(async () => {
  try {
    await connectDB();
    for (const p of projects) {
      await require('./models/Project').findOneAndUpdate(
        { slug: p.slug },
        p,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`Upserted: ${p.slug}`);
    }
    console.log('Seed complete.');
  } catch (err) {
    console.error('Seed failed:', err.message);
  } finally {
    process.exit(0);
  }
})();
