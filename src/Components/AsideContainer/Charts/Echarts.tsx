import { useRef, useEffect } from "react";
import { init, getInstanceByDom } from "echarts";
import type { EChartsOption, ECharts, SetOptionOpts } from "echarts";
import { useFormStore } from "../../../store/store";
import { totalInteresesPagados } from "../../../helpers/Formulas/formulas";

export interface ReactEChartsProps {
  option?: EChartsOption;
  settings?: SetOptionOpts;
}

export const ReactECharts = ({
  option,
  settings,
}: ReactEChartsProps): JSX.Element => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { formInfo, pagoMensual, montoPrestamoCalculado, ufValue, valueType } =
    useFormStore();

  const theme = "light";
  const style = {};
  const loading = false;

  const pieChartData = [
    {
      name: "Pie",
      value: valueType === "$" ? formInfo.pie : formInfo.pie * ufValue,
    },
    {
      name: "Bono Pie",
      value: valueType === "$" ? formInfo.bonoPie : formInfo.bonoPie * ufValue,
    },
    {
      name: "Intereses pagados",
      value:
        valueType === "$"
          ? totalInteresesPagados(
              formInfo.duracion,
              pagoMensual,
              montoPrestamoCalculado
            )
          : totalInteresesPagados(
              formInfo.duracion,
              pagoMensual,
              montoPrestamoCalculado
            ) * ufValue,
    },
    {
      name: "Préstamo",
      value:
        valueType === "$"
          ? montoPrestamoCalculado
          : montoPrestamoCalculado * ufValue,
    },
  ];

  option = {
    title: {
      text: "Desglose del Préstamo",
      padding: [0, 16, 0, 16],
    },
    tooltip: {
      trigger: "item",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {
        console.log(params);
        const formattedValue = params.value
          .toFixed(2)
          .replace(".", ",")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return ` ${params.name} (${params.percent}%): ${formattedValue} `;
      },
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "50%"],
        data: pieChartData.filter((item) => item.value > 0),
        label: {
          fontWeight: 700,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        color: ["#97e02d", "#713abe", "#c1a4e9", "#557b1b"],
      },
    ],
  };

  useEffect(() => {
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener("resize", resizeChart);

    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption(option /* , settings */);
    }
  }, [option, settings, theme]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      loading ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "300px", ...style }}
    />
  );
};
