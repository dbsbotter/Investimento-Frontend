import axios from 'axios';
import { notification } from 'antd';

const openNotification = () => {
  notification.open({
    message: 'Sessão expirada',
    description: 'Sessão expirada, realize o login novamente.',
  });
};

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error.response.status) {
      localStorage.removeItem('@Investimento:token');
      localStorage.removeItem('@Investimento:user');

      openNotification();

      setTimeout(function () {
        window.location = '/';
      }, 2000);
    } else {
      return Promise.reject(error);
    }
  },
);

export default api;
