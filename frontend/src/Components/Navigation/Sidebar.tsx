import React, { useContext } from "react";
import styles from "./navigation.module.scss";

interface SidebarProps {
  activeView: string;
  setActiveView: React.Dispatch<React.SetStateAction<string>>;
}



const Sidebar = ({ activeView, setActiveView }: SidebarProps) => {
    return (
            <div className={`${styles.sidebar} ${styles['sidebar-nav']} ${styles['col-md-2']}`}>
                <ul className={`${styles.listGroup} ${styles.siderbarNav}`}>
                    <li className={styles.listGroupItem}>
                        {
                            activeView === 'budget' ? 
                            <button className={`${styles['btn']} ${styles['active']}`}>Budget Distribution</button> :
                            <button className={`${styles['btn']}`} onClick={() => setActiveView('budget')}>Budget Distribution</button>
                        }
                    </li>
                    <li className={styles.listGroupItem}>
                        {
                            activeView === 'dashboard' ? 
                            <button className={`${styles['btn']} ${styles['active']}`}>Dashboard</button> :
                            <button className={`${styles['btn']}`} onClick={() => setActiveView('dashboard')}>Dashboard</button>
                        }
                    </li>
                    <li className={styles.listGroupItem}>
                        <button className={`${styles['btn']}`}>Bank Setup</button>
                    </li>
                    <li className={styles.listGroupItem}> 
                        <button className={`${styles['btn']}`}>Transactions</button>    
                    </li>
                </ul>
            </div>
    )

}

export default Sidebar;