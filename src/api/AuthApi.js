class AuthApi {
  #_client = null;

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

  login = (data) => this.#_client.post(`${this.#_url}/login`, data);

  signUp = (data) => this.#_client.post(`${this.#_url}/signup`, data);
}

export default AuthApi;
