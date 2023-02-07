import axios from "axios";

const ep = '89a3c624fb9f43c4841ad9a207d2a25f'
export default axios.create({
  baseURL: `https://crudcrud.com/api/${ep}`,
  headers: {
    "Content-type": "application/json"
  }
});