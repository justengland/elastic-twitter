import {fetchJson} from './fetch'

export async function all () {
  return fetchJson('/api/queries/')
}

export async function get (source) {
  return fetchJson(source)
}

export async function exec (query) {
  console.log('EXEC', query)
  return fetchJson('/api/queries/exec', query)
}
