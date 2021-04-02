# The `RestEntity` Component and how to use it

## General

The `RestEntity` component is a compound component that utilizes the React Context API to handle data-fetching and consume relational links. Though using such a component will feel new and different to many of you, I promise it appears more intimidating than it really is. Once you're working with it,
it'll feel very similar to the same old React that you're used to.

The whole purpose of the `RestEntity` is to simplify the process of interacting with HAL-shaped data from our RESTful, HATEOAS-oriented backend. That is to say, every single data object has hypermedia links. Instead of worrying about complex Redux thunks and/or over-the-top routing, our `RestEntity` is going to take whatever endpoint you want to feed it and get the data you care about. Then, it'll give control back to you so you can do what you're so good at doing: building components to PRESENT information.

The `RestEntity` has a couple parts, most of which are completely optional.

```javascript
const EndpointComponent = props => {
  return (
    
    <RestEntity href=“/endpoint”>

      {/* Successful Fetch State */}  
      // Successful Fetch State
      <RestEntity.Singleton 
        component={data => (
          <SomeComponent props={...data} />
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

As you may have guessed, `Error` and `Loading` are only going to display their children when our data-fetching hits an error-state or a loading state.

But what’s happening with the `href` prop for `<RestEntity />`and the `component={data => (<Component />)}` for `<Singleton />`. This may look strange and scary and new to some, but trust me... it’s nothing you haven’t done before—whether you realized it or not. 

If it looks familiar, though, it could be that you recognize this pattern from some `<SecureRoute />`  components . This pattern has been known as `render props` to some. And finally, you may recognize that this looks a hell of a lot like a callback function. And that’s because it is. 

Here’s the flow. Our `<RestEntity href=“/endpoint”>` parent component is going to take in that `href` prop and hit that endpoint in our backend. Bang. Boom. In one line of code, you have effectively triggered a GET request to an endpoint. For now, that’s all you need to know about why that hits an endpoint (though I’ll expand later on for anyone who wants to know how this component is working under the hood). 

Okay, so what about the next part? 
 
```javascript
<Singleton 
  component={data => (
    <Component />
)}
```





#reach_lms/readme