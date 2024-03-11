import "./App.css";
import MainContent from "./component/MainContent";
import Sidebar from "./component/Sidebar";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Profile from "./component/Profile";

import {TeacherStudentContext} from "./component/ContextComponent/TeacherStudentContext";
import EditStudent from "./component/EditStudent";
import AddStudents from "./component/AddStudents";
import AddTeacher from "./component/AddTeacher";
import EditTeacher from "./component/EditTeacher";

function App() {
	return (
		<div id="wrapper">
			<BrowserRouter>
				<Sidebar />

				<TeacherStudentContext>
					<Routes>
						<Route path="/users" element={<MainContent />} />

						<Route path="/create-student" element={<AddStudents />} />
						<Route path="/create-teacher" element={<AddTeacher />} />

						<Route path="/edit-student/:id/:students" element={<EditStudent />} />
						<Route path="/edit-teacher/:id/:teachers" element={<EditTeacher />} />
						<Route path="/profile/:id/:dataName" element={<Profile />} />

						<Route path="*" element={<Navigate to={"/users"} />} />
					</Routes>
				</TeacherStudentContext>
			</BrowserRouter>
		</div>
	);
}

export default App;
