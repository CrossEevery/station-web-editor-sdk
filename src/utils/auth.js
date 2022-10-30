import Cookies from 'js-cookie'
import qs from 'qs'

const TokenKey = 'cross_sdk_token'
const uuidKey = 'cross_sdk_uuid'
const authorKey = 'cross_sdk_station_id'

export function getToken() {
  let token = Cookies.get(TokenKey)

  if (!token) {
    // 从url中获取
    const params = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    token = params.ticket
  }
  return token
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUUID() {
  let uuid = Cookies.get(uuidKey)

  if (!uuid) {
    // 从url中获取
    const params = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    uuid = params.uuid
  }
  return uuid
}

export function setUUID(uuid) {
  return Cookies.set(uuidKey, uuid)
}

export function getAuthorId() {
  return Cookies.get(authorKey)
}

export function setAuthorId(authorid) {
  return Cookies.set(authorKey, authorid)
}

export function removeUUID() {
  return Cookies.remove(uuidKey)
}
