import { Text } from "@mantine/core";
import React from "react";

export interface ErrorMessageProps {
  errorMessage: string | null;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) =>
  errorMessage ? (
    <Text color="red" size="xs" style={{ marginLeft: 12 }}>
      {errorMessage}
    </Text>
  ) : (
    <div style={{ height: 20 }}></div>
  );

export default ErrorMessage;
