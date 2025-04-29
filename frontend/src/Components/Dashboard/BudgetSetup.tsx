import React, { useContext, useEffect ,useCallback, useState, ChangeEvent,KeyboardEvent } from "react";
import Context from "../../Context";
import ExpandableTable from "../Table/ExpandableTable";
import styles from "./dashboard.module.scss";
import { set } from "immer/dist/internal";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StaticTable from "../Table/StaticTable";




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
  const [needs, setNeeds] = useState([{ id: 1, name: "", amount: "", category: ""}]);
  const [wants, setWants] = useState([{ id: 1, name: "", amount: "", category: ""}]);
  const [debts, setDebts] = useState([{ id: 1, name: "", amount: "", category: ""}]);
  const [totalNeedsPct, setTotalNeedsPct] = useState(0);
  const [totalNeedsAmt, setTotalNeedsAmt] = useState("");
  const [totalWantsPct, setTotalWantsPct] = useState(0);
  const [totalWantsAmt, setTotalWantsAmt] = useState("");
  const [allocatedPct, setAllocatedPct] = useState(0);
  const [totalDebtsPct, setTotalDebtsPct] = useState(0);
  const [totalDebtsAmt, setTotalDebtsAmt] = useState("");
  const [totalSavingsPct, setTotalSavingsPct] = useState(0);
  const [totalSavingsAmt, setTotalSavingsAmt] = useState("");
  

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

   const getExpenses = useCallback(async () => {
    const response = await fetch("/api/budget", {method: "GET",headers: {
        "Content-Type": "application/json",
        "Authorization": sessionToken,
      }
    })

    


  }, [dispatch])


    
   const formatNumber = (amount: string) => {
       //return number.replace
       return amount.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
   }

   const formatCurrency = (amount: string):string => {

    if (amount === "") {
      return "";
    }

    if (amount.indexOf(".") > 0) {
       

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

     //setMonthlyIncome({value: amount});

     return amount
   }

   const transformData = (data: any) => {
     /* var categories
       categories = data.map((category: any) => {
        var categoryName = category.hierarchy.at(-1);

        if (category.hierarchy.length > 1) {
          categoryName =categoryName + " - " + category.hierarchy.at(-2);
        }
          return {
            key: category.category_id,
            description: categoryName,
          }
        })*/

        data.sort((a: any , b: any)=> a.name.localeCompare(b.name));

      return data
   }


   const reconvertToCurrency = (amount: string = "$0.00"): number => {

    if (typeof amount !== 'string') {
      console.error(`Expected a string but received ${typeof amount}`);
      return 0.00;
    }

      var cleanedString = amount.replace(/[$,\s]/g, '');
      // Return 0 if the cleaned string is empty
      if (cleanedString === "") {
        return 0.00;
      }
      // Use parseFloat to convert the cleaned string to a number
      const number = parseFloat(cleanedString);
      return number;
   }


   const updateMonthlyIncome = (incomeAmt: string) => { 
        setMonthlyIncome({value: formatCurrency(incomeAmt)});
   }


      const calculatePercentages = (totalNeeds: number, totalWants: number, totalDebts: number, income: number, totalAllocated: number) => {
        //const reconvertedValue = reconvertToCurrency(monthlyIncome.value);

        if(income === 0) {
          setAllocatedPct(0);
          setTotalNeedsPct(0);
          setTotalWantsPct(0) ;
          setTotalDebtsPct(0);
          setTotalSavingsPct(0);
          return
        }

       // const totalAllocated = needs.reduce((total, need) => total + reconvertToCurrency(need.amount), 0) + debts.reduce((total, debt) => total + reconvertToCurrency(debt.amount), 0) + wants.reduce((total, want) => total + reconvertToCurrency(want.amount), 0);

        const allocatedPct = (totalAllocated/income) * 100;
        setAllocatedPct(parseFloat(allocatedPct.toFixed(2)));

        const totalNeedsPct = (totalNeeds / income) * 100;
        setTotalNeedsPct(parseFloat(totalNeedsPct.toFixed(2)));

        const totalWantsPct = (totalWants / income) * 100;
        setTotalWantsPct(parseFloat(totalWantsPct.toFixed(2)));
      
        const totalDebtsPct = (totalDebts / income) * 100;
        setTotalDebtsPct(parseFloat(totalDebtsPct.toFixed(2)));

        const totalSavingsPct = ((income - totalAllocated) / income) * 100;
        setTotalSavingsPct(parseFloat(totalSavingsPct.toFixed(2)));

      }

      const calculateAmts =  (totalNeeds: number, totalWants: number, totalDebts: number, income: number, totalAllocated: number) => {
          
        
        setTotalNeedsAmt(formatCurrency(totalNeeds.toString()));
        setTotalWantsAmt(formatCurrency(totalWants.toString()));
        setTotalDebtsAmt(formatCurrency(totalDebts.toString()));

        var remainingAmt = income - totalAllocated;
        console.log("income in calc amts", income)
        console.log("remaining amt", remainingAmt)
        setTotalSavingsAmt(formatCurrency(remainingAmt.toString()));

      }

      useEffect(() => {

        var totalNeeds = needs.reduce((total, need) => total + reconvertToCurrency(need.amount), 0);
        var totalWants = wants.reduce((total, want) => total + reconvertToCurrency(want.amount), 0);
        var totalDebts = debts.reduce((total, debt) => total + reconvertToCurrency(debt.amount), 0);
        var totalIncome = reconvertToCurrency(monthlyIncome.value);
        var totalAllocated = needs.reduce((total, need) => total + reconvertToCurrency(need.amount), 0) + debts.reduce((total, debt) => total + reconvertToCurrency(debt.amount), 0) + wants.reduce((total, want) => total + reconvertToCurrency(want.amount), 0);
        calculatePercentages(totalNeeds, totalWants, totalDebts, totalIncome, totalAllocated);
        calculateAmts(totalNeeds, totalWants, totalDebts, totalIncome, totalAllocated)
      }, [needs, wants, debts, monthlyIncome]);

   

   const handleSave = () => {
    /*console.log("INCOME", monthlyIncome)
    console.log("PAY FREQUENCY", payFrequency)
    console.log("NEEDS", needs)
    console.log("DEBTS", debts)
    console.log("WANTS", wants)*/

    


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

        if (categories === undefined) {
            toast.error('Error Fetching Categories!', 
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            }
          );
        } else {
          setCategories(transformData(categories));
          setPayFrequency(2);
          setNeeds([{ id: 1, name: "", amount: "", category: categories[0].ID}]);
          setWants([{ id: 1, name: "", amount: "", category: categories[0].ID}]);
          setDebts([{ id: 1, name: "", amount: "", category: categories[0].ID}]); 
        }
      
       
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
              <input type="text" placeholder="$5,000" onChange={(e)=>{updateMonthlyIncome(e.target.value)}} value={monthlyIncome.value} className={styles.inputIncome}/>
            </div>
            <div className={`${styles['col-lg-3']}`}>
                <label>Total Non-Savings Allocation</label>
                <p>{allocatedPct}%</p>
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
          <h4>Needs <span>{totalNeedsPct}%</span></h4>
          <ExpandableTable categories={categories} fields={needs} setFields={setNeeds} formatCurrency={formatCurrency} subtotal={totalNeedsAmt}/>
          <br />
          <hr />
          <h4>Debt Repayment <span>{totalDebtsPct}%</span></h4>
          <ExpandableTable categories={categories} fields={debts} setFields={setDebts} formatCurrency={formatCurrency} subtotal={totalDebtsAmt}/>
          <br />
          <hr />
          <h4>Wants <span>{totalWantsPct}%</span></h4>
          <ExpandableTable categories={categories} fields={wants} setFields={setWants} formatCurrency={formatCurrency} subtotal={totalWantsAmt}/>
          <br />
          <hr />
          <h4>Savings <span>{totalSavingsPct}%</span></h4>
          <StaticTable fields={{headings: ["Name", "Amount"], rows: [{columns: ["Savings", totalSavingsAmt]}]}} />
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
