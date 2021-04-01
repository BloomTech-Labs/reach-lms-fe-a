import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
`;

const Header = styled.div`
  width: 100%;
  height: 10vh;
`;

const Textarea = styled.div`
  width: 70vw;
`;

const Styled = {
  Content,
  Header,
  Textarea,
};

export default Styled;
