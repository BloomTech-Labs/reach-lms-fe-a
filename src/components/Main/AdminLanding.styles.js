import styled from 'styled-components';
import { Card as AntCard } from 'antd';
//styled components
const Programs = styled.div`
  width: 80%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const HeaderDiv = styled.header`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 1.95rem;
  }
  div.options {
    display: flex;
  }
  @media (max-width: 450px) {
    flex-direction: column;
    h2 {
      font-size: 1.2rem;
    }
    div.options {
      display: flex;
      justify-content: center;
      margin-left: 0%;
    }
  }
`;

const Card = styled(AntCard)`
  width: 300px;
  height: 150px;
  margin: 20px;
`;

const Styled = {
  Programs,
  Content,
  HeaderDiv,
  Card,
};

export default Styled;
