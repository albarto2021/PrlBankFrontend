import { Form, Formik, Field } from 'formik'
import React from 'react'
import { useStateValue } from '../../StateProvider'
import * as Yup from "yup"
import service from "../../service/BankService"
import { toast } from 'react-toastify'
import { Container, Row, Col } from 'react-bootstrap'
import { TextField } from "formik-material-ui";
import {Button,LinearProgress} from "@material-ui/core";

import { useHistory } from "react-router";




// bir form olacak
// firstname  lastname  email  language
// useStateValue ve userInfo 
// userInfo response class'ina denk geliyor backend'de 



const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please provide first name"),
    lastName: Yup.string().required("Please provide last name"),
    email: Yup.string().email("Please provide valid email address").required("Please provide the email address")
    // language: Yup.string.required()
})


const UserInfo = () => {
    const [{userInfo}, dispatch] = useStateValue();
    //console.log(userInfo); // null
    const currentUser = userInfo.userDAO;
    console.log(currentUser);
    const history = useHistory();
    return (
        <Container>
            <div>
                <Formik
                    initialValues={{
                                    firstName: currentUser.firstName,
                                    lastName: currentUser.lastName,
                                    email: currentUser.email,
                                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {

                        const currentUserId = currentUser.userId;
                        service.updateUserInfo(values, currentUserId).then((res) => {
                            if(res.status === 200){
                                toast.success("User Info has been successfully updated", {
                                    position: toast.POSITION.TOP_CENTER,
                                });
                                const userInfo = res.data;
                                dispatch({
                                    type: "UPDATE",
                                    item: userInfo
                                });
                                actions.resetForm();
                                actions.setSubmitting(false);
                                history.push("/")
                            }
                            else {
                                    toast.error("Update denied", {
                                    position: toast.POSITION.TOP_CENTER,
                                })
                                actions.setSubmitting(false);
                                actions.resetForm();
                            }
                            
                        })
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
                                <legend> {`User Settings for ${currentUser.firstName} ${currentUser.lastName}`} </legend>
                                <Form>
                                    <Row className="justify-content-center">
                                        <Col sm={12} md={6} className="text-center p-3">
                                            <label htmlFor="firstName">First Name</label>
                                            <Field
                                                className="ms-4"
                                                component={TextField}
                                                name="firstName"
                                                type="text"
                                                placeholder="Enter your first name"
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="justify-content-center">
                                        <Col sm={12} md={6} className="text-center p-3">
                                            <label htmlFor="lastName">Last Name</label>
                                            <Field
                                                className="ms-4"
                                                component={TextField}
                                                name="lastName"
                                                type="text"
                                                placeholder="Enter your last name"
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="justify-content-center">
                                        <Col sm={12} md={6} className="text-center p-3">
                                            <label htmlFor="firstName">Email</label>
                                            <Field
                                                className="ms-4"
                                                component={TextField}
                                                name="email"
                                                type="email"
                                                placeholder="Enter your email"
                                            />
                                        </Col>
                                    </Row>
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
                    )}
                    >

                </Formik>
            </div>
        </Container>
       
    )
}

export default UserInfo
