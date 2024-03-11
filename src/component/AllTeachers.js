import React, {useContext, useEffect} from "react";
import Button from "react-bootstrap/Button";

import {useNavigate} from "react-router-dom";
import {userContext} from "./ContextComponent/UsersContextComponent";
import {Formik, Field, Form} from "formik";
import * as yup from "yup";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllTeachers() {
	let initialValues = {
		name: "",
		email: "",
		mobile: "",
		batch: "",
		timing: "",
	};

	let navigate = useNavigate();
	let context = useContext(userContext);
	const notify = () => toast("User added successfully!");

	const UserSchema = yup.object().shape({
		name: yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
		email: yup.string().email("Invalid email").required("Required"),
		mobile: yup
			.string()
			.matches(/^\d{10}$/, "Invalid Mobile Number 10 digits only")
			.required("Required"),
		batch: yup.string().required("Required"),
		timing: yup.string().required("Required"),
	});

	function handleSubmit(values) {
		console.log(values);
		let newArr = [...context.users];

		newArr.push(values);
		context.setUsers(newArr);
		console.log(newArr);

		notify();

		setTimeout(() => navigate("/dashboard"), 5000);
	}

	useEffect(() => {
		context.dispatch({type: "reset"});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="container-fluid">
			<br />
			<div className="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
				<h1 className="h4 mb-0 text-gray-800">Add User:</h1>
			</div>
			<br />
			<Formik
				initialValues={initialValues}
				validationSchema={UserSchema}
				onSubmit={values => {
					handleSubmit(values);
				}}
			>
				{({errors, touched}) => (
					<Form>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<Field name="name" className="form-control" type="text" placeholder="Name" />
							{errors.name && touched.name ? <div style={{color: "red"}}>{errors.name}</div> : null}
						</div>

						<div className="form-group">
							<label htmlFor="email">Email</label>
							<Field name="email" className="form-control" type="email" placeholder="Email" />
							{errors.email && touched.email ? <div style={{color: "red"}}>{errors.email}</div> : null}
						</div>
						<div className="form-group">
							<label htmlFor="mobile">Mobile</label>
							<Field name="mobile" className="form-control" type="text" />
							{errors.mobile && touched.mobile ? <div style={{color: "red"}}>{errors.mobile}</div> : null}
						</div>
						<div className="form-group">
							<label htmlFor="batch">Batch</label>
							<Field name="batch" className="form-control" type="text" />
							{errors.batch && touched.batch ? <div style={{color: "red"}}>{errors.batch}</div> : null}
						</div>
						<div className="form-group">
							<label htmlFor="timing">Timing</label>
							<Field component="select" id="timing" name="timing" className="form-control">
								<option value={"0"}>Session Timings</option>
								<option value="10am to 1pm">10am to 1pm</option>
								<option value="2pm to 4pm">2pm to 4pm</option>
								<option value="6pm to 8pm">6pm to 8pm</option>
							</Field>
							{errors.timing && touched.timing ? <div style={{color: "red"}}>{errors.timing}</div> : null}
						</div>
						<br />
						<Button type="submit" variant="primary">
							Submit
						</Button>
					</Form>
				)}
			</Formik>
			<ToastContainer />
		</div>
	);
}

export default AllTeachers;
