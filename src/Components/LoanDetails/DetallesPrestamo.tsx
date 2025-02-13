import { getFinalDate } from "../../helpers/dates/dates";
import { formatNumber } from "../../helpers/formatNumber";
import {
  calcularCae,
  calcularGastosOperacionales,
  duracionTotal,
  prestamoConIntereses,
  totalInteresesPagados,
  calcularMontoTotal,
  calcularPorcentajeIncidencia,
} from "../../helpers/Formulas/formulas";
import { useFormStore } from "../../store/store";
import "./detalles.css";
import { IoHomeSharp } from "react-icons/io5";

export const DetallesPrestamo = () => {
  const { formInfo, montoPrestamoCalculado, pagoMensual, ufValue, valueType } =
    useFormStore();
  const { pie, bonoPie, costoInmueble, duracion, tasaDeInteres } = formInfo;

  const interesesPagados = totalInteresesPagados(
    duracion,
    pagoMensual,
    montoPrestamoCalculado
  );
  const cae = calcularCae(montoPrestamoCalculado, tasaDeInteres);
  const gastosOperacionales = calcularGastosOperacionales(
    montoPrestamoCalculado
  );

  const montoTotal = calcularMontoTotal(
    costoInmueble,
    pie,
    bonoPie,
    interesesPagados,
    cae,
    gastosOperacionales
  );

  const renderProgressBar = (valor: number) => {
    const montoTotalNumber = montoTotal;
    const newValor = valor;
    const newCalculo = calcularPorcentajeIncidencia(newValor, montoTotalNumber);
    const porcentaje = Math.min(100, newCalculo);

    return (
      <div
        className="progress-bar"
        style={{ "--progress-width": `${porcentaje}%` } as React.CSSProperties}>
        <p className="progress-text">
          {porcentaje > 0 ? `${formatNumber(porcentaje)}%` : "0%"}
        </p>
      </div>
    );
  };

  return (
    <section id="details">
      <div className="detailsContainer">
        <IoHomeSharp />
        <h2>Detalles del Préstamo</h2>
      </div>
      <article>
        <div>
          <p>
            Monto del Préstamo:
            <strong>
              $
              {valueType === "$"
                ? montoPrestamoCalculado > 0
                  ? formatNumber(montoPrestamoCalculado)
                  : 0
                : montoPrestamoCalculado > 0
                ? formatNumber(montoPrestamoCalculado * ufValue)
                : 0}
            </strong>
          </p>
          {renderProgressBar(montoPrestamoCalculado)}
        </div>
        <div>
          <p>
            Pie:{" "}
            <strong>
              $
              {valueType === "$"
                ? pie > 0
                  ? formatNumber(pie)
                  : 0
                : pie > 0
                ? formatNumber(pie * ufValue)
                : 0}
            </strong>
          </p>
          {renderProgressBar(pie)}
        </div>
        <div>
          <p>
            Bono Pie:{" "}
            <strong>
              $
              {valueType === "$"
                ? bonoPie > 0
                  ? formatNumber(bonoPie)
                  : 0
                : bonoPie > 0
                ? formatNumber(bonoPie * ufValue)
                : 0}
            </strong>
          </p>
          {renderProgressBar(bonoPie)}
        </div>
        <div>
          <p>
            Total de Intereses pagados:{" "}
            <strong>
              $
              {valueType === "$"
                ? interesesPagados > 0
                  ? formatNumber(interesesPagados)
                  : 0
                : interesesPagados > 0
                ? formatNumber(interesesPagados * ufValue)
                : 0}
            </strong>
          </p>
          {renderProgressBar(interesesPagados)}
        </div>
        <div>
          <p>
            CAE {tasaDeInteres + 1}%:{" "}
            <strong>
              $
              {valueType === "$"
                ? cae > 0
                  ? formatNumber(cae)
                  : 0
                : cae > 0
                ? formatNumber(cae * ufValue)
                : 0}
            </strong>
          </p>
          {renderProgressBar(cae)}
        </div>
        <div>
          <p>
            Gastos Operacionales:{" "}
            <strong>
              $
              {valueType === "$"
                ? gastosOperacionales > 0
                  ? formatNumber(gastosOperacionales)
                  : 0
                : gastosOperacionales > 0
                ? formatNumber(gastosOperacionales * ufValue)
                : 0}
            </strong>
          </p>
          {renderProgressBar(gastosOperacionales)}
        </div>
      </article>
      <div className="resumeContainer">
        <div className="resumeItem">
          <p>Total de {duracionTotal(duracion)} pagos:</p>
          <strong>
            $
            {valueType === "$"
              ? formatNumber(prestamoConIntereses(duracion, pagoMensual))
              : formatNumber(
                  prestamoConIntereses(duracion, pagoMensual) * ufValue
                )}
          </strong>
        </div>
        <div className="resumeItem">
          <p>Fecha finalización de pagos:</p>
          <strong>
            {formInfo.duracion ? getFinalDate(formInfo.duracion) : ""}
          </strong>
        </div>
      </div>
    </section>
  );
};
