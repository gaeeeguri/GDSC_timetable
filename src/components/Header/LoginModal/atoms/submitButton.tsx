import { Button } from "@mantine/core";
import React from "react";

export interface SubmitButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onSubmitButtonKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
}

const SubmitButton = ({
  onSubmitButtonKeyDown,
  onClick,
}: SubmitButtonProps) => (
  <Button
    style={{ marginTop: 15, float: "right" }}
    onClick={onClick}
    onKeyDown={onSubmitButtonKeyDown}
  >
    로그인
  </Button>
);

export default SubmitButton;
