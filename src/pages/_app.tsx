import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import MainLayout from "../components/layout/MainLayout";
import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SkeletonTheme baseColor="#c6c6c6" highlightColor="#e8e8e8">
      <AuthProvider>
        <ThemeProvider>
          <MainLayout>
            <Toaster />
            <Component {...pageProps} />
          </MainLayout>
        </ThemeProvider>
      </AuthProvider>
    </SkeletonTheme>
  );
}

export default MyApp;
