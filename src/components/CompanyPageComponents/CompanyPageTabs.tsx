import React from "react";
import ButtonComponent from "../ButtonComponent";

function CompanyPageTabs() {
	return (
		<div className="mt-8 ml-4 flex gap-4 bg-white p-2 rounded-xl ">
			<div className="">
				<ButtonComponent type="ButtonBorder" container="Company Information" />
			</div>
			<div>
				<ButtonComponent type="ButtonBorder" container="Jobs Open" />
			</div>
			<div>
				<ButtonComponent type="ButtonBorder" container="Review" />
			</div>
		</div>
	);
}

export default CompanyPageTabs;
