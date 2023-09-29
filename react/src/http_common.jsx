import axios from "axios";

export default axios.create({
    baseURL: "http://laravel.test/api/"
});