import { Layout } from '@/features/auth/components/Layout';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import {useRouter} from "next/router";

const Register = () => {
  const router = useRouter()

  return (
    <Layout title="Register your account">
      <RegisterForm onSuccess={() => router.push('/app')} />
    </Layout>
  );
};

export default Register
