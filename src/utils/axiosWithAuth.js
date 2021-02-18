import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('okta-token-storage');
  const parsed_token = JSON.parse(token);
  const access_token = parsed_token['accessToken']['value'];
  return axios.create({
    headers: {
      Authorization: `Bearer ${access_token}`, //OR Authorization: `Bearer ${token}`, // have to check api
    },
  });
};
