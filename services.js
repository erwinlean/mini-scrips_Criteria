"use strict";

/**
 * Functions of request to AirTable and plyix
 */

const {airTablePrices, airTableUnits} = require("./airtable/auth");
const getTable = require("./airtable/getTable");
const updateTable = require("./airtable/updateTable");
const getProducts = require("./plytix/getProduct");
const getPlytixToken = require("./plytix/auth");
const updatePlytix = require("./plytix/updateProduct");

module.exports = {
    airTablePrices,
    airTableUnits,
    getTable,
    updateTable,
    getProducts,
    getPlytixToken,
    updatePlytix
};