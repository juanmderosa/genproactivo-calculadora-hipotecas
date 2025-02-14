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
            <p>
              {" "}
              <span>${formatNumber(montoPrestamoCalculado)} </span>
              <span>/</span>
              <span>UF {formatNumber(montoPrestamoCalculado / ufValue)}</span>
            </p>
          ) : (
            <p>
              <span>${formatNumber(montoPrestamoCalculado * ufValue)}</span>
              <span>/</span>

              <span>
                UF
                {formatNumber(montoPrestamoCalculado)}
              </span>
            </p>
          )}
        </div>
      )}
      {/*       <span>{`(Precio de escrituración - Pie - Bono pie)`}</span>
       */}{" "}
      <h4>Monto del Préstamo</h4>
    </div>
  );
};
