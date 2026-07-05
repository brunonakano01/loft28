const http = require('http');
const https = require('https');
const url = require('url');

const TARGET_URL = 'https://3000-itap81dwp52y21nblubtu-ad67a086.us2.manus.computer';

const server = http.createServer((req, res) => {
  const targetUrl = new URL(req.url, TARGET_URL).toString();
  
  https.get(targetUrl, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  }).on('error', (err) => {
    res.writeHead(500);
    res.end('Error: ' + err.message);
  });
});

server.listen(3001, () => {
  console.log('Proxy server running on port 3001');
});
