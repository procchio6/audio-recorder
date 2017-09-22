
const ROOT_URL = process.env.ROOT_URL

export default class ClipsAdapter {

  static getClips() {
    return fetch(ROOT_URL + '/clips').then(resp => resp.json())
  }

  static create(formData) {
    return fetch(ROOT_URL + '/clips', {
      method: 'POST',
      body: formData
    })
  }

  static delete(clipId) {
    return fetch(ROOT_URL + `/clips/${clipId}`, {
      method: 'DELETE'
    })
  }
}
