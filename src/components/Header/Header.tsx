import {
  Button,
  createStyles,
  Modal,
  PasswordInput,
  Text,
} from "@mantine/core";
import React, { Dispatch, SetStateAction, useState } from "react";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    // maxWidth: 1190,
    width: "100vw",
    height: 60,
    zIndex: 6,
    position: "sticky",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    right: 0,
    marginLeft: 0,
    marginRight: 0,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[2]
    }`,
  },
  navWrapper: {
    maxWidth: 1130,
    width: "63vw",
    display: "flex",
  },
  title: {
    ref: getRef("child"),
    maxWidth: 1130,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontSize: theme.fontSizes.lg,
    display: "flex",
    alignItems: "center",
  },
  form: {},
}));

interface HeaderProps {
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ isAdmin, setIsAdmin }: HeaderProps) => {
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [validationFail, setValidationFail] = useState<boolean>(false);
  const { classes } = useStyles();

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.value);
    setPassword(e.currentTarget.value);
  };

  const onSuccess = () => {
    // console.log(isAdmin);
    setIsAdmin(data => !data);
    setLoginModal(false);
    setValidationFail(false);
  };

  const onFailure = () => {
    setValidationFail(true);
  };

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      console.log("enter");
      validate();
    }
  };

  const validate = () => {
    // console.log("validate");
    if (password === "1234") {
      onSuccess();
    } else {
      onFailure();
    }
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.navWrapper}>
        <div className={classes.title}>GDSC Calendar Project</div>
        {isAdmin ? (
          <Button
            color="red"
            style={{ marginLeft: "auto" }}
            onClick={onSuccess}
          >
            로그아웃
          </Button>
        ) : (
          <Button
            color="red"
            variant="outline"
            style={{ marginLeft: "auto" }}
            onClick={() => setLoginModal(true)}
          >
            관리자 로그인
          </Button>
        )}
      </div>
      <Modal
        centered
        opened={loginModal}
        withCloseButton={false}
        onClose={() => {
          setLoginModal(false);
          setValidationFail(false);
        }}
      >
        <div className={classes.form} onSubmit={validate}>
          <PasswordInput
            label="비밀번호"
            description="관리자 비밀번호를 입력하세요."
            onChange={onChange}
            onKeyDown={onKeyPress}
          />
          {validationFail ? (
            <Text color="red" size="xs" style={{ marginLeft: 12 }}>
              비밀번호가 틀렸습니다!
            </Text>
          ) : (
            <div style={{ height: 20 }}></div>
          )}
          <Button
            value={password}
            style={{ marginTop: 15, float: "right" }}
            onClick={validate}
            onKeyPress={onKeyPress}
          >
            로그인
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
