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
    let cmv = JSON.parse(fs.readFileSync(cmvFilePath, "utf-8"));
    const result = sumTotalEsenciasByMonth(cmv);
    function isValidDate(date) {
      return date instanceof Date && !isNaN(date);
    }

    function sumTotalEsenciasByMonth(data) {
      const result = {};

      data.forEach((item) => {
        const createdAtDate = new Date(convertToISODate(item.createdAt));
        if (isValidDate(createdAtDate)) {
          const month = createdAtDate.getMonth() + 1; // Sumar 1 porque los meses en JavaScript son base 0 (enero es 0)

          if (result[month]) {
            result[month].cost +=
              (item.nico +
                item.Vg +
                item.Pg +
                item.totalEsencias +
                item.frasco) *
              item.quantity;
            result[month].precioVenta += Number(item.precioVenta);
          } else {
            result[month] = {
              cost:
                (item.nico +
                  item.Vg +
                  item.Pg +
                  item.totalEsencias +
                  item.frasco) *
                item.quantity,
              precioVenta: Number(item.precioVenta),
            };
          }
        }
      });

      return result;
    }

    console.log("linea 53 sales controller ", result);

    res.render("./Sales/salesForMonth", { result: result });
    // res.send({ result });
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
