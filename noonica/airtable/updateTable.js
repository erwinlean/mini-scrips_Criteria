"use strict";

/**
 * Update the table after importing adata from the PIM.
 * @function updateTable
 * @param {Object} authData - Contains the url and access data for the AirTable API.
 * @param {Object} data - New data to be sended to the Table.
 * @returns {Promise} - Update table returns promise, expecting to be 201/200 status refers to the update of the table.
 * @throws {Error} - If there is any error throws error Message.
 */
const updateTable = async (authData, data) => {
    const {url, token} = authData;

    fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        };
        
        return response.json();
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });  
};

module.exports = updateTable;