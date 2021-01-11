export const findAllByKey = function (obj, keyToFind) {
  return Object.entries(obj)
    .reduce((acc, [key, value]) => (key === keyToFind)
      ? acc.concat(value)
      : (typeof value === 'object')
        ? acc.concat(findAllByKey(value, keyToFind))
        : acc
    , [])
}

export const truncate = function (text, length) {
  if (text.length > length) return text.substring(0, length) + '...'
  return text
}
