import React from 'react';
import { axiosAuth } from '../../../utils';

const useRestfulFetch = url => {
  const [data, setData] = React.useState({});
  const [links, setLinks] = React.useState({});
  const [error, setError] = React.useState({});

  React.useEffect(() => {
    axiosAuth()
      .get(url)
      .then(res => {
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
