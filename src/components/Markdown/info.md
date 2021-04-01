#### Information over this specific markdown editor

#### This is an editor that renders live text edits from the markdown input window on the left to the live html panel on the right. The original source code that this editor is based on is found here: https://github.com/anaisberg/markdown-editor/tree/master/

#### This source code contains very detailed docs on create-react-app in general. There is also the option to do dark mode on this editor, as you can see in my personal version here: https://github.com/simonesquad/markdown-nugget 

#### It is important to note that this version utilizes the marked library and bootstrap for styling in addition to the styled components already used throughout the app. This involved an installation of: `npm install marked bootstrap`. 

#### The Editor itself utilizes the useRestfulFetch hook to draw in the current module content information from the backend via the `/modules/markdown/${moduleId}` endpoint. State is updated via the "text" slice of state on line 13 that is updated for live markdown rendering by the handleChange hook, and then submitted to the backend using the submitForm function with the client api action included on line 34.

#### As always on the frontend in this app... all axios calls are collected in the file '/utils/api.js', where you will find 'putMarkdown' on line 28 under the sub-heading "MODULE."

#### All styles for this component are in the file Editor.styles.js, while the bootstrap styles are in-line in the component. The sample text file is utilized where there is no prior existing module content to feed in, although this case might never arise. The component itself is exported via the index.js file. 