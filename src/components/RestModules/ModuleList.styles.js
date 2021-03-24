import styled from 'styled-components';
import { Form as AntForm } from 'antd';
import AntFormItem from 'antd/lib/form/FormItem';

// STYLED COMPONENTS
const MenuRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10%;
`;

const HeaderDiv = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  margin: 5% 0;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const Span = styled.span`
  font-size: 24px;
  color: gray;
  :hover {
    color: lightgray;
  }
`;

const Form = styled(AntForm)`
  display: flex;
  align-content: flex-end;
  margin-left: 1%;
`;

const Submit = styled.div`
  margin-left: 2%;
  padding-top: 5%;
`;

const FormItem = styled(AntFormItem)`
  padding-top: 5%;
  margin-bottom: 0;
`;

const Styled = {
  Form,
  FormItem,
  Submit,
  Span,
  HeaderDiv,
  Container,
  MenuRow,
};

export default Styled;
