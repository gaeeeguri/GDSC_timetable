import { Button } from "@mantine/core";
import React from "react";

export interface LogoutButtonProps {
  logOut: () => void;
}

const LogOutButton = ({ logOut }: LogoutButtonProps) => (
  <Button color="red" style={{ marginLeft: "auto" }} onClick={logOut}>
    로그아웃
  </Button>
);

export default LogOutButton;
