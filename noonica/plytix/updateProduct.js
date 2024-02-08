"use strict";

/**
 * Function to Update the products via Plytix API.
 * @function updateProduct - Function the Update the product attributes(prices) via Plytix API.
 * @param {String} token - Auth token obteined in the file ./auth.js
 * @param {Number} data - New price to be updated for the product.
 * @return {Promise<Object>} - If the promise of data is success returns an Object.
 * @throws {Error} - If there is any error throws error Message.
 */

const updateProduct = async (token, data) => {
    try {
        const productUrl = "https://pim.plytix.com/api/v1/products/65badd1ca34d8d2c442e64f0"; // Product example to test
        const newPrice = data;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify({"attributes": {
                "precio_web": `${newPrice}`
            }})
        };

        const response = await fetch(productUrl, requestOptions);
        const res = await response.json();

        return res;
    } catch (error) {
        console.log("Error updating Plytix product prices: " + error.message + error.status);
        
        throw error;
    };
};

module.exports = updateProduct;