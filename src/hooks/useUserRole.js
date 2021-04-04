import React from 'react';
import { useRestfulFetch } from './useRestfulFetch';

export const useUserRole = () => {
  // const { data, status } = useUserContext();
  const { data, status } = useRestfulFetch('/users/getuserinfo');
  const role = data?.role;
  /** returns boolean indicating whether our user is an ADMIN */
  const userIsAdmin = React.useCallback(() => role === 'ADMIN', [role]);
  /** returns a boolean indicating whether our user is a TEACHER */
  const userIsTeacher = React.useCallback(() => role === 'TEACHER', [role]);
  /** returns a boolean indicating whether our user is a STUDENT */
  const userIsStudent = React.useCallback(() => role === 'STUDENT', [role]);

  const values = React.useMemo(
    () => ({
      userIsAdmin,
      userIsTeacher,
      userIsStudent,
      status,
      user: { ...data },
      ...data,
    }),
    [data, userIsAdmin, userIsTeacher, userIsStudent, status]
  );

  // provide the above helper functions to any component which calls this hook
  return values;
};
