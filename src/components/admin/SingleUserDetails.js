import { Form, Formik, Field } from 'formik'
import React, {useState, useEffect} from 'react'
import { useStateValue } from '../../StateProvider'
import * as Yup from "yup"
import service from "../../service/BankService"
import { toast } from 'react-toastify'
import { Container, Row, Col } from 'react-bootstrap'
import { TextField } from "formik-material-ui";
import {Button,LinearProgress} from "@material-ui/core";

import { useHistory } from "react-router";
import {idToPass} from "./UsersDetails";
import {currentUser} from "./UsersDetails"



const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please provide first name"),
    lastName: Yup.string().required("Please provide last name"),
    dob: Yup.string().required("Provide"), 
    email: Yup.string().email("Please provide valid email address").required("Please provide the email address"),
    // role
    // all accounts

})
//const id;

const SingleUserDetails = () => {

    // const [singleUser, setSingleUser] = useState([]);
    // useEffect(() => {
    //     service.getSingleUser(idToPass).then((res)=>{
    //         setSingleUser(res.data.userDAO);
    //     })

    //     return () => {
    //         setSingleUser();
    //     }
    // }, [])



    //const [{userInfo}, dispatch] = useStateValue();
    //console.log(singleUser); // []
    //console.log(userInfo); // null
    //const currentUser = allUsers.filter(t=>('http://localhost:3000/admin/singleUserDetails/'+t.userId)==window.location.href); // ??????????
    //const currentUser = allUsers.find(t=>t['userId'] == idToPass);
    // const currentUser = singleUser;
    // console.log(idToPass)
    // console.log(currentUser)
    // console.log(singleUser.ssn);
    // console.log(userToPass);
    
    
    const history = useHistory();
    return (
        <Container>
            <div>
                <Formik
                    //enableReinitialize={true}
                    initialValues={{
                                    ssn: currentUser.ssn,
                                    firstName: currentUser.firstName,
                                    lastName: 'deneme',
                                    dob: currentUser.dob,
                                    email: currentUser.email,
                                    username: currentUser.username,
                                    //role: currentUser.userRoles,
                                    accounts: '',
                                    // accountDAOs listesi gelecek

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
                                // dispatch({
                                //     type: "UPDATE",
                                //     item: userInfo
                                // });
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
                                            <label htmlFor="ssn">SSN</label>
                                            <Field
                                                disabled
                                                className="ms-4"
                                                component={TextField}
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
                                                component={TextField}
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
                                                component={TextField}
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
                                                component={TextField}
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
                                                component={TextField}
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
                                                component={TextField}
                                                name="username"
                                                type="text"
                                                placeholder="Enter username"
                                            />
                                        </Col>
                                    </Row>

                                    <Row>
                                      <Col>
                                        <label className="p3">
                                          <Field type="checkbox" name="role" value="user" />
                                          User
                                        </label>
                                        <label className="p3 ms-4">
                                          <Field type="checkbox" name="role" value="admin" />
                                          Admin
                                        </label>
                                        <label className="p3 ms-4">
                                          <Field type="checkbox" name="role" value="employee" />
                                          Employee
                                        </label>
                                      </Col>
                                    </Row>

                                    {/* <Autocomplete
                                        options={}
                                        getOptionLabel={(option) =>
                                            option.description
                                        }
                                        // className={classes.formControl}
                                        name="fromAccount"
                                        // getOptionSelected={(option, value) =>
                                        // 	option.description === value.description
                                        // }
                                        // style={{ width: 200 }}
                                        onChange={(event, value, clear) => {
                                            props.setFieldValue(
                                                'fromAccount', value.id
                                                //value?.description || ''
                                            );
                                        }}
                                        onOpen={props.setTouched}
                                        renderInput={(params) => (
                                            <TextField
                                                label="From"
                                                name="fromAccount"
                                                {...params}
                                            />
								)}
							/> */}



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

                                        <Col className="d-flex justify-content-center p-3">
                                            <Button
                                            type="submit"
                                            onClick={props.submitForm}
                                            disabled={props.isSubmitting}
                                            variant="contained"
                                            color="secondary">
                                            Back
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

export default SingleUserDetails

