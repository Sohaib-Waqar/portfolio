const LAYERS = [
  {
    id: 0, name: "BACKGROUND", sub: "Where I Started",
    desc: "The personal foundations — traits and experiences that shaped how I think, learn and build.",
    nodes: [
      { label: "Pakistan → UK",        detail: "Cross-cultural move that unlocked focus, consistency & access to tech events" },
      { label: "Self-Taught Mindset",  detail: "Most practical skills learned independently — not in a classroom" },
      { label: "Deep Work",            detail: "Seek out cafes & libraries for focused, distraction-free sessions" },
      { label: "Tech Networking",      detail: "Actively attends UK tech events to meet and learn from the industry" },
      { label: "Creative Thinking",    detail: "Approaches problems from unexpected angles — builds first, learns along the way" },
      { label: "Resilience",           detail: "Balancing MSc, part-time work & self-learning simultaneously" }
    ]
  },
  {
    id: 1, name: "FOUNDATIONS", sub: "CS & MSc Degree",
    desc: "Core technical knowledge from a BSc Computer Science degree and an MSc Data Science at Middlesex University.",
    nodes: [
      { label: "Data Structures",      detail: "Arrays, trees, graphs, hash maps — BSc core module" },
      { label: "Algorithms",           detail: "Sorting, searching, complexity analysis" },
      { label: "Databases & SQL",      detail: "Strong — relational design, queries, optimisation" },
      { label: "Networking & Security",detail: "BSc module — protocols, encryption, threat modelling" },
      { label: "Python",               detail: "Primary language — scripting, data pipelines, ML models" },
      { label: "Git & GitHub",         detail: "Version control, branching, reproducible ML pipelines on GitHub" }
    ]
  },
  {
    id: 2, name: "SPECIALISMS", sub: "What I Went Deep On",
    desc: "Areas I chose to go beyond the curriculum — self-taught through projects and real datasets.",
    nodes: [
      { label: "Machine Learning",     detail: "LightGBM, XGBoost, Random Forest — benchmarked on 3.97M row dataset" },
      { label: "Data Engineering",     detail: "Pandas pipelines, Haversine spatial matching, time-series splits" },
      { label: "React & Vite",         detail: "Component-driven UIs, hooks, React Router, custom CSS" },
      { label: "Flask & REST APIs",    detail: "Python backends, JSON APIs, HuggingFace model serving" },
      { label: "Three.js & Canvas",    detail: "3D web graphics, WebGL, interactive Canvas 2D visualisations" },
      { label: "AR Development",       detail: "Image-tracking AR for FYP — 3D overlays on printed newsletters" }
    ]
  },
  {
    id: 3, name: "PROJECTS", sub: "Built & Shipped",
    desc: "Real things built and deployed — from MSc dissertation to AR platforms to this portfolio.",
    nodes: [
      { label: "SKU Forecasting",      detail: "LightGBM pipeline — 3.97M rows, MAE 3.55 bottles/week, 31% vs baseline" },
      { label: "EcoLearn AR Platform", detail: "React + Flask + AR image tracking + fine-tuned HuggingFace storyteller" },
      { label: "Weather Integration",  detail: "Haversine spatial matching of 61 Mesonet stations to 1,000+ store locations" },
      { label: "Holiday Engineering",  detail: "Custom US/Iowa holiday calendar scraped with BeautifulSoup" },
      { label: "3D Portfolio",         detail: "This site — Canvas 2D neural network with auto-rotate & hover tooltips" },
      { label: "Model Benchmarking",   detail: "RF vs XGBoost vs LightGBM — chronological splits, no leakage" }
    ]
  },
    {
    id: 4, name: "NOW SEEKING", sub: "Open to Opportunities",
    desc: "Actively looking for graduate roles in the UK — available immediately.",
    nodes: [
      { label: "Data Analyst",         detail: "SQL, Python, EDA, dashboards & business insights from real data" },
      { label: "AI Engineer",          detail: "LLMs, prompt engineering, ML pipelines & production AI systems" },
      { label: "ML Engineer",          detail: "Model training, evaluation, deployment & MLOps pipelines" }
    ]
  }
];

export default LAYERS;