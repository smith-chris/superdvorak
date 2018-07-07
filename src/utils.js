const isObject = obj => {
  return obj != null && typeof obj === 'object' && Array.isArray(obj) === false
}

const isString = elem => typeof elem === 'string' || elem instanceof String

const isBoolean = elem => typeof elem === 'boolean'

const isFunction = elem => {
  return elem && {}.toString.call(elem) === '[object Function]'
}

module.exports = {
  isObject,
  isString,
  isBoolean,
  isFunction
}
