export const toPromise = fn => {
  if (typeof fn !== 'function') return fn
  return (args = {}) => {
    if (typeof args !== 'object') {
      return fn(args)
    }
    return new Promise((resolve, reject) => {
      args.success = resolve
      args.fail = reject
      fn(args)
    })
  }
}

export default Object.keys(wx).reduce((o, name) => {
  o[name] = toPromise(wx[name])
  return o
}, {})
