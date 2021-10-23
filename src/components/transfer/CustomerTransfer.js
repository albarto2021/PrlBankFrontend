import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, LinearProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { TextField as FormikTextField } from 'formik-material-ui';
import { useStateValue } from '../../StateProvider';
import service from '../../service/BankService';
import { useHistory } from 'react-router';
// import AccountInfo from '../account/AccountInfo';
// import Transactions from '../account/Transactions';
// import Divider from '@material-ui/core/Divider';
// import { makeStyles } from '@material-ui/core';
// import styles from '../styles/dashboardStyle.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import './CustomerTransfer.css';

// const useStyles = makeStyles(styles);

// let classes;
let accountDescription = '';

const CustomerTransferForm = (props) => {
	return (
		<Container className="d-flex justify-content-center">
			<fieldset>
				<legend>Transfer</legend>
				<Form>
					<Row>
						<Col
							// xs={12}
							// md={6}
							className=" justify-content-center col-12 text-center p-3"
						>
							<Autocomplete
								options={accountDescription}
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
							/>
						</Col>
						<Col
							// xs={12}
							// md={6}
							className="col-12 justify-content-center text-center p-3"
						>
							<Autocomplete
								options={accountDescription}
								getOptionLabel={(option) =>
									option.description
								}
								// className={classes.formControl}
								name="toAccount"
								getOptionSelected={(option, value) =>
									option.description === value.description
								}
								// style={{ width: 200 }}
								onChange={(event, value, clear) => {
									props.setFieldValue(
										'toAccount', value.id
										
										//value?.description || ''
				
									);
									{console.log(value)}
								}}
								onOpen={props.setTouched}
								renderInput={(params) => (
									<TextField
										label="To"
										name="toAccount"
										{...params}
									/>
								)}
							/>
						</Col>
						<Col className=" justify-content-center text-center p-3">
							<Field
								className="col-12 ms-4"
								component={FormikTextField}
								name="amount"
								type="number"
								label="Balance"
							/>
						</Col>
						<Col className=" col-12 justify-content-center text-center p-3">
							<Field
								className="col-12 ms-4"
								component={FormikTextField}
								name="explanation"
								type="text"
								label="Explanation"
							/>
						</Col>
					</Row>
					<Row className="mt-4 ">
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
							{props.isSubmitting && <LinearProgress />}
						</Col>
					</Row>
				</Form>
			</fieldset>
		</Container>
	);
};

const CustomerTransfer = () => {
	const history = useHistory();

	const [{ userInfo }, dispatch] = useStateValue();
	// classes = useStyles();
	const id = userInfo.userDAO.userId;
	console.log(userInfo);
	if (userInfo?.userDAO?.accounts) {
		accountDescription = userInfo.userDAO.accounts;
		console.log(accountDescription);
	}

	return (
		<Container>
			{/* {!userInfo && history.push('/admin')}
			{userInfo && userInfo.user && ( */}
			<div className="d-flex justify-content-center flex-column">
				<Formik
					initialValues={{
						fromAccount: '',
						toAccount: '',
						amount: '',
						explanation: '',
					}}
					validationSchema={Yup.object().shape({
						fromAccount: Yup.string().required('from required'),
						toAccount: Yup.string().required('to required'),

						amount: Yup.number()
							.positive()
							.required('Amount Required'),
						explanation: Yup.string().required(
							'explanation Required'
						),
					})}
					onSubmit={(values, actions) => {
						service
							.moneyTransfer(values, id)
							.then((res) => {
								if (res.status === 200) {
									toast.success(
										'Amount Successfuly Transfered ',
										{
											position: toast.POSITION.TOP_CENTER,
										}
									);
									// dispatch register, account creation gibi backend'den 
									// bilgi gerektirmeyen yerlerde kullanilmasi gerekmez.
									// const userInfo = res.data;
									// dispatch({
									// 	type: 'UPDATE',
									// 	item: userInfo,
									// });

									actions.setSubmitting(false);
									actions.resetForm();
								}
							})
							.catch((e) => {
								actions.setSubmitting(false);
								actions.resetForm();
								console.log(e);
								toast.error('Transfer Denied', {
									position: toast.POSITION.TOP_CENTER,
								});
							});
					}}
					component={CustomerTransferForm}
				></Formik>
				{/* <Divider />
					<h2 className={classes.infoText}>Transactions</h2>
					<Transactions /> */}
			</div>
			{/* )} */}
		</Container>
	);
};

export default CustomerTransfer;
