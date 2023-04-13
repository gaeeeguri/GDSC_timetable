import { Button, Dialog, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import React, { useState } from "react";

import DaySelector from "@/components/TimeTable/TimeCell/EditDialog/atoms/daySelector";
import EditDialogTitle from "@/components/TimeTable/TimeCell/EditDialog/atoms/editDialogTitle";
import TimeSelector from "@/components/TimeTable/TimeCell/EditDialog/atoms/timeSelector";
import { timeBlock } from "@/components/Types/type";
import axiosInstance from "@/lib/axiosSetting";

interface EditDialogProps {
  opened: boolean;
  onClose: () => void;
  timeData: timeBlock;
  type: string;
  isDesktop: boolean;
}

const EditDialog = ({
  opened,
  onClose,
  timeData,
  type,
  isDesktop,
}: EditDialogProps) => {
  const [deleteTry, setDeleteTry] = useState<boolean>(false);

  const onStartChange = (e: any) => {
    editForm.setFieldValue("start", e.currentTarget.value);

    if (Number(editForm.values.end) <= Number(e.currentTarget.value)) {
      editForm.setFieldValue(
        "end",
        (Number(e.currentTarget.value) + 1).toString()
      );
    }
  };

  const onEndChange = (e: any) => {
    editForm.setFieldValue("end", e.currentTarget.value);

    if (Number(e.currentTarget.value) <= Number(editForm.values.start)) {
      editForm.setFieldValue(
        "start",
        (Number(e.currentTarget.value) - 1).toString()
      );
    }
  };

  async function modifyTime(values: {
    [key: string | number]: string | number;
  }) {
    try {
      await axiosInstance
        .patch(`/${type}/admin/${values.id}`, {
          id: values.id,
          day: values.day,
          start: Number(values.start),
          end: Number(values.end),
        })
        .then(function (response) {
          // console.log(response);
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

  async function deleteTime() {
    try {
      await axiosInstance
        .delete(`/${type}/admin/${timeData.id}`)
        .then(function (response) {
          // console.log(response);
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

  const editForm = useForm({
    initialValues: {
      id: timeData.id,
      day: timeData.day,
      start: timeData.start.toString(),
      end: timeData.end.toString(),
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

  const onClickDelete = async () => {
    if (deleteTry) {
      await deleteTime();
      await onClose();
    } else {
      setDeleteTry(true);
    }
  };

  const onClickModify = async (values: { [key: string]: string | number }) => {
    await modifyTime(values);
    await onClose();
  };

  return (
    <Dialog
      withCloseButton
      opened={opened}
      size={isDesktop ? "lg" : "md"}
      position={
        isDesktop ? { right: 20, bottom: 20 } : { right: 10, bottom: 10 }
      }
      radius="md"
      onClose={() => {
        onClose();
        setDeleteTry(false);
      }}
    >
      <EditDialogTitle
        user={timeData.user}
        day={timeData.day}
        start={timeData.start}
        end={timeData.end}
      />
      <form onSubmit={editForm.onSubmit(values => onClickModify(values))}>
        <DaySelector form={editForm} />

        <div
          style={{
            marginTop: 15,
            height: 100,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TimeSelector
            form={editForm}
            onStartChange={onStartChange}
            onEndChange={onEndChange}
          />
        </div>
        <Group position="apart" style={{ width: "100%", marginTop: 30 }}>
          <Group position="left" spacing={5}>
            <Button
              variant={deleteTry ? "filled" : "light"}
              color="red"
              onClick={onClickDelete}
            >
              삭제
            </Button>
            {deleteTry ? (
              <Text size="xs" color="red">
                한번 더 눌러 삭제하기
              </Text>
            ) : null}
          </Group>
          <Button variant="light" type="submit">
            수정
          </Button>
        </Group>
      </form>
    </Dialog>
  );
};

export default EditDialog;
