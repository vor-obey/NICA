import queryString from 'query-string';

class AuthApi {
  #_client = null;

  #_token = null;

  #_url = '';

  /**
   *
   * @param {Object} options
   * @param {Object} options.client
   */
  constructor(options) {
    const { client } = options;
    this.#_client = client;
  }

  login = async (data) => {
    const query = queryString.stringify(data);
    return this.#_client.get(`/users?${query}`);
  };

  signUp = (data) => this.#_client.post('/users', data);

  logout = () => {
    this.#_token = null;
  };
}

export default AuthApi;
