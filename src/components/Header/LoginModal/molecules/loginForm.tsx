import React from "react";

import ErrorMessage, {
  ErrorMessageProps,
} from "@/components/Header/LoginModal/atoms/errorMessage";
import IdInput, {
  IdInputProps,
} from "@/components/Header/LoginModal/atoms/idInput";
import CustomPasswordInput, {
  CustomPasswordInputProps,
} from "@/components/Header/LoginModal/atoms/passwordInput";

export interface LoginFormProps
  extends IdInputProps,
    CustomPasswordInputProps,
    ErrorMessageProps {}

const LogInForm = ({
  onIdChange,
  onIdKeyDown,
  onPasswordKeyDown,
  onPasswordChange,
  errorMessage,
}: LoginFormProps) => (
  <>
    <IdInput onIdChange={onIdChange} onIdKeyDown={onIdKeyDown} />
    <CustomPasswordInput
      onPasswordKeyDown={onPasswordKeyDown}
      onPasswordChange={onPasswordChange}
    />
    <ErrorMessage errorMessage={errorMessage} />
  </>
);

export default LogInForm;
