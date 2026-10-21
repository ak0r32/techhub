# TechLearn Hub - Cybersecurity & Data Science Learning Platform

A structured learning website inspired by W3Schools, designed for cybersecurity and data science students with separate navigation systems.

## Project Structure

```
.
├── index.html                    # Main homepage
├── css/
│   └── style.css                # Main stylesheet
├── js/
│   └── script.js                # JavaScript functionality
├── images/                      # Image assets
├── content/
│   ├── datascience/            # Data Science content
│   │   ├── python.html         # Python programming (complete example)
│   │   ├── ml.html             # Machine Learning
│   │   ├── dl.html             # Deep Learning
│   │   ├── nlp.html            # Natural Language Processing
│   │   ├── transformers.html   # Transformers
│   │   ├── rl.html             # Reinforcement Learning
│   │   ├── scikit.html         # Scikit-Learn
│   │   ├── sql.html            # SQL & Databases
│   │   ├── fastapi.html        # Fast API
│   │   ├── langchain.html      # LangChain
│   │   ├── mlops.html          # MLOps
│   │   ├── pytorch.html        # PyTorch
│   │   ├── tensorflow.html     # TensorFlow
│   │   ├── cnn.html            # Computer Vision
│   │   ├── automl.html         # AutoML
│   │   └── math.html           # Mathematics for DS
│   └── cybersecurity/          # Cybersecurity content
│       ├── fundamentals.html   # Cybersecurity fundamentals (complete example)
│       ├── network.html        # Network Security
│       ├── cryptography.html   # Cryptography
│       ├── ethics.html         # Ethical Hacking
│       ├── soc.html            # SOC Operations
│       ├── incident.html       # Incident Response
│       ├── forensics.html      # Digital Forensics
│       ├── siem.html           # SIEM Tools
│       ├── pentest.html        # Penetration Testing
│       ├── webapp.html         # Web App Security
│       ├── mobile.html         # Mobile Security
│       ├── cloud.html          # Cloud Security
│       ├── malware.html        # Malware Analysis
│       ├── threat.html         # Threat Intelligence
│       ├── iot.html            # IoT Security
│       └── compliance.html     # Compliance
└── README.md                   # This file
```

## Features

### 1. Dual Navigation System
- **Data Science Navigation**: Comprehensive dropdown with 16+ topics
- **Cybersecurity Navigation**: Comprehensive dropdown with 15+ topics
- Responsive design for mobile devices
- Dropdown mega-menus with categorized content

### 2. Learning Paths
- **Data Science Path**: Python, ML, DL, NLP, Transformers, SQL, FastAPI
- **Cybersecurity Path**: Network Security, Ethical Hacking, Cryptography, Incident Response
- Structured content organization inspired by W3Schools

### 3. Interactive Features
- Tab switching between Data Science and Cybersecurity modules
- Responsive design with mobile navigation toggle
- Interactive exercises and code examples
- Smooth scrolling and animations
- Tooltips and notifications

### 4. Content Structure
- Complete Python programming lesson with exercises
- Complete Cybersecurity fundamentals lesson
- Placeholder pages for all other modules
- Consistent layout across all pages
- Breadcrumb navigation
- Sidebar course outlines

## Design Principles

### Inspired by W3Schools
- Clean, organized content structure
- Progressive learning approach
- Hands-on exercises
- Clear categorization
- Accessible design

### Color Scheme
- **Primary**: `#4A6FA5` (Blue) - Main brand color
- **Data Science**: `#2E86AB` (Teal blue) - Accent color
- **Cybersecurity**: `#A23B72` (Purple red) - Accent color
- **Light**: `#F8F9FA` - Background
- **Dark**: `#212529` - Text

### Typography
- **Headings**: Poppins (Modern, clean)
- **Body**: Roboto (Readable, professional)
- **Code**: Courier New / Monospace

## Getting Started

### Quick Start
1. Open `index.html` in any modern web browser
2. No server or build process required
3. All dependencies are CDN-based

### Development
1. Clone the repository
2. Open in VS Code or any code editor
3. Modify HTML/CSS/JS as needed
4. Add content to placeholder files

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Content Expansion

### Adding New Data Science Content
1. Create new HTML file in `content/datascience/`
2. Follow the structure of `python.html`
3. Add to the Data Science dropdown in all HTML files
4. Update navigation links

### Adding New Cybersecurity Content
1. Create new HTML file in `content/cybersecurity/`
2. Follow the structure of `fundamentals.html`
3. Add to the Cybersecurity dropdown in all HTML files
4. Update navigation links

