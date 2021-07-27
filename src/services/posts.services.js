import axios from 'axios';
const API = ({ method, id, body }) => {
  return axios({
    method,
    url: id
      ? `https://jsonplaceholder.typicode.com/posts/${id}`
      : 'https://jsonplaceholder.typicode.com/posts',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    data: body,
  });
};

export default API;
