import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 5173;

const server = createServer(async (req, res) => {
  try {
    const filePath = join(__dirname, 'index.html');
    const content = await readFile(filePath, 'utf-8');
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
  } catch (err) {
    res.writeHead(500);
    res.end('Error loading page');
  }
});

server.listen(PORT, () => {
  console.log(`Frontend server running at http://localhost:${PORT}`);
  console.log(`Open your browser to http://localhost:${PORT} to view the console`);
});








