import Button from '@atlaskit/button';
import React from 'react';
import styled, { css } from "styled-components";

const ButtonStyled = styled(Button)`
  margin-top: 5px;
  text-align: left;

  ${p => p.isCompleted && css`
    text-decoration: line-through;
  `}
`;

export default function Todo({ todo, onCheckBtnClick }) {
  return (
    <>
      <ButtonStyled
        shouldFitContainer
        onClick={() => onCheckBtnClick(todo.id, !todo.isCompleted)}
        isCompleted={todo.isCompleted}>
        {todo.name}
      </ButtonStyled>
    </>
  )
}