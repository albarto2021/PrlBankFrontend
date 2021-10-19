import React, {useEffect} from 'react'
import Users from "./Users"
import { useHistory } from 'react-router'


const DeletedUser = () => {
    const history=useHistory();
//    useEffect(() => {
//     history.push("/admin/allusers")
//        return () => {
           
//        }
//    }, [])
    return (
        <div>
            {history.push("/admin/allusers")}
        </div>
    )
}

export default DeletedUser
