import React from 'react';
import 'antd/dist/antd.css';
import Card from 'antd/lib/card';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { programActions } from '../../state/ducks';
import { pathUtils } from '../../routes';
import { MenuItemLink } from '../_common';
// css
import '../../styles/ProgramCard.css';

export default function ProgramCard(props) {
  const { program } = props;
  const dispatch = useDispatch();

  const menu = (
    <Menu>
      <MenuItemLink
        to={pathUtils.makeEditProgramPath(program.programid)}
        key="edit"
        extra=""
      >
        Edit Program
      </MenuItemLink>
      <MenuItemLink
        handleClick={() =>
          dispatch(programActions.deleteProgramThunk(program.programid))
        }
        key="delete"
      >
        Delete Program
      </MenuItemLink>
    </Menu>
  );

  return (
    <div className="program-card-container">
      <Card
        title={program.programname}
        extra={<Dropdown.Button overlay={menu}></Dropdown.Button>}
        className="program-card"
      >
        <h3>{program.programtype}</h3>
        <p>{program.programdescription}</p>
        <Link to={pathUtils.makeViewAllCoursesPath(program.programid)}>
          View
        </Link>
      </Card>
    </div>
  );
}
