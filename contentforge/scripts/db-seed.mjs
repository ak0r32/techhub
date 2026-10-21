const seedData = {
  profiles: [
    {
      email: 'admin@contentforge.local',
      full_name: 'System Admin',
      role: 'admin',
    },
    {
      email: 'editor@contentforge.local',
      full_name: 'Content Editor',
      role: 'editor',
    },
  ],
  categories: [
    { name: 'AI & Automation', slug: 'ai-automation', description: 'AI-related learning content' },
    { name: 'Product Design', slug: 'product-design', description: 'UX and design topics' },
    { name: 'Marketing', slug: 'marketing', description: 'Growth and marketing' },
  ],
};

console.log('Seed data prepared for ContentForge.');
console.log(JSON.stringify(seedData, null, 2));
