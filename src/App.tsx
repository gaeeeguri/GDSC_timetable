import Header from "@/components/Header/Header";
import CalendarBar from "@/components/CalendarBar/CalendarBar";
import styled from "styled-components";
import { useState } from "react";
import Calendar from "./components/Calendar/Calendar";

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
    <div>
      <Header title={"GDSC Project"} />
      <Layout>
        <CalendarBar setType={setType} />
        <Calendar type={type} />
      </Layout>
    </div>
  );
}
