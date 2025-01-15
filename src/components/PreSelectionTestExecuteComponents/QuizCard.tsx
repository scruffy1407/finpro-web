import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface Question {
	question_id: string; // Or 'number' if IDs are numbers
	question: string;
	answer_1: string;
	answer_2: string;
	answer_3: string;
	answer_4: string;
}

interface QuizCardProps {
	question: Question;
	selectedAnswer?: string;
	onAnswerSelect: (answer: string) => void;
}

export function QuizCard({
	question,
	selectedAnswer,
	onAnswerSelect,
}: QuizCardProps) {
	const answers = [
		{ value: question.answer_1, label: question.answer_1 },
		{ value: question.answer_2, label: question.answer_2 },
		{ value: question.answer_3, label: question.answer_3 },
		{ value: question.answer_4, label: question.answer_4 },
	];

	return (
		<Card className="w-full max-w-2xl p-6 animate-in fade-in slide-in-from-bottom-4">
			<h2 className="text-2xl font-bold mb-6">{question.question}</h2>
			<RadioGroup
				value={selectedAnswer}
				onValueChange={onAnswerSelect}
				className="space-y-4"
			>
				{answers.map((answer, index) => (
					<div
						key={index}
						className={cn(
							"flex items-center space-x-3 rounded-lg border p-4 transition-colors",
							selectedAnswer === answer.value
								? "border-primary bg-primary/5"
								: "hover:bg-muted/50"
						)}
					>
						<RadioGroupItem value={answer.value} id={`answer-${index}`} />
						<Label
							htmlFor={`answer-${index}`}
							className="flex-grow cursor-pointer text-lg"
						>
							{answer.label}
						</Label>
					</div>
				))}
			</RadioGroup>
		</Card>
	);
}
