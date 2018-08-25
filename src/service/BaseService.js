import axios from 'axios';

class BaseService {
  static BASE_URL = 'https://reactnd-books-api.udacity.com';

  config = () => {
    let token = localStorage.token;

    if (!token) {
      token = localStorage.token = Math.random().toString(36).substr(-8);
    }

    return token;
  }

  wrapConfig = () => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.config()}`
    };

    return { headers };
  }

  get = async (url) => {
    let response, success;

    try {
      response = await axios.get(BaseService.BASE_URL + url, this.wrapConfig());
      success = true;
    } catch (e) {
      response = e.response;
      success = false;
    }

    const fatal = !response || (response.status >= 500);
    const data = fatal ? null : response.data;
    const headers = fatal ? null : response.headers;
    const errors = !!response && !!response.data ? response.data : [];

    return this.serviceResponse({ fatal, data, headers, success, errors });
  }

  post = async (url, params) => {
    let response, success;

    try {
      response = await axios.post(BaseService.BASE_URL + url, params, this.wrapConfig());
      success = true;
    } catch (e) {
      response = e.response;
      success = false;
    }

    const fatal = !response || (response.status >= 500);
    const data = fatal ? null : response.data;
    const headers = fatal ? null : response.headers;
    const errors = !!response && !!response.data ? response.data : [];

    return this.serviceResponse({ fatal, data, headers, success, errors });
  }

  update = async (url, params) => {
    let response, success;

    try {
      response = await axios.put(BaseService.BASE_URL + url, params, this.wrapConfig());
      success = true;
    } catch (e) {
      response = e.response;
      success = false;
    }

    const fatal = !response || (response.status >= 500);
    const data = fatal ? null : response.data;
    const headers = fatal ? null : response.headers;
    const errors = !!response && !!response.data ? response.data : [];

    return this.serviceResponse({ fatal, data, headers, success, errors });
  }

  serviceResponse = (response) => {
    if (response.success) {
      return this.success({ data: response.data, headers: response.headers });
    } else if (response.fatal) {
      return this.fatal();
    } else {
      return this.error({
        data: response.data,
        content: response.errors.message || response.errors.error,
        errors: response.errors
      });
    }
  }

  success = ({ data, headers }) => {
    return {
      data,
      headers,
      success: true,
      fatal: false,
    }
  }

  error = ({ data, content, errors }) => {
    return {
      errors,
      error: content,
      data: data,
      success: false,
      fatal: false,
    }
  }

  fatal = () => {
    return {
      success: false,
      fatal: true,
      data: {}
    }
  }
}

export default BaseService;
