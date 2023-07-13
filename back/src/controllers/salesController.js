const salesController = {
    
    'list' : function (req, res){
    //    res.send({status: "ok", nombre:'hola'});
       res.render('sales');
    },
    'customer' : function(req, res){
        res.send('llego por customer')
        // res.render('sales')

    },
    'month' : function(req, res){
        res.send('llego por month')
        // res.render('sales')
    },
    'year' : function(req, res){
        res.send('llego por year')
        // res.render('sales')
    },
    'recipe' : function(req, res){
        res.send('llego por recipe')
        // res.render('sales')
    },
    'flavor' : function(req, res){
        res.send('llego por flavor')
        // res.render('sales')
    }

};

module.exports = salesController;