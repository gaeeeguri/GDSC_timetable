import {
  Button,
  createStyles,
  Input,
  Modal,
  PasswordInput,
  Text,
} from "@mantine/core";
import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";

import axiosInstance from "@/lib/axiosSetting";
import { removeCookie, setCookie } from "@/lib/cookie";

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
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validationFail, setValidationFail] = useState<boolean>(false);
  const { classes } = useStyles();

  const login = () => {
    try {
      axiosInstance
        .post("/login/admin", { memberId: id, password: password })
        .then(res => {
          setCookie("accessToken", res.data.accessToken);
          setCookie("refreshToken", res.data.refreshToken);
          setIsAdmin(true);
          setLoginModal(false);
          setValidationFail(false);
        });
    } catch (e) {
      setValidationFail(true);
    }
  };

  const logOut = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    setIsAdmin(false);
  };

  const onChangeId = (e: React.FormEvent<HTMLInputElement>) => {
    setId(e.currentTarget.value);
  };

  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.value);
    setPassword(e.currentTarget.value);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      // console.log("enter");
      login();
    }
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.navWrapper}>
        <div className={classes.title}>GDSC Calendar Project</div>
        {isAdmin ? (
          <Button color="red" style={{ marginLeft: "auto" }} onClick={logOut}>
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
        title="관리자 로그인"
        onClose={() => {
          setLoginModal(false);
          setValidationFail(false);
        }}
      >
        <div className={classes.form} onSubmit={login}>
          <Input.Wrapper label="아이디">
            <Input onChange={onChangeId} onKeyDown={onKeyPress} />
          </Input.Wrapper>
          <PasswordInput
            label="비밀번호"
            style={{ marginTop: 15 }}
            onChange={onChangePassword}
            onKeyDown={onKeyPress}
          />
          {validationFail ? (
            <Text color="red" size="xs" style={{ marginLeft: 12 }}>
              아이디 또는 비밀번호가 틀렸습니다!
            </Text>
          ) : (
            <div style={{ height: 20 }}></div>
          )}
          <Button
            value={password}
            style={{ marginTop: 15, float: "right" }}
            onClick={login}
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
