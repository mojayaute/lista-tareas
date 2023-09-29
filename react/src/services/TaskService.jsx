import http from "../http_common";

const save = (data) => {
    return http.post(`tasks/save`, data);
};

const update = (data, id) => {
    return http.put(`tasks/update/${id}`, data);
};

const getAll = () => {
    return http.get('/tasks');
};

const destroy = id => {
    return http.delete(`/tasks/delete/${id}`);
};

export default {
    save,
    update,
    getAll,
    destroy
};
