import {useParams} from "react-router-dom";
import React, {useEffect, useContext, useState} from "react";
import Button from "react-bootstrap/Button";
import {Formik, Field, Form} from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useManagementProvider} from "./ContextComponent/TeacherStudentContext";

function EditStudent() {
	const [isValid, setIsValid] = useState(false);

	let navigate = useNavigate();
	let {id, students} = useParams();
	let {state, dispatch} = useManagementProvider();
	const notify = () => toast("User edited successfully!");

	const [initialValues, setIinitialValues] = useState({
		name: "",
		class: "",
		teacher: "",
	});
	const StudentSchema = yup.object().shape({
		name: yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
		class: yup.string().required("Required"),
		teacher: yup.string().required("Required"),
	});

	useEffect(() => {
		if (id) {
			setIinitialValues({
				name: state[students][id].name,
				class: state[students][id].class,
				teacher: state[students][id].teacher,
			});

			setIsValid(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleSubmit(values) {
		console.log(values, "Edit Student");
		dispatch({type: "editStudent", payload: {values, id}});

		notify();
		setTimeout(() => navigate("/users"), 5000);
	}
	return (
		<div className="container-fluid">
			<br />
			<div className="d-sm-flex align-items-center justify-content-between mb-2 mt-2">
				<h1 className="h4 mb-0 text-gray-800">Edit Student: {+id + 1}</h1>
			</div>
			<br />
			{isValid ? (
				<Formik
					initialValues={initialValues}
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
								<label htmlFor="teacher">Teacher</label>
								<Field component="select" id="teacher" name="teacher" className="form-control ">
									<option disabled>Select Teacher</option>

									{state.teachers.map((teacher, i) => {
										if (teacher.name === initialValues.teacher) {
											return (
												<option key={i} value={teacher.name} selected>
													{teacher.name}
												</option>
											);
										} else {
											return (
												<option key={i} value={teacher.name}>
													{teacher.name}
												</option>
											);
										}
									})}
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
			) : (
				<p>Loading....</p>
			)}
			<ToastContainer />
		</div>
	);
}

export default EditStudent;
