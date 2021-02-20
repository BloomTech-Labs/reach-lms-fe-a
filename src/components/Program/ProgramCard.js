import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { setEdit, deleteProgram } from '../../state/actions/programActions';

export default function ProgramCard(props) {
  const { programToEdit } = props;
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const { push } = useHistory();

  function clickOnEdit(e, id) {
    // we may need more functionality here but we need to check on that
    dispatch(setEdit(programToEdit));
    push('/edit-program');
  }

  function deletingProgram(e, id) {
    axiosWithAuth()
      // will have to put in the proper API call here
      .delete(`/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    dispatch(deleteProgram(id));
  }

  return (
    <>
      <Card title={programToEdit.programname} style={{ width: 300 }}>
        <h3>{programToEdit.programtype}</h3>
        <p>{programToEdit.programdescription}</p>
        <Button type="primary" onClick={e => clickOnEdit(e, programToEdit.id)}>
          Edit Program
        </Button>
        <Button
          type="primary"
          onClick={e => deletingProgram(e, programToEdit.id)}
        >
          Delete Program
        </Button>
      </Card>
    </>
  );
}
