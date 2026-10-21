// Frontend authentication module for TechLearn Hub

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.token = localStorage.getItem('auth_token');
        this.init();
    }

    init() {
        if (this.token) {
            this.loadCurrentUser();
        }
    }

    async loadCurrentUser() {
        try {
            const response = await this.fetchWithAuth('/api/auth/me');
            if (response.ok) {
                const data = await response.json();
                this.currentUser = data.user;
                this.updateUI();
            } else {
                this.clearAuth();
            }
        } catch (error) {
            console.error('Failed to load user:', error);
            this.clearAuth();
        }
    }

    async login(username, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                this.currentUser = data.user;
                localStorage.setItem('auth_token', this.token);
                this.updateUI();
                return { success: true, user: data.user };
            } else {
                return { success: false, error: data.message };
            }
        } catch (error) {
            return { success: false, error: 'Network error' };
        }
    }

    async register(username, email, password) {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                this.currentUser = data.user;
                localStorage.setItem('auth_token', this.token);
                this.updateUI();
                return { success: true, user: data.user };
            } else {
                return { success: false, error: data.message };
            }
        } catch (error) {
            return { success: false, error: 'Network error' };
        }
    }

    async logout() {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: this.getAuthHeaders()
            });
        } catch (error) {
            // Ignore errors on logout
        } finally {
            this.clearAuth();
        }
    }

    clearAuth() {
        this.token = null;
        this.currentUser = null;
        localStorage.removeItem('auth_token');
        this.updateUI();
    }

    isAuthenticated() {
        return !!this.token && !!this.currentUser;
    }

    isAdmin() {
        return this.isAuthenticated() && this.currentUser.role === 'admin';
    }

    getAuthHeaders() {
        const headers = { 'Content-Type': 'application/json' };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        return headers;
    }

    async fetchWithAuth(url, options = {}) {
        const headers = this.getAuthHeaders();
        return fetch(url, {
            ...options,
            headers: { ...headers, ...options.headers }
        });
    }

    updateUI() {
        // Update login/logout buttons
        const loginBtn = document.querySelector('.btn-login');
        const signupBtn = document.querySelector('.btn-signup');
        const userMenu = document.querySelector('.user-menu');
        
        if (this.isAuthenticated()) {
            // Update buttons to show user info
            if (loginBtn) {
                loginBtn.textContent = this.currentUser.username;
                loginBtn.classList.add('logged-in');
                loginBtn.onclick = () => this.showUserMenu();
            }
            
            if (signupBtn) {
                signupBtn.textContent = 'Logout';
                signupBtn.classList.remove('btn-signup');
                signupBtn.classList.add('btn-logout');
                signupBtn.onclick = () => this.logout();
            }
            
            // Show admin controls if user is admin
            if (this.isAdmin()) {
                this.showAdminControls();
            }
        } else {
            // Reset to default login/signup
            if (loginBtn) {
                loginBtn.textContent = 'Login';
                loginBtn.classList.remove('logged-in');
                loginBtn.onclick = () => this.showLoginModal();
            }
            
            if (signupBtn) {
                signupBtn.textContent = 'Sign Up';
                signupBtn.classList.remove('btn-logout');
                signupBtn.classList.add('btn-signup');
                signupBtn.onclick = () => this.showSignupModal();
            }
            
            // Hide admin controls
            this.hideAdminControls();
        }
    }

    showLoginModal() {
        this.showAuthModal('login');
    }

    showSignupModal() {
        this.showAuthModal('signup');
    }

    showAuthModal(mode = 'login') {
        // Create modal HTML
        const modalHTML = `
            <div class="auth-modal">
                <div class="auth-modal-content">
                    <button class="auth-modal-close">&times;</button>
                    <h2>${mode === 'login' ? 'Login' : 'Sign Up'}</h2>
                    <form id="auth-form">
                        ${mode === 'signup' ? `
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" id="username" name="username" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                        ` : `
                            <div class="form-group">
                                <label for="login-username">Username or Email</label>
                                <input type="text" id="login-username" name="username" required>
                            </div>
                        `}
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary btn-full">
                            ${mode === 'login' ? 'Login' : 'Sign Up'}
                        </button>
                        <div class="auth-switch">
                            ${mode === 'login' 
                                ? 'Don\'t have an account? <a href="#" class="switch-to-signup">Sign up</a>' 
                                : 'Already have an account? <a href="#" class="switch-to-login">Login</a>'}
                        </div>
                    </form>
                </div>
            </div>
        `;

        // Add modal to page
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer);

        // Add styles
        this.addAuthModalStyles();

        // Handle form submission
        const form = document.getElementById('auth-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            let result;
            if (mode === 'login') {
                result = await this.login(data.username, data.password);
            } else {
                result = await this.register(data.username, data.email, data.password);
            }
            
            if (result.success) {
                this.closeAuthModal();
                this.showNotification(`Welcome ${result.user.username}!`, 'success');
            } else {
                this.showNotification(result.error, 'error');
            }
        });

        // Handle modal close
        const closeBtn = document.querySelector('.auth-modal-close');
        closeBtn.addEventListener('click', () => this.closeAuthModal());

        // Handle switch between login/signup
        const switchLinks = document.querySelectorAll('.switch-to-login, .switch-to-signup');
        switchLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeAuthModal();
                if (link.classList.contains('switch-to-login')) {
                    this.showLoginModal();
                } else {
                    this.showSignupModal();
                }
            });
        });

        // Close modal on overlay click
        const modal = document.querySelector('.auth-modal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeAuthModal();
            }
        });
    }

    closeAuthModal() {
        const modal = document.querySelector('.auth-modal');
        if (modal) {
            modal.remove();
        }
    }

    addAuthModalStyles() {
        const styles = `
            .auth-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            }
            
            .auth-modal-content {
                background-color: white;
                padding: 30px;
                border-radius: 8px;
                width: 90%;
                max-width: 400px;
                position: relative;
            }
            
            .auth-modal-close {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
            }
            
            .auth-modal h2 {
                margin-bottom: 20px;
                color: #333;
            }
            
            .form-group {
                margin-bottom: 15px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 5px;
                color: #555;
            }
            
            .form-group input {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            
            .auth-switch {
                margin-top: 15px;
                text-align: center;
                color: #666;
            }
            
            .auth-switch a {
                color: #4A6FA5;
                text-decoration: none;
            }
            
            .auth-switch a:hover {
                text-decoration: underline;
            }
            
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                color: white;
                z-index: 10001;
                animation: slideIn 0.3s ease;
            }
            
            .notification-success {
                background-color: #28a745;
            }
            
            .notification-error {
                background-color: #dc3545;
            }
        `;

        const styleEl = document.createElement('style');
        styleEl.textContent = styles;
        document.head.appendChild(styleEl);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    showUserMenu() {
        if (!this.isAuthenticated()) return;

        const menuHTML = `
            <div class="user-menu-dropdown">
                <div class="user-info">
                    <strong>${this.currentUser.username}</strong>
                    <small>${this.currentUser.email}</small>
                    <small>Role: ${this.currentUser.role}</small>
                </div>
                <div class="user-menu-items">
                    <a href="#" class="user-menu-item" data-action="profile">Profile</a>
                    ${this.isAdmin() ? '<a href="#" class="user-menu-item" data-action="admin">Admin Panel</a>' : ''}
                    <a href="#" class="user-menu-item" data-action="my-content">My Content</a>
                    <a href="#" class="user-menu-item" data-action="logout">Logout</a>
                </div>
            </div>
        `;

        // Remove existing menu
        const existingMenu = document.querySelector('.user-menu-dropdown');
        if (existingMenu) existingMenu.remove();

        // Add new menu
        const menuContainer = document.createElement('div');
        menuContainer.innerHTML = menuHTML;
        document.body.appendChild(menuContainer);

        // Position near user button
        const userBtn = document.querySelector('.btn-login');
        if (userBtn) {
            const rect = userBtn.getBoundingClientRect();
            menuContainer.style.position = 'fixed';
            menuContainer.style.top = rect.bottom + 'px';
            menuContainer.style.right = window.innerWidth - rect.right + 'px';
        }

        // Add menu styles
        this.addUserMenuStyles();

        // Handle menu clicks
        menuContainer.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            if (action === 'logout') {
                this.logout();
                menuContainer.remove();
            } else if (action === 'profile') {
                this.showProfileModal();
                menuContainer.remove();
            } else if (action === 'admin') {
                window.location.href = '/admin.html';
                menuContainer.remove();
            } else if (action === 'my-content') {
                this.showMyContent();
                menuContainer.remove();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function closeMenu(event) {
            if (!menuContainer.contains(event.target) && event.target !== userBtn) {
                menuContainer.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }

    addUserMenuStyles() {
        const styles = `
            .user-menu-dropdown {
                background-color: white;
                border: 1px solid #ddd;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                min-width: 200px;
                z-index: 1000;
            }
            
            .user-info {
                padding: 15px;
                border-bottom: 1px solid #eee;
            }
            
            .user-info strong {
                display: block;
                color: #333;
            }
            
            .user-info small {
                display: block;
                color: #666;
                font-size: 0.8rem;
                margin-top: 4px;
            }
            
            .user-menu-items {
                padding: 10px 0;
            }
            
            .user-menu-item {
                display: block;
                padding: 10px 15px;
                color: #333;
                text-decoration: none;
                transition: background-color 0.2s;
            }
            
            .user-menu-item:hover {
                background-color: #f5f5f5;
            }
        `;

        const styleEl = document.createElement('style');
        styleEl.textContent = styles;
        document.head.appendChild(styleEl);
    }

    showProfileModal() {
        // Simplified profile modal - in production, you'd want a more complete implementation
        alert('Profile functionality coming soon!');
    }

    showMyContent() {
        // Redirect to user content page
        window.location.href = '/user-content.html';
    }

    showAdminControls() {
        // Add admin upload button to navigation
        const nav = document.querySelector('.nav-right');
        if (nav && !document.querySelector('.btn-admin-upload')) {
            const adminBtn = document.createElement('button');
            adminBtn.className = 'btn btn-primary btn-admin-upload';
            adminBtn.textContent = 'Upload Content';
            adminBtn.onclick = () => this.showUploadModal();
            nav.appendChild(adminBtn);
        }
    }

    hideAdminControls() {
        const adminBtn = document.querySelector('.btn-admin-upload');
        if (adminBtn) {
            adminBtn.remove();
        }
    }

    showUploadModal() {
        if (!this.isAdmin()) return;

        const modalHTML = `
            <div class="upload-modal">
                <div class="upload-modal-content">
                    <button class="upload-modal-close">&times;</button>
                    <h2>Upload Content</h2>
                    <form id="upload-form">
                        <div class="form-group">
                            <label for="category">Category</label>
                            <select id="category" name="category" required>
                                <option value="">Select Category</option>
                                <option value="datascience">Data Science</option>
                                <option value="cybersecurity">Cybersecurity</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" id="title" name="title" required>
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea id="description" name="description" rows="3" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="file">HTML File</label>
                            <input type="file" id="file" name="file" accept=".html" required>
                            <small>Only HTML files are allowed (max 10MB)</small>
                        </div>
                        <button type="submit" class="btn btn-primary btn-full">Upload</button>
                    </form>
                </div>
            </div>
        `;

        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer);

        this.addUploadModalStyles();

        const form = document.getElementById('upload-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            
            try {
                const response = await this.fetchWithAuth(`/api/admin/content/${formData.get('category')}/upload`, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    this.closeUploadModal();
                    this.showNotification('Content uploaded successfully!', 'success');
                    // Refresh page to show new content
                    setTimeout(() => location.reload(), 1000);
                } else {
                    this.showNotification(data.message || 'Upload failed', 'error');
                }
            } catch (error) {
                this.showNotification('Network error', 'error');
            }
        });

        const closeBtn = document.querySelector('.upload-modal-close');
        closeBtn.addEventListener('click', () => this.closeUploadModal());

        const modal = document.querySelector('.upload-modal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeUploadModal();
            }
        });
    }

    closeUploadModal() {
        const modal = document.querySelector('.upload-modal');
        if (modal) {
            modal.remove();
        }
    }

    addUploadModalStyles() {
        const styles = `
            .upload-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            }
            
            .upload-modal-content {
                background-color: white;
                padding: 30px;
                border-radius: 8px;
                width: 90%;
                max-width: 500px;
                position: relative;
            }
            
            .upload-modal-close {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
            }
            
            .upload-modal h2 {
                margin-bottom: 20px;
                color: #333;
            }
            
            .upload-modal select,
            .upload-modal textarea {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            
            .upload-modal input[type="file"] {
                width: 100%;
                padding: 8px 0;
            }
            
            .upload-modal small {
                display: block;
                margin-top: 5px;
                color: #666;
                font-size: 0.8rem;
            }
        `;

        const styleEl = document.createElement('style');
        styleEl.textContent = styles;
        document.head.appendChild(styleEl);
    }
}

// Initialize auth manager
window.authManager = new AuthManager();

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.authManager.updateUI();
});