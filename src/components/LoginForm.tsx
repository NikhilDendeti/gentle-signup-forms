import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

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
import { Checkbox } from "@/components/ui/checkbox";

import {
  loginFormSchema,
  type LoginFormValues,
} from "@/lib/formValidation";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
  });

  const handleSubmit = async (data: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Login form submitted:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Login successful", {
        description: "Redirecting to dashboard",
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed", {
        description: "Invalid email or password",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const goToVerification = () => {
    const email = form.getValues().email;
    if (email && form.getFieldState("email").invalid === false) {
      navigate(`/verify-email?email=${encodeURIComponent(email)}`);
    } else {
      form.setError("email", { 
        type: "manual", 
        message: "Please enter a valid email first" 
      });
    }
  };

  return (
    <div className="form-card">
      <h2 className="text-2xl font-medium text-slate-800 mb-1">Login</h2>
      <p className="text-slate-500 text-sm mb-6">
        Access your HRMS administrator account
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="input-label">Email</FormLabel>
                <div className="relative">
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        {...field} 
                        placeholder="your.name@company.com" 
                        className="pl-10 h-10"
                      />
                    </div>
                  </FormControl>
                </div>
                <FormMessage className="input-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="input-label">Password</FormLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <FormControl>
                    <Input 
                      {...field} 
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password" 
                      className="pl-10 pr-10 h-10"
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
                <FormMessage className="input-error" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm text-slate-600 font-normal cursor-pointer">
                    Remember me
                  </FormLabel>
                </FormItem>
              )}
            />
            <Link
              to="/forgot-password"
              className="text-sm text-hrms-primary hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button 
            type="submit" 
            className="primary-button h-11 w-full"
            disabled={!form.formState.isValid || isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Logging in...</span>
              </div>
            ) : (
              "Log In"
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-6 space-y-4">
        <Button
          type="button"
          variant="link"
          className="text-hrms-primary font-medium p-0 h-auto"
          onClick={goToVerification}
        >
          Need to verify your email?
        </Button>
        
        <p className="text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/"
            className="text-hrms-primary hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
