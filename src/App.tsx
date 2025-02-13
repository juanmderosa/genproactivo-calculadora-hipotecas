import { useCallback, useEffect } from "react";
import { AsideContainer } from "./Components/AsideContainer/AsideContainer";
import Form from "./Components/Form/Form";
import { DetallesPrestamo } from "./Components/LoanDetails/DetallesPrestamo";
import { UFValue } from "./Components/UFValue/UFValue";
import { useFormStore } from "./store/store";
import { Tabla } from "./Components/TablaAmortizacion/Tabla";

function App() {
  const {
    formInfo,
    setMontoPrestamoCalculado,
    montoPrestamoCalculado,
    setPagoMensual,
  } = useFormStore();

  const { costoInmueble, pie, bonoPie, tasaDeInteres, duracion } = formInfo;

  const calculateMontoPrestamo = useCallback(() => {
    setMontoPrestamoCalculado(costoInmueble, pie, bonoPie);
  }, [costoInmueble, pie, bonoPie, setMontoPrestamoCalculado]);

  const calcularPagoMensual = useCallback(() => {
    setPagoMensual(montoPrestamoCalculado, tasaDeInteres, duracion);
  }, [montoPrestamoCalculado, tasaDeInteres, duracion, setPagoMensual]);

  useEffect(() => {
    calculateMontoPrestamo();
    calcularPagoMensual();
  }, [calculateMontoPrestamo, calcularPagoMensual]);

  return (
    <main id="main-container">
      <UFValue />
      <section id="form-aside-container">
        <Form />
        <AsideContainer />
      </section>
      <Tabla />
      <DetallesPrestamo />
    </main>
  );
}

export default App;
