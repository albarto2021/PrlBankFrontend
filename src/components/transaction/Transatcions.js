import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router';
import { useStateValue } from '../../StateProvider'
import service from "../../service/BankService"
import TransactionsList from "./TransactionsList"

const Transactions = () => {
    const [{userInfo}] = useStateValue();
    const history = useHistory();
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        service.getAllTransactions().then((res)=>{
            setTransactions(res.data);
        })

        return () => {
            setTransactions();
        }
    }, [])

    return (
        <div>
            {!userInfo && history.push("/")}
            {/* {userInfo && !userInfo.userDAO.isAdmin && (history.push("/"))} */}
            {console.log(transactions)}
            {console.log(userInfo.userDAO)}
            <TransactionsList transactions={transactions}>

            </TransactionsList>
            {/* <SingleUserDetails/> */}
        </div>
    )
}

export default Transactions
