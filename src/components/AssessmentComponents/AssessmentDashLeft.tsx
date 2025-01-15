import React from "react";
import { Button } from "@/components/ui/button";
import { useState} from "react";
import CreateAssessmentTestForm from "./AssessmentTestCreateForm";

function AssessmentDashLeft() {
	const [showForm, setShowForm] = useState(false);

	return (
		<div className="bg-white flex flex-col gap-6 w-full h-fit p-5 rounded-xl md:w-[250px] max-w-screen-xl">
			<div className={"flex flex-col gap-5 items-start"}>
				<div className={"flex flex-col gap-1"}>
					<h2 className="text-2xl font-bold">Dashboard</h2>
					<p className=" text-sm text-neutral-600 ">
						Manage all available Assessment here
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<Button variant="primary" onClick={() => setShowForm(true)}>
					Create Assessment
				</Button>

				<CreateAssessmentTestForm
					showForm={showForm}
					setShowForm={setShowForm}
				/>
			</div>

			<div className="flex flex-col gap-3">
				<div className="border-t-[1px] border-gray-200 w-full"></div>
			</div>

			<div className={"flex gap-3 items-start"}>
				<div className={"flex flex-col gap-3 w-full"}>
					<h2 className="text-xl font-bold">Assessment Test</h2>
				</div>
			</div>
		</div>
	);
}

export default AssessmentDashLeft;
