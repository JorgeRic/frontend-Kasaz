import axios from 'axios'

class HouseBackendService  {
  constructor(){
    this.houseBackendService = axios.create({
        baseURL: 'http://localhost:4000/api',
        withCredentials: true,
    })
  }

  getAllHouses(page, per_page){
   return this.houseBackendService.get(`/houses?page=${page}&per_page=${per_page}`)
   .then(response => response)
  }

  addOneHouse(newHouse){
    return this.houseBackendService.post('/houses/new', newHouse)
    .then(response => response)
  }
  
  searchHouse(house){
    return this.houseBackendService.post(`/houses/search`, house)
    .then(response => response)
  }
  updateOneHouse(id, updateHouse){
    return this.houseBackendService.put(`/houses/${id}/update`, updateHouse)
    .then(response => response)
  }

  deleteOneHouse(id){
    return this.houseBackendService.delete(`/houses/${id}/delete`)
    .then(response => response)
  }

  getOneHouse(id){
    return this.houseBackendService.get(`/houses/${id}/details`)
    .then(response => response)
  }
}

const houseBackendService = new HouseBackendService()
export default houseBackendService;