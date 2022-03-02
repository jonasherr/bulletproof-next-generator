import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/lib/auth";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV !== "test" && <ReactQueryDevtools />}
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
