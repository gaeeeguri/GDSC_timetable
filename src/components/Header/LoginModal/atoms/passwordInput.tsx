import { PasswordInput } from "@mantine/core";
import React from "react";

export interface CustomPasswordInputProps {
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

// there is already name PasswordInput in Mantine
const CustomPasswordInput = ({
  onPasswordKeyDown,
  onPasswordChange,
}: CustomPasswordInputProps) => (
  <PasswordInput
    label="비밀번호"
    style={{ marginTop: 15 }}
    onChange={onPasswordChange}
    onKeyDown={onPasswordKeyDown}
  />
);

export default CustomPasswordInput;