## Future Enhancements

### Planned Features
1. **User Authentication**: Login system for tracking progress
2. **Progress Tracking**: Save completed lessons and exercises
3. **Interactive Code Editor**: Built-in code execution
4. **Quiz System**: Assessment for each module
5. **Certification System**: Generate certificates on completion
6. **Discussion Forum**: Community Q&A
7. **Mobile App**: Progressive Web App (PWA)

### Technical Improvements
1. **Backend Integration**: Node.js/Express for user management
2. **Database**: MongoDB/PostgreSQL for storing progress
3. **API Integration**: REST APIs for dynamic content
4. **Search Functionality**: Site-wide search
5. **Accessibility**: Full WCAG compliance

## License

This project is created for educational purposes. Feel free to use, modify, and distribute as needed.

## Credits

- Design inspiration: W3Schools (https://www.w3schools.com)
- Icons: Font Awesome (https://fontawesome.com)
- Fonts: Google Fonts (Poppins, Roboto)
- Images: Unsplash (placeholder images)

## Contact

Project created as a learning platform demonstration. For educational use only.


## Security Implementation

The platform now includes a comprehensive security system with role-based access control:

### Security Features Implemented

#### 1. Authentication & Authorization
- **JWT-based authentication** with 7-day token expiration
- **Role-based access control** (Admin, User, Public)
- **Password hashing** using bcrypt with salt rounds
- **Protected API endpoints** with middleware validation

#### 2. User Roles & Permissions
- **Administrators**: Full access to upload, edit, delete content, manage users
- **Registered Users**: View content, upload personal content, manage own content
- **Public Visitors**: View content, register accounts

#### 3. Content Management Security
- **Admin-only content upload** endpoints
- **User-specific content management** for personal uploads
- **File type validation** (HTML only)
- **File size limits** (10MB maximum)

#### 4. Frontend Security Features
- **Secure login/signup modals**
- **Dynamic UI updates** based on user role
- **Admin dashboard** for content and user management
- **User content portal** for personal content management

### Quick Start with Security

1. **Install dependencies**:
   ```bash
   npm install bcryptjs jsonwebtoken express-session cookie-parser multer
   ```

2. **Start the secure server**:
   ```bash
   node server-updated.js
   ```

3. **Access the system**:
   - Main site: `http://localhost:3000`
   - Admin dashboard: `http://localhost:3000/admin.html`
   - User content: `http://localhost:3000/user-content.html`

4. **Default Admin Credentials**:
   - Username: `admin`
   - Password: `admin123` (change immediately on first login)

### API Security Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

#### Admin Endpoints (Admin only)
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id/role` - Update user role
- `POST /api/admin/content/:category/upload` - Upload content

#### User Endpoints (Authenticated users)
- `GET /api/user/content` - Get user's content
- `POST /api/user/content/:category/upload` - Upload personal content
- `PUT /api/user/content/:id` - Update user's content
- `DELETE /api/user/content/:id` - Delete user's content

### Security Testing

Run the security test suite:
```bash
node test-security.js
```

### Security Documentation

For detailed security documentation, see:
- `SECURITY_IMPLEMENTATION.md` - Complete security system documentation
- `admin.html` - Admin dashboard interface
- `user-content.html` - User content management portal
- `js/auth.js` - Frontend authentication module
- `auth.js` - Backend authentication middleware
- `database.js` - Secure database layer

### Key Security Files

```
security/
├── server-updated.js      # Enhanced server with security middleware
├── auth.js               # Authentication & authorization
├── database.js           # Secure data storage
├── js/auth.js           # Frontend authentication
├── admin.html           # Admin dashboard
├── user-content.html    # User content portal
├── test-security.js     # Security test suite
└── SECURITY_IMPLEMENTATION.md # Documentation
```

### Security Best Practices

1. **Always change default admin password** after first login
2. **Use strong passwords** for all accounts
3. **Regularly audit user accounts** and content
4. **Monitor access logs** for suspicious activity
5. **Keep dependencies updated** for security patches

### Production Deployment Considerations

1. **Enable HTTPS** with SSL certificates
2. **Set proper environment variables** for secrets
3. **Implement rate limiting** for API endpoints
4. **Add logging and monitoring** for security events
5. **Regular security audits** and penetration testing

For complete security implementation details, refer to `SECURITY_IMPLEMENTATION.md`.