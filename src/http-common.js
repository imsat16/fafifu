import axios from "axios";

const ep = '7c1c830791024bcca619508068cd7c4d'
export default axios.create({
  baseURL: `https://crudcrud.com/api/${ep}`,
  headers: {
    "Content-type": "application/json"
  }
});