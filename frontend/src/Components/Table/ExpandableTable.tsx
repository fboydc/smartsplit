import React, { useEffect, useState, ChangeEvent } from 'react';
import styles from "./ExpandableTable.module.scss";
import { format } from 'path';

interface ExpandableTableProps {
    categories: Category[];
    fields: any[];
    setFields: React.Dispatch<React.SetStateAction<any[]>>;
    formatCurrency: (value: string) => string;
    subtotal: string;

}
interface Category {
    id: number;
    name: string;
}

const ExpandableTable: React.FC<ExpandableTableProps> = ({ categories, fields, setFields, formatCurrency, subtotal }) => {
   

    console.log("Categories: " + JSON.stringify(categories));

    const addRow = ({name, amount, categoryId}: {name: string, amount: string, categoryId: string}) => {
        const newRow = { id: fields.length + 1, name: name, amount: amount, category: categoryId };
        setFields([...fields, newRow]);
    }

    const removeRow = (id: number) => {
        const newRows = fields.filter((row) => row.id !== id);
        setFields(newRows);
    }
    
    const handleChange = (id: number, field: string, value: string) => {

        if (field === "amount") {
           value =  formatCurrency(value);
        }

        setFields(
            fields.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        )

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
                    {fields.map((row) => (
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
                </tbody>
            </table>
        </div>
    )


}


export default ExpandableTable;