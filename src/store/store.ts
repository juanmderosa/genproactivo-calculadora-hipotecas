import { create } from "zustand";
import { FACTOR_CAE } from "../helpers/Formulas/formulas";

export interface formProps {
  costoInmueble: number;
  pie: number;
  bonoPie: number;
  tasaDeInteres: number;
  duracion: number;
  piePorcentaje: number;
  bonoPiePorcentaje: number;
}

interface StoreState {
  showYearTable: boolean;
  setShowYearTable: () => void;
  formInfo: formProps;
  montoPrestamoCalculado: number;
  ufValue: number;
  setUfValue: (value: number) => void;
  pagoMensual: number;
  valueType: string;
  setValueType: (value: string) => void;
  setFormInfo: (newFormInfo: formProps) => void;
  setMontoPrestamoCalculado: (
    costoInmueble: number,
    pie: number,
    bonoPie: number
  ) => void;
  setPagoMensual: (
    montoPrestamoCalculado: number,
    tasaDeInteres: number,
    duracion: number
  ) => void;
}

export const useFormStore = create<StoreState>((set) => ({
  showYearTable: false,
  setShowYearTable: () => {
    set((state) => ({
      showYearTable: !state.showYearTable,
    }));
  },
  ufValue: 0,
  setUfValue: (value: number) => {
    set({ ufValue: value });
  },
  formInfo: {
    costoInmueble: 3500,
    pie: 700,
    bonoPie: 0,
    tasaDeInteres: 4.8,
    duracion: 30,
    piePorcentaje: 20,
    bonoPiePorcentaje: 0,
  },
  montoPrestamoCalculado: 0,
  pagoMensual: 0,
  valueType: "uf",
  setValueType: (value: string) => {
    set({ valueType: value });
  },
  setFormInfo: (newFormInfo: formProps) =>
    set((state) => {
      return {
        formInfo: { ...state.formInfo, ...newFormInfo },
      };
    }),

  setMontoPrestamoCalculado: (
    costoInmueble: number,
    pie: number,
    bonoPie: number
  ) => {
    const monto = costoInmueble - pie - bonoPie;
    set({ montoPrestamoCalculado: monto });
  },
  setPagoMensual: (
    montoPrestamoCalculado: number,
    tasaDeInteres: number,
    duracion: number
  ) => {
    const tasaMensual = (tasaDeInteres * FACTOR_CAE) / 100 / 12;
    const meses = duracion * 12;

    if (montoPrestamoCalculado > 0 && tasaMensual > 0 && meses > 0) {
      const pago =
        (montoPrestamoCalculado * tasaMensual) /
        (1 - Math.pow(1 + tasaMensual, -meses));

      set({ pagoMensual: pago });
      return;
    }
    set({ pagoMensual: 0 });
  },
}));
