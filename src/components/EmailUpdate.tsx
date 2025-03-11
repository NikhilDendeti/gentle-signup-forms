
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
import Logo from "@/components/Logo";

import {
  emailUpdateSchema,
  type EmailUpdateValues,
} from "@/lib/formValidation";

interface EmailUpdateProps {
  currentEmail?: string;
}

const EmailUpdate = ({ currentEmail = "johndoe@company.com" }: EmailUpdateProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EmailUpdateValues>({
    resolver: zodResolver(emailUpdateSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = async (data: EmailUpdateValues) => {
    try {
      setIsSubmitting(true);
      console.log("Email update submitted:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Email updated successfully", {
        description: "Verification email sent to your new address",
      });
      
      // Redirect back to email verification page
      navigate("/verify-email");
    } catch (error) {
      console.error("Error updating email:", error);
      toast.error("Failed to update email", {
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/verify-email");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md md:max-w-lg mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6 md:p-8">
            <div className="flex justify-center mb-6">
              <Logo />
            </div>
            
            <div className="mb-6">
              <h1 className="text-xl md:text-2xl font-semibold text-slate-800 mb-2">
                Update your email address
              </h1>
              <p className="text-sm text-slate-600">
                Please enter your new email address below
              </p>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Current email</label>
              <div className="bg-slate-50 text-slate-700 border border-slate-200 rounded-md px-3 py-2.5 text-sm">
                {currentEmail}
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">New email address</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Enter your new email address" 
                          className="h-10"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </FormItem>
                  )}
                />

                <div className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700"
                    disabled={!form.formState.isValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Saving Changes...</span>
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full h-11 border-slate-200 text-slate-700 hover:bg-slate-50"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailUpdate;
