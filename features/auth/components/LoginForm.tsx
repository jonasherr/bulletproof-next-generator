import Link from "next/link";
import * as z from "zod";

import { Button } from "@/components/Elements";
import { InputField } from "@/components/Form";
import { useAuth } from "@/lib/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().min(1, "E-Mail is required."),
  password: z.string().min(6, "Password has at least 6 characters."),
});

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoggingIn } = useAuth();

  const { setError, formState, getValues, handleSubmit, register } =
    useForm<LoginValues>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    try {
      await login(getValues());
      onSuccess();
    } catch {
      setError("email", {
        type: "server",
        message: "Invalid credentials",
      });
      setError("password", {
        type: "server",
        message: "Invalid credentials",
      });
    }
  };

  return (
    <div>
      <form className={"space-y-6"} onSubmit={handleSubmit(onSubmit)}>
        <>
          <InputField
            type="email"
            label="Email Address"
            error={formState.errors["email"]}
            registration={register("email")}
          />
          <InputField
            type="password"
            label="Password"
            error={formState.errors["password"]}
            registration={register("password")}
          />
          <div>
            <Button isLoading={isLoggingIn} type="submit" className="w-full">
              Log in
            </Button>
          </div>
        </>
      </form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <div className="font-medium text-blue-600 hover:text-blue-500">
            <Link href={"/auth/register"}>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
