import { formProps } from "../../store/store";

export const totalInteresesPagados = (
  duracion: number,
  pagoMensual: number,
  montoPrestamoCalculado: number
) => {
  return duracion * 12 * pagoMensual - montoPrestamoCalculado;
};

export const duracionTotal = (duracion: number): number => {
  return duracion * 12;
};

export const prestamoConIntereses = (duracion: number, pagoMensual: number) => {
  return duracion * 12 * pagoMensual;
};

export const calcularCae = (
  montoPrestamoCalculado: number,
  tasaDeInteres: number
) => {
  return (montoPrestamoCalculado * (tasaDeInteres + 1)) / 100;
};
export const calcularGastosOperacionales = (montoPrestamoCalculado: number) => {
  return (montoPrestamoCalculado * 1) / 100;
};

export const calcularMontoTotal = (
  costoInmueble: number,
  pie: number,
  bonoPie: number,
  totalIntereses: number,
  cae: number,
  gastosOperacionales: number
) => {
  return (
    costoInmueble + pie + bonoPie + totalIntereses + cae + gastosOperacionales
  );
};

export const calcularPorcentajeIncidencia = (item: number, total: number) => {
  return (item * 100) / total;
};

export const calcularTablaAmortizacionAnual = (
  formInfo: formProps,
  montoPrestamoCalculado: number
) => {
  const tasaDecimal = formInfo.tasaDeInteres / 100;
  const cuotaAnual =
    (montoPrestamoCalculado * tasaDecimal) /
    (1 - Math.pow(1 + tasaDecimal, -formInfo.duracion));

  let saldo = montoPrestamoCalculado;
  return Array.from({ length: formInfo.duracion }, (_, i) => {
    const interes = saldo * tasaDecimal;
    const abonoCapital = cuotaAnual - interes;
    saldo -= abonoCapital;

    const date = new Date();
    const year = date.getFullYear();

    return {
      anio: year + i + 1,
      cuotaAnual: cuotaAnual,
      interes: interes,
      abonoCapital: abonoCapital,
      saldoRestante: saldo,
    };
  });
};
