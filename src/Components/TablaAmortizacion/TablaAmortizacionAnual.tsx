import { formatNumber } from "../../helpers/formatNumber";
import { calcularTablaAmortizacionAnual } from "../../helpers/Formulas/formulas";
import { useFormStore } from "../../store/store";

const AmortizacionAnual = () => {
  const { formInfo, montoPrestamoCalculado, ufValue, valueType } =
    useFormStore();

  const tabla = calcularTablaAmortizacionAnual(
    formInfo,
    montoPrestamoCalculado
  );

  return (
    <>
      <p className="tableTitle">Tabla de Amortización Anual</p>
      <div className="tableMainContainer">
        <table className="tableContainer">
          <thead className="tableHead">
            <tr className="tableHeadRow">
              <th>Año</th>
              <th>Pago Anual</th>
              <th>Intereses</th>
              <th>Amortización</th>
              <th>Saldo Pendiente</th>
            </tr>
          </thead>
          <tbody>
            {tabla.map((fila) => (
              <tr key={fila.anio}>
                <td>{fila.anio}</td>
                <td>
                  {valueType === "$" ? (
                    <>
                      ${formatNumber(fila.cuotaAnual)} / UF{" "}
                      {formatNumber(fila.cuotaAnual / ufValue)}
                    </>
                  ) : (
                    <>
                      ${formatNumber(fila.cuotaAnual * ufValue)} / UF{" "}
                      {formatNumber(fila.cuotaAnual)}
                    </>
                  )}
                </td>
                <td>
                  {valueType === "$" ? (
                    <>
                      ${formatNumber(fila.interes)} / UF{" "}
                      {formatNumber(fila.interes / ufValue)}
                    </>
                  ) : (
                    <>
                      ${formatNumber(fila.interes * ufValue)} / UF{" "}
                      {formatNumber(fila.interes)}
                    </>
                  )}
                </td>
                <td>
                  {valueType === "$" ? (
                    <>
                      ${formatNumber(fila.abonoCapital)} / UF{" "}
                      {formatNumber(fila.abonoCapital / ufValue)}
                    </>
                  ) : (
                    <>
                      ${formatNumber(fila.abonoCapital * ufValue)} / UF{" "}
                      {formatNumber(fila.abonoCapital)}
                    </>
                  )}
                </td>
                <td>
                  {valueType === "$" ? (
                    <>
                      ${formatNumber(fila.saldoRestante)} / UF{" "}
                      {formatNumber(fila.saldoRestante / ufValue)}
                    </>
                  ) : (
                    <>
                      ${formatNumber(fila.saldoRestante * ufValue)} / UF{" "}
                      {formatNumber(fila.saldoRestante)}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AmortizacionAnual;
