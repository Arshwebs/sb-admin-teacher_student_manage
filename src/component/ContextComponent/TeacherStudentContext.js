import React, {createContext, useContext, useReducer} from "react";

const ManagementContext = createContext();

const initialData = {
	teachers: [{name: "Guru", subject: "Maths", class: "a", students: ["Abi", "Raja"]}],
	students: [
		{name: "Abi", class: "a", teacher: "Guru"},
		{name: "Raja", class: "a", teacher: "Guru"},
	],
};

const editFunc = (state, action) => {
	state.students.splice(action.payload.id, 1, action.payload.values);
	return state;
};

const editFuncTeacher = (state, action) => {
	state.teachers.splice(action.payload.id, 1, action.payload.values);
	let students = [...state.students].map(e => {
		console.log(action.payload.values.students, e.name);
		if (!action.payload.values.students.includes(e.name)) {
			e.teacher = "Not Assigned";
			return e;
		} else {
			return e;
		}
	});
	return {
		teachers: [...state.teachers],
		students: [...students],
	};
};

const reducer = function (state, action) {
	switch (action.type) {
		case "allStudents":
			return state.students;

		case "allTeachers":
			return state.teachers;

		case "addTeacher":
			let studentsOfTecher = [...state.students];
			studentsOfTecher.map(e => {
				if (action.payload.students.includes(e.name)) {
					e.teacher = action.payload.name;
					return e;
				}
				return e;
			});

			return {
				teachers: [...state.teachers, action.payload],
				students: [...studentsOfTecher],
			};

		case "addStudent":
			let addteacherTostudent = [...state.teachers].map(e => {
				if (e.name === action.payload.teacher[0]) {
					let studentList = [...e.students];
					studentList.push(action.payload.name);
					let u = {...e, students: studentList};
					console.log(u);
					return u;
				}
				return e;
			});

			return {
				teachers: [...addteacherTostudent],
				students: [...state.students, action.payload],
			};

		case "editStudent":
			return editFunc(state, action);

		case "editTeacher":
			return editFuncTeacher(state, action);

		case "deleteStudent":
			let teacher = [...state.teachers].map(e => {
				let t = [...e.students];
				let h = t.indexOf(action.payload.deleteName);
				console.log(h, action.payload.deleteName);
				if (h !== -1) t.splice(h, 1);
				return {...e, students: [...t]};
			});
			console.log(teacher);
			return {
				teachers: [...teacher],
				students: [...action.payload.deleteUsers],
			};
		case "deleteTeacher":
			let students = [...state.students].map(e => {
				if (e.teacher === action.payload.deleteName) {
					e.teacher = "Not Assigned";
					return e;
				} else {
					return e;
				}
			});
			console.log(students);
			return {
				teachers: [...action.payload.deleteUsers],
				students: [...students],
			};

		case "reset":
			return initialData;

		default:
			break;
	}
};

function TeacherStudentContext({children}) {
	const [state, dispatch] = useReducer(reducer, initialData);

	return (
		<ManagementContext.Provider value={{state, dispatch}}>{children}</ManagementContext.Provider>
	);
}

function useManagementProvider() {
	const context = useContext(ManagementContext);

	if (!context) throw new Error("ManagementContext is not accessible");

	return context;
}

export {TeacherStudentContext, useManagementProvider};
