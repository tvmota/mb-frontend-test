export const extractSchemaErr = (err) => {
  return err.inner.reduce((acc, err) => {
    return { ...acc, [err.path]: err.message }
  }, {})
}

export const deepClone = (obj) => {
  if (obj === null) return null
  let clone = Object.assign({}, obj)
  Object.keys(clone).forEach(
    (key) => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  )
  if (Array.isArray(obj)) {
    clone.length = obj.length
    return Array.from(clone)
  }
  return clone
}
