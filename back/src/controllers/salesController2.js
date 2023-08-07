const path = require("path");
const fs = require("fs");
const recipesFilePath = path.join(__dirname, "../dataBase/recipesJson.json");
const flavorsFilePath = path.join(__dirname, "../dataBase/flavorsJson.json");
const salesFilePath = path.join(__dirname, "../dataBase/salesJson.json");
const cmvFilePath = path.join(__dirname, "../dataBase/cmvJson.json");

const recipesAcum = require("./../services/recipesAcum");
const salesForMonth = require("./../services/salesForMonthService");
const convertToISODate = require("./../xtras/convertToIsoDate");


let cmv = JSON.parse(fs.readFileSync(cmvFilePath, "utf-8"));
let recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));
let sales = JSON.parse(fs.readFileSync(salesFilePath, "utf-8"));
let setSalesForMonth = [];



const salesController = {
  list: function (req, res) {
    //    res.send({status: "ok", nombre:'hola'});
    res.render("sales");
  },
  customer: function (req, res) {
    res.render("sales");
    // res.render('sales')
  },
  month: function (req, res) {
    let TotalForMonthDetail =[];
    let totalForMonthCost = 0;
        function salesForMontDetail(month) {
            return cmv.filter(item => {
                const createdAtDate = new Date(convertToISODate(item.createdAt));
                
                if (createdAtDate.getMonth() === month){
                    TotalForMonthDetail.push(item)
                    console.log('esto llega desde el controlador de sales, linea 37: ', TotalForMonthDetail )
                };
            });     
        
        }
        for (let i=0; i<=1; i++){}
        salesForMontDetail(7)
        
        totalForMonthCost = TotalForMonthDetail.reduce((acum, actual) => acum + (actual.nico +actual.Vg + actual.Pg + actual.totalEsencias + actual.frasco)*actual.quantity,0)
        console.log('consle desde controller  salesController linea 45: ',totalForMonthCost)
        // return totalForMonthCost;
       

        // res.render("./Sales/salesForMonth", sales:sales);
        res.send({totalForMonthCost});
  },

  year: function (req, res) {
    res.send("llego por year");
    // res.render('sales')
  },
  recipe: function (req, res) {
    recipes;
    let cantidades = [];
    for (let i = 0; i < recipes.length; i++) {
      recipesAcum.acumByRecipe(recipes[i].name);
      cantidades.push(resultadoEnCantidades, recipes[i].name);
      // cantidades = {
      // cantidad: resultadoEnCantidades,
      // recipeUsado: recipes[i].name
      // }
    }
    console.log("console log linea 38 salesController: " + { cantidades });
    res.render("./Sales/salesForRecipe", {
      cantidades: cantidades,
      recipes: recipes,
    });
    // res.send({recipes});
  },
  flavor: function (req, res) {
    res.send("llego por flavor");
    // res.render('sales')
  },
};

module.exports = salesController;
