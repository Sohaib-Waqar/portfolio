import { useEffect, useRef } from 'react';
import LAYERS from '../data/layers';

export default function NeuralCanvas() {
  const canvasRef  = useRef(null);
  const wrapRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    const ctx    = canvas.getContext('2d');
    const dpr    = window.devicePixelRatio || 1;

    function resize() {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ── State
    let rotY = 0, rotX = 0.12;
    let targetRotY = 0, targetRotX = 0.12;
    let isDragging  = false;
    let isHovering  = false;   // ← pause auto-rotate when mouse is over canvas
    let lastMX = 0, lastMY = 0;
    let zoom = 1.3, targetZoom = 1.3;
    let autoRotSpeed = 0.0018;  // radians per frame — slow gentle spin

    const tooltip = document.getElementById('tooltip');
    const ttTitle  = document.getElementById('tt-title');
    const ttLayer  = document.getElementById('tt-layer');
    const ttDetail = document.getElementById('tt-detail');

    function buildModel() {
      const xStep = 620 / (LAYERS.length - 1);
      return LAYERS.flatMap((layer, li) =>
        layer.nodes.map((node, ni) => ({
          mx: -310 + li * xStep,
          my: (ni - (layer.nodes.length - 1) / 2) * 68,
          mz: li % 2 === 0 ? -10 : 10,
          layer: li, ni, node, layerData: layer
        }))
      );
    }
    const MODEL = buildModel();

    function project(mx, my, mz) {
      const sx = mx * zoom, sy = my * zoom, sz = mz * zoom;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const rx  = sx * cosY - sz * sinY;
      const rz  = sx * sinY + sz * cosY;
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const ry2 = sy * cosX - rz * sinX;
      const rz2 = sy * sinX + rz * cosX;
      const fov = 900, sc = fov / (fov + rz2 + 50);
      return {
        sx: canvas.width  / 2 + rx * sc,
        sy: canvas.height / 2 + ry2 * sc,
        scale: sc, z: rz2
      };
    }

    let hovered = null;
    function nodeR(n, p) {
      return (n.layer === 0 ? 15 : n.layer === LAYERS.length - 1 ? 20 : 13) * dpr * p.scale;
    }

    function pick(mx, my) {
      let best = null, bd = 9999;
      for (const n of MODEL) {
        const p  = project(n.mx, n.my, n.mz);
        const dx = p.sx / dpr - mx, dy = p.sy / dpr - my;
        const r  = nodeR(n, p) / dpr;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < r * 1.5 && d < bd) { bd = d; best = n; }
      }
      return best;
    }

    // ── Events
    function onMouseEnter() { isHovering = true; }

    function onMouseMove(e) {
      isHovering = true;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (isDragging) {
        targetRotY += (e.clientX - lastMX) * 0.007;
        targetRotX += (e.clientY - lastMY) * 0.007;
        targetRotX  = Math.max(-0.55, Math.min(0.55, targetRotX));
        lastMX = e.clientX; lastMY = e.clientY;
        hovered = null; tooltip.classList.remove('visible');
        return;
      }

      hovered = pick(mx, my);
      if (hovered) {
        ttTitle.textContent  = hovered.node.label;
        ttLayer.textContent  = `${hovered.layerData.name} — ${hovered.layerData.sub}`;
        ttDetail.textContent = hovered.node.detail;
        tooltip.classList.add('visible');
        tooltip.style.left = (e.clientX + 14) + 'px';
        tooltip.style.top  = (e.clientY - 8)  + 'px';
      } else {
        tooltip.classList.remove('visible');
      }
    }

    function onMouseLeave() {
      isHovering = false;
      hovered = null;
      tooltip.classList.remove('visible');
    }

    function onMouseDown(e) { isDragging = true; lastMX = e.clientX; lastMY = e.clientY; }
    function onMouseUp()    { isDragging = false; }

    function onTouchStart(e) {
      isDragging = true;
      isHovering = true;
      lastMX = e.touches[0].clientX; lastMY = e.touches[0].clientY;
    }
    function onTouchMove(e) {
      if (!isDragging) return;
      targetRotY += (e.touches[0].clientX - lastMX) * 0.007;
      targetRotX += (e.touches[0].clientY - lastMY) * 0.007;
      targetRotX  = Math.max(-0.55, Math.min(0.55, targetRotX));
      lastMX = e.touches[0].clientX; lastMY = e.touches[0].clientY;
    }
    function onTouchEnd() { isDragging = false; isHovering = false; }

    function onWheel(e) {
      e.preventDefault();
      targetZoom *= e.deltaY > 0 ? 0.93 : 1.08;
      targetZoom  = Math.max(0.35, Math.min(1.8, targetZoom));
    }

    canvas.addEventListener('mouseenter',  onMouseEnter);
    canvas.addEventListener('mousemove',   onMouseMove);
    canvas.addEventListener('mouseleave',  onMouseLeave);
    canvas.addEventListener('mousedown',   onMouseDown);
    window.addEventListener('mouseup',     onMouseUp);
    canvas.addEventListener('touchstart',  onTouchStart, { passive: true });
    canvas.addEventListener('touchmove',   onTouchMove,  { passive: true });
    canvas.addEventListener('touchend',    onTouchEnd);
    canvas.addEventListener('wheel',       onWheel,      { passive: false });

    // ── Draw loop
    let animT = 0, signalT = 0;
    let rafId;

    function draw() {
      animT   += 0.018;
      signalT  = (signalT + 0.0012) % 1.0;

      // Auto-rotate when not hovering / dragging
      if (!isHovering && !isDragging) {
        targetRotY += autoRotSpeed;
      }

      rotY += (targetRotY - rotY) * 0.09;
      rotX += (targetRotX - rotX) * 0.09;
      zoom += (targetZoom  - zoom) * 0.09;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const proj    = MODEL.map(n => ({ ...n, p: project(n.mx, n.my, n.mz) }));
      const byLayer = LAYERS.map((_, li) => proj.filter(n => n.layer === li));

      // connections
      for (let li = 0; li < LAYERS.length - 1; li++) {
        const from   = byLayer[li], to = byLayer[li + 1];
        const sigPos = signalT * (LAYERS.length - 1);
        const segPct = (sigPos >= li && sigPos < li + 1) ? (sigPos - li) : -1;

        from.forEach(f => to.forEach(t2 => {
          const hov = hovered && (
            (hovered.layer === f.layer  && hovered.ni === f.ni) ||
            (hovered.layer === t2.layer && hovered.ni === t2.ni)
          );
          ctx.beginPath(); ctx.moveTo(f.p.sx, f.p.sy); ctx.lineTo(t2.p.sx, t2.p.sy);
          ctx.strokeStyle = `rgba(0,230,118,${hov ? 0.75 : 0.17})`;
          ctx.lineWidth   = (hov ? 1.2 : 0.65) * dpr;
          ctx.stroke();

          if (segPct >= 0) {
            const sx = f.p.sx + (t2.p.sx - f.p.sx) * segPct;
            const sy = f.p.sy + (t2.p.sy - f.p.sy) * segPct;
            const g  = ctx.createRadialGradient(sx, sy, 0, sx, sy, 5 * dpr);
            g.addColorStop(0, 'rgba(0,255,140,1)');
            g.addColorStop(1, 'rgba(0,255,140,0)');
            ctx.beginPath(); ctx.arc(sx, sy, 5 * dpr, 0, Math.PI * 2);
            ctx.fillStyle = g; ctx.fill();
          }
        }));
      }

      // nodes
      [...proj].sort((a, b) => a.p.z - b.p.z).forEach(n => {
        const r     = nodeR(n, n.p);
        const isHov = hovered && hovered.layer === n.layer && hovered.ni === n.ni;
        const fr    = r * (1 + (isHov ? 0.18 : 0.04) * Math.sin(animT * 2.5 + n.ni * 1.4 + n.layer * 0.8));

        if (isHov) {
          const glow = ctx.createRadialGradient(n.p.sx, n.p.sy, 0, n.p.sx, n.p.sy, fr * 3.2);
          glow.addColorStop(0, 'rgba(0,230,118,0.22)');
          glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath(); ctx.arc(n.p.sx, n.p.sy, fr * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = glow; ctx.fill();
        }

        ctx.beginPath(); ctx.arc(n.p.sx, n.p.sy, fr + 2 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();

        const g = ctx.createRadialGradient(n.p.sx - fr * .3, n.p.sy - fr * .3, 0, n.p.sx, n.p.sy, fr);
        if (n.layer === LAYERS.length - 1) {
          g.addColorStop(0,    isHov ? '#00ff88' : '#eeeeee');
          g.addColorStop(0.55, isHov ? '#00cc66' : '#aaaaaa');
          g.addColorStop(1,    isHov ? '#007744' : '#555555');
        } else if (n.layer === 0) {
          g.addColorStop(0,   isHov ? '#ccffdd' : '#c8c8c8');
          g.addColorStop(0.6, isHov ? '#44cc88' : '#787878');
          g.addColorStop(1,   isHov ? '#006633' : '#383838');
        } else {
          const b  = 0.50 + n.layer * 0.07;
          const hi = Math.round(b * 200), lo = Math.round(b * 80);
          g.addColorStop(0,   isHov ? '#aaffcc' : `rgb(${hi},${hi},${hi})`);
          g.addColorStop(0.6, isHov ? '#33bb77' : `rgb(${lo+30},${lo+30},${lo+30})`);
          g.addColorStop(1,   isHov ? '#007744' : `rgb(${lo},${lo},${lo})`);
        }

        ctx.beginPath(); ctx.arc(n.p.sx, n.p.sy, fr, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(n.p.sx, n.p.sy, fr, 0, Math.PI * 2);
        ctx.strokeStyle = isHov ? 'rgba(0,230,118,0.75)' : 'rgba(255,255,255,0.12)';
        ctx.lineWidth = dpr; ctx.stroke();

        if (isHov) {
          ctx.font      = `${Math.round(9.5 * dpr)}px Satoshi,sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillStyle = 'rgba(0,230,118,0.9)';
          ctx.fillText(n.node.label, n.p.sx, n.p.sy + fr + 13 * dpr);
        }
      });

      // layer labels
      LAYERS.forEach((layer, li) => {
        const ln = byLayer[li]; if (!ln.length) return;
        const avgX = ln.reduce((s, n) => s + n.p.sx, 0) / ln.length;
        const topY = Math.min(...ln.map(n => n.p.sy)) - nodeR(ln[0], ln[0].p) - 15 * dpr;
        ctx.font      = `600 ${8.5 * dpr}px Satoshi,sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(0,230,118,0.40)';
        ctx.fillText(layer.name, avgX, topY);
        ctx.font      = `${7.5 * dpr}px Satoshi,sans-serif`;
        ctx.fillStyle = 'rgba(110,110,110,0.45)';
        ctx.fillText(layer.sub, avgX, topY + 11 * dpr);
      });

      rafId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('mouseup',    onMouseUp);
      canvas.removeEventListener('mouseenter', onMouseEnter);
      canvas.removeEventListener('mousemove',  onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('mousedown',  onMouseDown);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove',  onTouchMove);
      canvas.removeEventListener('touchend',   onTouchEnd);
      canvas.removeEventListener('wheel',      onWheel);
    };
  }, []);

  return (
    <div className="canvas-wrap" ref={wrapRef}>
      <canvas ref={canvasRef} id="nn" />
    </div>
  );
}