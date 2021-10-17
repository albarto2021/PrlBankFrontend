import React from "react";
import { Field, Formik,Form } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import PasswordStrength from "../shared/PasswordStrenght";
import { Container,Row,Col } from "react-bootstrap";
import { TextField } from "formik-material-ui";
import {Button,LinearProgress} from "@material-ui/core";
import {useStateValue} from "../../StateProvider"
import service from "../../service/BankService"
import { useState } from "react";
import { useHistory } from "react-router";


const validationSchema=Yup.object().shape(
    {
        oldPassword:Yup.string().required("Enter your old password"),
        newPassword:Yup.string().min(6,"Your pass need to be more than 6 char").required("Enter password")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.,;><:\$%\^&\*])(?=.{6,})/,
            "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character",
          ),
        confirmPassword:Yup.string().oneOf([
            Yup.ref("newPassword"),null],"Password should match"
        )
    }
);

const PasswordChangeForm=(props)=>{
  const [{userInfo}, dispatch] = useStateValue();
  const currentUser = userInfo.userDAO;
    const [password, setpassword] = useState("");
    return(
  <Container className=" d-flex justify-content-center" >
  <fieldset >
    <legend className="text-center p-3">{`User Settings for ${currentUser.firstName} ${currentUser.lastName}`}</legend>
    <Form>
      <Col className="justify-content-center">  

        <Row xs={6} md={4} className="text-center p-3">
         <label htmlFor="password">Old Password:</label> 
         <Field
         className="ms-4"
         component={TextField}
         name="oldPassword"
         type="password"
         />
        </Row>

        <Row xs={6} md={4} className="text-center p-3">
         <label htmlFor="password">New Password:</label> 
         <Field
         className="ms-4"
         component={TextField}
         name="newPassword"
         type="password"
         onKeyUp={e=>setpassword(e.target.value)}
         />
         
        </Row>
            <PasswordStrength password={password}/> 
        <Row>
           
        </Row>

        <Row xs={6} md={4} className="text-center p-3">
         <label htmlFor="password">Confirm Password:</label> 
         <Field
         className="ms-4"
         component={TextField}
         name="confirmPassword"
         type="password"
         />
        </Row>
      </Col>
      <Row className="ms-4">
       <Col className="d-flex justify-content-center p-3">
         <Button
         type="submit"
         onClick={props.submitForm}
         disabled={props.isSubmitting}
         variant="contained"
         color="secondary">
           Submit
         </Button>
       </Col> 
       {props.isSubmitting && <LinearProgress/>}
      </Row>
    </Form>
  </fieldset>
  </Container>

  )};

const PasswordChange = () => {

  const history = useHistory();

  const [{userInfo}, dispatch] = useStateValue();
  return (
    <div>
      <Formik
      initialValues={{oldPassword:"",newPassword:""}}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        service.updatePassword(values, userInfo.userDAO.userId).then((res) => {
          if(res.status === 200){
            toast.success("Update Successful", {
              position: toast.POSITION.TOP_CENTER,
            });
            const userInfo = res.data;
            // localStorage.setItem("auth", JSON.stringify({token: userInfo.jwt}));

            dispatch({
              type: "UPDATE",
              item: userInfo
            });
            // if(userInfo?.user?.user.isAdmin){
            //   history.push("/admin");
            // }
            // else {
            //   history.push("/user");
            // }
            history.push("/")
          } 
          if(res.status === 202){
            toast.error("Password didnt match", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        actions.resetForm();
        actions.setSubmitting(false);

      }}
      component={PasswordChangeForm}
      ></Formik>
     
    </div>
  );
    
  
};

export default PasswordChange;
