import React from 'react';
import { ProgramList, ProgramSingleton } from '../ProgramsRest';

const AdminLanding = props => {
  return (
    <>
      <ProgramList
        href="/programs"
        mappedChild={programEntity => (
          <ProgramSingleton
            href={programEntity._links.self.href}
          ></ProgramSingleton>
        )}
      />
    </>
  );
};

export default AdminLanding;
