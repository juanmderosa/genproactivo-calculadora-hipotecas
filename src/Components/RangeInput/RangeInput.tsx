import { Control, Controller, FieldError } from "react-hook-form";
import { FormValues } from "../../helpers/zod/formSchema";
import "./rangeInput.css";

interface Props {
  name: keyof FormValues;
  control: Control<FormValues>;
  label?: string;
  error?: FieldError;
  min?: number;
  max?: number;
  step?: number;
}

const RangeInput = ({ name, control, label, error, min, max, step }: Props) => {
  return (
    <div className="rangeInputContainer">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={`${name}-range`}
            type="range"
            min={min}
            max={max}
            step={step}
            {...field}
          />
        )}
      />
      {error && <p className="errorMessage">{error.message}</p>}
    </div>
  );
};

export default RangeInput;
