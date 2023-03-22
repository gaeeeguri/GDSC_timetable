import { Modal } from "@mantine/core";
import React from "react";

import SubmitButton, {
  SubmitButtonProps,
} from "@/components/Header/LoginModal/atoms/submitButton";
import LogInForm, {
  LoginFormProps,
} from "@/components/Header/LoginModal/molecules/loginForm";

export interface LoginModalProps extends LoginFormProps, SubmitButtonProps {
  onClose: () => void;
  opened: boolean;
  onSubmit: () => void;
}

const LoginModal = ({
  opened,
  onClose,
  onSubmit,
  onPasswordChange,
  onIdChange,
  onPasswordKeyDown,
  onIdKeyDown,
  onSubmitButtonKeyDown,
  errorMessage,
  onClick,
}: LoginModalProps) => (
  <Modal
    centered
    opened={opened}
    withCloseButton={false}
    title="관리자 로그인"
    onClose={onClose}
  >
    <div onSubmit={onSubmit}>
      <LogInForm
        errorMessage={errorMessage}
        onIdChange={onIdChange}
        onIdKeyDown={onIdKeyDown}
        onPasswordChange={onPasswordChange}
        onPasswordKeyDown={onPasswordKeyDown}
      />
      <SubmitButton
        onClick={onClick}
        onSubmitButtonKeyDown={onSubmitButtonKeyDown}
      />
    </div>
  </Modal>
);

export default LoginModal;
