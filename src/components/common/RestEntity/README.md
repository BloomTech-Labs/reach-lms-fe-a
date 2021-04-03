# The `RestEntity` Component and how to use it

---

## Table of Contents

- [The `RestEntity` Component and how to use it](#the-restentity-component-and-how-to-use-it)
  - [Table of Contents](#table-of-contents)
  - [RestEntity Overview](#restentity-overview)
    - [What is it?](#what-is-it)
    - [Why use it?](#why-use-it)
  - [API](#api)
    - [General Structure](#general-structure)
    - [`RestEntity` Parent Component](#restentity-parent-component)
    - [`Singleton` or `List`? When to use each](#singleton-or-list-when-to-use-each)
    - [`RestEntity.Singleton` Sub-Component](#restentitysingleton-sub-component)
      - [Understanding `props.component`](#understanding-propscomponent)
    - [`RestEntity.List` Sub-Component](#restentitylist-sub-component)
      - [Understanding the `props.path`](#understanding-the-propspath)
    - [`RestEntity.Error` Sub-Component](#restentityerror-sub-component)
    - [`RestEntity.Loading` Sub-Component](#restentityloading-sub-component)
  - [Tutorial](#tutorial)
    - [`ProgramComponent` — Before `RestEntity`](#programcomponent--before-restentity)
    - [`ProgramComponent` — With `RestEntity`](#programcomponent--with-restentity)
    - [Basic Functioning Implementation](#basic-functioning-implementation)
    - [What's Missing? Flexible Abstractions](#whats-missing-flexible-abstractions)
  - [Supporting Info](#supporting-info)
    - [A Quick refresher on callbacks & functions](#a-quick-refresher-on-callbacks--functions)
      - [Functions First](#functions-first)
      - [Callbacks](#callbacks)

---

## RestEntity Overview

### What is it?

The `RestEntity` component is a compound component that utilizes the React Context API to handle data-fetching and consume relational links. Though using such a component will feel new and different to many of you, I promise it simply *appears* more intimidating than it really is. Once you're working with it, it'll feel very similar to the same old React that you're used to.

The whole purpose of the `RestEntity` is to simplify the process of interacting with HAL-shaped data from our RESTful, HATEOAS-oriented backend. That is to say, every single data object has hypermedia links. Instead of worrying about complex Redux thunks and/or over-the-top routing, our `RestEntity` is going to take whatever endpoint you want to feed it and get the data you care about. Then, it'll give control back to you so you can do what you're so good at doing: building components to PRESENT information.

### Why use it?

In an application like Reach LMS, many of our components are going to have to worry about data fetching. There's most likely going to be at LEAST two different components for each "Category of Data," so to speak.

In Reach LMS, the four most crucial types of data are:

- User
- Program
- Course
- Module

Each one of those will probably be presented either as a one-off view or a list of multiple. Say that a user click on a Profile Page — now my component would have to fetch data for a **SINGLE USER**. And then that user clicks on their `ManageUsers` dashboard to view all of the users in their system; now `ManageUsers` would have to fetch data for a **LIST OF USERS**.

You can probably pretty easily imagine a situation for a Single view vs a List view for each of the four big data types above.

- User:
  - Profile Page — Single User
  - User Management Dash — List of Users
- Program
  - Edit Program Form — Fetch Single Program
  - Program Dashboard — List of Programs
- And so on, and so forth

Handling all of that data fetching IN each component on top of managing application state, user-flow, interactivity, and everything else would result in some wildly complex components.

But anything fetching data is going to do it in relatively the same way. And each component really just needs to be able to decide how to DISPLAY that information to the user.

Enter `RestEntity`. This component is all about data-fetching.

## API

### General Structure

The `RestEntity` compound component has a couple parts:

- [**`RestEntity`**](#restentity-parent-component)<sup><strong>+</strong></sup> parent component — Manages Data Fetching
- [**`Singleton`**](#restentitysingleton-sub-component)<sup><strong>++</strong></sup>  sub-component — Manages what component to render once the data is successfully fetched
  - This is for one-off pieces of data... like `[GET program by programId]`... you're receiving one program so you should use the `Singleton`
- [**`List`**](#restentitylist-sub-component)<sup><strong>++</strong></sup>  sub-component — Manages what component to render once the data is successfully fetched
  - This is for collections of data... like `[GET all programs]` or `[GET programs by admin id]`... you're receiving a LIST of PROGRAMS so you should use `List`
- [**`Error`**](#restentityerror-sub-component) sub-component — Manages what should be rendered if the data-fetching hits an error
- [**`Loading`**](#restentityloading-sub-component) sub-component — manages what should be rendered while the data is still being fetched.

<sup>+</sup> Required — The `RestEntity` parent component MUST be used in order to reap the benefits

<sup>++</sup> Required (choose one!) — It would make sense to choose either the `List` or `Singleton` sub-component. See [Singleton or List — when to use each](#singleton-or-list-when-to-use-each)

---

### `RestEntity` Parent Component

Our `RestEntity` parent component is going to take in a `href` prop that represents an endpoint that we want to hit. This will drive the fetching and organization of your data. Additionally, it will keep track of the data-fetching lifecycle described below.

This parent component will also keep track of the state of this data-fetching mission. Data fetching has three possible states: LOADING, SUCCESS, ERROR. This `RestEntity` parent component takes the endpoint you want, gets that data, organizes it nicely, keeps track of its own state. Finally, it notifies all of its sub-components what's going on and provides the relevant information.

This parent component is the smartest piece of this compound component. Once you tell it what you want, it's going to go get it and dole out agency depending on whether it succeeds.

That said, this compound component is a team. Even though `RestEntity` will fetch your data and consistently fetch it, that data won't go anywhere or do anything unless you utilize the other sub-components that are listed below.


props:

- `href` — the ENDPOINT that you want to hit!
  - If you want to get the program with the programid of 1, you'd hit the `BASE_URL/programs/program/1`.
  - this `href` can be either 
    1. the FULL URL `props.href="https://reach-team-a-be.herokuapp.com/programs/program/1"`
    2. just the location that you care about: `props.href="/programs/program/1"`

---

### `Singleton` or `List`? When to use each

***wtf is "singleton"?*** First and foremost, I *dearly* apologize for the choice of "singleton" as the word of choice... Java brings the worst out of my naming conventions. The reason this is called "singleton" is because the *Singleton Pattern* is an object-oriented programming pattern that restricts the instantiation of a class to one "single" instance. When I named this component on the night it was drunkenly crafted, I was thinking of that pattern.

The `RestEntity.List` sub-component is to be used when you're fetching a COLLECTION of some entity. When you hit "GET all courses" or "GET courses by user id", the backend is returning a LIST of Course entities.

The `RestEntity.Singleton` sub-component is to be used when you're fetching a SINGLE entity. When you hit [GET a course by course id], the backend is returning one SINGLE `Course`.

`RestEntity.List` is for a **LIST** of whatever you're fetching.

`RestEntity.Singleton` is for a **SINGLE** entity of whatever you're fetching

---


### `RestEntity.Singleton` Sub-Component

As mentioned above, the `Singleton` sub-component is for single entities of data. When you hit a `GET "courses/course/{courseId}"`, the backend is going to respond with one single course. That's when the `Singleton` should be utilized.

props:

- `component` — A component to render once the data is successfully fetched
  - This `prop.component` can be passed in one of two ways:
     1. A named Component, i.e., `<Singleton component={Component} />`
     2. An anonymous, unnamed Component — effectively defining a component inline

#### Understanding `props.component`

The `component` prop is powerful, because after the `RestEntity` parent component successfully retrieves your data, it will give control back to you at this `Singleton` sub-component. This is where you get to decide what to DO with the data that was fetched. What really happens is that our `Singleton` passes the retrieved data as `props` to whatever component you specify here.

Say we were getting one single Course and we wanted to render the following component:

```javascript
// CourseCard.js
import React from "react";

const CourseCard = props => {
  return (
    <div>
      <h1>Course Name: {props.coursename}</h1>
      <p>Description: {props.description}</p>
    </div>
  );
};

export default CourseCard;
```

If we wanted the course with an id of 1, we could hit `GET "/courses/course/1"`. We could tell `RestEntity.Singleton` to render the above component as soon as the data has been fetched.

```javascript
(
  <RestEntity href="/courses/course/1"> {/* Fetching Course with id of 1 */}
    <RestEntity.Singleton component={CourseCard} />
  </RestEntity>
)
```

Or, alternatively, we could define the component specified above inline, as an anonymous, unnamed component.

```javascript
(
  <RestEntity href="/courses/course/1"> {/* Fetching Course with id of 1 */}
    <RestEntity.Singleton 
      component={data => {
        // now we have access to the fetched data!
        console.log(data); // this would print out the fetched Course 
        return (
          <div>
            <h1>Course Name: {data.coursename}</h1>
            <p>Description: {data.description}</p>
          </div>
        );
      }} 
    />
  </RestEntity>
)
```

---

### `RestEntity.List` Sub-Component

The `List` sub-component is to be used when fetching a COLLECTION of data. When you hit a `GET "/courses/"`, the backend is going to respond with a LIST of courses. That's when the `List` should be utilized.

props:

- `path` — The bracket-notation representation of the path to the data you care about... this is essentially your dot-notation for getting from the data that `RestEntity` retrieves to the specific list of data you care about!
- `component` — This works exactly the same as `props.component` for Singleton, except for the fact that NOW it's going to render this component for EVERY piece of data INSIDE THE LIST.

#### Understanding the `props.path`

For instance `GET all courses` responds with an object that looks like this:

<details>

<summary>Unfold to see example JSON</summary>

```json
{
  "_embedded": {
    "courseList": [
      {
        "courseid": 1,
        "coursename": "Course One",
        "coursecode": "COURSE_ONE",
        "coursedescription": "course one description",
        "_links": {
          "self": {
            "href": "https://https://reach-team-a-be.herokuapp.com/courses/course/1"
          },
          "modules": {
            "href": "https://reach-team-a-be.herokuapp.com/modules/by-course/1"
          }
        }
      },
      {
        "courseid": 2,
        "coursename": "Course Two",
        "coursecode": "COURSE_TWO",
        "coursedescription": "course two description",
        "_links": {
          "self": {
            "href": "https://reach-team-a-be.herokuapp.com/courses/course/2"
          },
          "modules": {
            "href": "https://reach-team-a-be.herokuapp.com/modules/by-course/2"
          }
        }
      },
    ]
  },
  "_links": {
    "self": {
      "href": "https://https://reach-team-a-be.herokuapp.com/courses"
    }
  }
}
```

</details>

So, as you can see in the data enclosed above, the top-level `res.data` is not a list

Instead, the collection of courses that we care about is located at `res.data._embedded.courseList`.

Now, as it turns out, the `RestEntity` is smart enough to strip out the `_embedded` property and organize our data to remain consistent with the `Singleton`. After fetching, the `RestEntity` is going to end up with `data` that looks like this:

```javascript
const data = {
  "courseList": [ /* all the courses */  ],
  "_links": {
    "self": {
      "href": "https://https://reach-team-a-be.herokuapp.com/courses"
    }
  }
}
```

We're currently getting all courses, that's why there's a  `courseList` property. If we were getting all programs, that property would be called `programList` and have a list of programs. Those properties change depending on what endpoint you hit. So we ned to tell `RestEntity.List` how to access the list of data that we care about. Hence the `props.path`:

```javascript
(
  <RestEntity.List 
    path={["courseList"]}
    component={data => (
      <div>
        <h1>Course Name: {data.coursename}</h1>
        <p>Code: {data.coursecode}</p>
        <p>Description: {data.coursedescription}</p>
      </div>
    )}
  />
)
```

---

### `RestEntity.Error` Sub-Component

The `RestEntity.Error` sub-component allows you to define what you'd like to display in the case that our data-fetching hits an error.

The `Error` sub-component simply takes `props.children` that represent whatever you want to display if there were to be an error.

For instance, say I wanted to render the following JSX if we hit an error:

```javascript
(
  <div>
    <h1>This is an Error Message</h1>
    <p>Literally anything I want could be inside of here</p>
  </div>
)
```

All I would have to do is WRAP that inside of the `RestEntity.Error`. When you nest any JSX in another React Component, that component implicitly consumes all that JSX as `props.children`.

```javascript
(
  <RestEntity href={ENDPOINT_TO_HIT}>
    
    {/* other sub-components omitted */}
    
    <RestEntity.Error>
      <div>
        <h1>This is an Error Message</h1>
        <p>Literally anything I want could be inside of here</p>
      </div>
    </RestEntity.Error>

  </RestEntity>
)
```

Now, if an error were to occur when fetching data at the endpoint passed into `RestEntity`'s `props.href`, the JSX within the `RestEntity.Error` would be displayed.

---

### `RestEntity.Loading` Sub-Component

The `Loading` sub-component allows you to define what you'd like to display while data is in the process of being fetched. So it's exactly like `RestEntity.Error`, just for Loading state!

You can nest JSX inside within the `<Loading></Loading>` tags to pass those components in as `props.children`. Note that this JSX could be regular HTML or custom React Components.

If I wanted to render the following while loading:

```javascript
(
  <div>
      <h1>Loading...</h1>
      <Spinner />
  </div>
)
```

I can just nest that JSX within the `Loading` tags and it will display while the data is still being obtained.

```javascript
(
  <RestEntity href={ENDPOINT_TO_HIT}>
    
    {/* other sub-components omitted */}

    <RestEntity.Loading>
      <div>
        <h1>Loading...</h1>
        <Spinner />
      </div>
    </RestEntity.Loading>
    
  </RestEntity>
)
```

---

## Tutorial

Jumping straight into the `RestEntity` would probably feel rather heady and a bit overwhelming. So let's start by looking at a regular React component that we're more familiar with.

We're going to take the `<ProgramComponent />` below and transform it by implementing the `<RestEntity />` component.

### `ProgramComponent` — Before `RestEntity`

Let's look at the following component. It does a couple of things:

- It receives a `programId` from `props`.
  
- As soon as the component mounts, this component fetches data from an endpoint `/programs/program/${props.programId}`

- Since data-fetching is an `async` side-effect, there's some logic happening in our component. There are THREE possible states of existence.

  1. Loading — As soon as this component mounts, `data` is initialized as `undefined`; `error` is initialized to an empty String (`""`), and the asynchronous action is triggered. We are waiting for our `axiosAuth().get()` to resolve to Success or Fail.
  
  2. Success — If we hit the `.then()` clause in our axios call, then clearly we have successfully obtained some data! So we're going to set that data to our slice of `data` state!

  3. Error — If we hit the `catch()` clause in our axios call, then there must've been some problem. Thus, we'll set our `error` slice of state!!

- Due to the `async` nature of this component, our `return` statement contains some logic to display information about how that data-fetching mission is going. 
  - The state of a component is for computers and for programmers. A USER would have no clue that this component is trying to load up some program data... they'd expect to SEE that data in some fashion. If the data isn't there, though, the user's first instinct WILL NOT BE to hit `F12` and scroll through React DevTools and see what's up in the state hooks or to see if you `console.log(err)`.
  - So if the component is loading, let's show simple loading message to our user.
  - If the data-fetching errors-out, we should SHOW our user that there's been a problem.
  - But best case-scenario, the data does load. Once we have the program that we care about, we'll take that data and make some HTML to display that data to the user.

I know you know all of this. The verbosity of my bullet points above are not intended to feel condescending. Rather, I'm trying to bring us back to the basics of WHY we use `axios` calls, `useEffect` and `useState` hooks. Further, I want you to think about these components as ***state machines***. Because that's exactly what they are. And this frame of thinking is exactly how you should approach the `RestEntity` component.

> ### Every component that performs data-fetching has at least three states: ***LOADING***, ***SUCCESS***, ***ERROR***. Rather than `console.log(error)` when things go wrong, we should be SHOWING our User that there has been a problem.

```javascript
import React from "react";
import axios from "axios";

const ProgramComponent = props => {
  const [data, setData] = React.useState(undefined);
  const [error, setError] = React.useState(undefined);

  React.useEffect(() => {
    axiosAuth().get(`/programs/program/${props.programId}`)
    .then(res => {
      setData(res.data);
    })
    .catch(err => {
      setError(err);
    });
  }, []);

  return (
    <>
    {
      // if data exists and is truthy (i.e., not `undefined` or `null`)
      // then we'll render our program card with information!
      data ?
        <div>
          <h1>Program Name: {data.programName}</h1>
          <p>Description: {data.description}</p>
        </div>
        // otherwise, we'll show the user that we're loading up their data
        : <div>Loading...</div>
    }
    {
      // if error exists, then we'll render this warning to our user!
      error && <p>Oh no! There's been a problem!</p>
    }
    </p>
  );
};

export default ProgramComponent;
```

So our `ProgramComponent` above might look fairly simple compared to all the cool shit you know how to do. But. When you break it down, that `ProgramComponent` is juggling a lot of things even though it only has two jobs. We haven't yet even talked about Redux (or state management in general), other components, interactivity.

Currently, this component worries about:

1. Fetching Data — which comes with all complications discussed above

2. How to present that data to our user

But what if it had to worry about just one job:

1. **How to present that data to our user**

- ~~Fetching Data — which comes with all complications discussed above~~

Let's try it out with the `ProgramComponent` we were looking at previously

---

### `ProgramComponent` — With `RestEntity`

<br />
<details>

<summary>Drop down to see original `Program.js` code</summary>

```javascript
import React from "react";
import axios from "axios";

const ProgramComponent = props => {
  const [data, setData] = React.useState(undefined);
  const [error, setError] = React.useState(undefined);

  React.useEffect(() => {
    axiosAuth().get(`/programs/program/${props.programId}`)
    .then(res => {
      setData(res.data);
    })
    .catch(err => {
      setError(err);
    });
  }, []);

  return (
    <>
    {
      // if data exists and is truthy (i.e., not `undefined` or `null`)
      // then we'll render our program card with information!
      data ?
        <div>
          <h1>Program Name: {data.programName}</h1>
          <p>Description: {data.description}</p>
        </div>
        // otherwise, we'll show the user that we're loading up their data
        : <div>Loading...</div>
    }
    {
      // if error exists, then we'll render this warning to our user!
      error && <p>Oh no! There's been a problem!</p>
    }
    </p>
  );
};

export default ProgramComponent;
```

</details>
<br/>

So our goal is to use the `<RestEntity />` component in our `<ProgramComponent />` so that it the `ProgramComponent` itself doesn't need to worry about fetching data, it can just worry about presenting that data.

Something to keep in mind: our `ProgramComponent` needs to present ONE SINGLE program. So any endpoint it hits should be feeding back ONE Program.

Reminder: `RestEntity` is a compound component with multiple layers:

```javascript
// When dealing with one Single Entity, use the `Singleton`
<RestEntity href={/* SOME ENDPOINT */}>
  <Singleton /> 
  <Error />
  <Loading />
</RestEntity>
```

Hmmm... There's something familiar about this pattern here. Let's look at the `useEffect` hook in our original `ProgramComponent.js`...

```javascript
 React.useEffect(() => {
    axiosAuth().get(`/programs/program/${props.programId}`)
    .then(res => {
      setData(res.data);
    })
    .catch(err => {
      setError(err.message);
    });
  }, []);
```

That effect:

- FETCH — makes a GET request at an endpoint `"/programs/program/${props.programId}"`

- SUCCESS — sets data in `.then`

- ERROR — snags an error message in `.catch`

- LOADING — this is less visible, but the `async` nature of a `axios.get` implicitly includes "loading", as the Promise returned from the `.get()` will either SUCCEED or FAIL (error) -- but it's definitely going to RESOLVE. So BEFORE it resolves is when we're loading.

The four parts of a fully implemented `RestEntity` align EXACTLY with that same approach.

```javascript
React.useEffect(() => {
  axios.get(/* FETCH — "endpoint" */)
  .then(/* SUCCESS — data obtained */)
  .catch(/* FAIL — some error happened */)
  .finally(/* RESOLVE */)
}, []);

<RestEntity href="endpoint"> {/*FETCH — .get("endpoint")*/}
  <Singleton />  {/* SUCCESS — data obtained */}
  <Error /> {/* FAIL — some error happened */}
  <Loading /> {/* RESOLVE */}
</RestEntity>
```

<br>

> ##  Yup. Our `RestEntity` component is the JSX equivalent of an `axios` request.

<br>

Our `RestEntity` parent component takes in a `prop.href` to decide where the data it's supposed to fetch is located. What endpoint did we use in `ProgramComponent.js`?? This was located in the `useEffect` hook:

```javascript
axiosAuth().get(`/programs/program/${props.programId}`)
```

So... let's try this out:

```javascript
import React from "react";
// import axios from "axios";

import RestEntity from "./RestEntity";

const ProgramComponent = props => {
  // const [data, setData] = React.useState(undefined);
  // const [error, setError] = React.useState(undefined);

  // React.useEffect(() => {
  //   axiosAuth().get(`/programs/program/${props.programId}`)
  //   .then(res => {
  //     setData(res.data);
  //   })
  //   .catch(err => {
  //     setError(err);
  //   });
  // }, []);

  return (
    <RestEntity href={`/programs/program/${props.programId}`}>
      {/*
        okay... so what the hell did this do? 
        Now the RestEntity has supposedly fetched my data.
        But how do I access anything with it? 
      */}
      <RestEntity.Singleton />
      <RestEntity.Error />
      <RestEntity.Loading />
    </RestEntity>
  );
};

export default ProgramComponent;
```

Our `RestEntity` parent component is going to take in that `href` prop and hit `GET "/programs/program/${programId}"` . Bang. Boom. In one line of code, you have effectively triggered a GET request to an endpoint. For now, that’s all you need to know about ***why*** that hits an endpoint: because you told it to.

Okay, so what about the next part? How do I DO anything with that data? And how does the whole Loading & Error state come into play?

That's where the sub-components come in.

We have the `Singleton` for success state, `Error` for error state, and `Loading` for loading state.

Let's think all the way back to the original `ProgramComponent.js`. What did its return statement look like?

```javascript
return (
    <>
    {
      // if data exists and is truthy (i.e., not `undefined` or `null`)
      // then we'll render our program card with information!
      data ?
        <div>
          <h1>Program Name: {data.programName}</h1>
          <p>Description: {data.description}</p>
        </div>
        // otherwise, we'll show the user that we're loading up their data
        : <div>Loading...</div>
    }
    {
      // if error exists, then we'll render this warning to our user!
      error && <p>Oh no! There's been a problem!</p>
    }
    </p>
  );
```

It was handling a bunch of logic to decide whether it was in a place to show data or not.

But the essence behind all the ternaries and truthiness fail-safes contained three different
views based on the three shapes of state (LOADING, SUCCESS, ERROR).

LOADING:

```javascript
// if data is still being fetched
// we'll show the user that we're loading up their data
return <div>Loading...</div>;
```

ERROR:

```javascript
// if we hit an error, then we'll render this warning to our user!
return <p>Oh no! There's been a problem!</p>;
```

SUCCESS:

```javascript
// if data was successfully fetched, 
// then we'll render our program JSX to display that data
return  (
  <div>
    <h1>Program Name: {data.programName}</h1>
    <p>Description: {data.description}</p>
  </div>
);
```

Do you notice anything interesting there? Of the three different states, only ONE depends on external data of any sort—SUCCESS. We can display anything we want to for a Loading message or an Error message... the only thing that depends on the actual data is the success!! And logically so, because if you're loading data or failed to get the data, then you definitely don't have any data that you could depend on.

So let's plug our `Error` and `Loading` states into our new and improved `ProgramComponent.js`

```javascript
import React from "react";
import RestEntity from "./RestEntity";

const ProgramComponent = props => {
  return (
    <RestEntity href={`/programs/program/${props.programId}`}>

      {/* WE STILL DON'T KNOW WHAT TO DO HERE */}
      <RestEntity.Singleton />
      
      {/* The JSX inside this will only display if we hit an error */}
      <RestEntity.Error>
        <p>Oh no! There's been a problem!</p>
      </RestEntity.Error>
      
      {/* The JSX inside this will only display when we're loading up data */}
      <RestEntity.Loading>
        <div>Loading...</div>
      </RestEntity.Loading>

    </RestEntity>
  );
};

export default ProgramComponent;
```

Wow! We now have a component that can:

- Fetch Data from the endpoint that we specified

- Display a Loading message when that data is still being fetched.

- Display a warning message if something goes wrong while fetching the data

There's just one piece missing... and it's the most important piece: HOW do we display the JSX that presents the data we care about.

In this example, we still need to render this on SUCCESS:

```javascript
// if data was successfully fetched, 
// then we'll render our program JSX to display that data
(
  <div>
    <h1>Program Name: {data.programName}</h1>
    <p>Description: {data.description}</p>
  </div>
);
```

That's where the `RestEntity.Singleton` sub-component comes in. The most important prop that `Singleton` receives is the `props.component`. The value assigned to this prop should be a React Component (which is acting as a callback component). This can look two different ways:

- An anonymous, unnamed component passed in as a callback
- A named Component passed in as a callback

If you opt for the , this is what it would look like in this example:

```javascript
(
  <RestEntity.Singleton 
    component={data => {
      return  (
        <div>
          <h1>Program Name: {data.programname}</h1>
          <p>Description: {data.description}</p>
        </div>
      );
    }}
  />
)
```

Alternatively, you could use the implicit return feature of an arrow function:

```javascript
(
  <RestEntity.Singleton 
    component={data => (
      <div>
        <h1>Program Name: {data.programname}</h1>
        <p>Description: {data.description}</p>
      </div>
    )}
  />
)
```

But consider this: what if we had a previously defined Component that expected `props` that look a lot like our actual `data`...

```javascript
import React from "react";

const ProgramCard = props => {
  return (
    <div>
      <h1>Program Name: {props.programname}</h1>
      <p>Description: {props.description}</p>
    </div>
  );
};

export default ProgramCard;
```

If that component was defined elsewhere, we could use it as the `props.component` for `Singleton` like so:

```javascript
(<RestEntity.Singleton component={ProgramCard} />)
```

If you don't understand why that works, feel free to open up the [Quick Refresher on Callbacks and Functions](#a-quick-refresher-on-callbacks--functions) section for examples of that in regular JavaScript functions.

Components are functions. And functions can be named or anonymous.
So Components can be named or anonymous because Components are functions.

```javascript
// named component
const Component = props => {
  return (
    <div>
      <h1>This is JSX</h1>
      <p>It could even depend on data passed in like: {props.dataPassedIn}</p>
    </div>
  )
};

// anonymous, unnamed component
props => {
  return (
    <div>
      <h1>This is JSX</h1>
      <p>It could even depend on data passed in like: {props.dataPassedIn}</p>
    </div>
  );
};
```

<details>
<summary>Or, if traditional, non-arrow function components are more your jam</summary>

```javascript
// named component
function Component(props) {
  return (
    <div>
      <h1>This is JSX</h1>
      <p>It could even depend on data passed in like: {props.dataPassedIn}</p>
    </div>
  );
}

// anonymous, unnamed component
function(props) {
  return (
    <div>
      <h1>This is JSX</h1>
      <p>It could even depend on data passed in like: {props.dataPassedIn}</p>
    </div>
  );
}
```

</details>
<br>

With the `Singleton component={callbackFn}`, the `callbackFn`, that could be a NAMED COMPONENT or an ANONYMOUS COMPONENT. Either way, it's being used as a Callback Component.

```javascript
// anonymous, unnamed callback Component passed in
// created and passed in at the same time
(
  <RestEntity.Singleton 
    component={data => (
      <div>
        <h1>Program Name: {data.programname}</h1>
        <p>Description: {data.description}</p>
      </div>
    )}
  />
)

// named Component passed in as a callback here
// it must've been created/defined elsewhere
(
  <RestEntity.Singleton 
    component={ProgramCard}
  />
)
```

### Basic Functioning Implementation

Let's look at our finished `ProgramComponent` now that it's using the `RestEntity`

```javascript
import React from "react";
import RestEntity from "./RestEntity";

const ProgramComponent = props => {
  return (
    {/* The data we care about is at the endpoint passed into `href` */}
    <RestEntity href={`/programs/program/${props.programId}`}>

      {/* This JSX will render when our data is successfully obtained */}
      <RestEntity.Singleton 
        component={data => (
          <div>
            <h1>Program Name: {data.programname}</h1>
            <p>Description: {data.description}</p>
          </div>
        )}
      />
      
      {/* The JSX inside this will only display if we hit an error */}
      <RestEntity.Error>
        <p>Oh no! There's been a problem!</p>
      </RestEntity.Error>
      
      {/* The JSX inside this will only display when we're loading up data */}
      <RestEntity.Loading>
        <div>Loading...</div>
      </RestEntity.Loading>

    </RestEntity>
  );
};

export default ProgramComponent;
```

Now we could have some page where we wanted to use this `ProgramComponent` and simply pass in a `programId` as `props.programId`. The component will handle the fetching of data for that program. Loading and Error messages are displayed as needed. If it successfully gets the data we want, it will render the following JSX.

```javascript
(
  <div>
    <h1>Program Name: {data.programname}</h1>
    <p>Description: {data.description}</p>
  </div>
)
```

And you don't see one single line of logic in that component. That's one powerful pattern. **BUT... there's still something missing.**

### What's Missing? Flexible Abstractions

Our `ProgramComponent` in its current place is powerful. But is it flexible? 

Not remotely. The `ProgramComponent` is going to display same JSX for any time I render it. 

```javascript
(
  <div>
    <h1>Program Name: {data.programname}</h1>
    <p>Description: {data.description}</p>
  </div>
)
```

What if I wanted to add a button to that program? Or I wanted to maybe include the `programtype` or whatever. Would I have to build out a fully-featured implementation of the `RestEntity` component for one measly button?

You could... but yikes. The `RestEntity` is flexible as hell. What if we tackled somme of the same inversion of control that `RestEntity` gives to us — the ability to render any sort of JSX or component.

Let's shift our approach a bit. Let's refactor the `ProgramComponent` to act as an abstraction from the `RestEntity` so that other team members can re-use the same component for data fetching any time they need to fetch one single program. 

Since we're shifting the approach, I'm going to refer to our NEW Program-fetching component to `ProgramSingleton`.

Currently, the `ProgramComponent` knows:

- How to hit ONE endpoint... `GET "/programs/program/${programId}"`
- How to render ONE variation of JSX for Program data.

But it has all of the power of the `RestEntity` waiting to be used.

What could the `ProgramSingleton` do to extend flexibility

- We should allow someone to pass in a `href` of their choosing. What if the backend introduced a `GET program by programname` endpoint that you suddenly wanted to use? Our `ProgramComponent` only took in `props.programId`. We could change that to be `props.href` where someone could pass in any endpoint they wanted.

- We should allow someone to choose the component they wanted to render for this `ProgramSingleton` view. That way, we could reuse this component for the `EDIT Program` form or the `VIEW Program` Page!

- But maybe we could DEFAULT our rendered program JSX in case someone wanted that default. If we choose that, our default component could additionally allow `props.children` to be passed in to build WITHIN that default JSX.

```javascript
import React from "react";
import RestEntity from "./RestEntity";

const ProgramSingleton = props => {
  let endpointToHit;

  if (props.href) {
    endpointToHit = props.href;
  }
  else if (props.programId) {
    endpointToHit = `/programs/program/${props.programId}`
  }
  else {
    throw new Error(
      `Invalid endpoint: Please pass in href or a programId`
      );
  }

  // default callback component -- this is the JSX that will render
  // if someone calls renders <ProgramSingleton /> without
  // a 'props.mappedChild' callback component
  const defaultRender = data => (
    <div>
      <h1>Program Name: {data.programname}</h1>
      <p>Description: {data.description}</p>
      {/* If someone renders this component without a 'mappedChild` prop,
      they could potentially nest JSX inside the 
      <ProgramSingleton></ProgramSingleton> opening and closing tags.
      We'd want to include that JSX in our default render!
      */}
      {props.children}
    </div>
  );

  return (
    <RestEntity href={endpointToHit}>

      {/* This JSX will render when our data is successfully obtained */}
      <RestEntity.Singleton 
        component={props.mappedChild ?? defaultRender}
      />
      
      {/* The JSX inside this will only display if we hit an error */}
      <RestEntity.Error>
        <p>Oh no! There's been a problem!</p>
      </RestEntity.Error>
      
      {/* The JSX inside this will only display when we're loading up data */}
      <RestEntity.Loading>
        <div>Loading...</div>
      </RestEntity.Loading>

    </RestEntity>
  );
};

export default ProgramSingleton;
```

And THAT is one crazy component.

---

## Supporting Info

<details>

  <summary>Compound Component "Dot Notation"</summary>

Quick note on this "dot-notation" with components, for anyone who hasn't ever encountered that before: React Components are JavaScript functions (even the class components). And JavaScript functions are JavaScript OBJECTS. And JS Objects have PROPERTIES.

This example above simply takes four components: `<RestEntity />`, `<Singleton />`, `<Error />`, `<Loading />`  and wraps them up into one cohesive package by doing this:

```javascript
RestEntity.Singleton = Singleton; // Singleton is just a function component
RestEntity.Error = RestError; // RestError is just a function component
RestEntity.Loading = Loading; // Loading is just a function component

export default RestEntity; // RestEntity is now a COMPOUND component
```

</details>




<br>
<details>
<summary>Quick Refresher on Callbacks & Functions</summary>

---

### A Quick refresher on callbacks & functions

---

#### Functions First

- functions can be ***arrow*** functions or ***traditional (non-arrow)***
- arrow functions can have ***explicit*** or ***implicit*** `return` statements
- functions can be ***named*** or ***anonymous***

```javascript
// NAMED VS ANONYMOUS
const namedArrowImplicit = param => param.toString().toUpperCase();

const namedArrowExplicit = param => {
  return param.toString().toUpperCase();
}

function namedTraditional(param) {
  return param.toString().toUpperCase();
}

// Note that the following Anonymous Functions
// would have no noticeable effect of any sort
// 
// they are created where they stand
// but then they are not accessible after 
// initial creation

// ANONYMOUS ARROW
param => (param.toString().toUpperCase());
// ANONYMOUS ARROW
param => {
  return param.toString().toUpperCase();
};
// ANONYMOUS TRADITIONAL
function(param) {
  return param.toString().toUpperCase();
}

// fun fact: arrow functions are 
// actually a shorthand for declaring anonymous functions
// 
// what happens when you name an anonymous function?
// this is all arrow functions are under the hood
const namedAnonymousFunction = function(param) {
  return param.toString().toUpperCase();
}
```

#### Callbacks

You can define and use callbacks in one of two ways:

- Anonymous Functions
- Named Functions

Consider the `.map` function, the function you've probably used in JS more than any other function except `console.log()`

`.map` requires a CALLBACK FUNCTION as a parameter!

```javascript
const array1 = [1, 2, 3, 4, 5]

const map1 = array1.map(x => x * 2);
console.log(map1); // -> [2, 4, 6, 8, 10]
```

Here, `x => x * 2` is your callback function. It's anonymous. This is how you usually use the `map` function.

But what if it wasn't anonymous?

```javascript
const array1 = [1, 2, 3, 4, 5]

// anonymous callback --- created and passed at the same time
const map1 = array1.map(x => x * 2);
console.log(map1); // -> [2, 4, 6, 8, 10]


const namedCallback = x => x * 2; // named callback created
const map2 = array1.map(namedCallback); // named callback passed in
console.log(map2); // -> [2, 4, 6, 8, 10]
```

</details>
<br>