
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EmailVerification from "@/components/EmailVerification";

const VerifyEmail = () => {
  const [email, setEmail] = useState<string>("");
  const location = useLocation();
  
  useEffect(() => {
    // Get email from URL parameter
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    
    if (emailParam) {
      setEmail(emailParam);
    } else {
      // Default email if none provided
      setEmail("user@email.com");
    }
  }, [location]);

  return <EmailVerification email={email} />;
};

export default VerifyEmail;
