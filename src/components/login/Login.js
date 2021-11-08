import React from "react";
import { Field, Formik, Form } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import MaskedInput from "react-text-mask";
import { Container, Row, Col } from "react-bootstrap";
import { TextField } from "formik-material-ui";
import { Button, LinearProgress } from "@material-ui/core";
import "./Login.css";
import { useStateValue } from "../../StateProvider";
import service from "../../service/BankService";
import { useHistory } from "react-router";

//let history = useHistory();
const ssnNumberMask = [
  /[1-9]/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const LoginForm = (props) => {
  const history = useHistory();
  return (
    <Container className=" d-flex justify-content-center">
      <fieldset className="m-1 p-2">
        <legend className="text-center p-3">Login</legend>
        <Form>
          <Row className="d-flex justify-content-center align-items-center">
            <Col className="text-center  col-12 col-md-6">
              <label htmlFor="ssn">SSN:</label>
              <Field
                name="ssn"
                label="SSN"
                render={({ field }) => (
                  <MaskedInput
                    {...field}
                    className=""
                    mask={ssnNumberMask}
                    id="ssn"
                    placeholder="000-00-0000"
                    ype="text"
                  />
                )}
              />
            </Col>

            <Col className="text-center p-3 col-12 col-md-6">
              <label htmlFor="password">Password:</label>
              <Field
                className="ms-4 "
                component={TextField}
                name="password"
                type="password"
              />
            </Col>
          </Row>
          <Row className="ms-4">
            <Col className="d-flex justify-content-center p-3">
              <Button
                type="submit"
                onClick={() => history.push("/")}
                disabled={props.isSubmitting}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </Col>

            <Col className="d-flex justify-content-center p-3">
              <Button
                className="bg-success"
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
  );
};

const Login = () => {
  const history = useHistory();
  const [{ userInfo }, dispatch] = useStateValue();
  // localStorage.clear();
  return (
    <div>
      <Formik
        initialValues={{ ssn: "", password: "" }}
        validationSchema={Yup.object({
          ssn: Yup.string()
            // .max(9,"Must be 9 characters or less")
            .required("username Required"),
          password: Yup.string()
            .max(20, "Must be 20 characters or less")
            .min(6, "Must be at least 6 character")
            .required("password Required"),
        })}
        onSubmit={(values, actions) => {
          localStorage.clear();
          service.login(values).then((res) => {
            if (res.status === 200) {
              toast.success("Login Successful", {
                position: toast.POSITION.TOP_CENTER,
              });
              const userInfo = res.data;
              localStorage.setItem(
                "auth",
                JSON.stringify({ token: userInfo.jwt })
              );
              sessionStorage.setItem(
                "userDAO",
                JSON.stringify({
                  userDAO: userInfo.userDAO,
                })
              );

              dispatch({
                type: "LOGIN",
                item: userInfo,
              });
              // if(userInfo?.user?.user.isAdmin){
              //   history.push("/admin");
              // }
              // else {
              //   history.push("/user");
              // }
              // if(userInfo?.userDAO){
              //   history.push("/userInfoUpdate");
              // }
              // else {
              //   history.push("/");
              // }
              actions.setSubmitting(false);
              history.push("/displaydashboard");
            } else {
              actions.resetForm();
              actions.setSubmitting(false);
            }
          });
        }}
        component={LoginForm}
      ></Formik>
    </div>
  );
};

export default Login;
