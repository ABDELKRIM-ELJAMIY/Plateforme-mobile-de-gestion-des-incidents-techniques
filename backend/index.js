const dotenv = require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré en mode ${process.env.NODE_ENV} sur le port ${PORT}`);
});

app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(r.route.path);
  }
});