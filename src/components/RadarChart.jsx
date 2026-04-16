import { useEffect, useRef } from 'react';

export default function RadarChart({ items, color }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const progRef   = useRef(0); // 0→1 animation progress

  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr    = window.devicePixelRatio || 1;
    const size   = canvas.offsetWidth;
    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const cx = size / 2, cy = size / 2;
    const R  = size * 0.34;   // max radius
    const N  = items.length;
    progRef.current = 0;

    function angleOf(i) { return (Math.PI * 2 * i) / N - Math.PI / 2; }

    function hexToRgb(hex) {
      const r = parseInt(hex.slice(1,3),16);
      const g = parseInt(hex.slice(3,5),16);
      const b = parseInt(hex.slice(5,7),16);
      return `${r},${g},${b}`;
    }
    const rgb = hexToRgb(color);

    function draw(prog) {
      ctx.clearRect(0, 0, size, size);

      // ── Web rings (5 concentric)
      for (let ring = 1; ring <= 5; ring++) {
        const r = R * ring / 5;
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          const a = angleOf(i);
          const x = cx + r * Math.cos(a);
          const y = cy + r * Math.sin(a);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(255,255,255,0.05)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ── Axis lines
      for (let i = 0; i < N; i++) {
        const a = angleOf(i);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ── Data polygon (animated by prog)
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const a   = angleOf(i);
        const val = (items[i].value / 100) * prog;
        const r   = R * val;
        const x   = cx + r * Math.cos(a);
        const y   = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();

      // fill gradient
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      grad.addColorStop(0,   `rgba(${rgb},0.55)`);
      grad.addColorStop(0.6, `rgba(${rgb},0.25)`);
      grad.addColorStop(1,   `rgba(${rgb},0.05)`);
      ctx.fillStyle = grad;
      ctx.fill();

      // stroke
      ctx.strokeStyle = `rgba(${rgb},0.9)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // ── Data point dots
      for (let i = 0; i < N; i++) {
        const a   = angleOf(i);
        const val = (items[i].value / 100) * prog;
        const r   = R * val;
        const x   = cx + r * Math.cos(a);
        const y   = cy + r * Math.sin(a);
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ── Labels
      ctx.font = `500 ${size * 0.028}px Satoshi, sans-serif`;
      ctx.textAlign = 'center';
      for (let i = 0; i < N; i++) {
        const a    = angleOf(i);
        const gap  = R + size * 0.09;
        const x    = cx + gap * Math.cos(a);
        const y    = cy + gap * Math.sin(a);
        const line = items[i].label.split(' & ');
        ctx.fillStyle = 'rgba(232,232,232,0.55)';
        if (line.length > 1) {
          ctx.fillText(line[0] + ' &', x, y - size * 0.013);
          ctx.fillText(line[1], x, y + size * 0.018);
        } else {
          ctx.fillText(items[i].label, x, y + size * 0.007);
        }
      }
    }

    // Animate in
    const start = performance.now();
    const duration = 900;
    function loop(now) {
      const t = Math.min((now - start) / duration, 1);
      // ease out cubic
      progRef.current = 1 - Math.pow(1 - t, 3);
      draw(progRef.current);
      if (t < 1) rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafRef.current);
  }, [items, color]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}