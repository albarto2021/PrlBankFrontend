import { Form, Formik, Field } from "formik";
import React, { useState, useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import * as Yup from "yup";
import service from "../../service/BankService";
import { toast } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { TextField as FormikTextField } from "formik-material-ui";
import { Button, LinearProgress } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router";

import { currentAccount } from "./DisplayAccounts";

export const allAccountStatusTypes = ["ACTIVE", "CLOSED", "SUSPENDED"];
export const allAccountTypes = [
  "SAVING",
  "CHECKING",
  "CREDIT_CARD",
  "INVESTING",
];

const today = new Date();
today.setHours(new Date().getHours() - 24);

const validationSchema = Yup.object().shape({
  id: Yup.string().required("Please provide first name"),
  description: Yup.string().required("Please provide last name"),
  accountType: Yup.string().required("Provide"),
  accountStatusType: Yup.string().required("Provide"),
  closedDate: Yup.date()
    .min(today, "Please enter valid date")
    .required("Please enter date"),
});

const EditAccount = (props) => {
  const [{ userInfo }, dispatch] = useStateValue();
  console.log(userInfo);

  const handleBack = () => {
    // history.push('/admin/allusers');
    history.goBack();
  };

  const history = useHistory();
  return (
    <Container>
      <div>
        <Formik
          initialValues={{
            id: currentAccount.id,
            description: currentAccount.description,
            accountBalance: currentAccount.accountBalance,
            accountType: currentAccount.accountType,
            accountStatusType: currentAccount.accountStatusType,
            createDate: currentAccount.createDate,
            closedDate: currentAccount.closedDate,
            employee: currentAccount.employee,
            //role: [`${role}`],
            // accountDAOs listesi gelecek
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            //const currentUserId = currentUser.userId;
            // service.updateSingleUserInfo(values).then((res) => {
            //   if (res.status === 200) {
            //     toast.success("User Info has been successfully updated", {
            //       position: toast.POSITION.TOP_CENTER,
            //     });
            //     const userInfo = res.data;
            //     // dispatch({
            //     //   type: "UPDATE",
            //     //   item: userInfo,
            //     // });
            //     actions.resetForm();
            //     actions.setSubmitting(false);
            //     history.push("/admin/allusers");
            //   } else {
            //     toast.error("Update denied", {
            //       position: toast.POSITION.TOP_CENTER,
            //     });
            //     actions.setSubmitting(false);
            //     actions.resetForm();
            //   }
            // });
            // .catch(()=>{
            //     actions.setSubmitting(false);
            //     actions.resetForm();
            //     toast.error("Update denied", {
            //         position: toast.POSITION.TOP_CENTER,
            //     })
            // })
          }}
          // id, description, balance
          component={(props) => (
            <Container>
              <fieldset>
                <legend>
                  {" "}
                  {`Account Settings for ${currentAccount.description}`}{" "}
                </legend>
                <Form>
                  <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center p-3">
                      <label htmlFor="id">Account id</label>
                      <Field
                        disabled
                        className="ms-4"
                        component={FormikTextField}
                        name="id"
                        type="text"
                      />
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center p-3">
                      <label htmlFor="description">Description</label>
                      <Field
                        className="ms-4"
                        component={FormikTextField}
                        name="description"
                        type="text"
                        //placeholder="Enter first name"
                      />
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center p-3">
                      <label htmlFor="accountBalance">Balance</label>
                      <Field
                        className="ms-4"
                        component={FormikTextField}
                        name="accountBalance"
                        type="text"
                        //placeholder="Enter first name"
                      />
                    </Col>
                  </Row>

                  {/* Autocomplete */}
                  <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center p-3">
                      <label htmlFor="accountType">Account Type</label>
                      <Autocomplete
                        options={allAccountTypes}
                        getOptionLabel={(option) => option}
                        // className={classes.formControl}
                        name="accountType"
                        getOptionSelected={(option, value) => option === value}
                        // style={{ width: 200 }}
                        onChange={(event, value, clear) => {
                          props.setFieldValue(
                            "accountType",
                            value ? value : "SAVING"
                          );
                        }}
                        onOpen={props.setTouched}
                        renderInput={(params) => (
                          <TextField
                            label="Account Types"
                            name="accountType"
                            {...params}
                          />
                        )}
                      />
                    </Col>
                  </Row>
                  {/* accountStatusType */}
                  <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center p-3">
                      <label htmlFor="accountStatusType">
                        Account Status Type
                      </label>
                      <Autocomplete
                        options={allAccountStatusTypes}
                        getOptionLabel={(option) => option}
                        // className={classes.formControl}
                        name="accountStatusType"
                        getOptionSelected={(option, value) => option === value}
                        // style={{ width: 200 }}
                        onChange={(event, value, clear) => {
                          props.setFieldValue(
                            "accountStatusType",
                            value ? value : "CLOSED"
                          );
                        }}
                        onOpen={props.setTouched}
                        renderInput={(params) => (
                          <TextField
                            label="Account Status Types"
                            name="accountStatusType"
                            {...params}
                          />
                        )}
                      />
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center p-3">
                      <label htmlFor="createDate">Account Creation Date</label>
                      <Field
                        disabled
                        className="ms-4"
                        component={FormikTextField}
                        name="createDate"
                        type="date"
                      />
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center p-3">
                      <label htmlFor="closedDate">Account Closing Date</label>
                      <Field
                        className="ms-4"
                        component={FormikTextField}
                        name="closedDate"
                        type="date"
                      />
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center p-3">
                      <label htmlFor="employee">Assigner</label>
                      <Field
                        disabled
                        className="ms-4"
                        component={FormikTextField}
                        name="employee"
                        type="text"
                      />
                    </Col>
                  </Row>

                  <Row className="ms-4">
                    <Col className="d-flex justify-content-center p-3">
                      <Button
                        // type="submit"
                        onClick={handleBack}
                        disabled={props.isSubmitting}
                        variant="contained"
                        color="secondary"
                      >
                        Back
                      </Button>
                    </Col>
                    <Col className="d-flex justify-content-center p-3">
                      <Button
                        type="submit"
                        onClick={props.submitForm}
                        disabled={props.isSubmitting}
                        variant="contained"
                        color="secondary"
                      >
                        Submit
                      </Button>
                    </Col>

                    {props.isSubmitting && <LinearProgress />}
                  </Row>
                </Form>
              </fieldset>
            </Container>
          )}
        ></Formik>
      </div>
    </Container>
  );
};

export default EditAccount;
