import React from "react";
import { Button, Form, Input, Card } from "antd";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { setTokenInContainer } from "../redux/token";
import { useDispatch } from "react-redux";

const StyledCard = styled(Card)`
  border: 1px solid black;
  .ant-card-body {
    padding: 0px;
  }
`;
const StyledFormItem = styled(Form.Item)`
  width: 100%;
  display: flex;
  justify-content: center;

  .ant-form-item-label {
    width: 70px;
  }
`;
const FormItemContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
const CardContainer = styled.div`
  max-width: 400px;
  margin: auto;
  width: 100%;
`;
const Header = styled.div`
  background-color: #d5d1d1e0;
  border-radius: 8px 8px 0 0;
`;
const StyledH1 = styled.h1`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  margin-top: 0px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  height: 900px;
`;

export function Autorization() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Функция входа и получения токена доступа
  const handleClick = async (form) => {
    try {
      const fields = await form.validateFields();
      fetch("https://js-test.kitactive.ru/api/login", {
        method: "POST",
        body: JSON.stringify(fields),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => (response.ok ? response : Promise.reject(response)))
        .then((response) => response.json())
        .then((json) => {
          dispatch(setTokenInContainer(json.token));
        })
        .then(() => {
          navigate("/personalarea");
        })
        .catch((err) => {
          return alert(
            "Произошла ошибка! Возможно вы неправильно ввели данные."
          );
        });
    } catch (e) {
      alert("Произошла ошибка, попробуйте еще раз");
    }
  };

  return (
    <Container>
      <CardContainer>
        <StyledCard>
          <Header>
            <StyledH1>Вход</StyledH1>
          </Header>
          <Form form={form}>
            <FormItemContainer>
              <StyledFormItem
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Пожалуйста, введите email!",
                  },
                ]}
              >
                <Input style={{ width: "200px" }} />
              </StyledFormItem>
            </FormItemContainer>
            <FormItemContainer>
              <StyledFormItem
                label="Пароль"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите пароль!",
                  },
                ]}
              >
                <Input.Password style={{ width: "200px" }} />
              </StyledFormItem>
            </FormItemContainer>
            <LinkContainer>
              <Link to="/registration">Зарегистрироваться</Link>
            </LinkContainer>
            <ButtonContainer>
              <Button
                style={{ margin: "10px" }}
                type="primary"
                htmlType="submit"
                onClick={() => handleClick(form)}
              >
                Войти
              </Button>
            </ButtonContainer>
          </Form>
        </StyledCard>
      </CardContainer>
    </Container>
  );
}
