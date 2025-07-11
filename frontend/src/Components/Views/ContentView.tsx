import BudgetSetup from '../Dashboard/BudgetSetup';
import styles from './views.module.scss';



const ContentView = () => {

    return (
        <div className={`${styles['col-md-10']}`}>
            <BudgetSetup />
            {/* <Items /> */}
            {/* <Categories /> */}
            {/* <Dashboard /> */}
            {/* <ContentView /> */}
        </div>
    )

}
export default ContentView;