export interface Question {
	id: string; // or 'number' if IDs are numbers
	question: string;
	answer_1: string;
	answer_2: string;
	answer_3: string;
	answer_4: string;
}

export interface QuizState {
	currentQuestionIndex: number;
	answers: Record<number, string>;
	score: number;
	testId: number;
	jobHunterId: number;
	applicationId: number;
}

export interface QuizSubmission {
	testId: number;
	jobHunterId: number;
	applicationId: number;
	answers: {
		question_id: number;
		chosen_answer: string;
	}[];
}

export interface TestConfig {
	test_id: number;
	test_name: string;
	image: string;
	passing_grade: number;
	duration: number;
	deleted: boolean;
	created_at: string;
	updated_at: string;
}
