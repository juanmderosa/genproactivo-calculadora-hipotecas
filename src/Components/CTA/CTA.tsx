import { formatNumber } from "../../helpers/formatNumber";
import { useFormStore } from "../../store/store";
import "./Cta.css";

export const CTA = () => {
  const { montoPrestamoCalculado, pagoMensual, valueType, ufValue } =
    useFormStore();
  return (
    <section id="CTA">
      <div className="ctaText">
        <p>
          Para conseguir 1 departamento con{" "}
          <strong>
            UF
            {valueType === "uf"
              ? formatNumber(montoPrestamoCalculado)
              : formatNumber(montoPrestamoCalculado / ufValue)}{" "}
          </strong>
          de financiamiento necesitas una renta de
          <strong>
            {" "}
            $
            {valueType === "uf"
              ? formatNumber(pagoMensual * ufValue * 4)
              : formatNumber(pagoMensual * 4)}
          </strong>
          .
        </p>
        <p>
          Con nuestra metodología podrías multiplicar hasta
          <strong>
            {" "}
            4 propiedades y conseguir UF
            {valueType === "uf"
              ? formatNumber(montoPrestamoCalculado * 4)
              : formatNumber((montoPrestamoCalculado / ufValue) * 4)}{" "}
          </strong>
          de financiamiento.
        </p>
      </div>
      <p className="cta">Pincha el botón para que conocer más.</p>
      <a
        className="ctaButton"
        href="https://link.santofunnel.com/widget/survey/JMPl8Z7NIqZIhZD0oJg8?utm_campaign=organic&utm_medium=webhome"
        target="_blank">
        Quiero multiplicar mis inversiones
      </a>
    </section>
  );
};
