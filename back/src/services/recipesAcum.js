const path = require("path");
const fs = require("fs");
const costsFilePath = path.join(__dirname, "../dataBase/costsJson.json");
const recipesFilePath = path.join(__dirname, "../dataBase/recipesJson.json");
const flavorsFilePath = path.join(__dirname, "../dataBase/flavorsJson.json");
const salesFilePath = path.join(__dirname, "../dataBase/salesJson.json");
// const cmvFilePath = path.join(__dirname, "../dataBase/cmvJson.json");
const sortJSON=require("../xtras/sort")
let costs = JSON.parse(fs.readFileSync(costsFilePath, "utf-8"));
let recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));
let flavors = JSON.parse(fs.readFileSync(flavorsFilePath, "utf-8"));
let sales = JSON.parse(fs.readFileSync(salesFilePath, "utf-8"));

const resultado = [];
const recipesAcum ={

    acumByRecipe: (recipeid)=> {
       const resultado = sales[0];
    //    console.log(resultado)
    }
    
}





module.exports = recipesAcum;
recipesAcum.acumByRecipe(89);