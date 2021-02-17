import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { Button } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { deleteProgram } from "../actions/programActions";
import { setEdit } from "../actions/programActions";

export default function ProgramCard(props) {
    const { programToEdit } = props;
    const user = useSelector(state => state.userReducer);
    const programs = useSelector(state => state.programReducer.program_list)
    const dispatch = useDispatch();
    const { push } = useHistory();

    function clickOnEdit(e, id) {
        // we may need more functionality here but we need to check on that
        dispatch(setEdit(programToEdit));
        push("/edit-program");
    }

    function deletingProgram(e, id) {
        axiosWithAuth()
        // will have to put in the proper API call here
          .delete(`/${id}`)
          .then(res => console.log(res))
          .catch(err => console.log(err))
    
        dispatch(deleteProgram(id));
    }

ReactDOM.render(
    <>
      <Card title={programToEdit.name} style={{ width: 300 }}>
        <h1>{programToEdit.type}</h1>
        <p>{programToEdit.description}</p>
        <Button type="primary" onClick={(e) => clickOnEdit(e, programToEdit.id)}>Edit Program</Button>
        <Button type="primary" onClick={(e) => deletingProgram(e, programToEdit.id)}>Delete Program</Button>
      </Card>
      </>,
      mountNode,
    );
};