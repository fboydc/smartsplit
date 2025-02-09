import React, { useContext, useEffect ,useCallback } from "react";
import Context from "../../Context";



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


const Categories = () => {

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
          return {
            key: category.category_id,
            description: category.hierarchy,
          }
        })

      console.log("CATEGORIES", categories)
   }


    useEffect(()=> {
      const init = async () => {
        const categories = await getCategories();
        transformData(categories);
      } 

      init();
    }, [])

    return (
      <div>
        <h1>Budgeting Strategy</h1>

      </div>
    );
};


export default Categories;
