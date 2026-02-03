// Text rotation and other animations

// Text rotation animation
function initTextRotation() {
  const words = $('.cd-words-wrapper b');
  let currentWord = 0;
  
  function rotateWord() {
    const currentWordElement = words.eq(currentWord);
    const nextWordElement = words.eq((currentWord + 1) % words.length);
    
    // Hide current word
    currentWordElement.removeClass('is-visible').addClass('is-hidden');
    
    // Show next word
    setTimeout(() => {
      nextWordElement.removeClass('is-hidden').addClass('is-visible');
      currentWord = (currentWord + 1) % words.length;
    }, 50);
  }
  
  // Start rotation after initial delay
  setInterval(rotateWord, 3000);
}

// Smooth scroll for navigation
function initSmoothScroll() {
  $('a[href*="#"]').on('click', function(e) {
    e.preventDefault();
    
    const target = $(this.getAttribute('href'));
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });
}

// Parallax effect
function initParallax() {
  $(window).on('scroll', function() {
    const scrolled = $(window).scrollTop();
    $('#fractalCanvas').css('transform', `translateY(${scrolled * 0.5}px)`);
    $('#titlecontainer').css('transform', `translateY(${scrolled * 0.3}px)`);
  });
}

// Fade in animations
function initFadeInAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for fade in
  $('.container > div').css({
    'opacity': '0',
    'transform': 'translateY(50px)',
    'transition': 'opacity 1s ease, transform 1s ease'
  });
  
  $('.container > div').each(function() {
    observer.observe(this);
  });
}

// Navbar scroll effect
function initNavbarScroll() {
  let lastScrollTop = 0;
  
  $(window).on('scroll', function() {
    const scrollTop = $(this).scrollTop();
    const navbar = $('.nav');
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.css('transform', 'translateY(-100%)');
    } else {
      navbar.css('transform', 'translateY(0)');
    }
    
    lastScrollTop = scrollTop;
  });
}

// Typing effect for introduction
function initTypingEffect() {
  const text = "Hello, I'm Helen";
  const element = $('.Hello');
  let index = 0;
  
  function type() {
    if (index < text.length) {
      element.text(text.substring(0, index + 1));
      index++;
      setTimeout(type, 100);
    }
  }
  
  // Start typing after page load
  setTimeout(type, 1000);
}

// Fractal hover effects
function initFractalHoverEffects() {
  $('#fractalContainer').on('mouseenter', function() {
    $(this).addClass('fractal-glow');
    $(this).css('transform', 'scale(1.1)');
  }).on('mouseleave', function() {
    $(this).removeClass('fractal-glow');
    $(this).css('transform', 'scale(1)');
  });
}

// Particle system for additional visual effects
function initParticleSystem() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particleCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  canvas.style.opacity = '0.3';
  
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 50;
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    });
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(138, 43, 226, ${particle.opacity})`;
      ctx.fill();
    });
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
  
  // Handle resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Initialize all animations when page loads
$(document).ready(function() {
  initTextRotation();
  initSmoothScroll();
  initParallax();
  initFadeInAnimations();
  initNavbarScroll();
  initTypingEffect();
  initFractalHoverEffects();
  initParticleSystem();
});