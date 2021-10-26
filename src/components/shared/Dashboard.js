import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useStateValue } from "../../StateProvider";
import service from "../../service/BankService";
import DisplayDashboard from "./DisplayDashboard";

const Dashboard = () => {
  const [{ userInfo }] = useStateValue();
  const history = useHistory();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    service.getAllUsers().then((res) => {
      setUsers(res.data.userDAOList);
    });

    return () => {
      setUsers();
    };
  }, []);

  return (
    <div>
      <DisplayDashboard users={users}></DisplayDashboard>
      {/* <SingleUserDetails/> */}
    </div>
  );
};

export default Dashboard;
