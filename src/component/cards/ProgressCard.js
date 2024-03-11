import React from "react";

function ProgressCard({label, percentage, border, icon}) {
	return (
		<div className="col-xl-3 col-md-6 mb-4">
			<div className={`card ${border} shadow h-100 py-2`}>
				<div className="card-body">
					<div className="row no-gutters align-items-center">
						<div className="col mr-2">
							<div className="text-xs font-weight-bold text-info text-uppercase mb-1">{label}</div>
							<div className="row no-gutters align-items-center">
								<div className="col-auto">
									<div className="h5 mb-0 mr-3 ml-3 font-weight-bold text-gray-800">{percentage}%</div>
								</div>
								<div className="col">
									<div className="progress progress-sm mr-2">
										<div
											className="progress-bar bg-info"
											role="progressbar"
											style={{
												width: `${percentage}%`,
												ariaValuenow: `${percentage}`,
												ariaValuemin: "0",
												ariaValuemax: "100",
											}}
										></div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-auto">
							<i className={`fas ${icon} fa-2x text-gray-300`}></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProgressCard;
