import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
`;

const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: top;
  width: 30vw;
`;

const Styled = {
  Content,
  Header,
};

export default Styled;
