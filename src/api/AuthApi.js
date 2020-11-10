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

  login = async (data) => {
    const { data: { accessToken } } = await this.#_client.post(`${this.#_url}/login`, data);
    const { data: [user] } = await this.#_client.get(`/users?email=${data.email}`);
    return {
      data: {
        user,
        accessToken,
      },
    };
  };

  signUp = (data) => this.#_client.post(`${this.#_url}/signup`, data);
}

export default AuthApi;
