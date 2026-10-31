// Copy for the "How we're building Knull" section. Kept apart from the visualization so it can be edited alone.

export const SECTION_COPY = {
  eyebrow: "HOW WE'RE BUILDING KNULL",
  heading: ['Intelligence, reimagined', 'from the neuron up.'],
  intro:
    "We're researching a new approach to artificial intelligence, combining our own language model, brain-inspired neural architectures, and bio-neural interfaces to explore intelligence beyond conventional AI.",
  closingEyebrow: 'FROM RESEARCH TO REALITY',
  closing:
    'Our work explores how language, biological inspiration, and emotion-related neural learning could come together in a fundamentally different AI architecture.',
  timeline: [
    { label: 'Currently in R&D', value: 'Through Q1 2027' },
    { label: 'First invite-only alpha', value: 'Targeted for Q2 2027' },
  ],
};

// `color` is the region's accent in the canvas and on the card; `status` keeps the research stage visible per layer.
export const LAYERS = [
  {
    id: 0,
    number: '01',
    title: 'Perception & Input',
    headline: 'Where intelligence begins.',
    description:
      "Knull's language model will receive and structure information, preserving context, relationships, and meaning rather than treating every interaction as isolated.",
    status: 'In R&D',
    color: '#93C5FD',
    focusNote: 'Separate input streams reach the outer neurons and settle into organised patterns before moving on.',
  },
  {
    id: 1,
    number: '02',
    title: 'Neural Processing & Reasoning',
    headline: 'From information to understanding.',
    description:
      "Our model will learn representations, connect patterns, process context, and reason across information through an architecture we're developing ourselves.",
    status: 'In R&D',
    color: '#C8E63A',
    focusNote: 'Clusters activate in sequence, competing pathways diverge, and one converges and passes forward.',
  },
  {
    id: 2,
    number: '03',
    title: 'Bio-Neural Integration',
    headline: 'Bridging artificial and biological intelligence.',
    description:
      "We're exploring how our language model could interface with biological neural signals, opening new possibilities for brain-inspired computation and adaptive intelligence.",
    status: 'Exploratory research',
    color: '#C4B5FD',
    accent: '#F2C94C',
    focusNote: 'An artificial network and a biology-inspired network exchange signals across a proposed interface, shown as a research concept.',
  },
  {
    id: 3,
    number: '04',
    title: 'Emotional Neural Learning',
    headline: 'Beyond recognizing emotions. Learning from them.',
    description:
      "We're researching neural representations trained on emotional patterns, context, and feedback, aiming for AI whose responses adapt to emotional meaning rather than relying on predefined reactions.",
    status: 'Exploratory research',
    color: '#6EE7B7',
    focusNote: 'Groups of neurons shift through distinct activation patterns, settle into a coordinated state, and send feedback to earlier regions.',
  },
];
