"use strict";

/**
 * Function to get the products via Plytix API.
 * @function getProducts - Function the get the product via Plytix API.
 * @param {String} token - Auth token obteined in the file ./auth.js
 * @return {Promise<Object>} - If the promise of data is success returns an Object.
 * @throws {Error} - If there is any error throws error Message.
 */

const getProducts = async (token) => {
    try {
        const productUrl = "https://pim.plytix.com/api/v1/products/65badd1ca34d8d2c442e64f0"; // Product example to test

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(productUrl, requestOptions);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error getting Plytix product IDs:", error.message);
        throw error;
    };
};

module.exports = getProducts;