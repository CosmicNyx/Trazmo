import { registerCustomElements } from './components/customElements.js';

registerCustomElements();



document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      item.classList.toggle('active');
      
      // Close other open items (optional)
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
    });
  });


  document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider-container');
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = 0;
    let animationID;
  
    // Touch events
    slides.forEach((slide, index) => {
      // Touch events
      slide.addEventListener('touchstart', touchStart(index));
      slide.addEventListener('touchend', touchEnd);
      slide.addEventListener('touchmove', touchMove);
      
      // Mouse events
      slide.addEventListener('mousedown', touchStart(index));
      slide.addEventListener('mouseup', touchEnd);
      slide.addEventListener('mouseleave', touchEnd);
      slide.addEventListener('mousemove', touchMove);
    });
  
    // Dot navigation
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        goToSlide(index);
      });
    });
  
    function touchStart(index) {
      return function(event) {
        currentIndex = index;
        startPos = getPositionX(event);
        isDragging = true;
        slider.classList.add('grabbing');
        
        // Cancel any ongoing animations
        cancelAnimationFrame(animationID);
      }
    }
  
    function touchEnd() {
      isDragging = false;
      slider.classList.remove('grabbing');
      
      const movedBy = currentTranslate - prevTranslate;
      
      // Snap to slide if moved enough
      if (movedBy < -100 && currentIndex < slides.length - 1) {
        currentIndex += 1;
      }
      
      if (movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1;
      }
      
      goToSlide(currentIndex);
    }
  
    function touchMove(event) {
      if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
      }
    }
  
    function getPositionX(event) {
      return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
  
    function goToSlide(index) {
      currentIndex = index;
      prevTranslate = currentIndex * -slider.offsetWidth;
      currentTranslate = prevTranslate;
      
      // Update track position
      track.style.transform = `translateX(${currentTranslate}px)`;
      
      // Update dots
      updateDots();
    }
  
    function updateDots() {
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    }
  
    // Initialize
    function init() {
      track.style.transform = 'translateX(0)';
      updateDots();
    }
  
    init();
  });