import { Button, Dialog, Group, NativeSelect, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

import { timeBlock } from "@/components/Types/type";
import days from "@/Const/days";
import times from "@/Const/times";

interface EditDialogProps {
  opened: boolean;
  onClose: () => void;
  timeData: timeBlock;
  deleteTry?: boolean;
  onDelete?: () => void;
}

const EditDialog = ({
  opened,
  onClose,
  timeData,
  deleteTry,
  onDelete,
}: EditDialogProps) => {
  const onSubmit = (values: { [key: string | number]: string | number }) => {
    console.log(values);
  };

  const editForm = useForm({
    initialValues: {
      id: timeData.id,
      user: timeData.user,
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

  return (
    <Dialog
      withCloseButton
      opened={opened}
      size="lg"
      radius="md"
      onClose={onClose}
    >
      <Text size="lg" style={{ marginBottom: 10 }} weight={500}>
        {days[timeData.day]}요일, {timeData.user} {timeData.start}:00 -{" "}
        {timeData.end}:00
      </Text>
      <form onSubmit={editForm.onSubmit(values => onSubmit(values))}>
        <NativeSelect
          defaultValue={timeData.user}
          data={["도쭈", "휴익", "이그니션", "싱송", "지스리"]}
          label="동아리"
          style={{ width: "100%" }}
          {...editForm.getInputProps("user")}
        />
        <NativeSelect
          defaultValue={days[timeData.day]}
          data={[
            { value: "mon", label: "월" },
            { value: "tue", label: "화" },
            { value: "wed", label: "수" },
            { value: "thu", label: "목" },
            { value: "fri", label: "금" },
            { value: "sat", label: "토" },
            { value: "sun", label: "일" },
          ]}
          label="요일"
          style={{ width: "100%", marginTop: 15 }}
          {...editForm.getInputProps("day")}
        />
        <Group style={{ marginTop: 15 }} position="apart">
          <NativeSelect
            defaultValue={times[timeData.start]}
            data={[
              { value: 12, label: "정오" },
              { value: 13, label: "1시" },
              { value: 14, label: "2시" },
              { value: 15, label: "3시" },
              { value: 16, label: "4시" },
              { value: 17, label: "5시" },
              { value: 18, label: "6시" },
              { value: 19, label: "7시" },
              { value: 20, label: "8시" },
              { value: 21, label: "9시" },
              { value: 22, label: "10시" },
              { value: 23, label: "11시" },
            ]}
            label="시작 시간"
            style={{ width: "45%" }}
            {...editForm.getInputProps("start")}
          />
          <NativeSelect
            defaultValue={times[timeData.end]}
            label="종료 시간"
            data={[
              { value: 13, label: "1시" },
              { value: 14, label: "2시" },
              { value: 15, label: "3시" },
              { value: 16, label: "4시" },
              { value: 17, label: "5시" },
              { value: 18, label: "6시" },
              { value: 19, label: "7시" },
              { value: 20, label: "8시" },
              { value: 21, label: "9시" },
              { value: 22, label: "10시" },
              { value: 23, label: "11시" },
              { value: 24, label: "자정" },
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
              onClick={onDelete}
            >
              삭제
            </Button>
            {deleteTry ? (
              <Text size="xs" color="red">
                한번 더 눌러 삭제하기
              </Text>
            ) : null}
          </Group>
          <Button variant="light" type="submit" onClick={onClose}>
            수정
          </Button>
        </Group>
      </form>
    </Dialog>
  );
};

export default EditDialog;
