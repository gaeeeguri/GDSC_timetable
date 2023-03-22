import { Button } from "@mantine/core";
import React from "react";

export interface LogoutButtonProps {
  onClickLogOut: () => void;
  isDesktop: boolean;
}

const LogOutButton = ({ onClickLogOut, isDesktop }: LogoutButtonProps) => (
  <Button
    color="red"
    style={{ marginLeft: "auto" }}
    size={isDesktop ? "md" : "sm"}
    onClick={onClickLogOut}
  >
    로그아웃
  </Button>
);

export default LogOutButton;
