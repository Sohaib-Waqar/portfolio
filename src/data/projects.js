const PROJECTS = [
  {
    id: 'sku-demand-forecasting',
    title: 'SKU Demand Forecasting',
    tags: ['machine learning', 'python', 'data science', 'ai'],
    description: 'MSc dissertation project. Built an end-to-end ML pipeline to forecast weekly liquor sales across 1,000+ Iowa stores and 3,000 SKUs. LightGBM achieved a test MAE of 3.55 bottles/week — a 31% improvement over the naive baseline — using 3.97M transactions enriched with Iowa Mesonet weather data and holiday indicators.',
    year: '2025',
    role: 'ML Engineering & Data Science',
    stack: ['Python', 'LightGBM', 'XGBoost', 'scikit-learn', 'Pandas', 'NumPy'],
    color: '#00e676',
    bg: '#080f0a',
    featured: true,
    highlights: [
      '3.97M transactions processed across 50,992 store-item-week combinations',
      'LightGBM MAE: 3.550 bottles/week — 31% better than lag-1 baseline',
      '11 engineered features: lag sales, weather & holidays',
      'Spatial weather matching via Haversine across 61 Iowa Mesonet stations',
      'Benchmarked Random Forest, XGBoost and LightGBM with chronological splits',
      'Production stock formula: predicted demand + 5-bottle safety buffer'
    ]
  },
  {
    id: 'mount-agency',
    title: 'MOUNT — Marketing Agency',
    tags: ['startup', 'web', 'wordpress', 'shopify', 'marketing'],
    description: 'Founded and ran a digital marketing agency during my final university year, serving UK and US clients. Delivered brand building, website development on WordPress and Shopify, and SEO services. Managed 4 clients simultaneously while juggling a full-time degree — the most formative leadership experience of my career so far.',
    year: '2023–2024',
    role: 'Founder & Creative Director',
    stack: ['WordPress', 'Shopify', 'SEO', 'Brand Strategy', 'Client Management'],
    color: '#f59e0b',
    bg: '#0f0d08',
    featured: true,
    highlights: [
      '4 active UK & US clients served simultaneously',
      'Full service: brand identity, website builds, SEO & marketing strategy',
      'Hired and managed an SEO specialist — first time managing another person',
      'Ran client meetings, proposals, briefs and delivery independently',
      'Learned conflict resolution, expectation management & professional communication',
      'Operated solo while completing final year of BSc Computer Science'
    ]
  },
  {
    id: 'climate-change-ar',
    title: 'EcoLearn — AR & AI Education Platform',
    tags: ['react', 'ar', 'ai', 'three.js', 'python'],
    description: 'Final year undergraduate project. An interactive educational website on climate change featuring image-tracking AR — point your camera at a climate change newsletter to see a 3D visualisation of environmental damage — plus a fine-tuned HuggingFace storyteller that only generates climate-focused narratives.',
    year: '2024',
    role: 'Full Stack & AR Development',
    stack: ['React', 'Three.js', 'Flask', 'HuggingFace', 'Python', 'ARFoundation'],
    color: '#7c3aed',
    bg: '#0d0a14',
    featured: false,
  },
  {
    id: 'neural-portfolio',
    title: 'Neural Network Portfolio',
    tags: ['react', 'canvas', '3d', 'web'],
    description: 'This site. A personal portfolio that visualises a career journey as an interactive 3D neural network. Built with vanilla Canvas 2D — drag to rotate, scroll to zoom, hover nodes for details. Auto-rotates and pauses on hover.',
    year: '2025',
    role: 'Design & Development',
    stack: ['React', 'Vite', 'Canvas 2D', 'CSS'],
    color: '#06b6d4',
    bg: '#080d10',
    featured: false,
  },
];

export default PROJECTS;