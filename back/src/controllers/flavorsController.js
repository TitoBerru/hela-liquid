const path = require("path");
const fs = require("fs");
const recipesFilePath = path.join(__dirname, "../dataBase/recipesJson.json");
const flavorsFilePath = path.join(__dirname, "../dataBase/flavorsJson.json");
const sortJSON=require("./../xtras/sort")
let recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));
let flavors = JSON.parse(fs.readFileSync(flavorsFilePath, "utf-8"));

const flavorsController = {
  allFlavors: function (req, res) {
    flavors = JSON.parse(fs.readFileSync(flavorsFilePath, "utf-8"));
    flavors = sortJSON(flavors, 'name', 'asc'); //order by
    res.render("Flavors/flavors", { flavors: flavors });
  },

  createFlavors: function (req, res) {
    res.render("Flavors/flavorCreate");
  },

  storeFlavors: function (req, res) {
    function uid() {
      return Math.random().toString(36) + Date.now().toString(36);
    }
    let newFlavor = {
      idFlavor: uid(),
      name: req.body.name.toUpperCase(),
      brand: req.body.brand.toUpperCase(),
      price: req.body.price,
      costType: req.body.costType,
      stock: req.body.stock,
      createdAt: new Date().toLocaleDateString(),
      provider: req.body.provider
    };
    // read the json file
    let flavorStorage = fs.readFileSync("./src/database/flavorsJson.json", {
      encoding: "utf-8",
    });
    let jsonFlavorStorage; //declare variable for storage and compare if is empty
    if (flavorStorage == "") {
      jsonFlavorStorage = []; //if is empty leave empty;
    } else {
      jsonFlavorStorage = JSON.parse(flavorStorage); // if is not empty parsed to json
    }
    jsonFlavorStorage.push(newFlavor); // push the new flavor
    jsonFlavorStorageJson = JSON.stringify(jsonFlavorStorage); // return to json
    fs.writeFileSync("./src/database/flavorsJson.json", jsonFlavorStorageJson); //write File
    res.redirect("/flavors");
  },

  search: function (req, res) {
    flavors = JSON.parse(fs.readFileSync(flavorsFilePath, "utf-8"));
    const searchQuery = req.query.searchFlavor.toUpperCase();
    let flavorFound = [];
    for (let i = 0; i < flavors.length; i++) {
      flavors[i].name.includes(searchQuery) ? flavorFound.push(flavors[i]) : "";
    }
    flavorFound = sortJSON(flavorFound, 'name', 'asc'); //order by
    res.render("flavors/flavorResults", {
      flavorFound: flavorFound,
    });
  },

  edit: function (req, res) {
    let flavors = JSON.parse(fs.readFileSync(flavorsFilePath, "utf-8"));
    let flavorToEdit = [];
    for (let i = 0; i < flavors.length; i++) {
      if (flavors[i].idFlavor == req.params.id) {
        flavorToEdit = flavors[i];
      }
    }
    res.render("flavors/flavorEdit", { flavorToEdit: flavorToEdit });
  },
  updateFlavor: function (req, res) {
    flavors = JSON.parse(fs.readFileSync(flavorsFilePath, "utf-8"));
    let idFlavorToChange = req.params.id;
    let flavorToEdit = [];
    for (let i = 0; i < flavors.length; i++) {
      if (flavors[i].idFlavor == idFlavorToChange) {
        indexToChange = flavors.indexOf(flavors[i]);
        flavorToEdit = flavors[i];
      }
    }
    flavors = flavors.filter((flavor) => flavor.idFlavor != req.params.id);
    const jsonFlavors = JSON.stringify(flavors);
    fs.writeFileSync("./src/database/flavorsJson.json", jsonFlavors);
    let flavorModify = {
      idFlavor: req.params.id,
      name: req.body.name.toUpperCase(),
      brand: req.body.brand.toUpperCase(),
      price: req.body.price.toUpperCase(),
      costType: req.body.costType,
      stock: req.body.stock,
      modifiedAt: new Date().toLocaleDateString(),
      provider: req.body.provider
    };
    let flavorStorage = fs.readFileSync("./src/database/flavorsJson.json", {
      encoding: "utf-8",
    });
    let jsonflavorStorage;
    if (flavorStorage == "") {
      jsonflavorStorage = [];
    } else {
      jsonflavorStorage = JSON.parse(flavorStorage);
    }
    jsonflavorStorage.push(flavorModify);
    jsonflavorStorageJson = JSON.stringify(jsonflavorStorage);
    fs.writeFileSync("./src/database/flavorsJson.json", jsonflavorStorageJson);
    res.redirect("/flavors");
  },

  deleteFlavor: function (req, res) {
    flavors = JSON.parse(fs.readFileSync(flavorsFilePath, "utf-8"));
    let idFlavorToChange = req.params.id;
    let flavorToEdit = [];
    for (let i = 0; i < flavors.length; i++) {
      if (flavors[i].idFlavor == idFlavorToChange) {
        indexToChange = flavors.indexOf(flavors[i]);
        flavorToEdit = flavors[i];
      }
    }
    flavors = flavors.filter((flavors) => flavors.idFlavor != req.params.id);
    const jsonFlavors = JSON.stringify(flavors);
    fs.writeFileSync("./src/database/flavorsJson.json", jsonFlavors);
    res.redirect("/flavors");
  },

  detail: function (req, res) {
    recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));
    flavors = JSON.parse(fs.readFileSync(flavorsFilePath, "utf-8"));
    const flavorToShow=[];
    const recipesUsed= [];
    for (let i=0; i<flavors.length; i++){
      if (flavors[i].idFlavor == req.params.id){
          flavorToShow.push(flavors[i])
        }
       }
    for (let i=0; i<recipes.length; i++){
      recipes[i].flavors.forEach(flavor => 
        (flavor.flavor.includes(flavorToShow[0].name)? recipesUsed.push(recipes[i].name):"")


      
      )
    }
    // duplicated takeoff!!
    const dataArr = new Set(recipesUsed);
    let resultRecipesUsed = [...dataArr];
      

  
    res.render("flavors/flavorDetail", {
      flavors : flavorToShow,
      resultRecipesUsed : resultRecipesUsed
    });
    // res.send('llgo por detail')
  }
 
 
};

module.exports = flavorsController;
