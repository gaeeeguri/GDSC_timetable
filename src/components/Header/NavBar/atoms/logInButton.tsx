import { Button } from "@mantine/core";
import React from "react";

export interface LoginButtonProps {
  onClickLogIn: () => void;
  isDesktop: boolean;
}

const LogInButton = ({ onClickLogIn, isDesktop }: LoginButtonProps) => (
  <Button
    color="red"
    variant="outline"
    size={isDesktop ? "md" : "sm"}
    style={{ marginLeft: "auto" }}
    onClick={onClickLogIn}
  >
    관리자 로그인
  </Button>
);

export default LogInButton;
