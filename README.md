# Reach LMS Frontend

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![React](https://img.shields.io/badge/react-v16.7.0--alpha.2-blue.svg)
![Redux](https://img.shields.io/badge/react-redux-brightgreen)
![Java](https://img.shields.io/badge/java-spring-red)

Deployed link: <https://a.reachlms.dev>

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- cSpell-disable -->
<table>
 <tbody>
 <tr>

  <td align="center">
    <a href="https://github.com/chazkiker2">
    <img src="https://avatars.githubusercontent.com/u/70249988?v=3?s=100"
      width="100px" alt=""/>
    <br/><sub><b>Chaz Kiker</b></sub></a><br/>
  </td>

  <td align="center">
    <a href="https://github.com/BUGBOUNTYchrisg8691">
    <img src="https://avatars.githubusercontent.com/u/65675733?v=3?s=100"
      width="100px" alt=""/>
    <br/><sub><b>Christopher Girven</b></sub></a><br/>
  </td>


  <td align="center">
    <a href="https://github.com/simonesquad">
    <img src="https://avatars.githubusercontent.com/u/50623822?s=400&u=ba6af6a7e826fa735e142f23a76c947ffed3e55f&v=4"
      width="100px" alt=""/>
    <br/><sub><b>Simone Ballard</b></sub></a><br/>
  </td>

  <td align="center">
    <a href="https://github.com/sebass482">
    <img src="https://avatars.githubusercontent.com/u/66289590?v=3?s=100"
      width="100px" alt=""/>
    <br/><sub><b>Sebastian Mendoza</b></sub></a><br/>
  </td>

  <td align="center">
    <a href="https://github.com/dav1dchang">
    <img src="https://avatars.githubusercontent.com/u/70392706?s=400&u=2e5a31261597a86c31eba71d4546912a16e236f3&v=4"
      width="100px" alt=""/>
    <br/><sub><b>David Chang</b></sub></a><br/>
  </td>

  
  <td align="center">
    <a href="https://github.com/rhea-manuel">
      <img src="https://avatars.githubusercontent.com/u/33386393?v=4"
        width="100px" alt=""
      />
      <br/>
      <sub><b>Rhea Manuel</b></sub>
    </a>
    <br/>
  </td>
 </tr>
 <tr>
  <td align="center">
    <a href="https://github.com/aldenho52">
      <img src="https://avatars.githubusercontent.com/u/69052933?s=460&u=a59bb1fd41bac4f91b8460f06ec34592fece103e&v=4" width = "100px" />
    <br/><sub><b>Alden Ho</b></sub></a><br/>
  </td>

  <td align="center">
    <a href="https://github.com/ashtoturn">
    <img src="https://avatars.githubusercontent.com/u/47793349?s=400&u=42e3944e42e56779451351208ff7eb4fffb27ba7&v=4"
      width="100px" alt=""/>
    <br/><sub><b>Ashton Turner</b></sub></a><br/>
  </td>

  <td align="center">
    <a href="https://github.com/mrbhawnish">
    <img src="https://avatars.githubusercontent.com/u/55416868?s=400&u=a8a7d1cc124b68e9c38dd4b9bc39cc42e31a9572&v=4"
      width="100px" alt=""/>
    <br/><sub><b>Bhawnish Kumar</b></sub></a><br/>
  </td>

  <td align="center">
    <a href="https://github.com/JoelVega97">
    <img src="https://avatars.githubusercontent.com/u/67379632?s=400&u=3f34b76d111fb330e93fbb0133cb200addc326cf&v=4"
      width="100px" alt=""/>
    <br/><sub><b>Joel Vega</b></sub></a><br/>
  </td>
 </tr>
</tbody>
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Getting Started

- Fork and clone the repo to install it as your own remote.
  - **note** please [be sure to set your remote](https://help.github.jp/enterprise/2.11/user/articles/changing-a-remote-s-url/) for this repo to point to your Labs Team Front End Repository.
- run: `npm install` to download all dependencies.
- run: `npm start` to start your local development server.

> When using Okta for authentication, the app will need to run locally on port 3000.

## Key Features

- Mobile First: the application is highly responsive to different screen sizes and also supports larger screens.
- User Roles: Each user has one of three roles: admin, teacher, or student. Each role has a specific set of features available once inside the app.
- User Profiles: Each user can view and update their own user profile once inside the app.
- Program Management: Admins can create a program once inside the app and can update and delete that program as well.
- Curriculum Management: Admins can create, update, and delete courses per program, as well as modules per course.
- Dropdown menus in UI for students to more easily manage their modules.

### [Front End](https://a.reachlms.dev) deployed to AWS

### [Back End](https://reach-team-a-be.herokuapp.com) deployed to Heroku

### Authentication and Security with Okta

## Installation Instructions

Run `npm i` and `npm start` in the main folder to run on `localhost:3000`. Project is already deployed with AWS here: <https://a.reachlms.dev>

## Other Scripts

```package.json
  - build - creates a build of the application
  - start - starts the production server after a build is created
  - test - runs tests in **tests** directory \* eject - copy the configuration files and dependencies into the project so you have full control over them
```

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Documentation

See [this repository's Wiki for further details](https://github.com/Lambda-School-Labs/reach-lms-fe-a/wiki)

See [Backend GitHub Wiki](https://github.com/Lambda-School-Labs/reach-lms-be-a/wiki) for details on the backend of our project.
