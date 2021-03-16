import axios from 'axios';

const getBaseParams = () => {
  const token = localStorage.getItem('okta-token-storage');
  const parsed_token = JSON.parse(token);
  const access_token = parsed_token['accessToken']['value'];
  return {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
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
