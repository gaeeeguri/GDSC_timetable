import React, { useState } from "react";

import axiosInstance from "@/lib/axiosSetting";
import { setCookie } from "@/lib/cookie";
import { AuthMachineContext } from "@/main";

import LoginModal from "./organisms/loginModal";

const LoginModalContainer = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [state, send] = AuthMachineContext.useActor();

  const onLogin = async () => {
    send({
      type: "LOGIN",
    });

    try {
      await axiosInstance
        .post("/login/admin", { memberId: id, password: password })
        .then(res => {
          setCookie("accessToken", res.data.accessToken);
          setCookie("refreshToken", res.data.refreshToken);

          send({
            type: "LOGIN_SUCCESS",
          });
        });
    } catch (e) {
      send({
        type: "LOGIN_ERROR",
      });
    }
  };
  const onIdChange = (e: React.FormEvent<HTMLInputElement>) =>
    setId(e.currentTarget.value);

  const onPasswordChange = (e: React.FormEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value);

  const onModalClose = () =>
    send({
      type: "CLOSE_MODAL",
    });

  const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      // console.log("enter");
      onLogin();
    }
  };

  return (
    <LoginModal
      opened={state.context.loginModal}
      errorMessage={state.context.errorMessage}
      onClose={onModalClose}
      onSubmit={onLogin}
      onIdChange={onIdChange}
      onIdKeyDown={onKeyPress}
      onPasswordChange={onPasswordChange}
      onPasswordKeyDown={onKeyPress}
      onClick={onLogin}
      onSubmitButtonKeyDown={onKeyPress}
    />
  );
};

export default LoginModalContainer;
