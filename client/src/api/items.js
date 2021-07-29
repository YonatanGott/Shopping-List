import axios from 'axios';

const baseUrl = "http://localhost:5000/api/items"


// Get All Items
export const getAllItems = async () => {
    try {
        const response = await axios.get(baseUrl);
        const data = response.data;
        return data
    } catch (error) {
        console.error(error);
    }
}
// Post Item
export const postItem = async (item) => {
    try {
        const response = await axios.post(baseUrl, item);
        const data = response.data;
        return data
    } catch (error) {
        console.error(error);
    }
}
// delete Item
export const deleteItem = async (item) => {
    try {
        const response = await axios.delete(baseUrl, { data: item });
        const data = response.data;
        return data
    } catch (error) {
        console.error(error);
    }
}
// Update Item
export const updateItem = async (item) => {
    try {
        const response = await axios.patch(baseUrl, item);
        const data = response.data;
        return data
    } catch (error) {
        console.error(error);
    }
}