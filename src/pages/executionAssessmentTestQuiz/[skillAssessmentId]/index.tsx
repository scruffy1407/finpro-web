import QuizAssess from "@/components/assessmentTestExecuteComponents/QuizAssess";
import { AuthHandler } from "@/utils/auth.utils";

export default function QuizPage() {
	const authHandler = new AuthHandler();
	const pagePermission = "jobhunter";
	authHandler.authorizeUser(pagePermission);
	return <QuizAssess />;
}
