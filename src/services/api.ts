import axios from "./api.config";

class ApiService {
  private BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  makeUrl = (resource: string) => {
    return this.BASE_URL + resource;
  };

  get = (resource: string, payload?: object | any, config?: any) => {
    return axios.get(this.makeUrl(resource));
  };
  post = (resource: string, payload?: object | any, config?: any) => {
    return axios.post(this.makeUrl(resource), payload);
  };
  put = (resource: string, payload?: object, config?: any) => {
    return axios.put(this.makeUrl(resource), payload);
  };
  patch = (resource: string, payload?: object, config?: any) => {
    return axios.patch(this.makeUrl(resource), payload);
  };
  delete = (resource: string, payload?: any, config?: any) => {
    return axios.delete(this.makeUrl(resource), payload);
  };
}

export default ApiService;
