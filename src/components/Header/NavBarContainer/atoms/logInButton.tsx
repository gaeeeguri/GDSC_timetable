import { Button } from "@mantine/core";
import React from "react";

export interface LoginButtonProps {
  onClickLogIn: () => void;
}

const LogInButton = ({ onClickLogIn }: LoginButtonProps) => (
  <Button
    color="red"
    variant="outline"
    style={{ marginLeft: "auto" }}
    onClick={onClickLogIn}
  >
    관리자 로그인
  </Button>
);

export default LogInButton;
