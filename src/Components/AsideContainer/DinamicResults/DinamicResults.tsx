import { formatNumber } from "../../../helpers/formatNumber";
import {
  calcularGastosOperacionales,
  calcularSeguro,
  FACTOR_CAE,
} from "../../../helpers/Formulas/formulas";
import { useFormStore } from "../../../store/store";
import "./dinamicResults.css";

export const DinamicResults = () => {
  const { montoPrestamoCalculado, pagoMensual, formInfo, ufValue, valueType } =
    useFormStore();

  return (
    <div className="dinamicResultsContainer">
      <div className="estimatedMonthlyPayment">
        <div>
          <div id="estimatedMonthlyPaymentValues">
            <strong>
              $
              <span id="montoPagoMensualPesos">
                {valueType === "$"
                  ? formatNumber(pagoMensual)
                  : formatNumber(pagoMensual * ufValue)}
              </span>
            </strong>
            <p>/</p>
            <strong>
              UF{" "}
              {valueType === "$"
                ? formatNumber(pagoMensual / ufValue)
                : formatNumber(pagoMensual)}
            </strong>
          </div>
        </div>
        <p style={{ display: "flex", flexDirection: "column" }}>
          Valor cuota estimado
          <span>
            (Tasa CAE del{" "}
            {`${formatNumber(formInfo.tasaDeInteres * FACTOR_CAE)}% `} incluye
            costo de seguros){" "}
          </span>
        </p>
      </div>

      <div className="asociatedValues">
        <div>
          <p>Costo de Seguro anual: </p>
          <strong>
            $
            {valueType === "$"
              ? montoPrestamoCalculado > 0 &&
                pagoMensual > 0 &&
                formInfo.tasaDeInteres > 0
                ? formatNumber(calcularSeguro(montoPrestamoCalculado))
                : 0
              : montoPrestamoCalculado > 0 &&
                pagoMensual > 0 &&
                formInfo.tasaDeInteres > 0
              ? formatNumber(calcularSeguro(montoPrestamoCalculado) * ufValue)
              : 0}
          </strong>
        </div>
        <div>
          <p>Gastos Operacionales: 1%: </p>
          <strong>
            $
            {valueType === "$"
              ? montoPrestamoCalculado > 0 && pagoMensual > 0
                ? formatNumber(
                    calcularGastosOperacionales(montoPrestamoCalculado)
                  )
                : 0
              : montoPrestamoCalculado > 0 && pagoMensual > 0
              ? formatNumber(
                  calcularGastosOperacionales(montoPrestamoCalculado) * ufValue
                )
              : 0}
          </strong>
        </div>
      </div>
    </div>
  );
};
