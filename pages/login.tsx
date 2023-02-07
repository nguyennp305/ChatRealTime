import Button from "@mui/material/Button";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import WhatsAppLogo from ".././assets/whatsapplogo.png";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

const StyledContainer = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: whitesmoke;
`;

const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  background-color: white;
  bordere-radius: 5px;
  box-shadow: 0px 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0/ 0.1);
`;

const StyledImageWrapper = styled.div`
  margin-bottom: 50px;
`;
const Login = () => {
  //auth lấy từ auth trong file config
  const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);
  const signIn = () => {
    signInWithGoogle();
  };

  return (
    <StyledContainer>
      <Head>
        <title>Login</title>
      </Head>

      <StyledLoginContainer>
        <StyledImageWrapper>
          <Image
            src={WhatsAppLogo}
            width="200"
            height="200"
            alt="WhatsApp Logo"
          />
        </StyledImageWrapper>
        <Button variant="outlined" onClick={signIn}>
          Sign in With google
        </Button>
      </StyledLoginContainer>
    </StyledContainer>
  );
};

export default Login;
