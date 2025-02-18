import React, { useContext } from "react";
import styles from "./dashboard.module.scss";

const Sidebar = () => {
    return (
        <div className={`${styles['col-md-2']} ${styles['col-lg-2']}  ${styles['position-relative']}`}>
            <div className={styles.sidebar}>
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
                </ul>
            </div>
        </div>
    )

}

export default Sidebar;