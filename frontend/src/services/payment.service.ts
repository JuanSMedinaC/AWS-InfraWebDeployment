export class PaymentService {
    public static async processPayment(amount: number): Promise<boolean> {
      // Simular un proceso de pago exitoso
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Pago de $${amount} procesado con éxito`);
          resolve(true);
        }, 2000); // Simula una demora de 2 segundos
      });
    }
  }
  