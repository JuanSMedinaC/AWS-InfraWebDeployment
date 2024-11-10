const express = require('express');
const bodyParser = require('body-parser');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');
const sequelize = require('./config/database');

const app = express();
app.use(bodyParser.json());

app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
  });
}).catch(error => console.error('Error al sincronizar con la base de datos:', error));
