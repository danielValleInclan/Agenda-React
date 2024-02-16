import http from ".../http-common"

class AgendaService {
    getAll() {
        return http.get("/agenda")
    }
    get(id) {
        return http.get(`/agenda/${id}`);
      }
    
    create(data) {
        return http.post("/agenda", data);
    }
    
    update(id, data) {
        return http.put(`/agenda/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/agenda/${id}`);
    }
    
    deleteAll() {
        return http.delete(`/agenda/delete-all`);
    }

    findByName(name) {
        return http.get(`/agenda/name/${name}`);
    }
}

export default new AgendaService();