import React, { useEffect, useState } from 'react';
import styles from "./ExpandableTable.module.scss";

interface ExpandableTableProps {
    categories: Category[];
    fields: any[];
    setFields: React.Dispatch<React.SetStateAction<{id: number; name: string; amount: number; category: string; }[]>>

}
interface Category {
    key: number;
    description: string;
}

const ExpandableTable: React.FC<ExpandableTableProps> = ({ categories, fields, setFields }) => {
   


    
    
    const addRow = ({name, amount, categoryId}: {name: string, amount: number, categoryId: string}) => {
        const newRow = { id: fields.length + 1, name: name, amount: amount, category: categoryId };
        setFields([...fields, newRow]);
    }

    const removeRow = (id: number) => {
        const newRows = fields.filter((row) => row.id !== id);
        setFields(newRows);
    }
    
    const handleChange = (id: number, field: string, value: string | number) => {
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
                                <input type="text" value={row.name} onChange={(e)=> handleChange(row.id, "name", e.target.value)}/>
                            </td>
                            <td>
                                 <input type="number" value={row.amount} onChange={(e)=> handleChange(row.id, "amount", e.target.value)}/>
                            </td>
                            <td>
                                <select value={row.category} onChange={(e)=> handleChange(row.id, "category", e.target.value)}>
                                    {categories.map((category) => (
                                        <option key ={category.key} value={category.key}>{category.description}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button onClick={() => removeRow(row.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={3}>
                            <button onClick={() => addRow({name: "", amount: 0, categoryId: ""})}>Add Row</button>
                        </td>
                        <td />
                    </tr>
                </tbody>
            </table>
        </div>
    )


}


export default ExpandableTable;