import React from 'react';
import { useSubModal } from '../../hooks';
import { ProgramList, ProgramCard, ProgramForm } from '../ProgramsRest';
import { Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import { pathUtils } from '../../routes';
import Styled from './AdminLanding.styles';

const AdminLanding = props => {
  const programModal = useSubModal();
  const [selectedProgram, setSelectedProgram] = React.useState('');

  return (
    <>
      <Styled.Content>
        <Styled.HeaderDiv>
          <Styled.H2>My Programs</Styled.H2>
        </Styled.HeaderDiv>
        <Styled.Title>
          <Button size="large" onClick={programModal.showModal}>
            Create Program
          </Button>
        </Styled.Title>

        <Styled.Programs>
          <ProgramList
            href="/programs"
            mappedChild={program => (
              <ProgramCard program={program}>
                <Link to={pathUtils.makeCoursesByProgramId(program.programid)}>
                  <Button primary={true}>View Program</Button>
                </Link>
                <Button
                  onClick={() => {
                    setSelectedProgram(program._links.self.href);
                    programModal.showModal();
                  }}
                >
                  Edit Program
                </Button>
              </ProgramCard>
            )}
          />
        </Styled.Programs>
      </Styled.Content>
      <Modal
        title="Add Program"
        width="90vw"
        visible={programModal.visible}
        onCancel={programModal.hideModal}
      >
        {selectedProgram && selectedProgram !== '' ? (
          <ProgramForm href={selectedProgram} />
        ) : (
          <ProgramForm />
        )}
      </Modal>
    </>
  );
};

export default AdminLanding;
