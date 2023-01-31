import { Button, Dialog, Group, NativeSelect, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import React, { useState } from "react";

import { dayForm, endForm, startForm } from "@/Const/form";
import axiosInstance from "@/lib/axiosSetting";

interface AddDialogProps {
  opened: boolean;
  onClose: () => void;
  type: string;
}

const AddDialog = ({ opened, onClose, type }: AddDialogProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onStartChange = (e: any) => {
    addForm.setFieldValue("start", e.currentTarget.value);

    if (Number(addForm.values.end) <= Number(e.currentTarget.value)) {
      addForm.setFieldValue(
        "end",
        (Number(e.currentTarget.value) + 1).toString()
      );
    }
  };

  const onEndChange = (e: any) => {
    addForm.setFieldValue("end", e.currentTarget.value);

    if (Number(e.currentTarget.value) <= Number(addForm.values.start)) {
      addForm.setFieldValue(
        "start",
        (Number(e.currentTarget.value) - 1).toString()
      );
    }
  };

  const onClickSubmit = async (values: { [key: string]: string | number }) => {
    await addTime(values);
    await onClose();
  };
  async function addTime(values: { [key: string | number]: string | number }) {
    try {
      await axiosInstance.post(`/${type}/admin`, {
        day: values.day,
        start: Number(values.start),
        end: Number(values.end),
        user: values.user,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred.";
      }
    }
  }

  const addForm = useForm({
    initialValues: {
      user: "도쭈",
      day: "mon",
      start: "12",
      end: "13",
    },

    validate: {
      end: (
        value: string,
        values: { [key: string | number]: string | number }
      ) =>
        Number(values.start) < Number(value)
          ? null
          : "종료 시간은 시작 시간보다 늦어야 합니다!",
    },
  });

  return (
    <Dialog
      withCloseButton
      opened={opened}
      size="lg"
      radius="md"
      onClose={onClose}
    >
      <Text size="lg" style={{ marginBottom: 10 }} weight={500}>
        연습 시간 추가
      </Text>
      <form onSubmit={addForm.onSubmit(values => onClickSubmit(values))}>
        <NativeSelect
          // defaultValue={"도쭈"}
          data={[
            "도쭈",
            "휴익",
            "이그니션",
            "싱송",
            "지스리",
            "악동",
            "지대로",
          ]}
          label="동아리"
          style={{ width: "100%" }}
          {...addForm.getInputProps("user")}
        />
        <NativeSelect
          // defaultValue={"월"}
          data={dayForm}
          label="요일"
          style={{ width: "100%", marginTop: 15 }}
          {...addForm.getInputProps("day")}
        />
        <div
          style={{
            marginTop: 15,
            height: 100,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <NativeSelect
            // defaultValue={12}
            data={startForm}
            label="시작 시간"
            style={{ width: "45%" }}
            {...addForm.getInputProps("start")}
            onChange={onStartChange}
          />
          <NativeSelect
            // defaultValue={13}
            label="종료 시간"
            data={endForm}
            style={{ width: "45%" }}
            {...addForm.getInputProps("end")}
            onChange={onEndChange}
          />
        </div>
        <Group position="right" style={{ width: "100%", marginTop: 30 }}>
          {loading ? (
            <Button loading variant="light">
              추가
            </Button>
          ) : (
            <Button variant="light" type="submit">
              추가
            </Button>
          )}
        </Group>
      </form>
    </Dialog>
  );
};

export default AddDialog;
