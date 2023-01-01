import { Button, Dialog, Group, NativeSelect, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useState } from "react";

import { timeBlock } from "@/components/Types/type";
import days from "@/Const/days";

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
          data={[
            { value: "mon", label: "월요일" },
            { value: "tue", label: "화요일" },
            { value: "wed", label: "수요일" },
            { value: "thu", label: "목요일" },
            { value: "fri", label: "금요일" },
            { value: "sat", label: "토요일" },
            { value: "sun", label: "일요일" },
          ]}
          label="요일"
          style={{ width: "100%", marginTop: 15 }}
          {...editForm.getInputProps("day")}
        />
        <Group style={{ marginTop: 15 }} position="apart">
          <NativeSelect
            // defaultValue={times[timeData.start]}
            data={[
              { value: 12, label: "낮 12시" },
              { value: 13, label: "오후 1시" },
              { value: 14, label: "오후 2시" },
              { value: 15, label: "오후 3시" },
              { value: 16, label: "오후 4시" },
              { value: 17, label: "오후 5시" },
              { value: 18, label: "오후 6시" },
              { value: 19, label: "오후 7시" },
              { value: 20, label: "오후 8시" },
              { value: 21, label: "오후 9시" },
              { value: 22, label: "오후 10시" },
              { value: 23, label: "오후 11시" },
            ]}
            label="시작 시간"
            style={{ width: "45%" }}
            {...editForm.getInputProps("start")}
          />
          <NativeSelect
            // defaultValue={times[timeData.end]}
            label="종료 시간"
            data={[
              { value: 13, label: "오후 1시" },
              { value: 14, label: "오후 2시" },
              { value: 15, label: "오후 3시" },
              { value: 16, label: "오후 4시" },
              { value: 17, label: "오후 5시" },
              { value: 18, label: "오후 6시" },
              { value: 19, label: "오후 7시" },
              { value: 20, label: "오후 8시" },
              { value: 21, label: "오후 9시" },
              { value: 22, label: "오후 10시" },
              { value: 23, label: "오후 11시" },
              { value: 24, label: "밤 12시" },
            ]}
            style={{ width: "45%" }}
            {...editForm.getInputProps("end")}
          />
        </Group>
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
