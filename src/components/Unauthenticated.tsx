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
  const { user } = useAuth();
  const router = useRouter();

  // Redirect if user is authenticated
  useEffect(() => {
    if (user && redirectPath) {
      router.replace({ pathname: redirectPath, query: redirectQuery });
    }
  }, [user, redirectPath, router, redirectQuery]);

  // Show children if user is not authenticated
  return !user ? <>{children}</> : <></>;
};

export default Unauthenticated;
