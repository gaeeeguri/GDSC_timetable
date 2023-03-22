import { Input } from "@mantine/core";
import React from "react";

export interface IdInputProps {
  onIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIdKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const IdInput = ({ onIdKeyDown, onIdChange }: IdInputProps) => (
  <Input.Wrapper label="아이디">
    <Input onChange={onIdChange} onKeyDown={onIdKeyDown} />
  </Input.Wrapper>
);

export default IdInput;
