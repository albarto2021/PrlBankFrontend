import React, { useEffect } from "react";
import { useHistory } from "react-router";

const DeletedAccount = () => {
  const history = useHistory();

  return <div>{history.push("/displayaccounts")}</div>;
};

export default DeletedAccount;
