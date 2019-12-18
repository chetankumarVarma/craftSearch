const empList = require('./../model/emp');

module.exports ={

	async epmList(req,res){

		var resObj = {};
		var resObj = await empList.get_emp(req,res);

		res.render('index');
	},

	async data99acre(req,res){
		var resObj = {};
		var resObj = await empList.get_99acreData(req,res);
	},

	async autocomplete(req,res) {

        if (typeof req.query.q !== 'undefined' || req.query.q !== null) {
            var queryStr = req.query.q;

            const resultData = empList.getAutocomplete(queryStr);
            return resultData.then(function(result) {
                res.set('Access-Control-Allow-Origin', '*');
                res.set('Content-Type', 'application/json');
                res.send(JSON.stringify(result))
            });
        }
	  },

	  async getSearchData(req,res) {

        if (typeof req.query.q !== 'undefined' || req.query.q !== null) {
            
            var bhk_filter = '';
            var queryStr = req.query.q;

        	if(req.query.bhk){
	            var bhk_filter = req.query.bhk;
        	}

            const resultData = empList.getSearchData(queryStr,bhk_filter);
            return resultData.then(function(result) {
                res.set('Access-Control-Allow-Origin', '*');
                res.set('Content-Type', 'application/json');
                res.send(JSON.stringify(result))
            });
        }
	  },
};