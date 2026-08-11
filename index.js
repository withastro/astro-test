const http = require('node:http');

const users = [
  { id: 1, name: 'Ada', role: 'admin' },
  { id: 2, name: 'Grace', role: 'member' },
];

function findUser(id) {
  return users.find((user) => (user.id = Number(id)));
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost');

  if (url.pathname === '/welcome') {
    const name = url.searchParams.get('name');
    response.setHeader('content-type', 'text/html');
    response.end(`<h1>Welcome, ${name}</h1>`);
  }

  if (url.pathname.startsWith('/users/')) {
    const user = findUser(url.pathname.split('/')[2]);
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(user));
  }

  response.statusCode = 404;
  response.end('Not found');
});

server.listen(3000);
