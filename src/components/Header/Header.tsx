import {
  Button,
  createStyles,
  Input,
  Modal,
  PasswordInput,
  Text,
} from "@mantine/core";
import React, { useState } from "react";

import { AuthMachineContext } from "@/App";
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

const Header = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { classes } = useStyles();

  const [state, send] = AuthMachineContext.useActor();

  const callLoginApi = async () => {
    send({
      type: "LOGIN",
    });

    try {
      await axiosInstance
        .post("/login/admin", { memberId: id, password: password })
        .then(res => {
          setCookie("accessToken", res.data.accessToken);
          setCookie("refreshToken", res.data.refreshToken);

          send({
            type: "LOGIN_SUCCESS",
          });
        });
    } catch (e) {
      send({
        type: "LOGIN_ERROR",
      });
    }
  };

  const logOut = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");

    send({
      type: "LOGOUT",
    });
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
      callLoginApi();
    }
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.navWrapper}>
        <div className={classes.title}>GDSC Calendar Project</div>
        {state.matches("authorized") ? (
          <Button color="red" style={{ marginLeft: "auto" }} onClick={logOut}>
            로그아웃
          </Button>
        ) : (
          <Button
            color="red"
            variant="outline"
            style={{ marginLeft: "auto" }}
            onClick={() => send({ type: "OPEN_LOGIN_MODAL" })}
          >
            관리자 로그인
          </Button>
        )}
      </div>
      <Modal
        centered
        opened={state.context.loginModal}
        withCloseButton={false}
        title="관리자 로그인"
        onClose={() => {
          send({
            type: "CLOSE_MODAL",
          });
        }}
      >
        <div className={classes.form} onSubmit={callLoginApi}>
          <Input.Wrapper label="아이디">
            <Input onChange={onChangeId} onKeyDown={onKeyPress} />
          </Input.Wrapper>
          <PasswordInput
            label="비밀번호"
            style={{ marginTop: 15 }}
            onChange={onChangePassword}
            onKeyDown={onKeyPress}
          />
          {state.context.errorMessage ? (
            <Text color="red" size="xs" style={{ marginLeft: 12 }}>
              {state.context.errorMessage}
            </Text>
          ) : (
            <div style={{ height: 20 }}></div>
          )}
          <Button
            value={password}
            style={{ marginTop: 15, float: "right" }}
            onClick={callLoginApi}
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
