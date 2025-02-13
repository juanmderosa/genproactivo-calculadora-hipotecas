import "./form.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import InputForm from "../InputForm/InputForm";
import { FormValues, schema } from "../../helpers/zod/formSchema";
import { useEffect, useRef, useCallback } from "react";
import { useFormStore } from "../../store/store";
import RangeInput from "../RangeInput/RangeInput";
import { memo } from "react";
import { Calculations } from "../CalculationsDiv/Calculations";
import { useDebounce } from "use-debounce";

export const Form = () => {
  const { setFormInfo, valueType, ufValue, formInfo } = useFormStore();
  const {
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      ...formInfo,
    },
  });

  const costoInmueble = Number(watch("costoInmueble")) || 0;
  const pie = Number(watch("pie")) || 0;
  const bonoPie = Number(watch("bonoPie"));
  const tasaDeInteres = Number(watch("tasaDeInteres")) || 0;
  const duracion = Number(watch("duracion")) || 0;
  const piePorcentaje = Number(watch("piePorcentaje")) || 0;
  const bonoPiePorcentaje = Number(watch("bonoPiePorcentaje")) || 0;

  const prevFormInfo = useRef(formInfo);
  const isFirstRender = useRef(true);

  const [debouncedPie] = useDebounce(pie, 500);
  const [debouncedBonoPie] = useDebounce(bonoPie, 500);
  const [debouncedPiePorcentaje] = useDebounce(piePorcentaje, 500);
  const [debouncedBonoPiePorcentaje] = useDebounce(bonoPiePorcentaje, 500);

  useEffect(() => {
    if (
      prevFormInfo.current.costoInmueble !== costoInmueble ||
      prevFormInfo.current.pie !== debouncedPie ||
      prevFormInfo.current.bonoPie !== debouncedBonoPie ||
      prevFormInfo.current.tasaDeInteres !== tasaDeInteres ||
      prevFormInfo.current.duracion !== duracion ||
      prevFormInfo.current.piePorcentaje !== debouncedPiePorcentaje ||
      prevFormInfo.current.bonoPiePorcentaje !== debouncedBonoPiePorcentaje
    ) {
      setFormInfo({
        ...formInfo,
        costoInmueble,
        pie: debouncedPie,
        bonoPie: debouncedBonoPie,
        tasaDeInteres,
        duracion,
        piePorcentaje: debouncedPiePorcentaje,
        bonoPiePorcentaje: debouncedBonoPiePorcentaje,
      });
      prevFormInfo.current = {
        costoInmueble,
        pie: debouncedPie,
        bonoPie: debouncedBonoPie,
        tasaDeInteres,
        duracion,
        piePorcentaje: debouncedPiePorcentaje,
        bonoPiePorcentaje: debouncedBonoPiePorcentaje,
      };
    }
  }, [
    debouncedBonoPie,
    costoInmueble,
    debouncedPie,
    tasaDeInteres,
    duracion,
    debouncedBonoPiePorcentaje,
    debouncedPiePorcentaje,
    formInfo,
    setFormInfo,
  ]);

  useEffect(() => {
    if (
      debouncedPiePorcentaje !== null &&
      debouncedPiePorcentaje !== undefined &&
      costoInmueble !== null &&
      costoInmueble !== undefined
    ) {
      const pie = (costoInmueble * debouncedPiePorcentaje) / 100;
      const formattedPie = parseFloat(pie.toFixed(2));
      if (formattedPie !== Number(watch("pie"))) {
        setFormInfo({
          ...formInfo,
          pie: formattedPie,
          piePorcentaje: parseFloat(
            ((formattedPie / costoInmueble) * 100).toFixed(3)
          ),
        });
        setValue("pie", formattedPie);
      }
    }

    if (
      debouncedBonoPiePorcentaje !== null &&
      debouncedBonoPiePorcentaje !== undefined &&
      costoInmueble !== null &&
      costoInmueble !== undefined
    ) {
      const bonoPie = (costoInmueble * debouncedBonoPiePorcentaje) / 100;
      const formattedBonoPie = parseFloat(bonoPie.toFixed(2));
      if (formattedBonoPie !== Number(watch("bonoPie"))) {
        setFormInfo({
          ...formInfo,
          bonoPie: formattedBonoPie,
          bonoPiePorcentaje: parseFloat(
            ((formattedBonoPie / costoInmueble) * 100).toFixed(3)
          ),
        });
        setValue("bonoPie", formattedBonoPie);
      }
    }
  }, [debouncedPiePorcentaje, debouncedBonoPiePorcentaje]);

  useEffect(() => {
    if (
      debouncedPie !== null &&
      debouncedPie !== undefined &&
      costoInmueble !== null &&
      costoInmueble !== undefined
    ) {
      const piePorcentaje = (debouncedPie / costoInmueble) * 100;
      const formattedPiePorcentaje = parseFloat(piePorcentaje.toFixed(3));
      if (formattedPiePorcentaje !== Number(watch("piePorcentaje"))) {
        setFormInfo({
          ...formInfo,
          piePorcentaje: formattedPiePorcentaje,
        });
        setValue("piePorcentaje", formattedPiePorcentaje);
      }
    }

    if (
      debouncedBonoPie !== null &&
      debouncedBonoPie !== undefined &&
      costoInmueble !== null &&
      costoInmueble !== undefined
    ) {
      const bonoPiePorcentaje = (debouncedBonoPie / costoInmueble) * 100;
      const formattedBonoPiePorcentaje = parseFloat(
        bonoPiePorcentaje.toFixed(3)
      );
      if (formattedBonoPiePorcentaje !== Number(watch("bonoPiePorcentaje"))) {
        setFormInfo({
          ...formInfo,
          bonoPiePorcentaje: formattedBonoPiePorcentaje,
        });
        setValue("bonoPiePorcentaje", formattedBonoPiePorcentaje);
      }
    }
  }, [debouncedPie, debouncedBonoPie]);

  useEffect(() => {
    if (costoInmueble !== null && costoInmueble !== undefined) {
      if (
        debouncedPiePorcentaje !== null &&
        debouncedPiePorcentaje !== undefined
      ) {
        const pie = (costoInmueble * debouncedPiePorcentaje) / 100;
        const formattedPie = parseFloat(pie.toFixed(2));
        setFormInfo({
          ...formInfo,
          pie: formattedPie,
        });
        setValue("pie", formattedPie);
      }

      if (
        debouncedBonoPiePorcentaje !== null &&
        debouncedBonoPiePorcentaje !== undefined
      ) {
        const bonoPie = (costoInmueble * debouncedBonoPiePorcentaje) / 100;
        const formattedBonoPie = parseFloat(bonoPie.toFixed(2));
        setFormInfo({
          ...formInfo,
          bonoPie: formattedBonoPie,
        });
        setValue("bonoPie", formattedBonoPie);
      }
    }
  }, [costoInmueble]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setValue("costoInmueble", 3500);
      return;
    }

    if (valueType === "uf" && ufValue !== 0) {
      setValue(
        "costoInmueble",
        parseFloat((formInfo.costoInmueble / ufValue).toFixed(2))
      );
    } else if (valueType !== "uf" && ufValue !== 0) {
      setValue(
        "costoInmueble",
        parseFloat((formInfo.costoInmueble * ufValue).toFixed(2))
      );
    }
  }, [valueType, setValue]);

  const renderInputForm = useCallback(
    (
      name: keyof FormValues,
      label: string,
      type: string,
      error: FieldError | undefined,
      clarificationText: string,
      max?: number,
      min?: number
    ) => (
      <InputForm
        name={name}
        control={control}
        label={label}
        type={type}
        error={error}
        clarificationText={clarificationText}
        max={max}
        min={min}
      />
    ),
    [control]
  );

  return (
    <form id="form">
      {renderInputForm(
        "costoInmueble",
        "Precio de escrituración:",
        "number",
        errors.costoInmueble,
        valueType === "$" ? "$" : "UF"
      )}
      <div className="inputLineContainer">
        {renderInputForm(
          "pie",
          "Pie: ",
          "number",
          errors.pie,
          valueType === "$" ? "$" : "UF",
          costoInmueble - bonoPie
        )}
        {renderInputForm(
          "piePorcentaje",
          "",
          "number",
          errors.pie,
          "%",
          100,
          0
        )}
      </div>

      <RangeInput
        name="pie"
        control={control}
        error={errors.pie}
        min={0}
        max={costoInmueble}
        step={1}
      />
      <div className="inputLineContainer">
        {renderInputForm(
          "bonoPie",
          "Bono Pie",
          "number",
          errors.bonoPie,
          valueType === "$" ? "$" : "UF",
          costoInmueble - pie
        )}
        {renderInputForm(
          "bonoPiePorcentaje",
          "",
          "number",
          errors.pie,
          "%",
          100,
          0
        )}
      </div>

      <RangeInput
        name="bonoPie"
        control={control}
        error={errors.bonoPie}
        min={0}
        max={costoInmueble - pie}
        step={1}
      />
      <Calculations />
      {renderInputForm(
        "tasaDeInteres",
        "Tasa de Interés",
        "number",
        errors.tasaDeInteres,
        "%",
        20,
        0
      )}
      <RangeInput
        name="tasaDeInteres"
        control={control}
        error={errors.tasaDeInteres}
        min={0}
        max={20}
        step={0.1}
      />
      {renderInputForm(
        "duracion",
        "Duración",
        "number",
        errors.duracion,
        "años"
      )}
    </form>
  );
};

export default memo(Form);
