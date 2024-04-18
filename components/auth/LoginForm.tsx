// "use client";

// import { AuthMessage } from "@/components/auth/AuthMessage";
// import { useLogin } from "../hooks";
// import { loginFormSchema } from "../services/schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Eye, EyeOff } from "lucide-react";
// import Link from "next/link";
// import React from "react";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import Text from "../Text";

// import { Button } from "../ui/button";
// import { Checkbox } from "../ui/checkbox";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import { Input } from "../ui/input";

// interface LoginFormProps {
//   selectedCriteria: string[];
// }

// export const LoginForm: React.FC<LoginFormProps> = ({ selectedCriteria }) => {
//   const form = useForm({
//     resolver: zodResolver(loginFormSchema),
//   });

//   const [showPassword, setShowPassword] = React.useState(false);

//   const { handleLogin, isLoading: loading, error: formError } = useLogin();

//   const handleSubmit: SubmitHandler<FieldValues> = (data) => {
//     handleLogin(data);
//   };

//   return (
//     <Form {...form}>
//       {formError && <AuthMessage type={"error"} message={formError} />}
//       <form className="grid gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email Address</FormLabel>
//               <Input
//                 autoFocus
//                 placeholder="Input your registered email"
//                 {...field}
//               />

//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <Input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Input your password"
//                 // from here
//                 className={`mt-4 p-2 border rounded ${
//                   isPasswordValid(selectedCriteria)
//                     ? "border-green-500"
//                     : "border-red-500"
//                 }`}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-4 p-2 border rounded"
//                 style={{ borderColor: isPasswordValid() ? "green" : "red" }}
//                 // ends here

//                 endContent={
//                   <Button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     variant="ghost"
//                     size="sm"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-4 h-4 text-body" />
//                     ) : (
//                       <Eye className="w-4 h-4 text-body" />
//                     )}
//                   </Button>
//                 }
//                 {...field}
//               />
//               {!isPasswordValid() && (
//                 <span className="text-red-500">
//                   Password does not meet criteria
//                 </span>
//               )}
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="flex justify-between">
//           <FormField
//             control={form.control}
//             name="rememberMe"
//             render={({ field }) => (
//               <FormItem>
//                 <div className="flex  items-center gap-2">
//                   <FormControl>
//                     <Checkbox
//                       className="border-grayscale-400"
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormLabel className="text-grayscale-600">
//                     Remember me
//                   </FormLabel>
//                 </div>
//               </FormItem>
//             )}
//           />
//         </div>

//         <Button
//           disabled={!form.formState.isDirty}
//           type="submit"
//           isLoading={loading}
//           size="lg"
//           className="w-full"
//         >
//           Login
//         </Button>
//       </form>
//     </Form>
//   );
// };



import { AuthMessage } from "@/components/auth/AuthMessage";
import { useLogin } from "../hooks";
import { loginFormSchema } from "../services/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface LoginFormProps {
  selectedCriteria: string[];
}

export const LoginForm: React.FC<LoginFormProps> = ({ selectedCriteria }) => {
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const { handleLogin, isLoading: loading, error: formError } = useLogin();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLogin(data);
  };

  // Function to validate password based on selected criteria
  const isPasswordValid = (password: string): boolean => {
    // Your password validation logic here based on selectedCriteria
    // For example, check if the password contains required characters
    return selectedCriteria.every((criteria) => {
      // Implement your specific criteria checks here
      switch (criteria) {
        case "uppercase":
          return /[A-Z]/.test(password);
        case "lowercase":
          return /[a-z]/.test(password);
        case "figure":
          return /[0-9]/.test(password);
        case "character":
          return /[!@#$%^&*()]/.test(password);
        default:
          return true; // Default to true if no specific criteria matched
      }
    });
  };

  return (
    <Form {...form}>
      {formError && <AuthMessage type={"error"} message={formError} />}
      <form className="grid gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <Input
                autoFocus
                placeholder="Input your registered email"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Input your password"
                // Use selectedCriteria for password validation
                className={`mt-4 p-2 border rounded ${
                  isPasswordValid(field.value)
                    ? "border-green-500"
                    : "border-red-500"
                }`}
                // Ends update
                endContent={
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    size="sm"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-body" />
                    ) : (
                      <Eye className="w-4 h-4 text-body" />
                    )}
                  </Button>
                }
                {...field}
              />
              {!isPasswordValid(field.value) && (
                <span className="text-red-500">
                  Password does not meet criteria
                </span>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="border-grayscale-400"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      {...field}
                    />
                  </FormControl>
                  <FormLabel className="text-grayscale-600">
                    Remember me
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button
          disabled={!form.formState.isDirty}
          type="submit"
          isLoading={loading}
          size="lg"
          className="w-full"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};
