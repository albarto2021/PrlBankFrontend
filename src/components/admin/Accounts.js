import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useStateValue } from "../../StateProvider";
import service from "../../service/BankService";
import UsersDetails from "./UsersDetails";
import SingleUserDetails from "./SingleUserDetails";

const Accounts = () => {
  //const [{userInfo}] = useStateValue();
  const history = useHistory();
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    service.getAllAccounts().then((res) => {
      setAccounts(res.data);
    });

    return () => {
      setAccounts();
    };
  }, []);

  return (
    <div>
      <SingleUserDetails accounts={accounts} />
    </div>
  );
};

export default Accounts;
