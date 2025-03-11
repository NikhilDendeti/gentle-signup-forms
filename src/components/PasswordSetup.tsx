
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Check } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Logo from "@/components/Logo";

import {
  passwordSetupSchema,
  type PasswordSetupValues,
} from "@/lib/formValidation";

const PasswordSetup = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const form = useForm<PasswordSetupValues>({
    resolver: zodResolver(passwordSetupSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const password = form.watch("password");

  // Calculate password strength
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 25;
    
    setPasswordStrength(strength);
  };

  // Update password strength when password changes
  useState(() => {
    if (password) {
      calculatePasswordStrength(password);
    } else {
      setPasswordStrength(0);
    }
  });

  const getStrengthLabel = () => {
    if (passwordStrength <= 25) return "Weak password";
    if (passwordStrength <= 50) return "Fair password";
    if (passwordStrength <= 75) return "Good password";
    return "Strong password";
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-yellow-500";
    if (passwordStrength <= 75) return "bg-blue-500";
    return "bg-green-500";
  };

  const handleSubmit = async (data: PasswordSetupValues) => {
    try {
      setIsSubmitting(true);
      console.log("Password setup submitted:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Password created successfully", {
        description: "You can now log in to your account",
      });
      
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Error setting up password:", error);
      toast.error("Failed to create password", {
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col py-10 px-4 sm:px-6 md:py-16">
      <header className="max-w-md mx-auto w-full mb-6">
        <Logo />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="bg-white rounded-xl border border-slate-100 shadow-soft p-8 max-w-md w-full mx-auto animate-fade-in-up">
          <h2 className="text-2xl font-medium text-slate-800 mb-1">Secure Your Account</h2>
          <p className="text-slate-500 text-sm mb-6">
            Set up your password
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="input-label">Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          {...field} 
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password" 
                          className="pr-10 h-10"
                          onChange={(e) => {
                            field.onChange(e);
                            calculatePasswordStrength(e.target.value);
                          }}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-slate-400 hover:text-slate-600"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    
                    {password && (
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">{getStrengthLabel()}</span>
                          <span className="text-slate-500">{passwordStrength}%</span>
                        </div>
                        <Progress value={passwordStrength} className={getStrengthColor()} />
                      </div>
                    )}
                    
                    <FormMessage className="input-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="input-label">Confirm Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          {...field} 
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm your password" 
                          className="pr-10 h-10"
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="input-error" />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Check className={`w-4 h-4 mt-0.5 ${/^.{8,}$/.test(password) ? 'text-green-500' : 'text-slate-300'}`} />
                  <span className="text-sm text-slate-600">At least 8 characters</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className={`w-4 h-4 mt-0.5 ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-slate-300'}`} />
                  <span className="text-sm text-slate-600">One uppercase letter</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className={`w-4 h-4 mt-0.5 ${/[0-9]/.test(password) ? 'text-green-500' : 'text-slate-300'}`} />
                  <span className="text-sm text-slate-600">One number</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className={`w-4 h-4 mt-0.5 ${/[^a-zA-Z0-9]/.test(password) ? 'text-green-500' : 'text-slate-300'}`} />
                  <span className="text-sm text-slate-600">One special character</span>
                </div>
              </div>

              <Button 
                type="submit" 
                className="primary-button h-11 w-full"
                disabled={!form.formState.isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Password...</span>
                  </div>
                ) : (
                  "Create Password"
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center mt-6">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-hrms-primary hover:underline font-medium"
              >
                Log In
              </Link>
            </p>
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

export default PasswordSetup;
