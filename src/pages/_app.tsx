import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import MainLayout from "../components/layout/MainLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
