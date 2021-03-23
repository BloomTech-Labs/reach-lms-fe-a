import React from 'react';
import { axiosWithAuth } from '../utils';

const API_BASE_URL = 'https://reach-team-a-be.herokuapp.com';

export const useRestfulFetch = url => {
  const [data, setData] = React.useState(undefined);
  const [links, setLinks] = React.useState(undefined);
  const [error, setError] = React.useState(null);
  const [status, setStatus] = React.useState('pending');

  // we want to allow our team to choose between a full URI or simply the resource location
  let formedUrl;
  // so we need to check to make sure they actually passed in a valid argument
  if (url && url !== '') {
    // if url exists and is not an empty string, let's see if it has the API_BASE_URL in it
    formedUrl = url.includes(API_BASE_URL) ? url : `${API_BASE_URL}${url}`;
  } else {
    // if the url does not exist or it is an empty string, we're going to go ahead and skip this call
    formedUrl = 'SKIPPING_THIS_CALL';
  }

  React.useEffect(() => {
    if (!formedUrl || formedUrl === 'SKIPPING_THIS_CALL') {
      // if our formedUrl somehow doesn't exist
      // OR it equals our SKIP call, we'll not hit the backend
      return;
    }

    setStatus('pending');
    axiosWithAuth()
      .get(formedUrl)
      .then(res => {
        setStatus('success');
        const hasEmbedded = res.data.hasOwnProperty('_embedded');
        const hasLinks = res.data.hasOwnProperty('_links');
        setLinks(hasLinks ? res.data._links : {});
        if (hasEmbedded) {
          setData(res.data._embedded);
        } else {
          setData(res.data);
        }
      })
      .catch(err => {
        setError(err);
        setStatus('error');
      })
      .finally(() => setStatus('idle'));
  }, [formedUrl]);

  return { data, links, error, status };
};
