import { Button, Dialog, Group, NativeSelect, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

import { timeBlock } from "@/components/Types/type";

// axios.defaults.withCredentials = true;

interface AddDialogProps {
  opened: boolean;
  onClose: () => void;
  type: string;
  getOldTimeBlock: () => void;
  getNewTimeBlock: () => void;
}

const AddDialog = ({
  opened,
  onClose,
  type,
  getOldTimeBlock,
  getNewTimeBlock,
}: AddDialogProps) => {
  async function onSubmit(values: { [key: string | number]: string | number }) {
    console.log(values);
    try {
      await axios
        .post(`http://35.247.70.187:8080/${type}`, values, {})
        .then(function (response) {
          console.log(response);
          type === "old" ? getOldTimeBlock() : getNewTimeBlock();
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
      start: 12,
      end: 13,
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
        연습 시간 추가
      </Text>
      <form onSubmit={addForm.onSubmit(values => onSubmit(values))}>
        <NativeSelect
          // defaultValue={"도쭈"}
          data={["도쭈", "휴익", "이그니션", "싱송", "지스리"]}
          label="동아리"
          style={{ width: "100%" }}
          {...addForm.getInputProps("user")}
        />
        <NativeSelect
          // defaultValue={"월"}
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
          {...addForm.getInputProps("day")}
        />
        <Group style={{ marginTop: 15 }} position="apart">
          <NativeSelect
            // defaultValue={12}
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
            {...addForm.getInputProps("start")}
          />
          <NativeSelect
            // defaultValue={13}
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
            {...addForm.getInputProps("end")}
          />
        </Group>
        <Group position="right" style={{ width: "100%", marginTop: 30 }}>
          <Button variant="light" type="submit" onClick={onClose}>
            추가
          </Button>
        </Group>
      </form>
    </Dialog>
  );
};

export default AddDialog;
