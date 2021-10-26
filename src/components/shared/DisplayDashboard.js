import React from "react";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import AccountBalance from "@material-ui/icons/AccountBalance";
import AttachMoney from "@material-ui/icons/AttachMoney";
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";

// Card Components
import CardBody from "../cardcomponents/Card/CardBody.js";
import GridItem from "../cardcomponents/Grid/GridItem.js";
import GridContainer from "../cardcomponents/Grid/GridContainer.js";
import Card from "../cardcomponents/Card/Card.js";
import CardHeader from "../cardcomponents/Card/CardHeader.js";
import CardIcon from "../cardcomponents/Card/CardIcon.js";
import CardFooter from "../cardcomponents/Card/CardFooter.js";

import { Container } from "react-bootstrap";
import styles from "../../styles/dashboardStyle.js";
import PlotlyCharts from "../charts/PlotlyCharts";

const useStyles = makeStyles(styles);

const DisplayDashboard = () => {
  const classes = useStyles();
  const [{ userInfo }] = useStateValue();
  const history = useHistory();

  let totalDeposit = 0;
  let totalWithdraw = 0;
  let depositArray = [];
  let withdrawArray = [];

  let transactions = [];
  if (userInfo?.userDAO?.transactions) {
    // transactionDAO listesi geliyor
    transactions = userInfo.userDAO.transactions;
  }
  console.log(transactions);

  // Getting Unique transaction date
  const dates = transactions.map((tran) => tran.date);
  const uniqDates = [...new Set(dates)];

  uniqDates.forEach((date) => {
    // DEPOSIT CALCULATION
    const deposits = transactions.filter((tran) => {
      return tran.type === "DEPOSIT" && tran.date === date;
    });

    const depositAmounts = deposits.map((tran) => tran.amount);
    const depositSum = depositAmounts.reduce((x, y) => x + y, 0);

    depositArray.push(depositSum);

    // WITHDRAW CALCULATION
    const withdraws = transactions.filter((tran) => {
      return tran.type === "WITHDRAW" && tran.date === date;
    });

    const withdrawAmounts = withdraws.map((tran) => tran.amount);
    const withdrawSum = withdrawAmounts.reduce((x, y) => x + y, 0);

    withdrawArray.push(withdrawSum);
  });

  totalDeposit = depositArray.reduce((x, y) => x + y, 0);
  totalWithdraw = withdrawArray.reduce((x, y) => x + y, 0);

  const depositData = [
    {
      type: "bar",
      x: uniqDates,
      y: depositArray,
    },
  ];

  const withdrawData = [
    {
      type: "line",
      x: uniqDates,
      y: withdrawArray,
    },
  ];

  return (
    <div>
      {!userInfo && history.push("./login")}
      {userInfo && (
        <Container>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <AccountBalance />
                  </CardIcon>
                  <p className={classes.cardCategory}>Balance</p>
                  <h3 className={classes.cardTitle}>
                    ${userInfo.userDAO.totalBalance}
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div>
                    <Update />
                    Just updated
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <AttachMoney />
                  </CardIcon>
                  <p className={classes.cardCategory}>Deposits</p>
                  <h3 className={classes.cardTitle}>${totalDeposit}</h3>
                </CardHeader>
                <CardFooter stats>
                  <div>
                    <DateRange />
                    Last 1 Week
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <CardHeader color="danger" stats icon>
                  <CardIcon color="danger">
                    <AccountBalanceWallet />
                  </CardIcon>
                  <p className={classes.cardCategory}>Withdraw</p>
                  <h3 className={classes.cardTitle}>${totalWithdraw}</h3>
                </CardHeader>
                <CardFooter stats>
                  <div>
                    <DateRange />
                    Last 1 Week
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Card chart>
                <CardHeader color="success">
                  <h4>Deposits</h4>
                </CardHeader>
                <CardBody>
                  <PlotlyCharts data={depositData} />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card chart>
                <CardHeader color="warning">
                  <h4>Withdraws</h4>
                </CardHeader>
                <CardBody>
                  <PlotlyCharts data={withdrawData} />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </Container>
      )}
    </div>
  );
};

export default DisplayDashboard;
