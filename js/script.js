// Main JavaScript for TechLearn Hub

document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavDropdowns = document.querySelectorAll('.mobile-nav-dropdown > a');
    
    if (navToggle && mobileMenu && menuOverlay && mobileMenuClose) {
        // Open mobile menu
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close mobile menu
        const closeMobileMenu = () => {
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };
        
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        menuOverlay.addEventListener('click', closeMobileMenu);
        
        // Mobile dropdown toggle
        mobileNavDropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = dropdown.parentElement;
                parent.classList.toggle('active');
                
                // Close other dropdowns
                mobileNavDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.parentElement.classList.remove('active');
                    }
                });
            });
        });
        
        // Close mobile menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    
    // Close mobile menu when clicking on a link (except dropdown toggles)
    document.querySelectorAll('.mobile-nav-menu a:not(.mobile-nav-dropdown > a)').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navigation dropdown on hover for desktop
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    
    navDropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                if (dropdownContent) {
                    dropdownContent.style.display = 'block';
                }
            }
        });
        
        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                if (dropdownContent) {
                    dropdownContent.style.display = 'none';
                }
            }
        });
    });
    
    // Login/Signup button functionality (placeholder)
    const loginBtn = document.querySelector('.btn-login');
    const signupBtn = document.querySelector('.btn-signup');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            alert('Login functionality will be implemented soon!');
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            alert('Signup functionality will be implemented soon!');
        });
    }
    
    // Module card hover effects
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Path card animations
    const pathCards = document.querySelectorAll('.path-card');
    
    pathCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize tooltips for icons
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltipText = element.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'rgba(0,0,0,0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '0.8rem';
            tooltip.style.zIndex = '10000';
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.top = rect.top - 30 + 'px';
            tooltip.style.transform = 'translateX(-50%)';
            
            document.body.appendChild(tooltip);
            element.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', () => {
            if (element.tooltipElement) {
                element.tooltipElement.remove();
                element.tooltipElement = null;
            }
        });
    });
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Add focus styles to focused elements
            document.querySelectorAll(':focus').forEach(el => {
                el.classList.add('keyboard-focus');
            });
        }
    });
    
    document.addEventListener('click', () => {
        // Remove keyboard focus styles on mouse click
        document.querySelectorAll('.keyboard-focus').forEach(el => {
            el.classList.remove('keyboard-focus');
        });
    });
});

// Add some interactive features
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .keyboard-focus {
        outline: 3px solid #4A6FA5 !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);

// Example usage for future development
function initializePageFeatures() {
    console.log('TechLearn Hub initialized successfully!');
    
    // Track page views (simulated)
    const pageViews = localStorage.getItem('pageViews') || 0;
    localStorage.setItem('pageViews', parseInt(pageViews) + 1);
    
    // Set last visit date
    localStorage.setItem('lastVisit', new Date().toISOString());
}

// Initialize when page loads
window.addEventListener('load', initializePageFeatures);


// Authentication integration
const loginBtn = document.querySelector('.btn-login');
const signupBtn = document.querySelector('.btn-signup');

if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.authManager && window.authManager.isAuthenticated()) {
            window.authManager.showUserMenu();
        } else {
            window.authManager.showLoginModal();
        }
    });
}

if (signupBtn) {
    signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.authManager && window.authManager.isAuthenticated()) {
            window.authManager.logout();
        } else {
            window.authManager.showSignupModal();
        }
    });
}

// Add logout button styles
const logoutStyle = document.createElement('style');
logoutStyle.textContent = `
    .btn.logged-in {
        background-color: #4A6FA5;
        color: white;
        cursor: pointer;
    }
    
    .btn.logged-in:hover {
        background-color: #3a5a85;
    }
    
    .btn.btn-logout {
        background-color: #dc3545;
        color: white;
    }
    
    .btn.btn-logout:hover {
        background-color: #c82333;
    }
`;
document.head.appendChild(logoutStyle);