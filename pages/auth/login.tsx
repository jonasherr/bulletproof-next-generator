import { Layout } from '@/features/auth/components/Layout';
import { LoginForm } from '@/features/auth/components/LoginForm';
import {useRouter} from "next/router";

const Login = () => {
  const router = useRouter()

  return (
    <Layout title="Log in to your account">
      <LoginForm onSuccess={() => router.push('/app')} />
    </Layout>
  );
};

export default Login
