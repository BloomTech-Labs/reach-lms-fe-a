const routeToLink = url => {
  const splitUrl = url.split('https://reach-team-a-be.herokuapp.com');
  return splitUrl[1];
};

export default routeToLink;
