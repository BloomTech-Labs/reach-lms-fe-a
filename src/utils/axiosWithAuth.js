import axios from 'axios';

export const getBaseParams = () => {
  const token = localStorage.getItem('okta-token-storage');
  const parsed_token = JSON.parse(token);
  const access_token = parsed_token['accessToken']['value'];
  return {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
};

export const axiosWithAuth = () => {
  return axios.create(getBaseParams());
};

export const axiosAuth = () => {
  return axios.create({
    ...getBaseParams(),
    baseURL: 'https://reach-team-a-be.herokuapp.com',
  });
};
