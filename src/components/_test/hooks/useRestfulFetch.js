import React from 'react';
import { axiosWithAuth } from '../../../utils';

const useRestfulFetch = url => {
  const [data, setData] = React.useState({});
  const [links, setLinks] = React.useState({});
  const [error, setError] = React.useState({});

  React.useEffect(() => {
    axiosWithAuth()
      .get(url)
      .then(res => {
        console.log(res.data);
        const hasEmbedded = res.data.hasOwnProperty('_embedded');
        const hasLinks = res.data.hasOwnProperty('_links');

        setLinks(hasLinks ? res.data._links : {});

        if (hasEmbedded) {
          setData(res.data._embedded);
        } else {
          const { _links, ...rest } = res.data;
          setData({ ...rest });
        }
      })
      .catch(err => setError(err));
  }, [url]);

  return { data, links, error };
};

export default useRestfulFetch;
