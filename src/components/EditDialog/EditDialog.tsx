import { Button, Dialog, Group, NativeSelect, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useState } from "react";

import { timeBlock } from "@/components/Types/type";
import days from "@/Const/days";
import { dayForm, endForm, startForm } from "@/Const/form";

interface EditDialogProps {
  opened: boolean;
  onClose: () => void;
  timeData: timeBlock;
  type: string;
}

const EditDialog = ({ opened, onClose, timeData, type }: EditDialogProps) => {
  const [deleteTry, setDeleteTry] = useState<boolean>(false);
  async function modifyTime(values: {
    [key: string | number]: string | number;
  }) {
    try {
      await axios
        .patch(`http://35.247.70.187:8080/${type}/${values.id}`, values, {})
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
      await axios
        .delete(`http://35.247.70.187:8080/${type}/${timeData.id}`, {
          headers: {
            // "Content-Type": "application/json",
            // "Accept": "application/json",
            // 'Access-Control-Allow-Origin': "*",
          },
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

  const editForm = useForm({
    initialValues: {
      id: timeData.id,
      day: timeData.day,
      start: timeData.start,
      end: timeData.end,
    },

    validate: {
      end: (
        value: number,
        values: { [key: string | number]: string | number }
      ) =>
        values.start < value
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
      size="lg"
      radius="md"
      onClose={() => {
        onClose();
        setDeleteTry(false);
      }}
    >
      <Text size="lg" style={{ marginBottom: 10 }} weight={500}>
        {timeData.user}, {days[timeData.day]}요일 오후{" "}
        {timeData.start === 12 ? 12 : timeData.start - 12}시 ~{" "}
        {timeData.end - 12}시
      </Text>
      <form onSubmit={editForm.onSubmit(values => onClickModify(values))}>
        <NativeSelect
          // defaultValue={days[timeData.day]}
          data={dayForm}
          label="요일"
          style={{ width: "100%", marginTop: 15 }}
          {...editForm.getInputProps("day")}
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
            // defaultValue={times[timeData.start]}
            data={startForm}
            label="시작 시간"
            style={{ width: "45%" }}
            {...editForm.getInputProps("start")}
          />
          <NativeSelect
            // defaultValue={times[timeData.end]}
            label="종료 시간"
            data={endForm}
            style={{ width: "45%" }}
            {...editForm.getInputProps("end")}
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
