import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

interface AuthenticatedProps {
  redirectPath?: string;
  redirectQuery?: ParsedUrlQueryInput;
}

const Authenticated: React.FC<AuthenticatedProps> = ({
  children,
  redirectPath,
  redirectQuery,
}) => {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!user && redirectPath) {
      router.replace({ pathname: redirectPath, query: redirectQuery });
    }
  }, [user, redirectPath, router, redirectQuery]);

  // Show children if user is authenticated
  return user ? <>{children}</> : <></>;
};

export default Authenticated;
