import { TablaButtons } from "../TablaAmortizacion/TablaButtons";
import { ReactECharts } from "./Charts/Echarts";
import { DinamicResults } from "./DinamicResults/DinamicResults";
import "./asideContainer.css";

export const AsideContainer = () => {
  return (
    <aside id="asideContainer">
      <DinamicResults />
      <ReactECharts />
      <TablaButtons />
    </aside>
  );
};
