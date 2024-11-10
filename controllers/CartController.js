//const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Agregar un producto al carrito
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    let cartItem = await Cart.findOne({ where: { productId } });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ productId, quantity });
    }
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un producto del carrito
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  try {
    await Cart.destroy({ where: { productId } });
    res.json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener el contenido del carrito y calcular el total
exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({ include: [Product] });
    const total = cartItems.reduce((acc, item) => acc + item.Product.price * item.quantity, 0);
    res.json({ cartItems, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
