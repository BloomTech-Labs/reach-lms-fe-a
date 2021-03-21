import styled from 'styled-components';

//styled components
const Programs = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  @media (max-width: 450px) {
    display: flex;
    justify-content: center;
    margin-left: 0%;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5% 0;
  @media (max-width: 450px) {
    flex-direction: column;
  }
`;

const H2 = styled.h2`
  font-size: 1.95rem;
`;

const Styled = {
  Programs,
  Content,
  Title,
  HeaderDiv,
  H2,
};

export default Styled;
