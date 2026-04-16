import { Routes, Route } from 'react-router-dom';
import Header        from './components/Header';
import Hero          from './components/Hero';
import LayerCards    from './components/LayerCards';
import Contact       from './components/Contact';
import Footer        from './components/Footer';
import Projects      from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Skills        from './pages/Skills';       // ← add
import './index.css';

function Home() {
  return (
    <>
      <Hero />
      <LayerCards />
      <Contact />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/projects"      element={<Projects />} />
        <Route path="/projects/:id"  element={<ProjectDetail />} />
        <Route path="/skills"        element={<Skills />} />   {/* ← add */}
      </Routes>
      {/* tooltip ... */}
    </>
  );
}