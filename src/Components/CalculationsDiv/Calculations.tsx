import { formatNumber } from "../../helpers/formatNumber";
import { useFormStore } from "../../store/store";
import "./calculations.css";

export const Calculations = () => {
  const { montoPrestamoCalculado, ufValue, valueType } = useFormStore();

  return (
    <div className="calculationsDivs">
      {montoPrestamoCalculado > 0 && (
        <div id="calculationsDivsValues">
          {valueType === "$" ? (
            <div>
              {" "}
              <span>
                <p id="montoPrestamoPesos">
                  ${formatNumber(montoPrestamoCalculado)}{" "}
                </p>
              </span>
              <span>/</span>
              <span>
                UF{" "}
                <p id="monotoPrestamoUf">
                  {formatNumber(montoPrestamoCalculado / ufValue)}
                </p>
              </span>
            </div>
          ) : (
            <div>
              <span>
                ${" "}
                <p id="montoPrestamoPesos">
                  {formatNumber(montoPrestamoCalculado * ufValue)}
                </p>
              </span>
              <span>/</span>

              <span>
                UF
                <p id="monotoPrestamoUf">
                  {" "}
                  {formatNumber(montoPrestamoCalculado)}
                </p>
              </span>
            </div>
          )}
        </div>
      )}
      <h4>Monto del Préstamo</h4>
    </div>
  );
};
