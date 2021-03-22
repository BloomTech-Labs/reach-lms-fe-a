import React from 'react';
import { useRestfulFetch } from './useRestfulFetch';

/**
 * this React hook allows the calling component the agency to check
 * whether the user signed into the app is a ADMIN, TEACHER, or STUDENT, respectively.
 *
 * The calling component will be provided with an Object containing three properties.
 * Each of those properties will hold a helper function that returns a boolean value
 * to denote whether the user signed in is a certain role.
 *
 * Additionally, we'll include the user data itself for ease of access to user information in any component that wants it.
 */
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
