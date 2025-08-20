import React, { useContext } from "react";

import Endpoint from "../Endpoint";
import Context from "../../Context";
import ProductTypesContainer from "../ProductTypes/ProductTypesContainer";
import def from "ajv/dist/vocabularies/discriminator";
import BudgetSetup  from "../Budget/BudgetSetup";
import styles from "./dashboard.module.scss";
import PieChart, { PieDatum } from '../Graphs/PieCharts';

const data: PieDatum[] = [
  { id: 'a', label: 'Apples', value: 40 },
  { id: 'b', label: 'Bananas', value: 25 },
  { id: 'c', label: 'Cherries', value: 20 },
  { id: 'd', label: 'Dates', value: 15 },
];


const Dashboard = () => {

  return (
    <div className={styles.row}>
      <div>
      <PieChart
        data={data}
        size={420}
        innerRadius={80}
        padAngleDeg={1}
        showLegend={true}
        legendPosition="right"
        onSliceClick={(d) => alert(`clicked ${d.label}`)}
      />
      </div>
    </div>
  )

}

export default Dashboard;
