import { actions, createMachine } from "xstate";

export const authMachine = createMachine(
  {
    id: "authentication",
    initial: "unauthorized",
    context: {
      newLink: null as string | null,
      errorMessage: null as string | null,
      loginModal: false as boolean,
    },
    states: {
      unauthorized: {
        on: {
          OPEN_LOGIN_MODAL: {
            target: "loginModal",
            actions: ["openModal"],
          },
        },
      },
      loginModal: {
        on: {
          LOGIN: "loading",
        },
      },
      loading: {
        on: {
          LOGIN_SUCCESS: {
            target: "authorized",
            actions: ["onSuccess", "closeModal"],
          },
          LOGIN_ERROR: {
            target: "loginModal",
            actions: ["onError"],
          },
        },
      },
      authorized: {
        on: {
          LOGOUT: "unauthorized",
        },
      },
    },
  },
  {
    actions: {
      onSuccess: (context, event) => {
        if (event.reverse) {
          context.newLink = "/";
        } else {
          context.newLink = null;
        }
        context.errorMessage = null;
      },
      onError: (context, event) => {
        if (event.reverse) {
          context.newLink = null;
        } else {
          context.newLink = "/login";
        }
        context.errorMessage = event.errorMessage;
      },
      openModal: (context, event) => {
        context.loginModal = true;
      },
      closeModal: (context, event) => {
        context.loginModal = false;
      },
    },
  }
);
