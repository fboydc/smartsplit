import React, { useContext, useEffect ,useCallback, useState, ChangeEvent,KeyboardEvent } from "react";
import Context from "../../Context";
import ExpandableTable from "../Table/ExpandableTable";
import styles from "./dashboard.module.scss";
import { set } from "immer/dist/internal";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




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
  const [monthlyIncome, setMonthlyIncome] = useState({value: ""});
  const [payFrequencies, setPayFrequencies] = useState([{id: 1, name: "Weekly"}, {id: 2, name: "Bi-Weekly"}, {id: 3, name: "Monthly"}]);
  const [payFrequency, setPayFrequency] = useState(2);
  const [allocatedAmt, setAllocatedAmt] = useState(0);
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


   const formatNumber = (amount: string) => {
       //return number.replace
       return amount.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
   }

   const formatCurrency = (amount: string) => {

    if (amount.indexOf(".") > 0) {
        if (amount === "") {
          return;
        }

        var decimal_pos = amount.indexOf(".");

        var left_side = amount.substring(0, decimal_pos);
        var right_side = amount.substring(decimal_pos);

        left_side = formatNumber(left_side);
        right_side = formatNumber(right_side).substring(0, 2);

        amount = "$" + left_side + "." + right_side


      } else {

        amount = formatNumber(amount);
        amount = "$" + amount;
      }

     setMonthlyIncome({value: amount});
   }

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


   const reconvertToCurrency = (amount: string = "$0.00"): number => {

      var cleanedString = amount.replace(/[$,\s]/g, '');
      console.log("CLEANED STRING", cleanedString)
      // Use parseFloat to convert the cleaned string to a number
      const number = parseFloat(cleanedString);
      console.log("NUMBER", number)
      return number;
   }

   const getAllocatedPct = () => {

      var totalAllocated = needs.reduce((total, need) => total + need.amount, 0) + debts.reduce((total, debt) => total + debt.amount, 0) + wants.reduce((total, want) => total + want.amount, 0);
      console.log("TOTAL ALLOCATED", totalAllocated)
      return (totalAllocated/reconvertToCurrency(monthlyIncome.value)) * 100;
   }



   const handleSave = () => {
    console.log("INCOME", monthlyIncome)
    console.log("PAY FREQUENCY", payFrequency)
    console.log("NEEDS", needs)
    console.log("DEBTS", debts)
    console.log("WANTS", wants)
    toast.success('🤘 Budget Saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
   }





    useEffect(()=> {
      const init = async () => {
        const categories = await getCategories();
        console.log("CATEGORIES", categories) 
        setCategories(transformData(categories));
        setPayFrequency(2);
        setNeeds([{ id: 1, name: "", amount: 0, category: categories[0].category_id}]);
        setWants([{ id: 1, name: "", amount: 0, category: categories[0].category_id}]);
        setDebts([{ id: 1, name: "", amount: 0, category: categories[0].category_id}]); 

      } 

      init();
    }, [])

    return (
      <div className={`${styles['col-md-10']} ${styles['col-lg-10']} ${styles['container']}`}>
        <h2>Budgeting Strategy</h2>
        <div>
          <h3>Income Distribution</h3>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition={Bounce} />
          <hr />
          <p>Enter your monthly income and we will help you allocate it to your needs, wants, and debt repayment.</p>
          <br />
          <div className={styles.row}>
            <div className={`${styles['col-md-3']} ${styles['col-lg-3']}  ${styles['form-input']}`}>
              <label>Monthly Income</label>
              <input type="text" placeholder="$1,000,000" onChange={(e)=>{formatCurrency((e.target as HTMLInputElement).value)}} value={monthlyIncome.value} className={styles.inputIncome}/>
            </div>
            <div className={`${styles['col-lg-3']}`}>
                <label>Total Allocation</label>
                <p>{getAllocatedPct()}%</p>
            </div>
            <div className={`${styles['col-md-3']} ${styles['col-lg-3']}  ${styles['form-input']}`}>
              <label>Pay Frequency</label>
              <select className={styles.inputIncome} value={payFrequency} onChange={(e) => setPayFrequency(parseInt(e.target.value))}>
                {payFrequencies.map((frequency) => (
                  <option key={frequency.id} value={frequency.id}>{frequency.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h3>Income Allocation</h3>
          <hr />
          <h4>Needs</h4>
          <ExpandableTable categories={categories} fields={needs} setFields={setNeeds}/>
          <br />
          <hr />
          <h4>Debt Repayment</h4>
          <ExpandableTable categories={categories} fields={debts} setFields={setDebts}/>
          <br />
          <hr />
          <h4>Wants</h4>
          <ExpandableTable categories={categories} fields={wants} setFields={setWants}/>
          <br />
          <hr />
          <div>
            <button className={styles.tableButton} onClick={handleSave}>Save</button>
          </div>
          <br/>
        </div>
      </div>
    );
};


export default BudgetSetup;
