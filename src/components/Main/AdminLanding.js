import React from 'react';
import { useSubModal } from '../../hooks';
import { GhostLink } from '../common';
import { ProgramList, ProgramForm, ProgramSingleton } from '../RestPrograms';
import { Modal, Button } from 'antd';
import { pathUtils } from '../../routes';
import Styled from './AdminLanding.styles';
import { EditOutlined, DeleteOutline } from '@material-ui/icons';
import Meta from 'antd/lib/card/Meta';
import { client } from '../../utils/api';

const AdminLanding = props => {
  const programModal = useSubModal();
  const [selectedProgram, setSelectedProgram] = React.useState('');

  const handleCloseModal = () => {
    setSelectedProgram('');
    programModal.hideModal();
  };

  return (
    <>
      <Styled.Content>
        <Styled.HeaderDiv>
          <h2>Programs</h2>
          <div className="options">
            <Button size="large" onClick={programModal.showModal}>
              Create Program
            </Button>
          </div>
        </Styled.HeaderDiv>

        <Styled.Programs>
          <ProgramList
            href="/programs"
            mappedChild={programEntity => (
              <ProgramSingleton
                key={programEntity._links.self.href}
                href={programEntity._links.self.href}
                mappedChild={program => (
                  <GhostLink
                    key={programEntity._links.self.href}
                    to={pathUtils.makeMainByProgramIdPath(program.programid)}
                  >
                    <Styled.Card
                      style={{ width: 300, height: 150, margin: 20 }}
                      actions={[
                        <EditOutlined
                          key="edit"
                          onClick={e => {
                            // stop bubbling so we don't route the user to AdminMain
                            e.preventDefault();
                            setSelectedProgram(programEntity._links.self.href);
                            programModal.showModal();
                          }}
                        />,
                        <DeleteOutline
                          key="delete"
                          onClick={e => {
                            // stop bubbling so we don't route the user to AdminMain
                            e.preventDefault();
                            client.deleteProgram(program.programid);
                          }}
                        />,
                      ]}
                    >
                      <Meta
                        title={`${program.programname} — ${program.programtype}`}
                        description={program.programdescription}
                      />
                    </Styled.Card>
                  </GhostLink>
                )}
              />
            )}
          />
        </Styled.Programs>
      </Styled.Content>
      <Modal
        title="Add Program"
        width="90vw"
        visible={programModal.visible}
        onCancel={handleCloseModal}
        onFinish={handleCloseModal}
        closable="true"
      >
        <ProgramForm
          href={
            selectedProgram && selectedProgram !== '' ? selectedProgram : ''
          }
          visible={programModal.visible}
        />
      </Modal>
    </>
  );
};

export default AdminLanding;
