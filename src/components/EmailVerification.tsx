
import { useState } from "react";
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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md md:max-w-lg mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6 md:p-8">
            <div className="flex justify-center mb-6">
              <Logo />
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-xl md:text-2xl font-semibold text-slate-800 mb-2">
                Verify your email to continue
              </h1>
              <p className="text-sm text-slate-600">
                We sent a verification link to <span className="font-medium">{email}</span>.
                <br />Check your inbox.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={handleResendEmail}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700"
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
              
              <div className="text-center">
                <Link
                  to="/update-email"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  Edit Email Address
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
