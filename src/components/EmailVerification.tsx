
import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

interface EmailVerificationProps {
  email?: string;
}

const EmailVerification = ({ email = "user@email.com" }: EmailVerificationProps) => {
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    try {
      setIsResending(true);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Verification email sent", {
        description: `Check your inbox at ${email}`,
      });
    } catch (error) {
      console.error("Error resending email:", error);
      toast.error("Failed to resend email", {
        description: "Please try again later",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col py-10 px-4 sm:px-6 md:py-16">
      <header className="max-w-md mx-auto w-full mb-6">
        <Logo />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="bg-white rounded-xl border border-slate-100 shadow-soft p-8 max-w-md w-full mx-auto animate-fade-in-up">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-hrms-primary" />
            </div>
            <h2 className="text-2xl font-medium text-slate-800 mb-1">Verify your email to continue</h2>
            <p className="text-slate-500 text-sm text-center">
              We sent a verification link to <span className="font-medium">{email}</span>.<br />
              Check your inbox.
            </p>
          </div>

          <Button 
            onClick={handleResendEmail} 
            className="primary-button h-11 w-full"
            disabled={isResending}
          >
            {isResending ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Resending Email...</span>
              </div>
            ) : (
              "Resend Email"
            )}
          </Button>

          <div className="mt-4 text-center">
            <Link 
              to="/update-email" 
              className="text-sm text-hrms-primary hover:underline font-medium"
            >
              Edit Email Address
            </Link>
          </div>
        </div>
      </main>
      <footer className="mt-10 text-center">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} EasyHR. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default EmailVerification;
