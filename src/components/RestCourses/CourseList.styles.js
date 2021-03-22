import styled from 'styled-components';

// styled components
const StyledCourses = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledContent = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const StyledWrapper = styled.div`
  display: flex;
  /* margin-left: 10%; */
  width: 50%;
`;

const StyledTitle = styled.div`
  display: flex;
  margin-left: 10%;
  @media (max-width: 450px) {
    margin: 5% 0;
    display: flex;
    justify-content: center;
    margin-left: 0%;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  width: 800px;
  justify-content: space-between;
  align-items: center;
  margin: 5% 0;
  @media (max-width: 885px) {
    width: 600px;
  }
  @media (max-width: 665px) {
    width: 400px;
  }
  @media (max-width: 450px) {
    width: 325px;
    flex-direction: column;
  }
  @media (max-width: 350px) {
    width: 275px;
  }
`;

const StyledH2 = styled.h2`
  font-size: 1.75rem;
`;

export const Styled = {
  StyledContent,
  StyledCourses,
  StyledH2,
  HeaderDiv,
  StyledWrapper,
  StyledTitle,
};

export default Styled;
