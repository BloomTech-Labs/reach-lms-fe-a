# The `RestEntity` Component and how to use it

## Overview

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

In the above example, we have a fully-implemented `<RestEntity />` component with a `<Singleton />`, `<Error />`, `<Loading />` nested inside.

As you may have guessed, the `Error` and `Loading` parts are only going to display their children when our data-fetching hits an error-state or a loading state.

But what’s happening with the `href` prop for `<RestEntity />`? 

And *what in the world* is going on with the `component={data => (<Component {...data} />)}` for `<Singleton />`?

This may look strange or scary or new to some, but trust me... it’s nothing you haven’t done before—even if you don't realize it quite yet.

If this pattern looks familiar to you, that's probably b/c you've seen it before!

- it could be that you recognize this pattern from some `<SecureRoute />`  components (or even the old API for the `<Route />` components from `"react-router-dom"`).

- Or, this pattern has been generally referred to as `render props` . If ya know, you know. If ya don't: no worries.

- And finally, you may recognize that this looks a hell of a lot like a callback function. And that’s because ***that's exactly what it is***. At the end of the day, all of our React components are **functions**. *(Yes, technically even your class components are functions... cuz JS... but don't worry about that.)* And every single one of them has the ability to take in `props`. All this `RestEntity` does is FETCH DATA FOR YOU based on the endpoint you pass on in. Then, it hands the data you care about back to you so that you can take that data as PROPS. For any component you wish to use that data for! This is a powerful pattern. Using the `RestEntity` is literally the 

So here’s the flow. Our `<RestEntity href=“/endpoint”>` parent component is going to take in that `href` prop and hit that endpoint in our backend. Bang. Boom. In one line of code, you have effectively triggered a GET request to an endpoint. For now, that’s all you need to know about why that hits an endpoint (though I’ll expand later on for anyone who wants to know how this component is working under the hood).

Okay, so what about the next part?

```javascript
<Singleton 
  component={data => (
    <Component />
)}
```
