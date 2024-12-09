import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleResendVerification = async () => {
    if (!userEmail) return;

    setIsResending(true);
    setResendStatus(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/resend-verification",
        { email: userEmail }
      );

      if (response.status === 200) {
        setResendStatus("Verification email has been resent successfully!");
      } else {
        setResendStatus("Failed to resend verification email. Please try again later.");
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      setResendStatus("Failed to resend verification email. Please try again later.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Please Verify Your Email</h2>
        <p className="text-gray-600 mb-4">
          We have sent a verification email to your inbox. Please click on the link in the email to verify your account.
        </p>
        <p>
          If you don&apos;t see the email, check your spam folder or click below to resend the email.
        </p>
        {resendStatus && (
          <p className={`mt-4 text-sm ${resendStatus.includes("successfully") ? 'text-green-500' : 'text-red-500'}`}>
            {resendStatus}
          </p>
        )}
        <button
          onClick={handleResendVerification}
          disabled={isResending}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isResending ? "Resending..." : "Resend Verification Email"}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
