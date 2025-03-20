document.addEventListener("DOMContentLoaded", () => {
    // Initialize Particles.js
    if (typeof particlesJS !== 'undefined') {
      particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#2563eb"
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#2563eb",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
  
    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  
    // Show cookie consent popup after a short delay
    setTimeout(() => {
      const cookieConsent = document.getElementById("cookieConsent")
      if (cookieConsent && !localStorage.getItem("cookieConsent")) {
        cookieConsent.classList.remove("hidden")
        cookieConsent.classList.add("show")
      }
    }, 1000)
  
    // Handle cookie consent acceptance
    const acceptCookiesBtn = document.getElementById("acceptCookies")
    if (acceptCookiesBtn) {
      acceptCookiesBtn.addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "accepted")
        document.getElementById("cookieConsent").classList.add("hidden")
      })
    }
  
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
  
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
          
          // Close mobile menu if open
          if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
          }
        }
      })
    })
  
    // Back to top button
    const backToTopButton = document.getElementById("backToTop");
    if (backToTopButton) {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.add("show");
        } else {
          backToTopButton.classList.remove("show");
        }
      });
  
      backToTopButton.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  
    // Animate stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
      const animateStats = () => {
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-count'));
          const count = parseInt(stat.innerText);
          const increment = target / 50; // Adjust speed here
          
          if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(animateStats, 30);
          } else {
            stat.innerText = target;
          }
        });
      };
      
      // Start animation when in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(animateStats, 500);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      statNumbers.forEach(stat => {
        observer.observe(stat.parentElement);
      });
    }
  
    // Animate tech progress bars
    const techProgressBars = document.querySelectorAll('.tech-progress-bar');
    if (techProgressBars.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            
            // Reset width to 0 before animation
            bar.style.width = '0%';
            
            // Animate to target width
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
            
            observer.unobserve(bar);
          }
        });
      }, { threshold: 0.5 });
      
      techProgressBars.forEach(bar => {
        observer.observe(bar);
      });
    }
  
    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');
    
    if (testimonialSlider && testimonialSlides.length > 0) {
      let currentSlide = 0;
      
      const updateSlider = () => {
        testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        testimonialDots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentSlide);
        });
      };
      
      // Initialize dots
      testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          currentSlide = index;
          updateSlider();
        });
      });
      
      // Previous button
      if (prevButton) {
        prevButton.addEventListener('click', () => {
          currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
          updateSlider();
        });
      }
      
      // Next button
      if (nextButton) {
        nextButton.addEventListener('click', () => {
          currentSlide = (currentSlide + 1) % testimonialSlides.length;
          updateSlider();
        });
      }
      
      // Auto slide
      setInterval(() => {
        if (document.hasFocus()) {
          currentSlide = (currentSlide + 1) % testimonialSlides.length;
          updateSlider();
        }
      }, 5000);
    }
  
    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const subjectInput = document.getElementById("subject");
        const messageInput = document.getElementById("message");
  
        let isValid = true;
  
        if (!nameInput.value.trim()) {
          showError(nameInput, "Lütfen adınızı girin");
          isValid = false;
        } else {
          removeError(nameInput);
        }
  
        if (!emailInput.value.trim()) {
          showError(emailInput, "Lütfen e-posta adresinizi girin");
          isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
          showError(emailInput, "Lütfen geçerli bir e-posta adresi girin");
          isValid = false;
        } else {
          removeError(emailInput);
        }
  
        if (!subjectInput.value.trim()) {
          showError(subjectInput, "Lütfen konuyu girin");
          isValid = false;
        } else {
          removeError(subjectInput);
        }
  
        if (!messageInput.value.trim()) {
          showError(messageInput, "Lütfen mesajınızı girin");
          isValid = false;
        } else {
          removeError(messageInput);
        }
  
        if (isValid) {
          // Here you would normally send the form data to a server
          const formSubmitAnimation = document.createElement('div');
          formSubmitAnimation.className = 'form-submit-animation';
          formSubmitAnimation.innerHTML = `
            <div class="success-checkmark">
              <div class="check-icon">
                <span class="icon-line line-tip"></span>
                <span class="icon-line line-long"></span>
              </div>
            </div>
            <p>Mesajınız gönderildi! Teşekkür ederiz.</p>
          `;
          
          contactForm.innerHTML = '';
          contactForm.appendChild(formSubmitAnimation);
        }
      });
    }
  
    function showError(input, message) {
      const formGroup = input.parentElement.parentElement;
      let errorElement = formGroup.querySelector(".error-message");
  
      if (!errorElement) {
        errorElement = document.createElement("p");
        errorElement.className = "error-message text-red-500 text-sm mt-1";
        formGroup.appendChild(errorElement);
      }
  
      errorElement.textContent = message;
      input.classList.add("border-red-500");
    }
  
    function removeError(input) {
      const formGroup = input.parentElement.parentElement;
      const errorElement = formGroup.querySelector(".error-message");
  
      if (errorElement) {
        errorElement.remove();
      }
  
      input.classList.remove("border-red-500");
    }
  
    function isValidEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();
  });
  