import React, { useContext } from "react";
import styles from "./dashboard.module.scss";

const Sidebar = () => {
    return (
        <div className={`${styles['col-md-3']} ${styles['col-lg-2']}  ${styles['position-relative']}`}>
            <button>Budget Distribution</button>
            <div>
                <ul>
                    <li>
                        <button>Dashboard</button>
                    </li>
                    <li>
                        <button>Bank Setup</button>
                    </li>
                </ul>
            </div>
        </div>
    )

}

export default Sidebar;