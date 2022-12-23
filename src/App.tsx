import Header from "@/components/Header/Header";
import CalendarBar from "@/components/CalendarBar/CalendarBar";
import styled from "styled-components";
import { useState } from "react";
import Calendar from "./components/Calendar/Calendar";

import { MantineProvider, Text } from "@mantine/core";

const AppWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
`;

const Layout = styled.div`
  margin-left: 70px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default function App() {
  const [type, setType] = useState<string>("old");

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Text>Trying Mantine</Text>
    </MantineProvider>
  );
}
