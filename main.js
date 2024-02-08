"use strict";

/** Process:
 * Main function - bi-directional data transfer via API
 * 1- The product is created on the PIM and send the price to the Table via Api.
 * 2- User update the price and date of the Product (houses in this case) via the UI of (AirTable).
 * 3- Get the table (check if the price is update by date? to check) and Update to the price_web to the PIM.
*/

const {airTablePrices, airTableUnits, getTable, updateTable, getProducts, getPlytixToken, updatePlytix} = require("./services");

/**
 * @function main
 * @throws {Error} - If there is any error throws error Message.
 */
const main = async () => {
    try{
        /**
         * First section:
         * Variables and get token(AirTable doesnt require "Token")
         * Prices variables
         */
        let newPrice, oldPrice;

        // Plytix Auth.
        const token = await getPlytixToken();
        if(!token){
            throw new Error("Error, didnt get the token");
        };

        /**
         * Second Section:
         *  get new "product" from plytix and insert the new product and n attributes required on AirTable
         */


        /**
         * This third section:
         * get and update the prices on Plytix with new Data witch came from AirTable API
         */
        // Get the current price of product on Plytix  
        const product = await getProducts(token);
        oldPrice = product.data[0].attributes.precio_web;

        // Get the table current price on AirTable
        const pricesTable = await getTable(airTablePrices);
        newPrice = pricesTable.fields.precio;

        const unitsTable = await getTable(airTableUnits);

        // Sku of product is giving as ID on of the airtable, must be searched on the table units:
        // Prices gives SKU_unidad_pim: the id to be searched on the units table as id. From there we get the SKU of the unit.

        // Update price on Plytix
        //await updatePlytix(token, newPrice);
    }catch(error){
        console.log(error)
        throw new Error(error.message);
    };
};

// Init the main function
main();