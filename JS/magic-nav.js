// Magic Navigation Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
  const magicCards = document.querySelectorAll('.magic-nav-card');
  
  // Mouse tracking for glow effect
  magicCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
    
    // Create particle effect on click
    card.addEventListener('click', function(e) {
      createClickEffect(e, card);
    });
  });
  
  // Particle creation function
  function createClickEffect(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create multiple particles
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'click-particle';
      
      // Random position around click point
      const angle = (Math.PI * 2 * i) / 8;
      const velocity = 50 + Math.random() * 50;
      const particleX = x + Math.cos(angle) * 10;
      const particleY = y + Math.sin(angle) * 10;
      
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(132, 0, 255, 1);
        box-shadow: 0 0 6px rgba(132, 0, 255, 0.8);
        left: ${particleX}px;
        top: ${particleY}px;
        pointer-events: none;
        z-index: 1000;
      `;
      
      card.appendChild(particle);
      
      // Animate particle
      const animation = particle.animate([
        {
          transform: 'translate(0, 0) scale(1)',
          opacity: 1
        },
        {
          transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
          opacity: 0
        }
      ], {
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });
      
      animation.onfinish = () => particle.remove();
    }
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    
    const maxDistance = Math.max(
      Math.hypot(x, y),
      Math.hypot(x - rect.width, y),
      Math.hypot(x, y - rect.height),
      Math.hypot(x - rect.width, y - rect.height)
    );
    
    ripple.style.cssText = `
      position: absolute;
      width: ${maxDistance * 2}px;
      height: ${maxDistance * 2}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(132, 0, 255, 0.4) 0%, rgba(132, 0, 255, 0.2) 30%, transparent 70%);
      left: ${x - maxDistance}px;
      top: ${y - maxDistance}px;
      pointer-events: none;
      z-index: 999;
    `;
    
    card.appendChild(ripple);
    
    const rippleAnimation = ripple.animate([
      {
        transform: 'scale(0)',
        opacity: 1
      },
      {
        transform: 'scale(1)',
        opacity: 0
      }
    ], {
      duration: 600,
      easing: 'ease-out'
    });
    
    rippleAnimation.onfinish = () => ripple.remove();
  }
  
  // Add floating stars animation
  function createFloatingStars() {
    const container = document.querySelector('.magic-nav-container');
    if (!container) return;
    
    for (let i = 0; i < 15; i++) {
      const star = document.createElement('div');
      star.className = 'floating-star';
      
      star.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(132, 0, 255, 0.8);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        z-index: 0;
        animation: floatStar ${10 + Math.random() * 20}s linear infinite;
        animation-delay: ${Math.random() * 10}s;
      `;
      
      container.appendChild(star);
    }
  }
  
  // Initialize floating stars
  createFloatingStars();
  
  // Add CSS for floating stars
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatStar {
      0% {
        transform: translateY(0px) translateX(0px);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) translateX(-20px);
        opacity: 0;
      }
    }
    
    .floating-star {
      box-shadow: 0 0 4px rgba(132, 0, 255, 0.6);
    }
  `;
  document.head.appendChild(style);
});
