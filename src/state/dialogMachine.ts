import { createMachine } from "xstate";

export const dialogMachine = createMachine(
  {
    id: "dialog",
    initial: "closed",
    context: {
      errorMessage: null as string | null,
    },
    states: {
      closed: {
        on: {
          OPEN_MODAL: {
            target: "openModal",
            actions: ["openModal"],
          },
        },
      },
      openModal: {
        on: {
          SUBMIT: {
            target: "loading",
          },
          CLOSE_MODAL: {
            target: "closed",
            actions: ["closeModal"],
          },
        },
      },
      loading: {
        on: {
          SUCCESS: {
            target: "closed",
            actions: ["onSuccess", "closeModal"],
          },
          FAIL: {
            target: "openModal",
            actions: ["onFailure"],
          },
        },
      },
    },
  },
  {
    actions: {},
  }
);
