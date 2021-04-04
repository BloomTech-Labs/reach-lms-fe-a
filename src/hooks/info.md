#### Hooks are the primary tool for fetching information throughout this application and are used in every component. 

#### useUserRole.js:
 * This React hook allows the calling component the agency to check whether the user signed into the app is a ADMIN, TEACHER, or STUDENT, respectively.
 * The calling component will be provided with an Object containing three properties.
 * Each of those properties will hold a helper function that returns a boolean value to denote whether the user signed in is a certain role.
 * Additionally, we'll include the user data itself for ease of access to user information in any component that wants it.

 #### useToggleBool.js:
 * This React hook allows the calling component to toggle between states...

 #### useSubModal.js:
 * This React hook allows the calling component to render the modal version of the action form that it is attached to.
 * The calling component will be provided with the content of the form and will show the modal on onClick of the icons, as well as hide the modal onSubmit.

 #### useRestfulFetch.js:
 * This is arguably the most important hook inside of the entire application(!). This hook communicates directly with the backend via the API_BASE_URL as seen on line 4.
 * This hook makes the actual axios call and processes the links that are rendering this data on the frontend. 
 * This hook will always return the data, links, any errors, and the relevant status.
 * An example of this hook in use is the `EditSelfForm.js` component which uses the hook to render data in state from the `/users/getuserinfo` endpoint. That data is then passed through the form and pieces of it are called using values that are set in the useForm hook. 

#### useMountEffect.js:
* This hook is simply a useEffect hook with an empty dependency array. The result is that anything inside of the useMountEffect runs only on the initial render of a component (i.e., the mount).
* I would encourage future developers to avoid using this unless they understand hooks deeply and have an actual reason for ignoring dependencies in the dependency array. Usually, they should be able to use useEffect(() => someFn(), []) and be able to do so without generating warnings from es-lint-hooks-exhaustive-deps. The use for useMountEffect would be INTENTIONALLY BREAKING THE RULES OF useEffect.

#### useForm.js: 
* This hook is used on all of our forms to manage their values.
* The calling component is provided with the values as an empty state, and also the onChange and resetValues handlers. 

#### useEffectAfterMount.js:
* This hook is kind of the inverse of the above. It's effectively a useEffect call that runs the given effects on any update to the dependencies... BUT the initial render of the component (when the component "mounts") will NOT run the side-effect given. So this is a useEffect that runs every time that it usually would EXCEPT for the initial render of the component.
* This hook probably has more use-cases than useMountEffect, but same word of advice to future devs: don't use it unless you truly understand what it is and why you're choosing to use it.