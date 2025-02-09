import React, { useState } from 'react';

interface ExpandableTableProps {
    categories: Category[];
}
interface Category {
    key: number;
    description: string;
}

const ExpandableTable: React.FC<ExpandableTableProps> = ({ categories }) => {
   


    
    const [rows, setRows] = useState([
        { id: 1, name: "", amount: 0, category: "Select Category" },
    ]);

    const addRow = ({name, amount, categoryId}: {name: string, amount: number, categoryId: string}) => {
        const newRow = { id: rows.length + 1, name: name, amount: amount, category: categoryId };
        setRows([...rows, newRow]);
    }

    const removeRow = (id: number) => {
        const newRows = rows.filter((row) => row.id !== id);
        setRows(newRows);
    }
    
    const handleChange = (id: number, field: string, value: string | number) => {
        setRows(
            rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        )
    }

    //Log data for now. Should go to db
    const saveRows = () => {
        console.log("Saved rows:", rows)
        alert("Rows saved!")
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => {
                        <tr key={row.id}>
                            <td>
                                <input type="text" value={row.name} />
                            </td>
                            <td>
                                <input type="number" value={row.amount} />
                            </td>
                            <td>
                                <select value={row.category}>
                                    {categories.map((category) => {
                                        <option key ={category.key} value={category.key}>{category.description}</option>
                                    })}
                                </select>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )


}


export default ExpandableTable;