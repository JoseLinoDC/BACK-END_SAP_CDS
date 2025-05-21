const start = require('./server');

start({})
  .then(() => console.log('Server iniciado correctamente'))
  .catch(err => {
    console.error('Error iniciando server', err);
    process.exit(1);
  });
