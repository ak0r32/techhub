const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.get('/faq', (req, res) => {
  res.sendFile(path.join(__dirname, 'faq.html'));
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
