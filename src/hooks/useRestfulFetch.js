import React from 'react';
import { axiosWithAuth } from '../utils';

const API_BASE_URL = 'https://reach-team-a-be.herokuapp.com';

export const useRestfulFetch = url => {
  const [data, setData] = React.useState(undefined);
  const [links, setLinks] = React.useState(undefined);
  const [error, setError] = React.useState(null);
  const [status, setStatus] = React.useState('pending');

  const formedUrl = url?.includes(API_BASE_URL) ? url : `${API_BASE_URL}${url}`;

  React.useEffect(() => {
    if (!formedUrl) {
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
