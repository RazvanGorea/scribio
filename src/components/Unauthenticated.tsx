import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

interface UnauthenticatedProps {
  redirectPath?: string;
  redirectQuery?: ParsedUrlQueryInput;
}

const Unauthenticated: React.FC<UnauthenticatedProps> = ({
  children,
  redirectPath,
  redirectQuery,
}) => {
  const { isUserInitialized, user } = useAuth();
  const router = useRouter();

  // Redirect if user is authenticated
  useEffect(() => {
    if (isUserInitialized && redirectPath) {
      router.replace({ pathname: redirectPath, query: redirectQuery });
    }
  }, [isUserInitialized, redirectPath, router, redirectQuery]);

  // Show children if user is not authenticated
  return !user ? <>{children}</> : <></>;
};

export default Unauthenticated;
