import Quiz from "@/components/PreSelectionTestExecuteComponents/Quiz";
import { AuthHandler } from "@/utils/auth.utils";

export default function QuizPage() {
	const authHandler = new AuthHandler();
	const pagePermission = "jobhunter";
	authHandler.authorizeUser(pagePermission);
	return <Quiz />;
}
