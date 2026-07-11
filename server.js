import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static assets from the 'dist' directory in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Support both /logos/... and /public/logos/... paths in dev & production
const publicPath = path.join(__dirname, 'public');
app.use('/public', express.static(publicPath));
app.use(express.static(publicPath));

// Fallback to serving the current directory
app.use(express.static(__dirname));

// Send our single index.html file for any route
app.get('*', (req, res) => {
  const prodIndex = path.join(distPath, 'index.html');
  if (fs.existsSync(prodIndex)) {
    res.sendFile(prodIndex);
  } else {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
