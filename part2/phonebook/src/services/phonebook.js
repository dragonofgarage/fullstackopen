import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const delValue = id =>{
  return axios.delete(baseUrl + `/${id}`)
}

const change = (id, changeNum) =>{
  return axios.put(baseUrl + `/${id}`, changeNum )
}

export default {
  getAll, create, delValue, change
}