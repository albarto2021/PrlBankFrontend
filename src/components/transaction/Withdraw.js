import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import service from "../../service/BankService";
import { ToastContainer } from "react-toastify";
import { useStateValue } from "../../StateProvider";
import { allAccountStatusTypes } from "../employee/EditAccount";
import { allAccountTypes } from "../employee/EditAccount";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField as FormikTextField } from "formik-material-ui";
import { Link } from "react-router-dom";

// import { useHistory } from 'react-router';

// import Divider from '@material-ui/core/Divider';
let accountDAOList;

const WithdrawSchema = Yup.object().shape({
  amount: Yup.number()
    .positive("Amount cannot be negative")
    .required("Amount required"),
  comment: Yup.string().required("Comment required"),
  accountDescriptions: Yup.string().required("Please choose an account"),
});

const WithdrawForm = (props) => (
  <Container>
    <fieldset>
      <legend className="text-center col-8 h2">Withdraw</legend>
      <Form>
        <Row className=" text-center">
          <Col>
            <Field
              className="col-8 "
              component={FormikTextField}
              name="amount"
              type="number"
              label="Amount"
            />
          </Col>

          <Col className=" col-12 p-3">
            <Field
              className="col-8"
              component={FormikTextField}
              name="comment"
              type="text"
              label="Comment"
            />
          </Col>

          <Col className=" col-12 p-3">
            <Autocomplete
              className="col-8"
              options={accountDAOList}
              getOptionLabel={(option) => option.description}
              // className={classes.formControl}
              name="accountDescriptions"
              // getOptionSelected={(option, value) =>
              // 	option === value
              // }
              // style={{ width: 200 }}
              onChange={(event, value, clear) => {
                props.setFieldValue(
                  "accountDescriptions",
                  value.id
                  //value ? value.id : 0
                );
              }}
              onOpen={props.setTouched}
              renderInput={(params) => (
                <TextField
                  label="Account Descriptions"
                  name="accountDescriptions"
                  {...params}
                />
              )}
            />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col className="text-center p-3">
            <Button
              variant="contained"
              color="secondary"
              disabled={props.isSubmitting}
              onClick={props.submitForm}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </fieldset>
  </Container>
);

const Withdraw = () => {
  const [{ userInfo }, dispatch] = useStateValue();
  if (userInfo?.userDAO?.accounts) {
    accountDAOList = userInfo.userDAO.accounts;
  }
  // const history = useHistory();

  return (
    <>
      <Container>
        <div>
          <Formik
            initialValues={{
              amount: "",
              comment: "",
              accountDescriptions: 0,
            }}
            validationSchema={WithdrawSchema}
            onSubmit={(values, actions) => {
              if (values.accountDescriptions === 0) {
                toast.error("Please choose an account");
                actions.setSubmitting(false);
              } else {
                service
                  .withdraw(values)
                  .then((res) => {
                    console.log(values);
                    if (res.status === 200) {
                      const userInfo = res.data;
                      dispatch({
                        type: "UPDATE",
                        item: userInfo,
                      });
                      toast.success("Amount Withdrew Successfuly", {
                        position: toast.POSITION.TOP_CENTER,
                      });
                      actions.resetForm();
                      actions.setSubmitting(false);
                    }
                  })
                  .catch(() => {
                    toast.error("Amount cannot be withdrawn", {
                      position: toast.POSITION.TOP_CENTER,
                    });
                    actions.resetForm();
                    actions.setSubmitting(false);
                  });
              }
            }}
            component={WithdrawForm}
          ></Formik>
        </div>
      </Container>
    </>
  );
};

export default Withdraw;
