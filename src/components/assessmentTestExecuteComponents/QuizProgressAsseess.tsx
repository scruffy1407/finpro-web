import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
	current: number;
	total: number;
}

export function QuizProgresAssess({ current, total }: QuizProgressProps) {
	const progress = (current / total) * 100;

	return (
		<div className="w-full max-w-2xl mb-8">
			<div className="flex justify-between mb-2 text-sm text-muted-foreground">
				<span>
					Question {current + 1} of {total}
				</span>
				<span>{Math.round(progress)}% Complete</span>
			</div>
			<Progress value={progress} className="h-2" />
		</div>
	);
}