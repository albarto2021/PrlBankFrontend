import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import service from '../../service/BankService';
import { ToastContainer } from 'react-toastify';
// import { useStateValue } from '../../../StateProvider';
// import { useHistory } from 'react-router';

// import Divider from '@material-ui/core/Divider';

const today = new Date();
today.setHours(new Date().getHours() - 24);

console.log(today);

const AccountSchema = Yup.object().shape({
	description: Yup.string().required(
		'Description required'
	),
	accountBalance: Yup.number()
		.positive('Cannot be negative')
		.required('Account balance required'),
	accountType: Yup.string().required('Choose Account Type'),
	accountStatusType: Yup.string().required(
		'Choose Account Status Type'
	),
	createDate: Yup.date()
		.min(today, 'Please enter valid date')
		.required('Please enter date'),
	closedDate: Yup.date()
		.min(Yup.ref('createDate'), 'Please enter valid date')
		.required('Please enter date'),
	Employee: Yup.string(),
});

const CreateAccountForm = (props) => (
	<Container>
		<fieldset>
			<legend className="text-center col-8 h2">
				Create or edit a Account
			</legend>
			<Form>
				<Row className=" text-center">
					<Col>
						<Field
							className="col-8 "
							component={TextField}
							name="description"
							type="text"
							label="Description"
						/>
					</Col>

					<Col className=" col-12 p-3">
						<Field
							className="col-8"
							component={TextField}
							name="accountBalance"
							type="number"
							label="Balance"
						/>
					</Col>
					<Col className=" col-12 p-3">
						<Field
							className="col-8"
							component={TextField}
							name="accountType"
							type="text"
							label="Account Type"
						/>
					</Col>
					<Col className=" col-12 p-3">
						<Field
							className="col-8"
							component={TextField}
							name="accountStatusType"
							type="text"
							label="Account Status Type"
						/>
					</Col>

					<Col className=" col-12 p-3">
						<Field
							className="col-8"
							component={TextField}
							name="createDate"
							type="date"
							InputLabelProps={{ shrink: true }}
							label="Create Date"
						/>
					</Col>

					<Col className=" col-12 p-3 ">
						<Field
							className="col-8"
							component={TextField}
							name="closedDate"
							type="date"
							InputLabelProps={{ shrink: true }}
							label="Closed Date"
						/>
					</Col>

					<Col className=" col-12 p-3">
						<Field
							className="col-8"
							component={TextField}
							name="Employee"
							type="text"
							label="Employee"
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

const CreateAccount = () => {
	// const [{ userInfo }, dispatch] = useStateValue();
	// const history = useHistory();

	return (
		<Container>
			{/* {!userInfo && history.push('/login')}
			{userInfo && userInfo.user && ( */}
			<div>
				<Formik
					initialValues={{
						description: '',
						accountBalance: '',
						accountType: '',
						accountStatusType: '',
						createDate: '',
						closedDate: '',
						Employee: '',
					}}
					validationSchema={AccountSchema}
					onSubmit={(values, actions) => {
						service
							.createAccount(values)
							.then((res) => {
								if (res.status === 200) {
									// const userInfo = res.data;
									// dispatch({
									// 	type: 'UPDATE',
									// 	item: userInfo,
									// });
									toast.success(
										'Account Created Successfuly',
										{
											position: toast.POSITION.TOP_CENTER,
										}
									);
									actions.resetForm();
									actions.setSubmitting(false);
								}
							})
							.catch(() => {
								toast.error('Account can not be added', {
									position: toast.POSITION.TOP_CENTER,
								});
								actions.resetForm();
								actions.setSubmitting(false);
							});
					}}
					component={CreateAccountForm}
				></Formik>
			</div>
		</Container>
	);
};

export default CreateAccount;
