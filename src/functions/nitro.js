import u from './utils.js'

import axios from 'axios'

export async function sendRequest(endpoint, body = {}, state) {
  try {
    const app_id = sessionStorage.getItem('appId')
    const auth_token = sessionStorage.getItem('authToken')
    const url = process.env[`REACT_APP_${app_id}`]

    if (!u.isNonEmptyString(app_id) || !u.isNonEmptyString(auth_token) || !u.isNonEmptyString(url))
      throw Error('invalid request params')
    const endpointUrl = url + endpoint

    const response = await axios.post(endpointUrl, body, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.status !== 200) throw Error('endpoint did not return 200')

    return response?.data || {}
  } catch (error) {
    state.setError(true)
    return {}
  } finally {
    state.setLoading(false)
  }
}

/**
 * Gets channel options
 * @returns {Promise}
 */

async function getChannels(state) {
  return await sendRequest('/get-channels', {}, state)
}

/**
 * Gets upload url
 * @returns {Promise}
 */

async function getUploadUrl(state) {
  return await sendRequest('/get-upload-url', {}, state)
}

/**
 * Submit utr
 * @returns {Promise}
 */

async function submitUtr(state, body) {
  console.log('body', body)
  return await sendRequest('/submit-deposit', body, state)
  // return { utr_submitted: false }
}

export default {
  getChannels,
  getUploadUrl,
  submitUtr
}
