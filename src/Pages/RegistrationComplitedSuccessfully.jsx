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
const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  margin-top: 14px;
  margin-bottom: 14px;
`;
const Container = styled.div`
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  height: 900px;
`;

export function RegistrationComplitedSuccessfully() {
  return (
    <Container>
      <StyledCard>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Поздравляем!
        </h1>
        <p style={{ display: "flex", justifyContent: "center" }}>
          Вы успешно прошли регистрацию!
        </p>
        <StyledLink to="/">Вернуться на страницу входа</StyledLink>
      </StyledCard>
    </Container>
  );
}
