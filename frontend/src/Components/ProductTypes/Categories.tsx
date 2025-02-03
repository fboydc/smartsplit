import React, { useContext, useEffect ,useCallback } from "react";
import Context from "../../Context";






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
    console.log("Categores in transformData ", data)
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
        <h1>Categories</h1>
      </div>
    );
};


export default Categories;
