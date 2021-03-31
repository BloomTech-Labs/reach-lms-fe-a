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
  align-items: center;
  width: 100%;
`;

const TopCourseCard = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconsDiv = styled.div`
  display: flex;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

const Styled = {
  Content,
  Header,
  TopCourseCard,
  IconsDiv,
  SearchContainer,
};

export default Styled;
