import React from "react";
import { Button, Form, Input, Card } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

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
const Header = styled.div`
  background-color: #d5d1d1e0;
  border-radius: 8px 8px 0 0;
`;
const StyledFont = styled.h1`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  margin-top: 0px;
`;
const ButtonContainer = styled.div`
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
const Container = styled.div`
  display: flex;
  align-items: center;
  height: 900px;
`;
const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export function Registration() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleClick = async (form) => {
    try {
      const fields = await form.validateFields();
      fetch("https://js-test.kitactive.ru/api/register", {
        method: "POST",
        body: JSON.stringify(fields),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => (response.ok ? response : Promise.reject(response)))
        .then((response) =>
          !response.redirected ? response : Promise.reject(response)
        )
        .then(() => {
          navigate("/success");
        })
        .catch((err) => {
          if (err.redirected) {
            return alert("Пользователь с таким email уже существует");
          } else {
            return alert("Произошла ошибка! Попробуйте еще раз");
          }
        });
    } catch (e) {
      return alert("Неправильно введены данные");
    }
  };

  return (
    <Container>
      <CardContainer>
        <StyledCard>
          <Header>
            <StyledFont>Регистрация</StyledFont>
          </Header>
          <Form form={form} initialValues={{}}>
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
                <Input style={{ width: "200px" }} />
              </StyledFormItem>
            </FormItemContainer>
            <FormItemContainer>
              <StyledFormItem
                label="Имя"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите имя!",
                  },
                ]}
              >
                <Input style={{ width: "200px" }} />
              </StyledFormItem>
            </FormItemContainer>
            <ButtonContainer>
              <Button
                style={{ margin: "10px" }}
                type="primary"
                htmlType="submit"
                onClick={() => handleClick(form)}
              >
                Зарегистрироваться
              </Button>
            </ButtonContainer>
            <LinkContainer>
              <Link to="/">Вернуться на страницу входа</Link>
            </LinkContainer>
          </Form>
        </StyledCard>
      </CardContainer>
    </Container>
  );
}
