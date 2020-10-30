import { get, first, isString } from 'lodash'
// import AsyncStorage from '@react-native-community/async-storage'

export default class BaseRequest {
  version = `http://192.168.1.16:5000`;

  prefix() {
    return ''
  }

  async get(url, params = {}, config = {}) {
    console.log(`${this.version}/${url}`)
    try {
      const response = await global.axios.get(`${this.version}/${url}`, {
        params
      })
      return this._responseHandler(response)
    } catch (error) {
      this._errorHandler(error)
    }
  }

  async getWithTimeout(url, params = {}, timeout) {
    try {
      const response = await global.axios.get(`${this.version}/${url}`, {
        params,
        timeout
      })
      return this._responseHandler(response)
    } catch (error) {
      this._errorHandler(error)
    }
  }

  async put(url, data = {}, config = {}) {
    try {
      const response = await global.axios.put(`${this.version}/${url}`, data, config)
      return this._responseHandler(response)
    } catch (error) {
      this._errorHandler(error)
    }
  }

  async post(url, data = {}, config = {}) {
    console.log(`${this.version}/${url}`)
    try {
      const response = await global.axios.post(`${this.version}/${url}`, data, config)
      return this._responseHandler(response)
    } catch (error) {
      console.log(error)
      this._errorHandler(error)
    }
  }

  async del(url, params = {}) {
    try {
      const response = await global.axios.delete(
        `${this.version}/${url}`,
        params
      )
      return this._responseHandler()
    } catch (error) {
      this._errorHandler(error)
    }
  }

  async _responseHandler(response) {
    // console.xlog('=== @_responseHandler ===')
    // if (!!response.error && response.error.code === consts.UN_AUTH) {
    //   await AsyncStorage.removeItem(consts.TOKEN_LOGIN)
    // }

    const code = get(response, 'data.error.code', 200)
    if (code >= 400) {
      let message = get(response, 'data.error.message', 'Default error')
      if (isString(message)) {
        // utils.showToast(utils.upperCaseFirst(message));
      } else {
        let firstError = first(Object.keys(message))
        // utils.showToast(utils.upperCaseFirst(`${firstError} ${response.data.error.message[firstError]}`));
      }

      throw 'Request error'
    }
    return response.data;
  }

  _errorHandler(err) {
    if (err.response && err.response.status === 401) {
      // Unauthorized (session timeout)
      // todo handle here
      window.location.href = '/'
    }
    throw err
  }

  getFile(url) {
    window.location.href = `${BASE_URL}/${API_VERSION}/${url}`
  }
}
