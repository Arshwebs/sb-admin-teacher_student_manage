import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import {useNavigate, useParams} from "react-router-dom";

import {Button} from "react-bootstrap";
import {useManagementProvider} from "./ContextComponent/TeacherStudentContext";

function Profile() {
	const {state} = useManagementProvider();
	const navigate = useNavigate();
	const {id, dataName} = useParams();
	console.log(state, dataName);
	return (
		<div className="container-fluid mt-3">
			{dataName === "students" ? (
				<Card style={{width: "20rem"}}>
					<Card.Img variant="top" src="https://placehold.co/400" />
					<Card.Body>
						<Card.Title>{state[dataName][id].name}</Card.Title>
					</Card.Body>
					<ListGroup className="list-group-flush">
						<ListGroup.Item>Class: {state[dataName][id].class}</ListGroup.Item>

						<ListGroup.Item>Teacher: {state[dataName][id].teacher}</ListGroup.Item>
					</ListGroup>
					<Card.Body>
						<Button variant="primary" onClick={() => navigate(`/edit-student/${id}/students`)}>
							Edit
						</Button>
					</Card.Body>
				</Card>
			) : (
				<Card style={{width: "20rem"}}>
					<Card.Img variant="top" src="https://placehold.co/400" />
					<Card.Body>
						<Card.Title>{state[dataName][id].name}</Card.Title>
					</Card.Body>
					<ListGroup className="list-group-flush">
						<ListGroup.Item>Class: {state[dataName][id].class}</ListGroup.Item>

						<ListGroup.Item>Subject: {state[dataName][id].subject}</ListGroup.Item>
					</ListGroup>
					<ListGroup className="list-group-flush">
						<ListGroup.Item>Students:</ListGroup.Item>
						<ul>
							{state[dataName][id].students.map((student, i) => (
								<li key={i}>{student}</li>
							))}
						</ul>
					</ListGroup>
					<Card.Body>
						<Button variant="primary" onClick={() => navigate(`/edit-teacher/${id}/teachers`)}>
							Edit
						</Button>
					</Card.Body>
				</Card>
			)}
		</div>
	);
}

export default Profile;
