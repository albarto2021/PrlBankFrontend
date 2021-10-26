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
import UserInfo from "../user/UserInfo";

let rows = [];
const columns = [
  { id: 1, label: "Transaction id", winWidth: 200 },
  { id: 2, label: "Type", winWidth: 200 },
  { id: 3, label: "Description", winWidth: 200 },
  { id: 4, label: "Date", winWidth: 200 },
  { id: 5, label: "Amount", winWidth: 200 },
  { id: 6, label: "New Balance", winWidth: 200 },
  { id: 7, label: "Account id", winWidth: 200 },
  { id: 8, label: "User id", winWidth: 200 },
];

export let currentTransaction;

const TransactionsList = (props) => {
  const [{ userInfo }] = useStateValue();
  if (userInfo.userDAO.isAdmin || userInfo.userDAO.isEmployee) {
    rows = props.transactions;
  } else {
    rows = props.transactions.filter(
      (val) => val.userId == userInfo.userDAO.userId
    );
  }

  console.log(rows);
  const history = useHistory();
  const [searchItem, setSearchItem] = useState("");

  return (
    <div>
      <Container>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
        />
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
            {rows
              .filter((val) => {
                {
                  /* if (searchItem == "") {
                  return val;
                } else  */
                }
                if (
                  val.description
                    .toLowerCase()
                    .includes(searchItem.toLocaleLowerCase())
                ) {
                  return val;
                }
              })
              .map((row) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.availableBalance}</TableCell>
                    <TableCell>{row.accountId}</TableCell>
                    <TableCell>{row.userId}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </TableContainer>
      </Container>
    </div>
  );
};

export default TransactionsList;
