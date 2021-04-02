# The `RestEntity` Component and how to use it

## Intro

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

> Every component that performs data-fetching has at least three states: ***LOADING***, ***SUCCESS***, ***ERROR***. Rather than `console.log(error)` when things go wrong, we should be SHOWING our User that there has been a problem.

### `ProgramComponent.js` — Before RestEntity

```javascript
import React from "react";
import axios from "axios";

const ProgramComponent = props => {
  const [data, setData] = React.useState(undefined);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    axiosAuth().get(`/programs/program/${props.programId}`)
    .then(res => {
      setData(res.data);
    })
    .catch(err => {
      setError(err.message);
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
        // otherwise, we'll show the user that we're loading 
        // up their data
        : <div>Loading...</div>
    }
    {
      // if error exists and is not an empty string,
      // then we'll render this tiny p tag with a warning to our user!
      error && error !== "" && <p>Oh no! There's been a problem! {error}</p>
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

## The Problem

In an application like Reach LMS, many of our components are going to have to worry about data fetching. There's most likely going to be at LEAST two different components for each "Category of Data," so to speak.

In Reach LMS, the four biggest root types of data are:

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


## RestEntity Overview

The `RestEntity` component is a compound component that utilizes the React Context API to handle data-fetching and consume relational links. Though using such a component will feel new and different to many of you, I promise it appears more intimidating than it really is. Once you're working with it,
it'll feel very similar to the same old React that you're used to.

The whole purpose of the `RestEntity` is to simplify the process of interacting with HAL-shaped data from our RESTful, HATEOAS-oriented backend. That is to say, every single data object has hypermedia links. Instead of worrying about complex Redux thunks and/or over-the-top routing, our `RestEntity` is going to take whatever endpoint you want to feed it and get the data you care about. Then, it'll give control back to you so you can do what you're so good at doing: building components to PRESENT information.

The `RestEntity` has a couple parts, most of which are completely optional.

```javascript
const EndpointComponent = props => {
  return (
    
    <RestEntity href=“/endpoint”>

      {/* Successful Fetch State */}  
      <RestEntity.Singleton 
        component={data => (
          <SomeComponent {...data} />
        )}
      />

      {/* Error State */}  
      <RestEntity.Error>
        <div>Oh no...! An error has occurred!</div>
      </RestEntity.Error>

      {/* Loading State */}  
      <RestEntity.Loading>
        <Spinner />
      </RestEntity.Loading>

    </RestEntity>
  );

};

```

Quick note on this "dot-notation" with components, for anyone who hasn't ever encountered that before: React Components are JavaScript functions (even the class components). And JavaScript functions are JavaScript OBJECTS. And JS Objects have PROPERTIES.

This example above simply takes four components: `<RestEntity />`, `<Singleton />`, `<Error />`, `<Loading />`  and wraps them up into one cohesive package by doing this:

```javascript
RestEntity.Singleton = Singleton; // Singleton is just a function component
RestEntity.Error = RestError; // RestError is just a function component
RestEntity.Loading = Loading; // Loading is just a function component

export default RestEntity; // RestEntity is now a COMPOUND component
```

In the above example, we have a fully-implemented `<RestEntity />` component with a `<Singleton />`, `<Error />`, `<Loading />` nested inside.

As you may have guessed, the `Error` and `Loading` parts are only going to display their children when our data-fetching hits an error-state or a loading state.

But what’s happening with the `href` prop for `<RestEntity />`? 

And *what in the world* is going on with the `component={data => (<Component {...data} />)}` for `<Singleton />`?

This may look strange or scary or new to some, but trust me... it’s nothing you haven’t done before—even if you don't realize it quite yet.

If this pattern looks familiar to you, that's probably b/c you've seen it before!

- it could be that you recognize this pattern from some `<SecureRoute />`  components (or even the old API for the `<Route />` components from `"react-router-dom"`).

- Or, this pattern has been generally referred to as `render props` . If ya know, you know. If ya don't: no worries.

- And finally, you may recognize that this looks a hell of a lot like a callback function. And that’s because ***that's exactly what it is***. At the end of the day, all of our React components are **functions**. *(Yes, technically even your class components are functions... cuz JS... but don't worry about that.)* And every single one of them has the ability to take in `props`. All this `RestEntity` does is FETCH DATA FOR YOU based on the endpoint you pass on in. Then, it hands the data you care about back to you so that you can take that data as PROPS. For any component you wish to use that data for! This is a powerful pattern.

So here’s the flow. Our `<RestEntity href=“/endpoint”>` parent component is going to take in that `href` prop and hit that endpoint in our backend. Bang. Boom. In one line of code, you have effectively triggered a GET request to an endpoint. For now, that’s all you need to know about why that hits an endpoint (though I’ll expand later on for anyone who wants to know how this component is working under the hood).

Okay, so what about the next part?

```javascript
<Singleton 
  component={data => (
    <Component />
  )}
/>
```