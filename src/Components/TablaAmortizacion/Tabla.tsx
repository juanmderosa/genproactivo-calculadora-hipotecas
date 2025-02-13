import { useFormStore } from "../../store/store";
import AmortizacionAnual from "./TablaAmortizacionAnual";
import "./tables.css";

export const Tabla = () => {
  const { showYearTable } = useFormStore();
  return (
    <>
      {showYearTable && (
        <section id="detailTable">
          <AmortizacionAnual />
        </section>
      )}
    </>
  );
};
