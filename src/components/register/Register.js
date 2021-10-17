import React from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import {Formik, Form ,Field , validateYupSchema} from "formik";
import { Button, LinearProgress } from "@material-ui/core";
import { Container, Col, Row } from "react-bootstrap"
import { TextField } from 'formik-material-ui';
import MaskedInput from 'react-text-mask';

import service from "../../service/BankService"
import PasswordStrenght from "../shared/PasswordStrenght"
import { useState } from 'react';

toast.configure();
const eighteenyears=new Date();
eighteenyears.setFullYear(new Date().getFullYear()-18);
const phoneNumberMask = [
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
    /\d/
  ];

const initialValues={
    ssn:"",
    firstName:"",
    lastName:"",
    dob:"",
    email:"",
    username:"",
    password:"",
    confirmPassword:"",
};
const validationSchema=Yup.object().shape(
    {
        // ssn:Yup.string().when('identifyType',
        // {
        //     is: 'ssn',
        //     then: Yup.string().min(11, 'Social Security Number must be up to 9 digits without dashes').required('Social Security Number is Required')
        // }),
        ssn: Yup.string().required("Enter SSN"),
        firstName:Yup.string().required("Enter First Name"),
        lastName:Yup.string().required("Enter Last Name"),
        // dob:Yup.string().required("Enter Date of Birth Name"),
        dob:Yup.date().max(eighteenyears, "You need to be more than 18 years old"
            ).required("Enter Date of Birth Name"),
        email:Yup.string().email("Enter e-Mail Name").required("Please enter valid email address"),
        username:Yup.string().required("Enter User Name"),
        password:Yup.string().min(6,"Your pass need to be more than 8 char").required("Enter password")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.,;><:\$%\^&\*])(?=.{6,})/,
            "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character",
          ),
        confirmPassword:Yup.string().oneOf([
            Yup.ref("password"),null],"Password should match"
        )
    }
);

const RegistrationForm=(props) => {
    const [password, setPassword] = useState("")
    return (
    <Container className="d-flex justify-content-center">
        <fieldset>
            <legend>Register</legend>
            <Form>
                
                {/* <div className="col justify-content-start"> */}
            
                    <Row sm={12} md={12} lg={12}>
                        <Col>
                            {/* <MaskedInput 
                                mask={phoneNumberMask}
                                id="ssn"
                                placeholder="000-00-0000"
                                type="text" 
                                /> */}
                                 {/* <Field 
                                    component={TextField}
                                    name="ssn"
                                    label="SSN"
                                    type="text">         
                                </Field>  */}

                                <Field
                                    name="ssn"
                                    label="SSN"
                                    render={({ field }) => (
                                        <MaskedInput
                                        {...field}
                                        mask={phoneNumberMask}
                                        id="ssn"
                                        placeholder="000-00-0000"
                                        type="text"
                                        
                                        />
                                        )}
                                    />
                            
                        </Col>

                        
                       
                    </Row>

                    <Row>
                        <Col>
                            <Field 
                                component={TextField}
                                name="firstName"
                                label="First Name"
                                type="text"
                                >
                                
                            </Field>
                        </Col>
                        
                    </Row>

                    <Row>
                        <Col>
                            <Field 
                                component={TextField}
                                name="lastName"
                                label="Last Name"
                                type="text">
                                
                            </Field>
                        </Col>
                        
                    </Row>

                    <Row>
                        <Col>
                            <Field 
                                component={TextField}
                                name="dob"
                                label=""
                                type="date">
                                InputLabelProps={{shrink:true}}
                            </Field>
                        </Col>
                        
                    </Row>

                    <Row>
                        <Col>
                            <Field 
                                component={TextField}
                                name="email"
                                label="E-Mail"
                                type="email">
                            </Field>
                        </Col>
                        
                    </Row>

                    <Row>
                        <Col>
                            <Field 
                                component={TextField}
                                name="username"
                                label="User Name"
                                type="text">    
                            </Field>
                        </Col>
                        
                    </Row>

                    <Row>
                        <Col>
                            <Field 
                                component={TextField}
                                name="password"
                                label="Password"
                                type="password"
                                onKeyUp={e => setPassword(e.target.value)}
                                // render={({ field }) => (
                                //         <input
                                        
                                        
                                //         className="form-control shadow-none"
                                        
                                //         onChange={e => setPassword(e.target.value)}
                                        
                                //         />
                                //         )}
                                        >
                                
                            </Field>
                        </Col>
                       
                    </Row>
                    <PasswordStrenght password={password}/>

                    {/* password strenght deneme */}

                    {/* <div className="col-2 text-center p-3">
                    <ReactPasswordStrength
                        className="customClass"
                        style={{ display: 'none' }}
                        minLength={5}
                        minScore={2}
                        scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
                        changeCallback={foo}
                        inputProps={{ name: "password_input", autoComplete: "off", className: "form-control" }}/>
                    </div> */}


                    <Row>
                        <Col>
                            <Field 
                                component={TextField}
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password">
                                
                            </Field>
                        </Col>
                        
                    </Row>
                {/* </div> */}
                <Row>
                    <Col className="col-6 p-3 text-center">
                        <Button
                        variant="contained"
                        color="primary"
                        disabled={props.isSubmitting}
                        onClick={props.submitForm}
                        // className="register__btn"
                        > Submit</Button>
                    </Col>
                </Row>
            </Form>
            {props.isSubmitting && <LinearProgress/>}
        </fieldset>
    </Container>
                )};


const Register = () => {
    
    return (
        <div>
             <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                service.register(values).then((res) => {
                    if(res.status === 200){
                        toast.success("Register Successful", {
                            position: toast.POSITION.TOP_CENTER,
                        });
                        actions.resetForm();
                        actions.setSubmitting(false);
                    }
                })
                .catch(() => {
                    toast.error("Register Denied", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    actions.resetForm();
                    actions.setSubmitting(false);
                })
            }}
            component={RegistrationForm}></Formik>
        </div>
    )
};

export default Register;
