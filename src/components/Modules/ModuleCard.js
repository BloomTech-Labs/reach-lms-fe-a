// import React from 'react';
// import 'antd/dist/antd.css';
// import { Card } from 'antd';
// import { Button, Menu, Dropdown } from 'antd';
// import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { axiosWithAuth } from '../../utils/axiosWithAuth';

// export default function ModuleCard(props) {
//   const { module } = props;
//   const user = useSelector(state => state.userReducer);
//   const dispatch = useDispatch();
//   const { push } = useHistory();

//   const viewModuleHandler = id => {
//     axiosWithAuth()
//       .get(``)
//       .then(res => {
//         console.log(res);
//         console.log(id);
//         dispatch(setModuleList(res.data));
//         dispatch(viewModule(id));
//       })
//       .catch(err => console.log(err));
//     push('/module-text'); //this should be the eventual route
//   };

// //module has name, description, content, but in the dropdown only the name will show ...? need to discuss

//   return (
//     <>
//       <Card
//         title={module.modulename}
//       >
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
