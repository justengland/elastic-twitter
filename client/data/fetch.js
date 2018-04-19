export async function fetchJson (url, body) {
  return new Promise((resolve, reject) => {
    const options = body && {
      body, // This is already sent as a JSON string
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    console.log('Options:', options)
    return fetch(url, options)
      .then(res => {
        if (res.ok) {
          resolve(res.json())
        } else {
          res.text().then(data => {
            try {
              const parsedError = JSON.parse(data).error
              const errorMessage = `${parsedError.msg}: ${parsedError.response}`
              console.warn('Error With Fetch', parsedError)
              return reject(new Error(`Server error: ${res.statusText}: ${res.status} ${errorMessage}`))
            } catch (e) {
              const parsedError = parseErrorHtml(data)
              console.warn('Error With Fetch', parsedError)
              return reject(parsedError)
            }
          }).catch(error => {
            console.warn('Error Parsing Error Response', error)
            reject(new Error(`Server error: ${res.statusText}: ${res.status}`))
          })
        }
      })
      .catch(err => {
        throw err
      })
  })
}

function parseErrorHtml (html) {
  var tmp = document.createElement('DIV')
  tmp.innerHTML = html

  const name = tmp.getElementsByTagName('H1')[0].innerText
  const message = tmp.getElementsByTagName('PRE')[0].innerText

  const error = new Error(message)
  error.name = name
  return error
}
