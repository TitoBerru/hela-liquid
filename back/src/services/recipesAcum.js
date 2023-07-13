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

let resultado = [];
let resultadoPorCliente = []
const recipesAcum ={

    acumByRecipe: (recipeid)=> {
         resultado = sales.filter((sales) => sales.recipe == recipeid)
         resultadoEnCantidades = resultado.length
         resultadoPorCliente = resultado[resultado.length-1].customer
       console.log(resultadoPorCliente)
    }
    
}
module.exports = recipesAcum;

recipesAcum.acumByRecipe('TRIBECA');