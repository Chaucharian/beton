import React from "react";
import styled from "styled-components";
import { TextField as MaterialTextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { COLORS } from "../consts";
// import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const SuccessMessage = styled.p`
  font-family: Raleway;
  font-size: 15px;
  color: #27ae60;
`;

const ErrorMessage = styled.p`
  font-family: Raleway;
  font-size: 15px;
  color: red;
`;
const Form = styled.form`
  display: block;
  // display: flex;
  // justify-content: space-evenly;
  @media screen and (max-width: 479px) {
    display: block;
  }
`;

const Button = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  outline: none;
  border: none;
  background-color: ${COLORS.primary};
  border-radius: 5px;
  width: 100%;
  height: 45px;
  cursor: pointer;
`;

const Content = styled.div`
  ${({ error }) => `
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
  width: 260px; 
  .MuiFormControl-root {
    width: 100%;
    margin-bottom: 15px;
    label {
      color: ${error ? `#ff0000` : `#2727307d`} !important;
      font-weight: 500;
    }
    .MuiOutlinedInput-input {
      padding: 13px 14px;
      color: ${COLORS.secondary};
    }
    .MuiOutlinedInput-notchedOutline {
      border-color: ${error ? `#ff0000` : COLORS.secondary} !important;     
    }
  }
  `}
`;

const EmailForm = ({ height, children, onSubmit, response, ...options }) => {
  const { register, handleSubmit, setError, errors } = useForm();
  const success = response?.success && response?.message;
  const error = !response?.success && response?.message;

  return (
    <Content error={errors?.email ? true : false}>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <MaterialTextField
          label="Me gustaria desarrollar un..."
          variant="outlined"
        //   inputRef={register({
        //     required: true,
        //     pattern: {
        //       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        //     },
        //     message: "Email invalido",
        //   })}
          name="idea"
          className="textArea"
        />
        <MaterialTextField
          label="email@email.com"
          variant="outlined"
        //   inputRef={register({
        //     required: true,
        //     pattern: {
        //       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        //     },
        //     message: "Email invalido",
        //   })}
          name="email"
        />
        <Button type="submit">
          Enviar
          {/* <ArrowForwardIcon /> */}
        </Button>
        {success && (
          <SuccessMessage>
            ¡Envío exitoso! <br />
            {response.message}
          </SuccessMessage>
        )}
        {error && (
          <ErrorMessage>
            Ocurrio un error. <br /> {response.message}
          </ErrorMessage>
        )}
      </Form>
    </Content>
  );
};

export default EmailForm;
