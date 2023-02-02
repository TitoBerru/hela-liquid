const path = require("path");
const fs = require("fs");
const recipesFilePath = path.join(__dirname, "../dataBase/recipesJson.json");
const flavorsFilePath = path.join(__dirname, "../dataBase/flavorsJson.json");
const costsFilePath = path.join(__dirname, "../dataBase/costsJson.json");
const sortJSON=require("./../xtras/sort")
const salesCostService = require ("./../services/salesCostService")
let recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));
let flavors = JSON.parse(fs.readFileSync(flavorsFilePath, "utf-8"));
let costs = JSON.parse(fs.readFileSync(costsFilePath, "utf-8"));



const costController = {

  index: function(req, res){
    res.render('costs')
  },

  allCosts: function(req, res){
    res.send('llego por AllCost')
  },
    
  calculate: function (req, res) {
 
    customer = req.body.Cliente.toUpperCase();
    recetaId = req.body.Receta;
    ml = req.body.ml;
    nico = req.body.nico;
    cant = req.body.quantity;
    price = req.body.price;


    salesCostService.base(customer,recetaId,ml,nico, cant, price)
    
   res.redirect('../');
    // res.render('costoVenta', {recipes, documentoCostoVenta: salesCostService.base});

  },
  costoVenta: function(req,res){
    res.send('hola')
  }
 

 
};

module.exports = costController;