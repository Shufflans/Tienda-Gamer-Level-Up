// SIMULACIÓN de pasarela de pago (el backend no tiene módulo de pagos).
// Reglas de la simulación:
//   - Transferencia bancaria: siempre aprobada.
//   - Tarjeta: se rechaza si el número es inválido (menos de 13 dígitos)
//              o si termina en 0000 (tarjeta de prueba para mostrar la compra fallida).
// Los datos de la tarjeta NUNCA se guardan ni se envían al servidor.
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

export const pagoService = {
  async procesar({ metodo, numeroTarjeta = "" }) {
    await esperar(900);

    if (metodo === "tarjeta") {
      const digitos = numeroTarjeta.replace(/\D/g, "");
      if (digitos.length < 13) {
        return { aprobado: false, motivo: "El número de tarjeta ingresado no es válido." };
      }
      if (digitos.endsWith("0000")) {
        return { aprobado: false, motivo: "El banco rechazó el pago (fondos insuficientes)." };
      }
    }
    return { aprobado: true };
  },
};
