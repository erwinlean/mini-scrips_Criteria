"use strict";

/**
 * Get the table hardcoded in the URL (at auth.js file), using AirTable API.
 * @function getTable
 * @param {Object} authData - Contains the url and access data for the AirTable API.
 * @returns {Promise<Object>} - Get table returns promise, expecting Object with data.
 * @throws {Error} - If there is any error throws error Message.
 */
const getTable = async (authData) => {
  const {url, token} = authData;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch table data");
    };

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  };
};

module.exports = getTable;