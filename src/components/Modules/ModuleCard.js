// import React from 'react';
// import 'antd/dist/antd.css';
// import { Card } from 'antd';
// import { Button, Menu, Dropdown } from 'antd';
// import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { axiosWithAuth } from '../../utils/axiosWithAuth';
// import { setEditModule, deleteModule } from '../../state/actions/moduleActions';

// export default function ModuleCard(props) {
//   const { module } = props;
//   const user = useSelector(state => state.userReducer);
//   const dispatch = useDispatch();
//   const { push } = useHistory();

//   const handleMenuClick = e => {
//     if (e.key === 'edit') {
//     //   dispatch(setEditModule(module));
//     //   push('/edit-module');
//     } else {
//       axiosWithAuth()
//         .delete(
//         //   `https://reach-team-a-be.herokuapp.com/modules/${module.moduleid}`
//         )
//         .then(res => {
//           console.log(module.moduleid);
//           dispatch(deleteModule(module.moduleid));
//           console.log(res);
//         })
//         .catch(err => console.log(err));
//     }
//   };

//   const menu = (
//     <Menu onClick={handleMenuClick}>
//       {/* <Menu.Item key="edit">Edit Module</Menu.Item> */}
//       <Menu.Item key="delete">Delete Module</Menu.Item>
//     </Menu>
//   );

//   function clickOnEdit(e, id) {
//     console.log('module', module);
//     dispatch(setEditModule(module));
//     push('/edit-module');
//   }

//   function deletingModule(id) {
//     console.log(module);
//     axiosWithAuth()
//       // will have to put in the proper API call here
//       .delete(``)
//       .then(res => console.log(res))
//       .catch(err => console.log(err));

//     dispatch(deleteModule(id));
//   }

//   const viewModuleHandler = id => {
//     axiosWithAuth()
//       .get(`https://reach-team-a-be.herokuapp.com/modules/${id}`)
//       .then(res => {
//         console.log(res);
//         console.log(id);
//         // dispatch(setModuleList(res.data));
//         // dispatch(viewProgram(id));
//       })
//       .catch(err => console.log(err));
//     push('/module-text'); //this should be the eventual route
//   };

// module has name, description, content

//   return (
//     <>
//       <Card
//         title={module.modulename}
//         extra={<Dropdown.Button overlay={menu}></Dropdown.Button>}
//         style={{ width: 800 }}
//       >
//         <h3>{module.moduledescription}</h3>
//         <p>{module.modulecontent}</p>
//         <Button
//           onClick={() => viewModuleHandler(module.moduleid)}
//           type="primary"
//         >
//           View Module
//         </Button>
//       </Card>
//     </>
//   );
// }
