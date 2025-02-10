import React, { useContext } from "react";

import Endpoint from "../Endpoint";
import Context from "../../Context";
import ProductTypesContainer from "./ProductTypesContainer";
import def from "ajv/dist/vocabularies/discriminator";
import BudgetSetup  from "./BudgetSetup";


const Dashboard = () => {

  return (
    <div>
        <BudgetSetup />
    </div>
  )

}

export default Dashboard;
