import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/lib/auth";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Notifications } from "@/components/Notifications";
import { supabase } from "@/lib/initSupabase";
import { Auth } from "@supabase/ui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV !== "test" && <ReactQueryDevtools />}
      <Notifications />
      <Auth.UserContextProvider supabaseClient={supabase}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Auth.UserContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
