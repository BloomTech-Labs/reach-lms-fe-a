**_KNOWN BUGS_**

- There was a bug related to adding and deleting teachers on the Modules List component where the dropdown renders that was resolved.

- Unable to completely mock AxiosWithAuth with jest in testing:

"In RenderModuleList.test.js file upon trying to render <ModuleList /> component running into an error where the accessToken is undefined. I believe this error is coming from the axios request inside of the useEffect responsible for keeping up to date the dynamic add/delete dropdown menus for students. The issue is upon rendering the component, the axios request fires, which then goes into the AxiosWithAuth file in the utils folder, and there is where the accessToken is undefined.

To solve this issue, I believe you must mock the local storage accessToken, axiosWithAuth, and the HTTP request.

A second and possibly easier solution is to rewrite the module list use effect and to use Redux instead. A dynamic add/delete student list is possible with redux. You would have to dispatch in the add/delete functions and modify your students_list in redux of your courseReducer to accomplish this. Goodluck!"

**_INCOMPLETE FEATURES_**

- The stretch goal for this project is to fully CRUD users. We have partially achieved this by allowing a user to edit their own profile. However, we have not yet achieved the possibility of creating a new user or deleting them from the app. For now as an admin you can only add or delete teachers and students from courses. So this area can be immediately expanded upon in further projects.

**_ISSUES ON GITHUB_**

- No known issues on Github. The Pull Request history is variable in terms of atmoic to much larger content pull requests. There were merge conflicts relatively frequently but these were often discussed and resolved immediately. We recommend pulling more atomic changes and having a more standard format per component (in regards to the order of imports etc.) to avoid minor conflicts and wasting time.
