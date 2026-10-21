const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve static files from the current directory
app.use(express.static(__dirname));

// API endpoint to get all available content
app.get('/api/content', (req, res) => {
  const content = {
    datascience: [
      { id: 'python', title: 'Python Programming', path: 'content/datascience/python.html' },
      { id: 'ml', title: 'Machine Learning', path: 'content/datascience/ml.html' },
      { id: 'dl', title: 'Deep Learning', path: 'content/datascience/dl.html' },
      { id: 'nlp', title: 'Natural Language Processing', path: 'content/datascience/nlp.html' },
      { id: 'sql', title: 'SQL & Databases', path: 'content/datascience/sql.html' },
      { id: 'fastapi', title: 'FastAPI', path: 'content/datascience/fastapi.html' },
      { id: 'pytorch', title: 'PyTorch', path: 'content/datascience/pytorch.html' },
      { id: 'tensorflow', title: 'TensorFlow', path: 'content/datascience/tensorflow.html' },
      { id: 'transformers', title: 'Transformers', path: 'content/datascience/transformers.html' },
      { id: 'rl', title: 'Reinforcement Learning', path: 'content/datascience/rl.html' },
      { id: 'scikit', title: 'Scikit-Learn', path: 'content/datascience/scikit.html' },
      { id: 'automl', title: 'AutoML', path: 'content/datascience/automl.html' },
      { id: 'mlops', title: 'MLOps', path: 'content/datascience/mlops.html' },
      { id: 'cnn', title: 'Computer Vision', path: 'content/datascience/cnn.html' },
      { id: 'langchain', title: 'LangChain', path: 'content/datascience/langchain.html' },
      { id: 'math', title: 'Mathematics for DS', path: 'content/datascience/math.html' }
    ],
    cybersecurity: [
      { id: 'fundamentals', title: 'Cybersecurity Fundamentals', path: 'content/cybersecurity/fundamentals.html' },
      { id: 'network', title: 'Network Security', path: 'content/cybersecurity/network.html' },
      { id: 'cryptography', title: 'Cryptography', path: 'content/cybersecurity/cryptography.html' },
      { id: 'ethics', title: 'Ethical Hacking', path: 'content/cybersecurity/ethics.html' },
      { id: 'forensics', title: 'Digital Forensics', path: 'content/cybersecurity/forensics.html' },
      { id: 'incident', title: 'Incident Response', path: 'content/cybersecurity/incident.html' },
      { id: 'malware', title: 'Malware Analysis', path: 'content/cybersecurity/malware.html' },
      { id: 'soc', title: 'SOC Operations', path: 'content/cybersecurity/soc.html' },
      { id: 'siem', title: 'SIEM Tools', path: 'content/cybersecurity/siem.html' },
      { id: 'pentest', title: 'Penetration Testing', path: 'content/cybersecurity/pentest.html' },
      { id: 'webapp', title: 'Web App Security', path: 'content/cybersecurity/webapp.html' },
      { id: 'mobile', title: 'Mobile Security', path: 'content/cybersecurity/mobile.html' },
      { id: 'cloud', title: 'Cloud Security', path: 'content/cybersecurity/cloud.html' },
      { id: 'threat', title: 'Threat Intelligence', path: 'content/cybersecurity/threat.html' },
      { id: 'iot', title: 'IoT Security', path: 'content/cybersecurity/iot.html' },
      { id: 'compliance', title: 'Compliance', path: 'content/cybersecurity/compliance.html' },
      { id: 'rodemap', title: 'Roadmap', path: 'content/cybersecurity/Rodemap.html' }
    ]
  };
  
  res.json(content);
});

