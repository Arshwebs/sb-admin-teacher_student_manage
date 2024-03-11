import React, {useEffect} from "react";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {Formik, Field, Form} from "formik";
import * as yup from "yup";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useManagementProvider} from "./ContextComponent/TeacherStudentContext";

function AddTeacher() {
	let {state, dispatch} = useManagementProvider();
	let allStudents = state.teachers.map((e, i) => {
		return e.students;
	});
	console.log(allStudents);
	let navigate = useNavigate();

	const notify = () => toast("Student added successfully!");

	let intialValues = {
		name: "",
		subject: "",
		class: "",
		students: [],
	};

	const TeacherSchema = yup.object().shape({
		name: yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
		class: yup.string().required("Required"),
		students: yup.array().min(2, "Please use 'ctrl key' to select at least two students"),
		subject: yup.string().required("Required"),
	});

	function handleSubmit(values) {
		console.log(values);
		dispatch({type: "addTeacher", payload: values});
		notify();
		setTimeout(() => navigate("/dashboard"), 5000);
	}

	useEffect(() => {
		// console.log(context);
		// context.dispatch({type: "reset"});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="container-fluid">
			<br />
			<div className="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
				<h1 className="h4 mb-0 text-gray-800">Add Teacher:</h1>
			</div>
			<br />
			<Formik
				initialValues={intialValues}
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
								{state.students.map((student, i) => (
									<>
										{allStudents[0].includes(student.name) ? (
											<option key={i} value={student.name} disabled>
												{student.name}
											</option>
										) : (
											<option key={i} value={student.name}>
												{student.name}
											</option>
										)}
									</>
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
			<ToastContainer />
		</div>
	);
}

export default AddTeacher;
