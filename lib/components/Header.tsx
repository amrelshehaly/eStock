import Link from "next/link";
import React, { FC } from "react";
import styled from "@emotion/styled";
import { useActions, useAppState } from "@lib/store";

type Props = {
  titleColor: string;
};

const StyledHeader = styled.h1<Props>`
  color: ${({ titleColor }) => titleColor};
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const Header: FC<Props> = ({ titleColor }) => {
  const { count } = useAppState();
  // const { toggleTheme } = useActions();

  return (
    <div>
      <StyledHeader titleColor={titleColor}>{count}</StyledHeader>
      <Link href={"/"}>
        <a>Home page</a>
      </Link>
      <Link href={"/about"}>
        <a>About Page</a>
      </Link>
      {/* <button onClick={toggleTheme}>Change Theme</button> */}
    </div>
  );
};
