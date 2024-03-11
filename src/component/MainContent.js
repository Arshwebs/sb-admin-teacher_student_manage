import React from "react";

import Table from "react-bootstrap/Table";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";

import {useManagementProvider} from "./ContextComponent/TeacherStudentContext";

function MainContent() {
	let navigate = useNavigate();
	let context = useManagementProvider();

	function handleDelete(i, name) {
		let findData = context.state[name][i].name;

		console.log(findData);
		let deleteUsers = [...context.state[name]];
		deleteUsers.splice(i, 1);
		context.dispatch({
			type: name === "students" ? "deleteStudent" : "deleteTeacher",
			payload: {deleteUsers, deleteName: findData},
		});
	}

	return (
		<div id="content-wrapper" className="d-flex flex-column">
			{/* <!-- Main Content --> */}
			<div id="content">
				{/* <!-- Begin Page Content --> */}
				<div className="container-fluid">
					{/* <!-- Page Heading --> */}
					<br />
					<div className="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
					</div>

					<div className="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 className="h4 mb-0 text-gray-800">All Teachers:</h1>
					</div>

					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Subject</th>
								<th>Class</th>
								<th>students</th>
							</tr>
						</thead>
						<tbody>
							{context.state.teachers.map((e, i) => {
								return (
									<tr key={i}>
										<td>{i + 1}</td>
										<td>{e.name}</td>
										<td>{e.class}</td>
										<td>{e.subject}</td>
										<td>
											{e.students.map((student, i) => (
												<li key={i}>{student}</li>
											))}
										</td>

										<td>
											<Button variant="secondary" onClick={() => navigate(`/profile/${i}/teachers`)}>
												view
											</Button>
											&nbsp; &nbsp;
											<Button variant="primary" onClick={() => navigate(`/edit-teacher/${i}/teachers`)}>
												Edit
											</Button>
											&nbsp; &nbsp;
											<Button variant="warning" onClick={() => handleDelete(i, "teachers")}>
												Delete
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>

					<div className="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 className="h4 mb-0 text-gray-800">All Students:</h1>
					</div>

					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Class</th>
								<th>Teacher</th>
							</tr>
						</thead>
						<tbody>
							{context.state.students.map((e, i) => {
								return (
									<tr key={i}>
										<td>{i + 1}</td>
										<td>{e.name}</td>
										<td>{e.class}</td>
										<td>{e.teacher}</td>

										<td>
											<Button variant="secondary" onClick={() => navigate(`/profile/${i}/students`)}>
												view
											</Button>
											&nbsp; &nbsp;
											<Button variant="primary" onClick={() => navigate(`/edit-student/${i}/students`)}>
												Edit
											</Button>
											&nbsp; &nbsp;
											<Button variant="warning" onClick={() => handleDelete(i, "students")}>
												Delete
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
				{/* <!-- /.container-fluid --> */}
			</div>
			{/* <!-- End of Main Content --> */}
		</div>
	);
}

export default MainContent;
