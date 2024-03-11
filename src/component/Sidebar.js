import React from "react";
import {Link} from "react-router-dom";

function Sidebar() {
	return (
		<>
			<ul
				className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
				id="accordionSidebar"
			>
				{/* <!-- Sidebar - Brand --> */}
				<Link to={"/users"}>
					<div className="sidebar-brand d-flex align-items-center justify-content-center">
						<div className="sidebar-brand-icon rotate-n-15">
							<i className="fas fa-laugh-wink"></i>
						</div>
						<div className="sidebar-brand-text mx-3">Teacher and Student Management</div>
					</div>
				</Link>

				{/* <!-- Divider --> */}
				<hr className="sidebar-divider my-0"></hr>

				{/* <!-- Nav Item - Dashboard --> */}
				<Link to="/users">
					<li className="nav-item active">
						<div className="nav-link">
							<i className="fas fa-fw fa-tachometer-alt"></i>
							<span>Dashboard</span>
						</div>
					</li>
				</Link>

				{/* <!-- Divider --> */}
				<hr className="sidebar-divider"></hr>

				{/* <!-- Heading --> */}
				<div className="sidebar-heading">Interface</div>

				{/* <!-- Nav Item - Pages Collapse Menu --> */}
				<Link to="/create-student">
					<li className="nav-item">
						<div
							className="nav-link collapsed"
							href="javascript(void)"
							data-toggle="collapse"
							data-target="#collapseTwo"
							aria-expanded="true"
							aria-controls="collapseTwo"
						>
							<i className="fas fa-fw fa-cog"></i>
							<span>Add Student</span>
						</div>
					</li>
				</Link>
				<Link to="/create-teacher">
					<li className="nav-item">
						<div
							className="nav-link collapsed"
							href="javascript(void)"
							data-toggle="collapse"
							data-target="#collapseTwo"
							aria-expanded="true"
							aria-controls="collapseTwo"
						>
							<i className="fas fa-fw fa-cog"></i>
							<span>Add Teacher</span>
						</div>
					</li>
				</Link>

				{/* <!-- Divider --> */}
				<hr className="sidebar-divider d-none d-md-block"></hr>
			</ul>
		</>
	);
}

export default Sidebar;
