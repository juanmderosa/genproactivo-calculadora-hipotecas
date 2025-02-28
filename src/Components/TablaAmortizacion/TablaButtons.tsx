import { useFormStore } from "../../store/store";
import "./tables.css";

export const TablaButtons = () => {
  const { setShowYearTable } = useFormStore();

  return (
    <div className="tableButtonContainer">
      <button onClick={() => setShowYearTable()}>
        Ver Amortización por Años
      </button>
    </div>
  );
};
