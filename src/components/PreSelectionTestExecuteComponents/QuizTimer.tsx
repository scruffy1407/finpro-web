import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface QuizTimerProps {
	applicationId: number;
	onTimeUp: () => void;
	onTimerReady: (ready: boolean) => void; // Callback for timer readiness
}

export function QuizTimer({
	applicationId,
	onTimeUp,
	onTimerReady,
}: QuizTimerProps) {
	const [timeLeft, setTimeLeft] = useState<number | null>(null);

	useEffect(() => {
		const fetchTestTime = async () => {
			const token = Cookies.get("accessToken");

			try {
				const response = await axios.get(
					`http://localhost:8000/api/jobhunter/gettesttime/${applicationId}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				if (response.data.startDate && response.data.endDate) {
					const now = Math.floor(Date.now() / 1000); // Current time in seconds
					const endTime = Math.floor(
						new Date(response.data.endDate).getTime() / 1000
					); // End time in seconds
					const remaining = endTime - now;

					if (remaining > 0) {
						setTimeLeft(remaining);
						localStorage.setItem("quizEndTime", endTime.toString());
					} else {
						setTimeLeft(0);
						onTimeUp();
					}
					onTimerReady(true);
				} else {
					console.error("Invalid API response:", response.data);
					onTimerReady(false);
				}
			} catch (error) {
				console.error("Error fetching test time:", error);
				onTimerReady(false);
			}
		};

		fetchTestTime();
	}, [applicationId, onTimeUp, onTimerReady]);

	useEffect(() => {
		if (timeLeft === null) return;

		if (timeLeft <= 0) {
			onTimeUp();
			return;
		}

		const timer = setInterval(() => {
			setTimeLeft((prev) => (prev !== null ? prev - 1 : prev));
		}, 1000);

		return () => clearInterval(timer);
	}, [timeLeft, onTimeUp]);

	if (timeLeft === null) {
		return <div>Loading timer...</div>;
	}

	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;

	return (
		<Card className="p-4 flex items-center gap-2 bg-primary text-primary-foreground">
			<Clock className="h-5 w-5" />
			<span className="font-mono text-lg">
				{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
			</span>
		</Card>
	);
}
