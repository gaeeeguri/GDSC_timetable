import { Button } from "@mantine/core";
import React from "react";

export interface LogoutButtonProps {
  onClickLogOut: () => void;
}

const LogOutButton = ({ onClickLogOut }: LogoutButtonProps) => (
  <Button color="red" style={{ marginLeft: "auto" }} onClick={onClickLogOut}>
    로그아웃
  </Button>
);

export default LogOutButton;
