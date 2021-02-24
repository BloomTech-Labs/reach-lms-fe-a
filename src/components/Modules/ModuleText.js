// import React from 'react';
// import 'antd/dist/antd.css';
// import { Menu, Dropdown } from 'antd';
// import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { Card, Dropdown } from 'antd';
// import { setEditModule, deleteModule } from '../../state/actions/moduleActions';
// import { axiosWithAuth } from '../../utils/axiosWithAuth';

// export default function ModuleText(props) {
// const { module } = props;
// const user = useSelector(state => state.userReducer);
// const dispatch = useDispatch();
// const { push } = useHistory();

// const handleMenuClick = e => {
//     if (e.key === 'edit') {
//       dispatch(setEditModule(module));
//       push('/edit-module');
//     } else {
//       axiosWithAuth()
//         .delete(
//           ``
//         )
//         .then(res => {
//           console.log(module.moduleid);
//           dispatch(deleteModule(module.moduleid));
//           console.log(res);
//         })
//         .catch(err => console.log(err));
//     }
//   };

// const menu = (
//     <Menu onClick={handleMenuClick}>
//       <Menu.Item key="edit">Edit Module</Menu.Item>
//       <Menu.Item key="delete">Delete Module</Menu.Item>
//     </Menu>
//   );

// function clickOnEdit(e, id) {
//     console.log('module', module);
//     dispatch(setEditModule(module));
//     push('/edit-module');
//   }

// function deletingModule(id) {
//     console.log(module);
//     axiosWithAuth()
//       // will have to put in the proper API call here
//       .delete(``)
//       .then(res => console.log(res))
//       .catch(err => console.log(err));

//     dispatch(deleteModule(id));
//   }

// return (
//     <>
//     <Card
//     title={module.modulename}
//     extra={<Dropdown.Button overlay={menu}></Dropdown.Button>}
//     style={{ width: 800 }}
//     >
//     <h3>{module.moduledescription}</h3>
//     <p>{module.modulecontent}</p>
//     </Card>
//     </>
//     );
// }
