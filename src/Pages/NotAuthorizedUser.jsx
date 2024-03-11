import { Card } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledCard = styled(Card)`
  border: 1px solid black;
  width: 300px;

  .ant-card-body {
    padding: 0px;
  }
`;
const CardContainer = styled.div`
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  height: 900px;
`;
const StyledMessage = styled.h1`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 16px;
`;
const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  margin-top: 14px;
  margin-bottom: 14px;
`;

export function NotAuthorizedUser() {
  return (
    <CardContainer>
      <StyledCard>
        <StyledMessage>Пожалуйста, войдите в свой аккаунт!</StyledMessage>
        <StyledLink to="/">Вернуться на страницу входа</StyledLink>
      </StyledCard>
    </CardContainer>
  );
}
