import { Button } from "@mantine/core";
import React from "react";

export interface LoginButtonProps {
  logIn: () => void;
}

const LoginButton = ({ logIn }: LoginButtonProps) => (
  <Button
    color="red"
    variant="outline"
    style={{ marginLeft: "auto" }}
    onClick={logIn}
  >
    관리자 로그인
  </Button>
);

export default LoginButton;
