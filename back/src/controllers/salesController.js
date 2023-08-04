const path = require("path");
const fs = require("fs");
const recipesFilePath = path.join(__dirname, "../dataBase/recipesJson.json");
const flavorsFilePath = path.join(__dirname, "../dataBase/flavorsJson.json");
const salesFilePath = path.join(__dirname, "../dataBase/salesJson.json");
const recipesAcum = require ("./../services/recipesAcum")
let recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));
let sales = JSON.parse(fs.readFileSync(salesFilePath, "utf-8"));


const salesController = {
    
    'list' : function (req, res){
    //    res.send({status: "ok", nombre:'hola'});
       res.render('sales');
    },
    'customer' : function(req, res){
        res.render('sales');
        // res.render('sales')

    },
    'month' : function(req, res){
        
        salesForMonth = [];
        // Función para filtrar por mes (0 = enero, 1 = febrero, ..., 11 = diciembre)
    function filterByMonth(data, month) {
        return data.filter(item => {
        const createdAtDate = new Date(item.createdAt);
        return createdAtDate.getMonth() === month;
    });
  }
         res.render('./Sales/salesForMonth', {sales : sales})
    },
    'year' : function(req, res){
        res.send('llego por year')
        // res.render('sales')
    },
    'recipe' : function(req, res){
        recipes;
        let cantidades = [];
        for (let i=0; i<recipes.length; i++){
            recipesAcum.acumByRecipe(recipes[i].name);
            cantidades.push(resultadoEnCantidades , recipes[i].name)
            // cantidades = {
            // cantidad: resultadoEnCantidades,
            // recipeUsado: recipes[i].name
            // }
         }
         console.log('console log linea 38 salesController: ' + {cantidades})
         res.render('./Sales/salesForRecipe', {cantidades:cantidades, recipes:recipes})
       // res.send({recipes});
    },
    'flavor' : function(req, res){
        res.send('llego por flavor')
        // res.render('sales')
    }

};

module.exports = salesController;