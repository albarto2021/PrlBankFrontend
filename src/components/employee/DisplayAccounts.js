import React, { useState, useEffect } from "react";
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
import { Button } from "@material-ui/core";
//import DeleteIcon from "@material-ui/icons/Delete";
import service from "../../service/BankService";
import { toast } from "react-toastify";
import { Redirect, useHistory } from "react-router";
import allAccountsToPass from "../admin/SingleUserDetails";

let rows = [];
const columns = [
  { id: 1, label: "Account id", winWidth: 200 },
  { id: 2, label: "Description", winWidth: 200 },
  { id: 3, label: "Balance", winWidth: 200 },
  { id: 4, label: "Account type", winWidth: 200 },
  { id: 5, label: "Account status", winWidth: 200 },
  { id: 6, label: "Creation date", winWidth: 200 },
  { id: 7, label: "Closing date", winWidth: 200 },
  { id: 8, label: "Assigner", winWidth: 200 },
  { id: 9, label: "Edit", winWidth: 200 },
  { id: 10, label: "Delete", winWidth: 200 },
];

///export let idToPass;
export let currentAccount;

const DisplayAccounts = (props) => {
  rows = props.allAccounts;
  console.log(rows);
  const history = useHistory();

  const handleEdit = (accountId, row) => {
    //idToPass = userId;
    currentAccount = row;
    history.push("/editaccounts");
  };

  const handleDelete = (accountId) => {
    service.deleteAccount(accountId).then((res) => {
      if (res.status == 200) {
        toast.success("Account Successfuly deleted", {
          position: toast.POSITION.TOP_CENTER,
        });
        // localStorage.setItem("refresh",localStorage.getItem("refresh")+1);
        history.push("/admin/deletedUser");
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
            {columns.map(({ id, label, minWidth }) => {
              return (
                <TableCell key={id} style={{ minWidth: minWidth }}>
                  {label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            //idToPass = row.userId;
            //currentAccount = row;
            // AccountId, Descr, Balance, Acc Type, Status, Create-Close Date,Assigner
            return (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.accountBalance}</TableCell>
                <TableCell>{row.accountType}</TableCell>
                <TableCell>{row.accountStatusType}</TableCell>
                <TableCell>{row.createDate}</TableCell>
                <TableCell>{row.closedDate}</TableCell>
                <TableCell>{row.employee}</TableCell>

                <TableCell>
                  <Button
                    onClick={() => {
                      handleEdit(row.id, row);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>

                <TableCell>
                  <Button
                    onClick={() => {
                      handleDelete(row.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </TableContainer>
    </Container>
  );
};

export default DisplayAccounts;