// API endpoint to search content
app.get('/api/search', (req, res) => {
  const query = req.query.q || '';
  const category = req.query.category || 'all';
  
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const allContent = {
    datascience: [
      { id: 'python', title: 'Python Programming', description: 'Learn Python programming with focus on data science applications', category: 'datascience', path: 'content/datascience/python.html', tags: ['python', 'programming', 'data science', 'basics'] },
      { id: 'ml', title: 'Machine Learning', description: 'Master ML algorithms and build predictive models', category: 'datascience', path: 'content/datascience/ml.html', tags: ['machine learning', 'algorithms', 'models', 'predictions'] },
      { id: 'dl', title: 'Deep Learning', description: 'Deep neural networks and advanced learning techniques', category: 'datascience', path: 'content/datascience/dl.html', tags: ['deep learning', 'neural networks', 'ai', 'advanced'] },
      { id: 'nlp', title: 'Natural Language Processing', description: 'Processing and analyzing human language data', category: 'datascience', path: 'content/datascience/nlp.html', tags: ['nlp', 'text processing', 'language', 'ai'] },
      { id: 'sql', title: 'SQL & Databases', description: 'Database design, querying, and management', category: 'datascience', path: 'content/datascience/sql.html', tags: ['sql', 'databases', 'data management', 'queries'] },
      { id: 'fastapi', title: 'FastAPI', description: 'Building modern APIs with FastAPI framework', category: 'datascience', path: 'content/datascience/fastapi.html', tags: ['fastapi', 'api', 'web development', 'python'] },
      { id: 'pytorch', title: 'PyTorch', description: 'Deep learning framework PyTorch for neural networks', category: 'datascience', path: 'content/datascience/pytorch.html', tags: ['pytorch', 'deep learning', 'neural networks', 'framework'] },
      { id: 'tensorflow', title: 'TensorFlow', description: 'TensorFlow library for machine learning and deep learning', category: 'datascience', path: 'content/datascience/tensorflow.html', tags: ['tensorflow', 'deep learning', 'machine learning', 'framework'] },
      { id: 'transformers', title: 'Transformers', description: 'Transformer models and attention mechanisms', category: 'datascience', path: 'content/datascience/transformers.html', tags: ['transformers', 'bert', 'gpt', 'nlp', 'ai'] },
      { id: 'rl', title: 'Reinforcement Learning', description: 'Learning through rewards and agent interactions', category: 'datascience', path: 'content/datascience/rl.html', tags: ['reinforcement learning', 'agents', 'rewards', 'ai'] },
      { id: 'scikit', title: 'Scikit-Learn', description: 'Machine learning library for Python', category: 'datascience', path: 'content/datascience/scikit.html', tags: ['scikit-learn', 'machine learning', 'python', 'algorithms'] },
      { id: 'automl', title: 'AutoML', description: 'Automated machine learning and hyperparameter tuning', category: 'datascience', path: 'content/datascience/automl.html', tags: ['automl', 'machine learning', 'automation', 'tuning'] },
      { id: 'mlops', title: 'MLOps', description: 'Machine learning operations and deployment', category: 'datascience', path: 'content/datascience/mlops.html', tags: ['mlops', 'deployment', 'operations', 'machine learning'] },
      { id: 'cnn', title: 'Computer Vision', description: 'Image recognition and computer vision techniques', category: 'datascience', path: 'content/datascience/cnn.html', tags: ['computer vision', 'cnn', 'image recognition', 'deep learning'] },
      { id: 'langchain', title: 'LangChain', description: 'Building LLM applications with LangChain', category: 'datascience', path: 'content/datascience/langchain.html', tags: ['langchain', 'llm', 'ai', 'gpt', 'nlp'] },
      { id: 'math', title: 'Mathematics for DS', description: 'Mathematical foundations for data science', category: 'datascience', path: 'content/datascience/math.html', tags: ['mathematics', 'linear algebra', 'calculus', 'statistics'] }
    ],
    cybersecurity: [
      { id: 'fundamentals', title: 'Cybersecurity Fundamentals', description: 'Understand security fundamentals and best practices', category: 'cybersecurity', path: 'content/cybersecurity/fundamentals.html', tags: ['cybersecurity', 'fundamentals', 'basics', 'security'] },
      { id: 'network', title: 'Network Security', description: 'Protecting networks from attacks and vulnerabilities', category: 'cybersecurity', path: 'content/cybersecurity/network.html', tags: ['network security', 'firewalls', 'protocols', 'defense'] },
      { id: 'cryptography', title: 'Cryptography', description: 'Encryption, decryption, and cryptographic techniques', category: 'cybersecurity', path: 'content/cybersecurity/cryptography.html', tags: ['cryptography', 'encryption', 'security', 'algorithms'] },
      { id: 'ethics', title: 'Ethical Hacking', description: 'Penetration testing and ethical hacking practices', category: 'cybersecurity', path: 'content/cybersecurity/ethics.html', tags: ['ethical hacking', 'penetration testing', 'security', 'testing'] },
      { id: 'forensics', title: 'Digital Forensics', description: 'Investigation and analysis of digital crimes', category: 'cybersecurity', path: 'content/cybersecurity/forensics.html', tags: ['digital forensics', 'investigation', 'analysis', 'crime'] },
      { id: 'incident', title: 'Incident Response', description: 'Responding to and managing security incidents', category: 'cybersecurity', path: 'content/cybersecurity/incident.html', tags: ['incident response', 'security', 'management', 'defense'] },
      { id: 'malware', title: 'Malware Analysis', description: 'Analyzing and understanding malware behavior', category: 'cybersecurity', path: 'content/cybersecurity/malware.html', tags: ['malware', 'analysis', 'reverse engineering', 'security'] },
      { id: 'soc', title: 'SOC Operations', description: 'Security Operations Center management', category: 'cybersecurity', path: 'content/cybersecurity/soc.html', tags: ['soc', 'operations', 'monitoring', 'security'] },
      { id: 'siem', title: 'SIEM Tools', description: 'Security Information and Event Management tools', category: 'cybersecurity', path: 'content/cybersecurity/siem.html', tags: ['siem', 'tools', 'monitoring', 'events'] },
      { id: 'pentest', title: 'Penetration Testing', description: 'Testing security by simulating attacks', category: 'cybersecurity', path: 'content/cybersecurity/pentest.html', tags: ['penetration testing', 'testing', 'security', 'attacks'] },
      { id: 'webapp', title: 'Web App Security', description: 'Securing web applications from vulnerabilities', category: 'cybersecurity', path: 'content/cybersecurity/webapp.html', tags: ['web security', 'owasp', 'vulnerabilities', 'protection'] },
      { id: 'mobile', title: 'Mobile Security', description: 'Mobile device and app security practices', category: 'cybersecurity', path: 'content/cybersecurity/mobile.html', tags: ['mobile security', 'apps', 'devices', 'protection'] },
      { id: 'cloud', title: 'Cloud Security', description: 'Securing cloud infrastructure and services', category: 'cybersecurity', path: 'content/cybersecurity/cloud.html', tags: ['cloud security', 'aws', 'azure', 'infrastructure'] },
      { id: 'threat', title: 'Threat Intelligence', description: 'Understanding and analyzing security threats', category: 'cybersecurity', path: 'content/cybersecurity/threat.html', tags: ['threat intelligence', 'threats', 'analysis', 'defense'] },
      { id: 'iot', title: 'IoT Security', description: 'Securing Internet of Things devices', category: 'cybersecurity', path: 'content/cybersecurity/iot.html', tags: ['iot security', 'devices', 'networks', 'protection'] },
      { id: 'compliance', title: 'Compliance', description: 'Security compliance and regulations', category: 'cybersecurity', path: 'content/cybersecurity/compliance.html', tags: ['compliance', 'gdpr', 'regulations', 'standards'] },
      { id: 'rodemap', title: 'Roadmap', description: 'Cybersecurity learning roadmap', category: 'cybersecurity', path: 'content/cybersecurity/Rodemap.html', tags: ['roadmap', 'learning path', 'guide', 'cybersecurity'] }
    ]
  };

  const queryLower = query.toLowerCase();
  let results = [];

  // Get content based on category filter
  const contentToSearch = category === 'all' ? 
    [...allContent.datascience, ...allContent.cybersecurity] :
    allContent[category] || [];

  // Search through content
  results = contentToSearch.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(queryLower);
    const descriptionMatch = item.description.toLowerCase().includes(queryLower);
    const tagsMatch = item.tags.some(tag => tag.toLowerCase().includes(queryLower));
    return titleMatch || descriptionMatch || tagsMatch;
  });

  // Sort results by relevance
  results.sort((a, b) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    
    if (aTitle === queryLower) return -1;
    if (bTitle === queryLower) return 1;
    
    if (aTitle.startsWith(queryLower) && !bTitle.startsWith(queryLower)) return -1;
    if (!aTitle.startsWith(queryLower) && bTitle.startsWith(queryLower)) return 1;
    
    return 0;
  });

  res.json({
    query: query,
    category: category,
    total: results.length,
    results: results
  });
});

