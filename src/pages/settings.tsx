import { NextPage } from "next";
import React from "react";
import Authenticated from "../components/Authenticated";
import Container from "../components/layout/Container";
import { useAuth } from "../context/AuthContext";

const Settings: NextPage = () => {
  const { user } = useAuth();

  return (
    <Authenticated redirectPath="/logIn">
      <Container sm>
        <h2>Settings for Razvan</h2>
        <div className="px-5 py-6 bg-white rounded-lg shadow-lg dark:bg-gray-700 h-fit"></div>
      </Container>
    </Authenticated>
  );
};

export default Settings;
