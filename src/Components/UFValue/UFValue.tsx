import { useEffect } from "react";
import { getUfChile } from "../../lib/lib";
import { formatDate } from "../../helpers/dates/dates";
import { useFormStore } from "../../store/store";
import "./ufvalue.css";

export const UFValue = () => {
  const { ufValue, setUfValue, setValueType } = useFormStore();

  const formattedDate = formatDate();
  useEffect(() => {
    getUfChile().then((data) => setUfValue(data.serie[0].valor));
  }, []);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueType(e.target.value);
  };

  return (
    <section id="ufValue">
      <form>
        <p>Ingresar costo de inmueble en: </p>

        <label>
          <input
            type="radio"
            value="$"
            name="valueType"
            onChange={handleValueChange}
          />
          $
        </label>
        <label>
          <input
            type="radio"
            value="uf"
            name="valueType"
            onChange={handleValueChange}
            defaultChecked
          />
          UF
        </label>
      </form>
      <h3>
        Valor UF al {formattedDate}: <strong>${ufValue}</strong>
      </h3>
    </section>
  );
};
