import React, { useContext } from "react";
import styles from "./navigation.module.scss";

const Sidebar = () => {
    return (
            <div className={`${styles.sidebar} ${styles['sidebar-nav']} ${styles['col-md-2']}`}>
                <ul className={`${styles.listGroup} ${styles.siderbarNav}`}>
                    <li className={styles.listGroupItem}>
                        <button className={`${styles['btn']} ${styles['active']}`}>Budget Distribution</button>
                    </li>
                    <li className={styles.listGroupItem}>
                        <button className={`${styles['btn']}`}>Dashboard</button>
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