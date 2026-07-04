import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

 source /home/ubuntu/.user_env
 source /home/ubuntu/.user_env
 source /home/ubuntu/.user_env
 source /home/ubuntu/.user_env
 source /home/ubuntu/.user_env
 source /home/ubuntu/.user_env
 source /home/ubuntu/.user_env
th = path.join(__dirname, '../dist/public');
app.use(express.static(publicPath));

// SPA fallback - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Loft 28 website running on port ${PORT}`);
  console.log(`📍 Visit: http://localhost:${PORT}`);
});
