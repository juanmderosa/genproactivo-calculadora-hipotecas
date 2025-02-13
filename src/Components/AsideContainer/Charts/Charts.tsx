import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./charts.css";
import { totalInteresesPagados } from "../../../helpers/Formulas/formulas";

import { useFormStore } from "../../../store/store";
import { formatNumber } from "../../../helpers/formatNumber";

export const Charts = () => {
  const { formInfo, pagoMensual, montoPrestamoCalculado } = useFormStore();

  const data = [
    { name: "Pie", value: formInfo.pie },
    { name: "Bono Pie", value: formInfo.bonoPie },
    {
      name: "Total Intereses pagados",
      value: totalInteresesPagados(
        formInfo.duracion,
        pagoMensual,
        montoPrestamoCalculado
      ),
    },
    { name: "Préstamo", value: montoPrestamoCalculado },
  ];
  const COLORS = ["#557b1b", "#c1a4e9", "#713abe", "#97e02d"];

  const CustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    payload,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
    index: number;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <>
        {payload.value > 0 && (
          <>
            <text
              style={{
                fontSize: "12px",
                maxWidth: "12px",
              }}
              x={x}
              y={y - 40}
              fill={"black"}
              textAnchor={x > cx ? "start" : "end"}
              width={40}
              dominantBaseline="central">
              {payload.name}:
            </text>
            <text
              style={{
                fontSize: "12px",
                maxWidth: "12px",
              }}
              x={x}
              y={y - 25}
              fill={"black"}
              textAnchor={x > cx ? "start" : "end"}
              width={40}
              dominantBaseline="central">
              ${formatNumber(payload.value)}
            </text>
          </>
        )}
      </>
    );
  };

  return (
    <>
      {formInfo.duracion > 0 &&
      pagoMensual > 0 &&
      montoPrestamoCalculado > 0 ? (
        <div className="chartContainer">
          <ResponsiveContainer
            width="100%"
            height="100%">
            <PieChart
              width={200}
              height={300}>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                label={CustomLabel}
                labelLine={false}>
                {data.map((entry, index) => (
                  <>
                    <Cell
                      key={`cell-${entry.name}-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  </>
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="chartContainer"></div>
      )}
    </>
  );
};
