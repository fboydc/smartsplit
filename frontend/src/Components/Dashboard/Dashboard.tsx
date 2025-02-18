import React, { useContext } from "react";

import Endpoint from "../Endpoint";
import Context from "../../Context";
import ProductTypesContainer from "../ProductTypes/ProductTypesContainer";
import def from "ajv/dist/vocabularies/discriminator";
import BudgetSetup  from "./BudgetSetup";
import Sidebar from "./Sidebar";
import styles from "./dashboard.module.scss";


const Dashboard = () => {

  return (
    <div className={styles.row}>
        <Sidebar />
        <BudgetSetup />
    </div>
  )

}

export default Dashboard;