// API endpoint to get content by category
app.get('/api/content/:category', (req, res) => {
  const category = req.params.category;
  
  if (category === 'datascience' || category === 'cybersecurity') {
    const content = {
      datascience: [
        { id: 'python', title: 'Python Programming', path: 'content/datascience/python.html' },
        { id: 'ml', title: 'Machine Learning', path: 'content/datascience/ml.html' },
        { id: 'dl', title: 'Deep Learning', path: 'content/datascience/dl.html' },
        { id: 'nlp', title: 'Natural Language Processing', path: 'content/datascience/nlp.html' },
        { id: 'sql', title: 'SQL & Databases', path: 'content/datascience/sql.html' },
        { id: 'fastapi', title: 'FastAPI', path: 'content/datascience/fastapi.html' },
        { id: 'pytorch', title: 'PyTorch', path: 'content/datascience/pytorch.html' },
        { id: 'tensorflow', title: 'TensorFlow', path: 'content/datascience/tensorflow.html' },
        { id: 'transformers', title: 'Transformers', path: 'content/datascience/transformers.html' },
        { id: 'rl', title: 'Reinforcement Learning', path: 'content/datascience/rl.html' },
        { id: 'scikit', title: 'Scikit-Learn', path: 'content/datascience/scikit.html' },
        { id: 'automl', title: 'AutoML', path: 'content/datascience/automl.html' },
        { id: 'mlops', title: 'MLOps', path: 'content/datascience/mlops.html' },
        { id: 'cnn', title: 'Computer Vision', path: 'content/datascience/cnn.html' },
        { id: 'langchain', title: 'LangChain', path: 'content/datascience/langchain.html' },
        { id: 'math', title: 'Mathematics for DS', path: 'content/datascience/math.html' }
      ],
      cybersecurity: [
        { id: 'fundamentals', title: 'Cybersecurity Fundamentals', path: 'content/cybersecurity/fundamentals.html' },
        { id: 'network', title: 'Network Security', path: 'content/cybersecurity/network.html' },
        { id: 'cryptography', title: 'Cryptography', path: 'content/cybersecurity/cryptography.html' },
        { id: 'ethics', title: 'Ethical Hacking', path: 'content/cybersecurity/ethics.html' },
        { id: 'forensics', title: 'Digital Forensics', path: 'content/cybersecurity/forensics.html' },
        { id: 'incident', title: 'Incident Response', path: 'content/cybersecurity/incident.html' },
        { id: 'malware', title: 'Malware Analysis', path: 'content/cybersecurity/malware.html' },
        { id: 'soc', title: 'SOC Operations', path: 'content/cybersecurity/soc.html' },
        { id: 'siem', title: 'SIEM Tools', path: 'content/cybersecurity/siem.html' },
        { id: 'pentest', title: 'Penetration Testing', path: 'content/cybersecurity/pentest.html' },
        { id: 'webapp', title: 'Web App Security', path: 'content/cybersecurity/webapp.html' },
        { id: 'mobile', title: 'Mobile Security', path: 'content/cybersecurity/mobile.html' },
        { id: 'cloud', title: 'Cloud Security', path: 'content/cybersecurity/cloud.html' },
        { id: 'threat', title: 'Threat Intelligence', path: 'content/cybersecurity/threat.html' },
        { id: 'iot', title: 'IoT Security', path: 'content/cybersecurity/iot.html' },
        { id: 'compliance', title: 'Compliance', path: 'content/cybersecurity/compliance.html' },
        { id: 'rodemap', title: 'Roadmap', path: 'content/cybersecurity/Rodemap.html' }
      ]
    };
    
    res.json(content[category]);
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

// API endpoint to redirect to specific content
app.get('/api/redirect/:category/:id', (req, res) => {
  const category = req.params.category;
  const id = req.params.id;
  
  const contentMap = {
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
  
  if (contentMap[category] && contentMap[category][id]) {
    res.redirect(`/${contentMap[category][id]}`);
  } else {
    res.status(404).json({ error: 'Content not found' });
  }
});

// Serve main pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index-w3style.html'));
});

app.get('/tutorials', (req, res) => {
  res.sendFile(path.join(__dirname, 'tutorials.html'));
});

app.get('/exercises', (req, res) => {
  res.sendFile(path.join(__dirname, 'exercises.html'));
});

app.get('/certifications', (req, res) => {
  res.sendFile(path.join(__dirname, 'certifications.html'));
});

app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'search.html'));
});

app.get('/cybersecurity', (req, res) => {
  res.sendFile(path.join(__dirname, 'cybersecurity.html'));
});

// Serve content files
app.get('/content/:category/:file', (req, res) => {
  const category = req.params.category;
  const file = req.params.file;
  res.sendFile(path.join(__dirname, 'content', category, file));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
