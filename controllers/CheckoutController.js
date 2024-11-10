exports.processPayment = (req, res) => {
    const { total } = req.body;
    // Simulación del proceso de pago (ficticio)
    const paymentSuccess = true; // Puedes añadir lógica de pago real aquí en el futuro
    if (paymentSuccess) {
      res.json({ message: 'Pago procesado exitosamente', total });
    } else {
      res.status(500).json({ message: 'Error en el proceso de pago' });
    }
  };
  