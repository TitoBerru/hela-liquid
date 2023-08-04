const path = require("path");
const fs = require("fs");
const recipesFilePath = path.join(__dirname, "../dataBase/recipesJson.json");
const flavorsFilePath = path.join(__dirname, "../dataBase/flavorsJson.json");
const costsFilePath = path.join(__dirname, "../dataBase/costsJson.json");
const cmvFilePath = path.join(__dirname, "../dataBase/cmvJson.json");
const salesCostService = require ("./../services/salesCostService")
let recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));
let cmvorder = []
const costController = {

  index: function(req, res){
    res.render('costs')
  },

  allCosts: function(req, res){
    res.send('llego por AllCost')
  },
    
  calculate:  function (req, res) {
    
    customer = req.body.Cliente.toUpperCase();
    recetaId = req.body.Receta;
    ml = req.body.ml;
    nico = req.body.nico;
    cant = req.body.quantity;
    price = req.body.price;

    salesCostService.base(customer,recetaId,ml,nico, cant, price);
    let cmv = JSON.parse(fs.readFileSync(cmvFilePath, "utf-8"));
    cmvorder = [cmv.at(-1)]
    //let cmvorder = sortJSON(cmv, 'createdAt', 'desc');
    //console.log(cmvorder) //order by
    res.render('index', {recipes:recipes, cmv:cmvorder});

  },
  costoVenta: function(req,res){
    res.send('hola')
  }
 

 
};

module.exports = costController;