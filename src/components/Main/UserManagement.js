//  ## VIEW MODE 2 — <UserManagement />
// - [ ] CREATE User — Form in Modal
// - [ ] List of ALL USERS IN SYSTEM (separated by role)
//   - <UserList href="/admins" />
//   - <UserList href="/students" />
//   - <UserList href="/teacher" />
// - [ ] Each USER_COMPONENT will have the following actions
//   - [ ] DELETE User
//   - [ ] MANAGE — <ManageUser href={GET user by user id} />
//       - [ ] List of courses the user is attached to (with DELETE option to remove this user from course)
//       - [ ] Option to ADD new course to that user (once this action is hit, we should show a collection of courses we could attach to this user)

import React from 'react';
import { useSubModal } from '../../hooks';
import { GhostLink } from '../common';
import { UserList, AddNewUserForm, EditUserForm } from '../RestPrograms';
