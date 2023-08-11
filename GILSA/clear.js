"use strict";

const XLSX = require("xlsx");
let products = [];

const removeAttributesFromHTML = (html) => {
    // Remove <style> tags and their content
    const withoutStyleTags = html.replace(/<style>[\s\S]*?<\/style>/gi, '');

    // Remove attributes from other HTML tags
    const cleanedHTML = withoutStyleTags.replace(/<[^>]+>/g, tag => {
        // Extract the tag name
        const tagName = tag.match(/<\/?([a-zA-Z]+)/)[1];
        return `<${tagName}>`;
    });

    return cleanedHTML;
};

const shouldProcessDescription = (description) => {
    return /<div[\s\S]*<\/div>/.test(description);
};

const createXLSXFile = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const outputFilePath = "./output.xlsx";
    XLSX.writeFile(workbook, outputFilePath);

    console.log(`XLSX file "${outputFilePath}" created successfully.`);
};

const convertFileToJson = () => {
    let loadedFile = "./description.xlsx";

    // Load the workbook
    let workbook = XLSX.readFile(loadedFile);

    workbook.SheetNames.forEach(sheet => {
        let worksheet = workbook.Sheets[sheet];
        let range = XLSX.utils.decode_range(worksheet['!ref']);

        for (let row = range.s.r; row <= range.e.r; row++) {
            let product = {};
            let rowIsEmpty = true;

            for (let col = range.s.c; col <= range.e.c; col++) {
                let cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
                let cellValue = worksheet[cellAddress]?.v || "";

                if (col === 0) {
                    product.description = cellValue;
                }

                if (cellValue !== "") {
                    rowIsEmpty = false;
                }
            }

            
            if (shouldProcessDescription(product.description)) {
                product.description = removeAttributesFromHTML(product.description);
            }
            products.push(product);
        }
    });

    console.log(products.length);
    console.log(products[1]); // should return empty string
    console.log(products[2]); // should return string 
};

convertFileToJson();

createXLSXFile(products);