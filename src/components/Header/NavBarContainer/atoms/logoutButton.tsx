import { Button } from "@mantine/core";
import React from "react";

export interface LogoutButtonProps {
  logOut: () => void;
}

const LogoutButton = ({ logOut }: LogoutButtonProps) => (
  <Button color="red" style={{ marginLeft: "auto" }} onClick={logOut}>
    로그아웃
  </Button>
);

export default LogoutButton;
