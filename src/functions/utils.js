export const unknownErr = 'Something went wrong'

export function errr(msg, joiErr) {
  let { message: jMsg } =
    check(joiErr) && check(joiErr.details) && joiErr.details[0] ? joiErr.details[0] : { message: null }

  let errObj = (str) => ({ error: str })

  return check(jMsg) ? errObj(jMsg.replace(/"/gi, '')) : check(msg) ? errObj(msg) : errObj(unknownErr)
}

export function check(v) {
  try {
    return typeof v === 'number' || !(v === undefined || v === null || !v || (typeof v === 'string' && v.length < 1))
  } catch (err) {
    console.log(err)
    return false
  }
}

export function isNumber(x) {
  try {
    return check(x) && !isNaN(x)
  } catch (error) {
    return false
  }
}

export function isPositiveNumber(x) {
  try {
    return isNumber(x) && x > 0
  } catch (error) {
    return false
  }
}

export async function wait(ms) {
  return await new Promise((resolve) => setTimeout(() => resolve(), ms || 1000))
}

/**
 * Format cents to dollars (100 = $1.00)
 */

export function fCents(cents) {
  return (cents / 100).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR'
  })
}

/**
 * Create a unique id with a specified length
 */

export function createID(length) {
  return (UUID() + UUID()).substr(0, length)
}

/**
 * Create a unique id
 */

export function UUID() {
  let dt = new Date().getTime()
  return `xxxxxxxx4xxxyxxxx`.replace(/[xy]/g, function (c) {
    let r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

/**
 * Check for valid string that is not empty
 */

export function isNonEmptyString(str) {
  return typeof str === 'string' && str.length > 0
}

/**
 * Check if iteratble
 */

export function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false
  }
  return typeof obj[Symbol.iterator] === 'function'
}

/**
 * Parse catch error mesages to display to users.
 * If nothing found and no fallback param provided, returns "Something went wrong";
 * @param {*} error - error from catch
 * @param {String} fallback - message to display if none is found
 */

export function catchErrorMsg(error, fallback) {
  return typeof error === 'string'
    ? error
    : check(error?.message) && typeof error.message === 'string'
    ? error.message
    : isNonEmptyString(fallback)
    ? fallback
    : unknownErr
}

/**
 * check for case sensitive match in two arrays of strings (arr1, arr2)
 */

export function hasExactMatch(arr1, arr2) {
  try {
    return arr1.find((s) => arr2.indexOf(s) > -1) !== undefined
  } catch (error) {
    return false
  }
}

/**
 * check for non-case sensitive match in two arrays of strings (arr1, arr2)
 */

export function hasAnyMatch(arr1, arr2) {
  try {
    let arr1LowerCase = arr1.map((s) => s.toLowerCase())
    let arr2LowerCase = arr2.map((s) => s.toLowerCase())
    return arr1LowerCase.find((s) => arr2LowerCase.indexOf(s) > -1) !== undefined
  } catch (error) {
    return false
  }
}

/**
 * create an option for input elements with value 'all' (label)
 */

export function allOptn(label = 'All') {
  return { label, value: 'all' }
}

/**
 * create an option for input elements. (label, value)
 */
export function inputOptn(label, value) {
  return { label, value }
}

/**
 * add joi error message customization
 */

const joiMsgObj = {
  'string.base': `{#label} is required`,
  'string.min': `{#label} must have at least {#limit} characters`,
  'string.max': `{#label} must have no more than {#limit} characters`,
  'string.empty': `{#label} is required`,
  'any.required': `{#label} is required`
}

function getRandomItemFromArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return undefined // Return undefined if the input is not an array or is an empty array
  }

  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

export function isNonEmptyArray(arr) {
  return Array.isArray(arr) && arr.length > 0
}

export function isArray(arr) {
  return Array.isArray(arr)
}

function toCents(amt) {
  return Math.round(amt * 100)
}

/**
 * Handy utilities functions
 * @module
 */

export default {
  wait,
  UUID,
  createID,
  fCents,
  check,
  errr,
  isIterable,
  isNonEmptyString,
  joiMsgObj,
  allOptn,
  inputOptn,
  catchErrorMsg,
  hasExactMatch,
  hasAnyMatch,
  isNumber,
  isPositiveNumber,
  unknownErr,
  getRandomItemFromArray,
  isNonEmptyArray,
  isArray,
  toCents
}
