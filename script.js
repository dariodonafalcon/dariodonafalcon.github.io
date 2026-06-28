// Animated constellation background, tinted with the site --accent-rgb.
const c = document.getElementById('bg');
if (c) {
  const x = c.getContext('2d');
  const rgb = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent-rgb').trim() || '254,93,159';
  let w, h, pts = [];
  function size(){
    w = c.width = innerWidth; h = c.height = innerHeight;
    pts = Array.from({length: Math.min(60, Math.floor(w*h/26000))}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-.5)*.3, vy: (Math.random()-.5)*.3 }));
  }
  addEventListener('resize', size); size();
  function draw(){
    x.clearRect(0,0,w,h);
    for (const p of pts){ p.x+=p.vx; p.y+=p.vy;
      if (p.x<0||p.x>w) p.vx*=-1; if (p.y<0||p.y>h) p.vy*=-1; }
    for (let i=0;i<pts.length;i++){
      for (let j=i+1;j<pts.length;j++){
        const a=pts[i], b=pts[j], d=Math.hypot(a.x-b.x, a.y-b.y);
        if (d<130){ x.strokeStyle='rgba('+rgb+','+(.18*(1-d/130))+')'; x.lineWidth=1;
          x.beginPath(); x.moveTo(a.x,a.y); x.lineTo(b.x,b.y); x.stroke(); }
      }
      x.fillStyle='rgba('+rgb+',.6)'; x.beginPath(); x.arc(pts[i].x,pts[i].y,1.6,0,7); x.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}
