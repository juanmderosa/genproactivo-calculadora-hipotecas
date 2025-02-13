import { z } from "zod";

export type FormValues = z.infer<typeof schema>;

export const schema = z.object({
  costoInmueble: z.coerce
    .number({
      required_error: "El valor es requerido",
      invalid_type_error: "El costo del inmueble debe ser un número",
    })
    .gt(0, "El valor debe ser mayor a 0"),
  pie: z.coerce.number().gte(0, "El valor debe ser mayor a 0"),
  piePorcentaje: z.coerce
    .number()
    .gte(0, "El valor no puede ser menor a 0")
    .lte(100, "El valor no puede superar el 100%"),
  bonoPie: z.coerce.number().gte(0, "El valor debe ser mayor a 0"),
  bonoPiePorcentaje: z.coerce
    .number()
    .gte(0, "El valor no puede ser menor a 0")
    .lte(100, "El valor no puede superar el 100%"),
  tasaDeInteres: z.coerce
    .number({
      required_error: "El valor es requerido",
      invalid_type_error: "La Tasa de Interés debe ser un número",
    })
    .gt(0, "El valor debe ser mayor a 0 y menor a 20%")
    .lte(20, "El valor debe ser mayor a 0 y menor a 20%"),
  duracion: z.coerce
    .number({
      required_error: "El valor es requerido",
      invalid_type_error: "La duración debe ser un número",
    })
    .int("El número debe ser entero")
    .gt(0, "El valor debe ser mayor a 0"),
});
/*   .refine(
    (data) => data.pie === (data.costoInmueble * data.piePorcentaje) / 100,
    {
      message: "Los valores son inválidos",
      path: ["piePorcentaje"],
    }
  );
 */
