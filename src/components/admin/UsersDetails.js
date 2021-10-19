import React, { useState } from "react";
//import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { useStateValue } from "../../StateProvider";
import { Container } from "react-bootstrap";
import {Button} from "@material-ui/core";
//import DeleteIcon from "@material-ui/icons/Delete";
import service from "../../service/BankService";
import { toast } from "react-toastify";
import { Redirect, useHistory } from "react-router";




let rows = [];
const columns = [{id: 1, label: "First Name", winWidth: 200},
                 {id: 2, label: "Last Name", winWidth: 200},
                 {id: 3, label: "Role", winWidth: 200},
                 {id: 4, label: "Edit", winWidth: 200},
                 {id: 5, label: "Delete", winWidth: 200}]



                 
const UsersDetails = (props) => {
    const [{ userInfo }] = useStateValue();
    rows = props.users;
    const history = useHistory();
    const [chosenUser, setChosenUser] = useState('');
    // const deleteUser=()=>{
    //     history.push("/admin/allusers")
    // };

    const handleEdit = (userId) => {
        history.push("/admin/singleUserDetails/" + userId)
    }

    const handleDelete = (userId) => {
        service.deleteUser(userId).then((res) => {
          if (res.status == 200) {
            toast.success("User Successfuly deleted", {
              position: toast.POSITION.TOP_CENTER,
            });
        // localStorage.setItem("refresh",localStorage.getItem("refresh")+1);
          history.push("/admin/deletedUser")
            // history.push("/admin/allusers")
            // deleteUser();
        
          } else {
            toast.error("User could not be deleted", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
      };
    
    return (
        <Container>
            <TableContainer>
                <TableHead>
                    <TableRow>
                        {columns.map(({id, label, minWidth}) => {
                            return (
                                <TableCell
                                key={id}
                                style={{minWidth: minWidth}}
                                >{label}</TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row)=>(
                        <TableRow key={row.userId}>
                            <TableCell>{row.firstName}</TableCell>
                            <TableCell>{row.lastName}</TableCell>
                            <TableCell>
                                {(row.isAdmin ? "Admin" : (row.isEmployee ? "Employee" : "User"))}
                            </TableCell>

                            <TableCell>
                            <Button
                                onClick={() => handleEdit(row.userId)}
                            >Edit</Button>
                            </TableCell>

                            <TableCell>
                            <Button
                                onClick={() => handleDelete(row.userId)}
                            >Delete</Button>
                            </TableCell>
                            
                            
                        </TableRow>
                    )
                        
                    )}
                </TableBody>

            </TableContainer>
            
        </Container>



    )
}

export default UsersDetails
