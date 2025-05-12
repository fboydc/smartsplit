import React, { useEffect, useState, ChangeEvent } from 'react';
import styles from "./ExpandableTable.module.scss";
import { format } from 'path';
import {AllocationGroup, Expense } from "../../models/types";
import { v4 as uuidv4} from 'uuid';



const ExpandableTable = <T extends { id: string }>({
    fields,
    setFields,
    categories,
    formatCurrency,
    subtotal,
}: {
    fields: T[];
    setFields: (updatedFields: T[]) => void;
    categories: { id: string; name: string }[];
    formatCurrency: (value: string) => string;
    subtotal: string;
})=> {
   

    const addRow = () => {

        //var row: Expense = {id: fields.length + 1, name: name, amount: amount, category: categoryId}
        const newRow = { id: uuidv4(), description: "", amount: 0, category: "" } as unknown as T;
        setFields([...fields, newRow]);
    }

    const removeRow = (id: string) => {
        const newRows = fields.filter((row) => row.id !== id);
        setFields(newRows);
    }
    
    const handleChange = (id: string, field: keyof T, value: string) => {

        if (field === "amount") {
           value =  formatCurrency(value);
        }

        setFields(fields.map((row) => {
                if (row.id === id) {
                    return { ...row, [field]: value }
                } 
                return row;
            }
        ));

    }
   
    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                </thead>
                
                <tbody>
                    {/*}
                    {console.log("fields: " + JSON.stringify(fields))}
                    {fields && fields.map((row) => (
                        <tr key={row.id}>
                            <td>
                                <input type="text" value={row.description} onChange={(e)=> handleChange(row.id, "name", e.target.value)}/>
                            </td>
                            <td>
                                 <input type="text" value={row.amount} onChange={(e)=> handleChange(row.id, "amount", e.target.value)}/>
                            </td>
                            <td>

                                <select value={row.category || "" } onChange={(e)=> handleChange(row.id, "category", e.target.value)}>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                                </select>
                            </td>
                            <td>
                                <button className={styles.tableButton} onClick={() => removeRow(row.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                    <tr className={styles.subTotalRow}>
                        <td>
                            <p>Sub-Total</p>
                        </td>
                        <td colSpan={6}>
                            <p>{subtotal}</p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <button className={styles.tableButton} onClick={() => addRow({name: "", amount: "", categoryId: ""})}>Add Row</button>
                        </td>
                        <td />
                    </tr>
                    */}
                </tbody>
            </table>
        </div>
    )


}


export default ExpandableTable;