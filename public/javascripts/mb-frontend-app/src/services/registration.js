const headers = {
  'Content-type': 'application/json',
}

export const saveClient = (body) =>  
  fetch('/registration', { headers, method: 'POST', body: JSON.stringify(body) })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(json => {
          const error = new Error(json.message || response.statusText)
          throw Object.assign(error, { response })
        })
      }
      return response.json()
    }).catch(err => Promise.reject(err))