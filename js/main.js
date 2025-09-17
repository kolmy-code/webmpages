// ===== MAIN JAVASCRIPT FILE =====
// Portfolio Website - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initScrollEffects();
    initPortfolioFilter();
    initProjectModal();
    initContactForm();
    initFAQ();
    initAnimations();
    initSkillBars();
});

// ===== NAVIGATION =====
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
                const offsetTop = skillsSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .service-card, .timeline-item, .portfolio-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== PORTFOLIO FILTER =====
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ===== PROJECT MODAL =====
function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const portfolioLinks = document.querySelectorAll('.portfolio-link[data-project]');

    // Project data
    const projects = {
        1: {
            title: 'E-Commerce Platform',
            description: 'A comprehensive e-commerce solution built with React and Node.js. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and admin dashboard. The platform is fully responsive and optimized for performance.',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express.js', 'JWT'],
            liveDemo: '#',
            viewCode: '#'
        },
        2: {
            title: 'Task Management App',
            description: 'A collaborative task management application with real-time updates using Socket.io. Features include team collaboration, project organization, deadline tracking, file attachments, and notifications. Built as a Progressive Web App for mobile accessibility.',
            tech: ['Vue.js', 'Express', 'Socket.io', 'PWA', 'MongoDB', 'Redis'],
            liveDemo: '#',
            viewCode: '#'
        },
        3: {
            title: 'Analytics Dashboard',
            description: 'A data visualization dashboard with interactive charts and real-time metrics. Features include custom chart creation, data filtering, export functionality, and automated reporting. Built with D3.js for advanced data visualization capabilities.',
            tech: ['D3.js', 'Python', 'PostgreSQL', 'Chart.js', 'Flask', 'Pandas'],
            liveDemo: '#',
            viewCode: '#'
        },
        4: {
            title: 'Blog Platform',
            description: 'A modern blog platform with headless CMS integration. Features include SEO optimization, social sharing, comment system, content scheduling, and multi-author support. Built with Next.js for optimal performance and SEO.',
            tech: ['Next.js', 'Strapi', 'PostgreSQL', 'Tailwind', 'GraphQL', 'Vercel'],
            liveDemo: '#',
            viewCode: '#'
        },
        5: {
            title: 'Online Marketplace',
            description: 'A multi-vendor marketplace platform with advanced search and filtering capabilities. Features include vendor management, payment processing, inventory tracking, order fulfillment, and comprehensive analytics.',
            tech: ['React', 'Django', 'Redis', 'Elasticsearch', 'PostgreSQL', 'Celery'],
            liveDemo: '#',
            viewCode: '#'
        },
        6: {
            title: 'Admin Panel',
            description: 'A comprehensive admin panel for system management and monitoring. Features include user management, analytics dashboard, system monitoring, role-based access control, and automated reporting.',
            tech: ['Vue.js', 'Laravel', 'MySQL', 'Vuetify', 'Chart.js', 'JWT'],
            liveDemo: '#',
            viewCode: '#'
        }
    };

    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const project = projects[projectId];
            
            if (project && modal) {
                // Update modal content
                document.querySelector('.modal-title').textContent = project.title;
                document.querySelector('.modal-description').textContent = project.description;
                
                // Update tech tags
                const techContainer = document.querySelector('.modal-tech');
                techContainer.innerHTML = '';
                project.tech.forEach(tech => {
                    const tag = document.createElement('span');
                    tag.className = 'tech-tag';
                    tag.textContent = tech;
                    techContainer.appendChild(tag);
                });
                
                // Update links
                const liveDemoLink = document.querySelector('.modal-links .btn-primary');
                const viewCodeLink = document.querySelector('.modal-links .btn-secondary');
                liveDemoLink.href = project.liveDemo;
                viewCodeLink.href = project.viewCode;
                
                // Show modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });

    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const btnText = submitBtn.querySelector('.btn-text');
                const btnLoading = submitBtn.querySelector('.btn-loading');
                
                btnText.style.display = 'none';
                btnLoading.style.display = 'inline-flex';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    // Reset form
                    form.reset();
                    
                    // Show success message
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    
                    // Reset button state
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                    submitBtn.disabled = false;
                }, 2000);
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function validateForm(data) {
    let isValid = true;
    
    // Required fields
    const requiredFields = ['name', 'email', 'message'];
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(fieldName, 'This field is required');
        return false;
    }
    
    // Email validation
    if (fieldName === 'email' && value && !isValidEmail(value)) {
        showFieldError(fieldName, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (field && errorElement) {
        field.style.borderColor = '#e74c3c';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearFieldError(field) {
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (errorElement) {
        field.style.borderColor = '#f0f0f0';
        errorElement.style.display = 'none';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== FAQ ACCORDION =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); }
            to { transform: translateX(100%); }
        }
        
        .animate-in {
            animation: fadeIn 0.6s ease-out;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
    `;
    document.head.appendChild(style);
}

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target;
                const width = skillFill.getAttribute('data-width');
                skillFill.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy loading for images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID if it doesn't exist
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
}

// Initialize accessibility features
initAccessibility();

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
🚀 Portfolio Website Loaded Successfully!

Built with:
- HTML5 Semantic Markup
- CSS3 with Flexbox & Grid
- Vanilla JavaScript (ES6+)
- Responsive Design
- Accessibility Features
- Performance Optimizations

Developer: Alex Johnson
Version: 1.0.0
`);

// ===== EXPORT FOR TESTING (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        validateField,
        isValidEmail,
        debounce,
        throttle
    };
}
