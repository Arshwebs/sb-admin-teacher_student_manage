import React, {useEffect} from "react";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {Formik, Field, Form} from "formik";
import * as yup from "yup";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useManagementProvider} from "./ContextComponent/TeacherStudentContext";

function AddStudents() {
	let context = useManagementProvider();

	let navigate = useNavigate();

	const notify = () => toast("Student added successfully!");

	let intialValues = {
		name: "",
		class: "",
		teacher: [],
	};

	const StudentSchema = yup.object().shape({
		name: yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
		class: yup.string().required("Required"),
		teacher: yup.array().min(1, "Please select one teacher"),
	});

	function handleSubmit(values) {
		console.log(values);
		context.dispatch({type: "addStudent", payload: values});

		notify();

		setTimeout(() => navigate("/dashboard"), 5000);
	}

	useEffect(() => {
		console.log(context);
		// context.dispatch({type: "reset"});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="container-fluid">
			<br />
			<div className="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
				<h1 className="h4 mb-0 text-gray-800">Add Student:</h1>
			</div>
			<br />
			<Formik
				initialValues={intialValues}
				validationSchema={StudentSchema}
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
							<label htmlFor="teacher">Teachers</label>
							<Field
								component="select"
								id="teacher"
								name="teacher"
								className="form-control "
								multiple={true}
							>
								<option disabled>Select teachers</option>
								<option value={"Not Assigned"}>Not Assigned</option>
								{context.state.teachers.map((teacher, i) => (
									<option key={i} value={teacher.name}>
										{teacher.name}
									</option>
								))}
							</Field>
							{errors.teacher && touched.teacher ? (
								<div style={{color: "red"}}>{errors.teacher}</div>
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

export default AddStudents;
