import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export interface AssessmentCardProps {
	assessmentName: string;
	badge: string;
	passingGrade: number;
	duration: number;
	skillAssessmentId: string;
	takeTest?: () => void;
}

// skill_assessment_name String
// skill_badge           String
// passing_grade         Int      @default(75)
// duration              Int      @default(30)
function Asessmentcard({
	assessmentName,
	passingGrade,
	duration,
	badge,
	skillAssessmentId,
	takeTest,
}: AssessmentCardProps) {
	const router = useRouter();

	const handleNavigate = () => {
		console.log("Navigating to:", skillAssessmentId); // Check the value here
		if (skillAssessmentId) {
			router.push(`/executionAssessmentTest/${skillAssessmentId}`);
		} else {
			console.error("Skill Assessment ID is undefined");
		}
	};

	return (
		<div
			className={
				"p-4 flex flex-col justify-between gap-4 items-center bg-white rounded-2xl sm:flex-row w-full"
			}
		>
			<div className={"flex gap-4 items-center"}>
				<Image
					src={badge}
					alt={`assessmentName-badge`}
					width={200}
					height={200}
					className={"w-20 rounded-xl"}
				/>
				<div className={"flex flex-col gap-2"}>
					<h3 className={"text-lg font-bold text-neutral-950"}>
						{assessmentName}
					</h3>
					<div className={"flex flex-col gap-2"}>
						<p className={"text-xs text-neutral-600"}>
							Duration Assessment: {duration} Minutes
						</p>
						<p className={"text-xs text-neutral-600"}>
							Passing Grade: {passingGrade}
						</p>
					</div>
				</div>
			</div>

			<Button
				onClick={handleNavigate} // Handle navigation here
				className={"w-full sm:w-fit"}
				variant={"outline"}
				size={"sm"}
			>
				Take Test
			</Button>
		</div>
	);
}

export default Asessmentcard;
