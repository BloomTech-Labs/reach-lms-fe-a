import React from 'react';
import { useUserContext } from '../context/UserContext';

export const useUserRole = () => {
  const { data, loading } = useUserContext();
  // const { data, status } = useRestfulFetch('/users/getuserinfo');
  const role = data?.role;
  /** returns boolean indicating whether our user is an ADMIN */
  const userIsAdmin = React.useCallback(() => role === 'ADMIN', [role]);
  /** returns a boolean indicating whether our user is a TEACHER */
  const userIsTeacher = React.useCallback(() => role === 'TEACHER', [role]);
  /** returns a boolean indicating whether our user is a STUDENT */
  const userIsStudent = React.useCallback(() => role === 'STUDENT', [role]);

  // provide the above helper functions to any component which calls this hook
  return {
    userIsAdmin,
    userIsTeacher,
    userIsStudent,
    loading,
    ...data,
  };
};
