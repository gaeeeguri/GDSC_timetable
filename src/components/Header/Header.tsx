import React from "react";
import styled from "styled-components";

interface HeaderProps {
  title: string;
}

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  height: 150px;
  background-color: gray;
  align-content: center;
`;

const TitleWrapper = styled.div`
  flex-basis: auto;
  text-align: center;
  background-color: #0074a6;
  display: flex;
  align-items: center;
  padding: 0 0.5em 0 0.5em;
`;

const Title = styled.h1`
  color: #eeeeee;
  font-family: NanumSquareNeoExtraBold, sans-serif;
`;

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <HeaderWrapper>
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
    </HeaderWrapper>
  );
};

Header.defaultProps = {
  title: "GDSC Project",
};

export default Header;
