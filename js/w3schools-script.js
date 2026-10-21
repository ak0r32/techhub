// W3Schools-Style JavaScript
// All interactive functionality for the W3Schools-style layout

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 W3Schools JavaScript Loading...');
    
    // ========== DROPDOWN MENUS ==========
    const dropdownButtons = document.querySelectorAll('.w3-dropdown-click .w3-button');
    
    if (dropdownButtons.length > 0) {
        dropdownButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                const dropdown = this.closest('.w3-dropdown-click');
                
                // Close all other dropdowns
                document.querySelectorAll('.w3-dropdown-click').forEach(item => {
                    if (item !== dropdown) {
                        item.classList.remove('show');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('show');
                console.log('Dropdown toggled');
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.w3-dropdown-click')) {
                document.querySelectorAll('.w3-dropdown-click').forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
            }
        });
        
        console.log('✅ Dropdowns ready');
    }
    
    // ========== HORIZONTAL SCROLL ==========
    const techBar = document.querySelector('.w3-tech-bar');
    const scrollLeftBtn = document.querySelector('.w3-tech-scroll-left');
    const scrollRightBtn = document.querySelector('.w3-tech-scroll-right');
    
    if (techBar && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', function(e) {
            e.preventDefault();
            techBar.scrollBy({ left: -200, behavior: 'smooth' });
            console.log('Scroll left');
        });
        
        scrollRightBtn.addEventListener('click', function(e) {
            e.preventDefault();
            techBar.scrollBy({ left: 200, behavior: 'smooth' });
            console.log('Scroll right');
        });
        
        function updateButtons() {
            const maxScroll = techBar.scrollWidth - techBar.clientWidth;
            
            if (maxScroll <= 0) {
                scrollLeftBtn.style.display = 'none';
                scrollRightBtn.style.display = 'none';
            } else {
                scrollLeftBtn.style.display = 'block';
                scrollRightBtn.style.display = 'block';
                
                scrollLeftBtn.style.opacity = techBar.scrollLeft <= 0 ? '0.3' : '1';
                scrollRightBtn.style.opacity = techBar.scrollLeft >= maxScroll - 5 ? '0.3' : '1';
            }
        }
        
        techBar.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);
        setTimeout(updateButtons, 100);
        
        console.log('✅ Horizontal scroll ready');
    }
    
    // ========== MOBILE MENU ==========
    const menuBtn = document.querySelector('.w3-menu-btn');
    const sidebarLeft = document.querySelector('.w3-sidebar-left');
    
    if (menuBtn && sidebarLeft) {
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarLeft.classList.toggle('mobile-show');
            console.log('Mobile menu toggled');
        });
        
        // Close on outside click
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!e.target.closest('.w3-sidebar-left') && !e.target.closest('.w3-menu-btn')) {
                    sidebarLeft.classList.remove('mobile-show');
                }
            }
        });
        
        console.log('✅ Mobile menu ready');
    }
    
    // ========== SIDEBAR LINKS ==========
    const sidebarLinks = document.querySelectorAll('.w3-sidebar-link');
    
    if (sidebarLinks.length > 0) {
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                sidebarLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                if (window.innerWidth <= 768 && sidebarLeft) {
                    sidebarLeft.classList.remove('mobile-show');
                }
            });
        });
        
        console.log('✅ Sidebar links ready');
    }
    
    // ========== TECH BAR LINKS ==========
    const techItems = document.querySelectorAll('.w3-tech-item');
    
    if (techItems.length > 0) {
        techItems.forEach(item => {
            item.addEventListener('click', function() {
                techItems.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        console.log('✅ Tech bar links ready');
    }
    
    // ========== STICKY NAV SHADOW ==========
    const topNav = document.querySelector('.w3-top-nav');
    
    if (topNav) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 0) {
                topNav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            } else {
                topNav.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            }
        });
        
        console.log('✅ Sticky nav ready');
    }
    
    // ========== SEARCH ==========
    const searchInput = document.querySelector('.w3-input-search');
    const searchButton = document.querySelector('.w3-button-search');
    
    if (searchInput && searchButton) {
        function doSearch() {
            const query = searchInput.value.trim();
            if (query) {
                alert('Search: "' + query + '"\n\nWould search tutorials and content.');
                console.log('Search:', query);
            }
        }
        
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            doSearch();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                doSearch();
            }
        });
        
        console.log('✅ Search ready');
    }
    
    console.log('🎉 All features loaded!');
});
