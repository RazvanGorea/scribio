import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import MainLayout from "../components/layout/MainLayout";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MainLayout>
          <Toaster />
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
