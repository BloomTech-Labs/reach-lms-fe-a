import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../state/ducks';

const { getUserInfoThunk } = userActions;

/**
 * this React hook allows the calling component the agency to check
 * whether the user signed into the app is a ADMIN, TEACHER, or STUDENT, respectively.
 *
 * The calling component will be provided with an Object containing three properties.
 * Each of those properties will hold a helper function that returns a boolean value
 * to denote whether the user signed in is a certain role.
 *
 * EXAMPLE USE CASE COMMENTED OUT AT THE BOTTOM OF THIS FILE
 *
 */
export const useUserRole = () => {
  /** allows for us to dispatch actions to the store */
  const dispatch = useDispatch();

  /** the role of the user logged in */
  const { userid, role } = useSelector(state => state.userReducer.user);

  /**
   * this useEffect fires on component render.
   *
   * If the role is not defined, then we will dispatch our
   * `loginThunk` to get user info.
   */
  useEffect(() => {
    if (!role || role === '' || !userid) {
      dispatch(getUserInfoThunk());
    }
    // role should only change from[`undefined` | `""`] to[`"ADMIN" | "TEACHER" | "STUDENT"`]
    // userid may be undefined
  }, [role, userid]);

  /** returns boolean indicating whether our user is an ADMIN */
  const userIsAdmin = () => role === 'ADMIN';

  /** returns a boolean indicating whether our user is a TEACHER */
  const userIsTeacher = () => role === 'TEACHER';

  /** returns a boolean indicating whether our user is a STUDENT */
  const userIsStudent = () => role === 'STUDENT';

  // provide the above helper functions to any component which calls this hook
  return { userIsAdmin, userIsTeacher, userIsStudent, userid };
};
