import React, { useContext, useEffect ,useCallback, useState } from "react";
import Context from "../../Context";
import ExpandableTable from "../Table/ExpandableTable";
import styles from "./index.module.scss";
import { set } from "immer/dist/internal";



const Columns = [
  {
    Header: "Name",
    type: "text",
  },
  {
    Header: "Category",
    type: "select",
  },
  {
    Header: "Amount",
    accessor: "number",
  },
  {
    Header: "Allocation",
    accessor: "percent",
  },
]


const BudgetSetup = () => {


  const [categories, setCategories] = useState([]);
  const [needs, setNeeds] = useState([{ id: 1, name: "", amount: 0, category: ""}]);
  const [wants, setWants] = useState([{ id: 1, name: "", amount: 0, category: ""}]);
  const [debts, setDebts] = useState([{ id: 1, name: "", amount: 0, category: ""}]);
  

  const { dispatch, sessionToken } =
  useContext(Context);


  const getCategories = useCallback(async () => {
    const response = await fetch("/api/categories", {method: "GET",headers: {
        "Content-Type": "application/json",
        "Authorization": sessionToken,
      }
    })

    console.log("RESPONSE", response)
    if (!response.ok) {
      //NEED TO HANDLE ERROR
    }

    const data = await response.json();

    return data.categories;

   }, [dispatch])


   const transformData = (data: any) => {
      var categories
       categories = data.map((category: any) => {

        var categoryName = category.hierarchy.join(" > ") 
          return {
            key: category.category_id,
            description: categoryName,
          }
        })

      return categories
   }


   const handleSave = () => {
    console.log("NEEDS", needs)
    console.log("DEBTS", debts)
    console.log("WANTS", wants)
   }





    useEffect(()=> {
      const init = async () => {
        const categories = await getCategories();
        console.log("CATEGORIES", categories) 
        setCategories(transformData(categories));
        setNeeds([{ id: 1, name: "", amount: 0, category: categories[0].category_id}]);
        setWants([{ id: 1, name: "", amount: 0, category: categories[0].category_id}]);
        setDebts([{ id: 1, name: "", amount: 0, category: categories[0].category_id}]); 

      } 

      init();
    }, [])

    return (
      <div>
        <h1>Budgeting Strategy</h1>
        <div>
          <h2>Income Allocation</h2>
          <hr />
          <h3>Needs</h3>
          <ExpandableTable categories={categories} fields={needs} setFields={setNeeds}/>
          <br />
          <hr />
          <h3>Debt Repayment</h3>
          <ExpandableTable categories={categories} fields={debts} setFields={setDebts}/>
          <br />
          <hr />
          <h3>Wants</h3>
          <ExpandableTable categories={categories} fields={wants} setFields={setWants} />
          <br />
          <hr />
          <div>
            <button className={styles.button} onClick={handleSave}>Save</button>
          </div>
          <br/>
        </div>
      </div>
    );
};


export default BudgetSetup;
