import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

// const FormHeader = styled.div`
//   display: flex;
//   flex-flow: row nowrap;
// `;

const Error = styled.div`
  color: red;
`;

const Styled = {
  Wrapper,
  Error,
};

export default Styled;
