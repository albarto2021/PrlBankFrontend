import React, { useEffect, useState } from "react";
import DisplayAccounts from "./DisplayAccounts";
import service from "../../service/BankService";

const DisplayAllAccounts = () => {
  const [allAccounts, setAllAccounts] = useState([]);
  useEffect(() => {
    service.getAllAccounts().then((res) => setAllAccounts(res.data));
    return () => {
      setAllAccounts();
    };
  }, []);
  return (
    <div>
      <DisplayAccounts allAccounts={allAccounts} />
    </div>
  );
};

export default DisplayAllAccounts;
