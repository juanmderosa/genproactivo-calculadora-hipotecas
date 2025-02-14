import { formatNumber } from "../../../helpers/formatNumber";
import {
  calcularCae,
  calcularGastosOperacionales,
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
              <span>
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
        <p>Valor cuota estimado </p>
      </div>

      <div className="asociatedValues">
        <div>
          <p>CAE estimado del {`${formInfo.tasaDeInteres + 1}%:`}</p>
          <strong>
            $
            {valueType === "$"
              ? montoPrestamoCalculado > 0 &&
                pagoMensual > 0 &&
                formInfo.tasaDeInteres > 0
                ? formatNumber(
                    calcularCae(montoPrestamoCalculado, formInfo.tasaDeInteres)
                  )
                : 0
              : montoPrestamoCalculado > 0 &&
                pagoMensual > 0 &&
                formInfo.tasaDeInteres > 0
              ? formatNumber(
                  calcularCae(montoPrestamoCalculado, formInfo.tasaDeInteres) *
                    ufValue
                )
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
