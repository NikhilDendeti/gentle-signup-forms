import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye, EyeOff, Info } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import CountryCodeSelector from "./CountryCodeSelector";
import {
  signUpFormSchema,
  type SignUpFormValues,
  employeeCountOptions,
} from "@/lib/formValidation";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: "",
      jobTitle: "",
      companyName: "",
      workEmail: "",
      phone: {
        countryCode: "+1",
        number: "",
      },
      registrationNumber: "",
      companyAddress: "",
      employeeCount: "",
      termsAgreed: false,
    },
    mode: "onBlur",
  });

  const handleSubmit = async (data: SignUpFormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Form submitted successfully:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Account created successfully", {
        description: "You can now log in to your account",
      });
      
      // Reset form
      form.reset();
      
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create account", {
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      <h2 className="text-2xl font-medium text-slate-800 mb-1">Get Started</h2>
      <p className="text-slate-500 text-sm mb-6">
        Set up your HRMS administrator account
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Personal Information Section */}
          <div className="form-section">
            <h3 className="form-section-title">Your Information</h3>

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="input-label">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter your full name" 
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage className="input-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="input-label">Your Job Title</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter your job title" 
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage className="input-error" />
                </FormItem>
              )}
            />
          </div>

          {/* Company Information Section */}
          <div className="form-section">
            <h3 className="form-section-title">Company Information</h3>

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="input-label">Company Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter your company name" 
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage className="input-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="input-label">Work Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="email"
                      placeholder="your.name@company.com" 
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage className="input-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone.number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="input-label">Phone Number</FormLabel>
                  <div className="flex">
                    <CountryCodeSelector
                      value={form.watch("phone.countryCode")}
                      onChange={(value) => form.setValue("phone.countryCode", value)}
                      error={!!form.formState.errors.phone?.number}
                    />
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter phone number"
                        className="h-10 w-full rounded-l-none"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="input-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-1">
                    <FormLabel className="input-label">Company Registration Number</FormLabel>
                    <TooltipProvider>
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">
                            Your company's legal registration or tax ID number
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter company registration number" 
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage className="input-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="input-label">Company Address</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter company address" 
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage className="input-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employeeCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="input-label">Number of Employees</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employeeCountOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="input-error" />
                </FormItem>
              )}
            />
          </div>

          {/* Terms and Submit */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="termsAgreed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-slate-600 font-normal">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-hrms-primary hover:underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-hrms-primary hover:underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        Privacy Policy
                      </a>
                    </FormLabel>
                    <FormMessage className="input-error" />
                  </div>
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="primary-button h-11"
              disabled={!form.formState.isValid || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
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
  );
};

export default SignUpForm;
