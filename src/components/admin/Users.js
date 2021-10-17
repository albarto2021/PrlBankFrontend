import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router';
import { useStateValue } from '../../StateProvider'
import service from "../../service/BankService"
import UsersDetails from './UsersDetails';

const Users = () => {
    const [{userInfo}] = useStateValue();
    const history = useHistory();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        service.getAllUsers().then((res)=>{
            setUsers(res.data.userDAOList);
        })

        return () => {
            setUsers([]);
        }
    }, [])

    return (
        <div>
            {!userInfo && history.push("/")}
            {userInfo && !userInfo.userDAO.isAdmin && (history.push("/"))}
            <UsersDetails users={users}>

            </UsersDetails>
        </div>
    )
}

export default Users
