import {useParams} from "react-router-dom";
import React, {useEffect, useContext, useState} from "react";
import Button from "react-bootstrap/Button";
import {Formik, Field, Form} from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useManagementProvider} from "./ContextComponent/TeacherStudentContext";

function EditTeacher() {
	const [isValid, setIsValid] = useState(false);

	let navigate = useNavigate();
	let {id, teachers} = useParams();
	let {state, dispatch} = useManagementProvider();

	let allStudents = state.teachers.map(e => {
		return e.students;
	});

	const notify = () => toast("User edited successfully!");

	const [initialValues, setIinitialValues] = useState({
		name: "",
		class: "",
		subject: "",
		students: [],
	});
	const TeacherSchema = yup.object().shape({
		name: yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
		class: yup.string().required("Required"),
		subject: yup.string().required("Required"),
		students: yup.array().min(2, "Please use 'ctrl key' to select at least two students"),
	});

	useEffect(() => {
		console.log(state);
		if (id) {
			setIinitialValues({
				name: state[teachers][id].name,
				class: state[teachers][id].class,
				subject: state[teachers][id].subject,
				students: state[teachers][id].students,
			});
			console.log(initialValues);
			setIsValid(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleSubmit(values) {
		console.log(values, "Edit Teacher");
		dispatch({type: "editTeacher", payload: {values, id}});

		notify();
		setTimeout(() => navigate("/users"), 5000);
	}
	return (
		<div className="container-fluid">
			<br />
			<div className="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
				<h1 className="h4 mb-0 text-gray-800">Edit Teacher: {+id + 1}</h1>
			</div>
			<br />
			{isValid ? (
				<Formik
					initialValues={initialValues}
					validationSchema={TeacherSchema}
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
								<label htmlFor="class">Class</label>
								<Field name="class" className="form-control" type="text" placeholder="class" />
								{errors.class && touched.class ? <div style={{color: "red"}}>{errors.class}</div> : null}
							</div>
							<div className="form-group">
								<label htmlFor="subject">Subject</label>
								<Field name="subject" className="form-control" type="text" />
								{errors.subject && touched.subject ? (
									<div style={{color: "red"}}>{errors.subject}</div>
								) : null}
							</div>

							<div className="form-group">
								<label htmlFor="students">Students</label>
								<Field
									component="select"
									id="students"
									name="students"
									className="form-control "
									multiple={true}
								>
									<option disabled>Select Students</option>

									{isValid &&
										state.students.map((student, i) => (
											<option key={i} value={student.name}>
												{student.name}
											</option>
										))}
								</Field>
								{errors.students && touched.students ? (
									<div style={{color: "red"}}>{errors.students}</div>
								) : null}
							</div>

							<br />
							<Button type="submit" variant="primary">
								Submit
							</Button>
						</Form>
					)}
				</Formik>
			) : (
				<p>Loading....</p>
			)}
			<ToastContainer />
		</div>
	);
}

export default EditTeacher;
