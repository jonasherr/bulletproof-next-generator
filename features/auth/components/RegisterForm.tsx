import * as React from "react";
import Link from "next/link";
import * as z from "zod";

import { Button } from "@/components/Elements";
import { Form, InputField } from "@/components/Form";
import { useAuth } from "@/lib/auth";

const schema = z.object({
  email: z.string().min(1, "Required"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register, isRegistering } = useAuth();

  return (
    <div>
      <Form<RegisterValues, typeof schema>
        onSubmit={async (values) => {
          await register(values);
          onSuccess();
        }}
        schema={schema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label="First Name"
              error={formState.errors["firstName"]}
              registration={register("firstName")}
            />
            <InputField
              type="text"
              label="Last Name"
              error={formState.errors["lastName"]}
              registration={register("lastName")}
            />
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
              <Button
                isLoading={isRegistering}
                type="submit"
                className="w-full"
              >
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <div className="font-medium text-blue-600 hover:text-blue-500">
            <Link href="/auth/login">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
