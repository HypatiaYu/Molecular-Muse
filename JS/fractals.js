// Fractal generation and animation functions

// Initialize fractal background
function initFractalBackground() {
  const canvas = document.getElementById('fractalCanvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Create animated fractal background
  animateFractalBackground(ctx, canvas.width, canvas.height);
}

// Animate fractal background using Julia set
function animateFractalBackground(ctx, width, height) {
  let time = 0;
  
  function draw() {
    time += 0.01;
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0a0015');
    gradient.addColorStop(0.5, '#1a0033');
    gradient.addColorStop(1, '#0a0015');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw Julia set points
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const color = `hsla(${260 + Math.sin(time + i * 0.1) * 20}, 70%, ${50 + Math.sin(time + i * 0.2) * 20}%, 0.3)`;
      
      ctx.beginPath();
      ctx.arc(x, y, Math.sin(time + i) * 2 + 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
    
    // Draw fractal tree branches
    drawFractalTree(ctx, width / 2, height, -90, 8, time);
    
    requestAnimationFrame(draw);
  }
  
  draw();
}

// Draw fractal tree
function drawFractalTree(ctx, x, y, angle, depth, time) {
  if (depth === 0) return;
  
  const length = depth * 8;
  const endX = x + Math.cos(angle * Math.PI / 180) * length;
  const endY = y + Math.sin(angle * Math.PI / 180) * length;
  
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = `hsla(${260 + depth * 10}, 70%, ${40 + depth * 5}%, ${0.2 + depth * 0.05})`;
  ctx.lineWidth = depth * 0.5;
  ctx.stroke();
  
  const angleVariation = Math.sin(time) * 10;
  
  drawFractalTree(ctx, endX, endY, angle - 25 + angleVariation, depth - 1, time);
  drawFractalTree(ctx, endX, endY, angle + 25 - angleVariation, depth - 1, time);
}

// Interactive fractal in container
function initInteractiveFractal() {
  const canvas = document.getElementById('interactiveFractal');
  const ctx = canvas.getContext('2d');
  let rotation = 0;
  
  function drawInteractiveFractal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Save context state
    ctx.save();
    
    // Move to center and rotate
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation);
    
    // Draw Mandelbrot-inspired pattern
    drawMandelbrotPattern(ctx, 0, 0, 100, 5);
    
    // Restore context state
    ctx.restore();
    
    rotation += 0.005;
    requestAnimationFrame(drawInteractiveFractal);
  }
  
  drawInteractiveFractal();
}

// Draw Mandelbrot-inspired pattern
function drawMandelbrotPattern(ctx, x, y, size, iterations) {
  if (iterations === 0 || size < 2) return;
  
  // Draw main circle
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.strokeStyle = `hsla(${260 + iterations * 20}, 70%, 50%, ${0.3 + iterations * 0.1})`;
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Draw smaller circles in fractal pattern
  const positions = [
    { x: x - size/2, y: y - size/2 },
    { x: x + size/2, y: y - size/2 },
    { x: x - size/2, y: y + size/2 },
    { x: x + size/2, y: y + size/2 }
  ];
  
  positions.forEach(pos => {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, size / 3, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(${280 + iterations * 15}, 60%, 60%, ${0.2 + iterations * 0.08})`;
    ctx.lineWidth = 1;
    ctx.stroke();
    
    if (iterations > 1) {
      drawMandelbrotPattern(ctx, pos.x, pos.y, size / 3, iterations - 1);
    }
  });
}

// Mouse interaction with fractals
function initMouseInteraction() {
  const canvas = document.getElementById('interactiveFractal');
  
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create ripple effect at mouse position
    createFractalRipple(canvas, x, y);
  });
}

// Create fractal ripple effect
function createFractalRipple(canvas, x, y) {
  const ctx = canvas.getContext('2d');
  let radius = 0;
  let opacity = 1;
  
  function animateRipple() {
    if (opacity <= 0) return;
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(138, 43, 226, ${opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    radius += 2;
    opacity -= 0.02;
    
    if (opacity > 0) {
      requestAnimationFrame(animateRipple);
    }
  }
  
  animateRipple();
}

// Handle window resize
function handleResize() {
  const canvas = document.getElementById('fractalCanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Initialize everything when page loads
window.addEventListener('load', () => {
  initFractalBackground();
  initInteractiveFractal();
  initMouseInteraction();
});

window.addEventListener('resize', handleResize);