import Header from "@/components/Header/Header";
import CalendarBar from "@/components/CalendarBar/CalendarBar";
import styled from "styled-components";
import { useState } from "react";

const Layout = styled.div`
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
      </Layout>
    </div>
  );
}
