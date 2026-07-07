// API Redirect Handler
class APIRedirectHandler {
  constructor() {
    this.apiBase = '/api';
    this.contentMap = {
      datascience: {
        python: 'content/datascience/python.html',
        ml: 'content/datascience/ml.html',
        dl: 'content/datascience/dl.html',
        nlp: 'content/datascience/nlp.html',
        sql: 'content/datascience/sql.html',
        fastapi: 'content/datascience/fastapi.html',
        pytorch: 'content/datascience/pytorch.html',
        tensorflow: 'content/datascience/tensorflow.html',
        transformers: 'content/datascience/transformers.html',
        rl: 'content/datascience/rl.html',
        scikit: 'content/datascience/scikit.html',
        automl: 'content/datascience/automl.html',
        mlops: 'content/datascience/mlops.html',
        cnn: 'content/datascience/cnn.html',
        langchain: 'content/datascience/langchain.html',
        math: 'content/datascience/math.html'
      },
      cybersecurity: {
        fundamentals: 'content/cybersecurity/fundamentals.html',
        network: 'content/cybersecurity/network.html',
        cryptography: 'content/cybersecurity/cryptography.html',
        ethics: 'content/cybersecurity/ethics.html',
        forensics: 'content/cybersecurity/forensics.html',
        incident: 'content/cybersecurity/incident.html',
        malware: 'content/cybersecurity/malware.html',
        soc: 'content/cybersecurity/soc.html',
        siem: 'content/cybersecurity/siem.html',
        pentest: 'content/cybersecurity/pentest.html',
        webapp: 'content/cybersecurity/webapp.html',
        mobile: 'content/cybersecurity/mobile.html',
        cloud: 'content/cybersecurity/cloud.html',
        threat: 'content/cybersecurity/threat.html',
        iot: 'content/cybersecurity/iot.html',
        compliance: 'content/cybersecurity/compliance.html',
        rodemap: 'content/cybersecurity/Rodemap.html'
      }
    };
  }

  // Redirect to content using API
  redirectToContent(category, contentId) {
    window.location.href = `${this.apiBase}/redirect/${category}/${contentId}`;
  }

  // Direct redirect using content map (fallback if API is not available)
  directRedirect(category, contentId) {
    if (this.contentMap[category] && this.contentMap[category][contentId]) {
      window.location.href = `/${this.contentMap[category][contentId]}`;
    } else {
      console.error('Content not found:', category, contentId);
    }
  }

  // Fetch all available content
  async getAllContent() {
    try {
      const response = await fetch(`${this.apiBase}/content`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching content:', error);
      return null;
    }
  }

  // Fetch content by category
  async getContentByCategory(category) {
    try {
      const response = await fetch(`${this.apiBase}/content/${category}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching content:', error);
      return null;
    }
  }

  // Initialize redirect handlers on page load
  init() {
    // Add click handlers to all content links
    this.addRedirectHandlers();
  }

  // Add redirect handlers to links
  addRedirectHandlers() {
    // Intercept all links to content/ directory
    const allLinks = document.querySelectorAll('a[href]');
    
    allLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Check if it's a content link
      if (href && href.startsWith('content/')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Parse the path to determine category and content ID
          const pathParts = href.split('/');
          if (pathParts.length >= 3) {
            const category = pathParts[1]; // datascience or cybersecurity
            const filename = pathParts[2]; // python.html, ml.html, etc.
            const contentId = filename.replace('.html', '');
            
            // Try API redirect first, fallback to direct redirect
            this.redirectToContent(category, contentId);
          } else {
            // If path parsing fails, use direct navigation
            window.location.href = href;
          }
        });
      }
    });

    // Also handle data-category attributes if present
    const dataScienceLinks = document.querySelectorAll('[data-category="datascience"]');
    dataScienceLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const contentId = link.getAttribute('data-content-id');
        this.redirectToContent('datascience', contentId);
      });
    });

    // Cybersecurity links
    const cyberSecurityLinks = document.querySelectorAll('[data-category="cybersecurity"]');
    cyberSecurityLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const contentId = link.getAttribute('data-content-id');
        this.redirectToContent('cybersecurity', contentId);
      });
    });
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const redirectHandler = new APIRedirectHandler();
  redirectHandler.init();
});

// Make it available globally
window.APIRedirectHandler = APIRedirectHandler;
