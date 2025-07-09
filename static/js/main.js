// Main JavaScript file for Portfolio website
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize tooltips if Bootstrap tooltips are used
    const tooltipTriggerList = document.querySelectorAll('[data-bs-tooltip]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading state to download buttons
    document.querySelectorAll('a[href*="/download/"]').forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Downloading...';
            this.classList.add('disabled');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('disabled');
            }, 3000);
        });
    });
    
    // Add loading state to form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Sending...';
                submitButton.disabled = true;
                
                // Reset button if form submission fails (after 10 seconds)
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 10000);
            }
        });
    });
    
    // Animate skill progress bars when they come into view
    const observeSkillBars = () => {
        const skillBars = document.querySelectorAll('.progress-bar');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 100);
                    observer.unobserve(progressBar);
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillBars.forEach(bar => observer.observe(bar));
    };
    
    // Initialize skill bar animation
    observeSkillBars();
    
    // Add fade-in animation to cards when they come into view
    const observeCards = () => {
        const cards = document.querySelectorAll('.card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        cards.forEach(card => observer.observe(card));
    };
    
    // Initialize card animations
    observeCards();
    
    // Filter functionality for projects (if on projects page)
    const initializeProjectFilters = () => {
        const filterForm = document.querySelector('.card form[method="GET"]');
        if (!filterForm) return;
        
        const inputs = filterForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('change', function() {
                // Add a small delay to prevent too frequent requests
                clearTimeout(this.filterTimeout);
                this.filterTimeout = setTimeout(() => {
                    filterForm.submit();
                }, 300);
            });
        });
    };
    
    // Initialize project filters
    initializeProjectFilters();
    
    // Add copy to clipboard functionality for code blocks
    const addCodeCopyButtons = () => {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(codeBlock => {
            const pre = codeBlock.parentElement;
            const button = document.createElement('button');
            button.className = 'btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-2';
            button.innerHTML = '<i class="fas fa-copy"></i>';
            button.title = 'Copy to clipboard';
            
            pre.style.position = 'relative';
            pre.appendChild(button);
            
            button.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(codeBlock.textContent);
                    button.innerHTML = '<i class="fas fa-check text-success"></i>';
                    setTimeout(() => {
                        button.innerHTML = '<i class="fas fa-copy"></i>';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
            });
        });
    };
    
    // Initialize code copy buttons
    addCodeCopyButtons();
    
    // Add search functionality enhancements
    const enhanceSearch = () => {
        const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="Search"]');
        searchInputs.forEach(input => {
            // Add search icon
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';
            input.parentNode.insertBefore(inputGroup, input);
            inputGroup.appendChild(input);
            
            const inputGroupText = document.createElement('span');
            inputGroupText.className = 'input-group-text';
            inputGroupText.innerHTML = '<i class="fas fa-search"></i>';
            inputGroup.appendChild(inputGroupText);
            
            // Add clear button when input has value
            input.addEventListener('input', function() {
                const clearButton = inputGroup.querySelector('.btn-clear');
                if (this.value && !clearButton) {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'btn btn-outline-secondary btn-clear';
                    button.innerHTML = '<i class="fas fa-times"></i>';
                    button.addEventListener('click', () => {
                        input.value = '';
                        button.remove();
                        input.focus();
                    });
                    inputGroup.appendChild(button);
                } else if (!this.value && clearButton) {
                    clearButton.remove();
                }
            });
        });
    };
    
    // Initialize search enhancements
    enhanceSearch();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[placeholder*="Search"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to clear search
        if (e.key === 'Escape') {
            const searchInput = document.querySelector('input[placeholder*="Search"]:focus');
            if (searchInput) {
                searchInput.value = '';
                searchInput.blur();
            }
        }
    });
    
    // Add back to top button
    const addBackToTopButton = () => {
        const button = document.createElement('button');
        button.className = 'btn btn-primary position-fixed';
        button.style.cssText = 'bottom: 20px; right: 20px; z-index: 1000; border-radius: 50%; width: 50px; height: 50px; display: none;';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.title = 'Back to top';
        document.body.appendChild(button);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });
        
        // Scroll to top when clicked
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    // Initialize back to top button
    addBackToTopButton();
    
    // Add print functionality
    const addPrintButton = () => {
        const printButtons = document.querySelectorAll('[data-print]');
        printButtons.forEach(button => {
            button.addEventListener('click', () => {
                window.print();
            });
        });
    };
    
    // Initialize print functionality
    addPrintButton();
    
    // Add dark mode toggle (future enhancement)
    const initDarkMode = () => {
        const darkModeToggle = document.querySelector('[data-dark-mode-toggle]');
        if (!darkModeToggle) return;
        
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        darkModeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    };
    
    // Initialize dark mode
    initDarkMode();
    
    // Analytics tracking (if needed)
    const trackEvents = () => {
        // Track download clicks
        document.querySelectorAll('a[href*="/download/"]').forEach(link => {
            link.addEventListener('click', function() {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'download', {
                        'event_category': 'project',
                        'event_label': this.href
                    });
                }
            });
        });
        
        // Track external links
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            if (!link.href.includes(window.location.hostname)) {
                link.addEventListener('click', function() {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'click', {
                            'event_category': 'external_link',
                            'event_label': this.href
                        });
                    }
                });
            }
        });
    };
    
    // Initialize analytics tracking
    trackEvents();
    
    // Add performance monitoring
    const monitorPerformance = () => {
        // Log page load time
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        });
        
        // Monitor long tasks
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 50) {
                        console.warn(`Long task detected: ${entry.duration}ms`);
                    }
                }
            });
            observer.observe({entryTypes: ['longtask']});
        }
    };
    
    // Initialize performance monitoring
    monitorPerformance();
    
    console.log('Portfolio website initialized successfully!');
});

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
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
    },
    
    // Format date for display
    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export utils for use in other scripts
window.portfolioUtils = utils;
