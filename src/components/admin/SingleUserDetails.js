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
//import {idToPass} from "./UsersDetails";
import { currentUser } from "./UsersDetails";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Please provide first name"),
  lastName: Yup.string().required("Please provide last name"),
  dob: Yup.string().required("Provide"),
  email: Yup.string()
    .email("Please provide valid email address")
    .required("Please provide the email address"),
  //accounts: Yup.number().required("Provide"),
  // role
  // all accounts
});

const SingleUserDetails = (props) => {
  // const [singleUser, setSingleUser] = useState([]);
  // useEffect(() => {
  //     service.getSingleUser(idToPass).then((res)=>{
  //         setSingleUser(res.data.userDAO);
  //     })

  //     return () => {
  //         setSingleUser();
  //     }
  // }, [])

  const [{ userInfo }, dispatch] = useStateValue();
  console.log(userInfo);
  const assignerId = userInfo.userDAO.userId;
  console.log(assignerId);
  const handleBack = () => {
    // history.push('/admin/allusers');
    history.goBack();
  };
  console.log(currentUser);
  console.log(props);
  let role = [];
  if (currentUser.isAdmin) role.push("ADMIN");
  if (currentUser.isEmployee) role.push("EMPLOYEE");
  if (currentUser.isUser) role.push("USER");
  // const role = currentUser.isAdmin
  //   ? "ADMIN"
  //   : currentUser.isEmployee
  //   ? "EMPLOYEE"
  //   : "USER";
  const myArray = props.accounts.filter((acc) => acc.userId == -1);
  console.log(myArray);
  //allAccountsToPass = props.accounts;
  const history = useHistory();
  return (
    <Container>
      <div>
        <Formik
          initialValues={{
            ssn: currentUser.ssn,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            dob: currentUser.dob,
            email: currentUser.email,
            username: currentUser.username,
            role: role,
            //role: [`${role}`],
            assignerId: assignerId,
            accounts: 0,
            // accountDAOs listesi gelecek
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            const currentUserId = currentUser.userId;
            service.updateSingleUserInfo(values).then((res) => {
              if (res.status === 200) {
                toast.success("User Info has been successfully updated", {
                  position: toast.POSITION.TOP_CENTER,
                });
                const userInfo = res.data;
                // dispatch({
                //   type: "UPDATE",
                //   item: userInfo,
                // });
                actions.resetForm();
                actions.setSubmitting(false);
                history.push("/admin/allusers");
              } else {
                toast.error("Update denied", {
                  position: toast.POSITION.TOP_CENTER,
                });
                actions.setSubmitting(false);
                actions.resetForm();
              }
            });
            // .catch(()=>{
            //     actions.setSubmitting(false);
            //     actions.resetForm();
            //     toast.error("Update denied", {
            //         position: toast.POSITION.TOP_CENTER,
            //     })
            // })
          }}
          component={(props) => (
            <Container>
              <fieldset>
                <legend>
                  {" "}
                  {`User Settings for ${currentUser.firstName} ${currentUser.lastName}`}{" "}
                </legend>
                <Form>
                  <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center p-3">
                      <label htmlFor="ssn">SSN</label>
                      <Field
                        disabled
                        className="ms-4"
                        component={FormikTextField}
                        name="ssn"
                        type="text"
                      />
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center p-3">
                      <label htmlFor="firstName">First Name</label>
                      <Field
                        className="ms-4"
                        component={FormikTextField}
                        name="firstName"
                        type="text"
                        //placeholder="Enter first name"
                      />
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center p-3">
                      <label htmlFor="lastName">Last Name</label>
                      <Field
                        className="ms-4"
                        component={FormikTextField}
                        name="lastName"
                        type="text"
                        //placeholder="Enter last name"
                      />
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center p-3">
                      <label htmlFor="dob">Date of Birth</label>
                      <Field
                        className="ms-4"
                        component={FormikTextField}
                        name="dob"
                        type="date"
                        //placeholder="Enter date of birth"
                      />
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center p-3">
                      <label htmlFor="email">Email</label>
                      <Field
                        className="ms-4"
                        component={FormikTextField}
                        name="email"
                        type="email"
                        placeholder="Enter email"
                      />
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center p-3">
                      <label htmlFor="username">Username</label>
                      <Field
                        className="ms-4"
                        component={FormikTextField}
                        name="username"
                        type="text"
                        placeholder="Enter username"
                      />
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center p-3">
                      <label className="p3">
                        <Field type="checkbox" name="role" value="USER" />
                        User
                      </label>
                      <label className="p3 ms-4">
                        <Field type="checkbox" name="role" value="ADMIN" />
                        Admin
                      </label>
                      <label className="p3 ms-4">
                        <Field type="checkbox" name="role" value="EMPLOYEE" />
                        Employee
                      </label>
                    </Col>
                  </Row>
                  {console.log(myArray[0])}
                  <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center p-3">
                      <Autocomplete
                        options={myArray}
                        getOptionLabel={(option) => option.description}
                        // className={classes.formControl}
                        name="accounts"
                        getOptionSelected={(option, value) =>
                          option.description === value.description
                        }
                        // style={{ width: 200 }}
                        onChange={(event, value, clear) => {
                          props.setFieldValue("accounts", value?.id || 0);
                        }}
                        // onChange={(value) => {
                        //   props.setFieldValue(
                        //     'accounts',
                        //    value?.id || 0
                        //   );
                        // }}
                        onOpen={props.setTouched}
                        renderInput={(params) => (
                          <TextField
                            label="Descriptions"
                            name="accounts"
                            {...params}
                          />
                        )}
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

export default SingleUserDetails;