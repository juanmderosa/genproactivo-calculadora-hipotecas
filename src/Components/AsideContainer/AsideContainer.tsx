import { TablaButtons } from "../TablaAmortizacion/TablaButtons";
import { Charts } from "./Charts/Charts";
import { DinamicResults } from "./DinamicResults/DinamicResults";
import "./asideContainer.css";

export const AsideContainer = () => {
  return (
    <aside id="asideContainer">
      <DinamicResults />
      <Charts />
      <TablaButtons />
    </aside>
  );
};
