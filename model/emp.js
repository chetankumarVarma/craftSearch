const dbClient = require('./../system/core/config/dbcon');
const superagent = require('superagent');
var xml2js = require('xml2js');
var parseString = require('xml2js').parseString;
var convert = require('xml-js');
var util = require('util');
var xmll = require('xml2json');
const esClient = require('./../system/core/config/esConn');

module.exports = {

	async getAutocomplete(queryStr) {
        var restResponse = {};
        var queryString = queryStr.trim().replace(/-/g, "");
        queryString = queryString.replace(/[()]/g, ' ');

        const esResponse = await new Promise(function(resolve, reject) { 
	        esClient.search({
	            "index": "homesfy",
	            "type": "projects",
	            "body": {
	                "query": {
	                    "bool": {
	                        "must": {
	                            "multi_match": {
	                                "fields": ["tags"],
	                                "query": queryString.toLowerCase(),
	                                "analyzer": "standard",
	                                "operator": "and",
	                                // "fuzziness": "AUTO"
	                            }
	                        },
	                        /*"filter": {
	                            "bool": {
	                                "must": [{
	                                    "term": {
	                                        "is_active": 1
	                                    }
	                                }]
	                            }
	                        }*/
	                    }
	                }
	            }
	        },function(error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                    // return results;
                }
            });
	    }).catch(function(err){
            console.log(err);
        });

        return JSON.stringify(esResponse['hits']['hits']);
    },

    async getSearchData(queryStr, bhk_filter = null) {

        var restResponse = {};
        var queryString = queryStr.trim().replace(/-/g, "");
        queryString = queryString.replace(/[()]/g, ' ');

        var filter = [];

        filter.push(JSON.parse('{"term": {"is_active": 1 } }'));


        if(bhk_filter){
        	filter.push(JSON.parse('{"term": {"configuration": "'+bhk_filter.toLowerCase()+'" } }'));
        }

        const esResponse = await new Promise(function(resolve, reject) { 
	        esClient.search({
	            "index": "homesfy",
	            "type": "projects",
	            "body": {
	                "query": {
	                    "bool": {
	                        "must": {
	                            "multi_match": {
	                                "fields": ["tags", "name"],
	                                "query": queryString,
	                                "analyzer": "standard",
	                                "operator": "and"
	                            }
	                        },
			                "filter":{
								"bool": {
									"must": filter
								}
							}
	                    }
	                },
	            }
	        },function(error, results, fields) {
                if (error) {
                    reject(error);
                } else {

                    resolve(results);
                    // return results;
                }
            });
	    }).catch(function(err){
            console.log(err);
        });

        return JSON.stringify(esResponse['hits']['hits']);
    },

    async get_emp(req, res) {

        let sqldata = await new Promise(function(resolve, reject) {
            dbClient.query('SELECT * FROM worker', function(error, results, fields) {
                if (error) {
                	var errObj = {};

                	errObj.status = 404;
                    errObj.message= error.sqlMessage;
                    reject(errObj);
                } else {
                	var resultobj = {};

                	resultobj.status = 200;
                	resultobj.results = results;
                    resolve(resultobj);
                    // console.log(results);
                }
            });
        }).catch(function(err){
            console.log(err);
        });
        // return sqldata;
        console.log(sqldata);
    },

    async get_99acreData(req,res){
    	var xml = "<?xml version='1.0'?><query><user_name>homesfy</user_name><pswd>Homesfy2018</pswd><start_date>2019-12-06 00:00:00</start_date><end_date>2019-12-07 00:00:00</end_date></query>";
    	var resultobj = {};
    	try{
    		// resultobj = await superagent.post("http://www.99acres.com/99api/v1/getmy99Response/OeAuXClO43hwseaXEQ/uid/")
    		// .field('xml', xml)
    		// .set('Content-Type', 'text/xml');
    		// .set('Accept-Encoding', 'deflate');
    	}catch(err){
    		console.log(err);
	    }
	    xml_data = '<Xml ActionStatus=\"true\">\n<Resp>\n<QryDtl ResType=\"Query\" QueryId=\"OMNI_ADS_RESPONSE-3398141\">\n<CmpctLabl><![CDATA[Runwal gardens+OA]]></CmpctLabl>\n<QryInfo><![CDATA[This project looks good! Please send me more details]]></QryInfo>\n<RcvdOn><![CDATA[2019-12-06 23:47:03]]></RcvdOn>\n<ProjId><![CDATA[342109]]></ProjId>\n<ProjName><![CDATA[Runwal Gardens]]></ProjName>\n<PhoneVerificationStatus><![CDATA[VERIFIED]]></PhoneVerificationStatus>\n<EmailVerificationStatus><![CDATA[UNVALIDATED]]></EmailVerificationStatus>\n<IDENTITY><![CDATA[Individual]]></IDENTITY>\n<PROPERTY_CODE><![CDATA[35833]]></PROPERTY_CODE>\n<SubUserName><![CDATA[]]></SubUserName>\n<ProdId Status=\"\" Type=\"OA\"><![CDATA[35833]]></ProdId>\n</QryDtl>\n<CntctDtl>\n<Name><![CDATA[Priyanka Talap Ranim]]></Name>\n<Email><![CDATA[priya.talap@gmail.com]]></Email>\n<Phone><![CDATA[+91-8082798814]]></Phone>\n</CntctDtl>\n</Resp>\n<Resp>\n<QryDtl ResType=\"Query\" QueryId=\"OMNI_ADS_RESPONSE-3394355\">\n<CmpctLabl><![CDATA[Runwal gardens+OA]]></CmpctLabl>\n<QryInfo><![CDATA[This project looks good! Please send me more details]]></QryInfo>\n<RcvdOn><![CDATA[2019-12-06 15:09:18]]></RcvdOn>\n<ProjId><![CDATA[342109]]></ProjId>\n<ProjName><![CDATA[Runwal Gardens]]></ProjName>\n<PhoneVerificationStatus><![CDATA[VERIFIED]]></PhoneVerificationStatus>\n<EmailVerificationStatus><![CDATA[UNVALIDATED]]></EmailVerificationStatus>\n<IDENTITY><![CDATA[Individual]]></IDENTITY>\n<PROPERTY_CODE><![CDATA[35833]]></PROPERTY_CODE>\n<SubUserName><![CDATA[]]></SubUserName>\n<ProdId Status=\"\" Type=\"OA\"><![CDATA[35833]]></ProdId>\n</QryDtl>\n<CntctDtl>\n<Name><![CDATA[Bipin Singh]]></Name>\n<Email><![CDATA[bipinkumarsingh76@yahoo.com]]></Email>\n<Phone><![CDATA[+91-9892089346]]></Phone>\n</CntctDtl>\n</Resp>\n<Resp>\n<QryDtl ResType=\"Query\" QueryId=\"OMNI_ADS_RESPONSE-3394025\">\n<CmpctLabl><![CDATA[Runwal gardens+OA]]></CmpctLabl>\n<QryInfo><![CDATA[This project looks good! Please send me more details]]></QryInfo>\n<RcvdOn><![CDATA[2019-12-06 14:23:23]]></RcvdOn>\n<ProjId><![CDATA[342109]]></ProjId>\n<ProjName><![CDATA[Runwal Gardens]]></ProjName>\n<PhoneVerificationStatus><![CDATA[UNVALIDATED]]></PhoneVerificationStatus>\n<EmailVerificationStatus><![CDATA[UNVALIDATED]]></EmailVerificationStatus>\n<IDENTITY><![CDATA[Individual]]></IDENTITY>\n<PROPERTY_CODE><![CDATA[35833]]></PROPERTY_CODE>\n<SubUserName><![CDATA[]]></SubUserName>\n<ProdId Status=\"\" Type=\"OA\"><![CDATA[35833]]></ProdId>\n</QryDtl>\n<CntctDtl>\n<Name><![CDATA[Pratik Nirbhavane]]></Name>\n<Email><![CDATA[pratikn13@gmail.com]]></Email>\n<Phone><![CDATA[+91-9819891168]]></Phone>\n</CntctDtl>\n</Resp>\n<Resp>\n<QryDtl ResType=\"Query\" QueryId=\"OMNI_ADS_RESPONSE-3392817\">\n<CmpctLabl><![CDATA[Runwal gardens+OA]]></CmpctLabl>\n<QryInfo><![CDATA[This project looks good! Please send me more details]]></QryInfo>\n<RcvdOn><![CDATA[2019-12-06 11:37:12]]></RcvdOn>\n<ProjId><![CDATA[342109]]></ProjId>\n<ProjName><![CDATA[Runwal Gardens]]></ProjName>\n<PhoneVerificationStatus><![CDATA[UNVALIDATED]]></PhoneVerificationStatus>\n<EmailVerificationStatus><![CDATA[UNVALIDATED]]></EmailVerificationStatus>\n<IDENTITY><![CDATA[Individual]]></IDENTITY>\n<PROPERTY_CODE><![CDATA[35833]]></PROPERTY_CODE>\n<SubUserName><![CDATA[]]></SubUserName>\n<ProdId Status=\"\" Type=\"OA\"><![CDATA[35833]]></ProdId>\n</QryDtl>\n<CntctDtl>\n<Name><![CDATA[Asha Thapliyal Semlety]]></Name>\n<Email><![CDATA[ashathapliyal221189@gmail.com]]></Email>\n<Phone><![CDATA[+91-9769117368]]></Phone>\n</CntctDtl>\n</Resp>\n<Resp>\n<QryDtl ResType=\"Query\" QueryId=\"OMNI_ADS_RESPONSE-3392413\">\n<CmpctLabl><![CDATA[Runwal gardens+OA]]></CmpctLabl>\n<QryInfo><![CDATA[This project looks good! Please send me more details]]></QryInfo>\n<RcvdOn><![CDATA[2019-12-06 10:39:26]]></RcvdOn>\n<ProjId><![CDATA[342109]]></ProjId>\n<ProjName><![CDATA[Runwal Gardens]]></ProjName>\n<PhoneVerificationStatus><![CDATA[UNVALIDATED]]></PhoneVerificationStatus>\n<EmailVerificationStatus><![CDATA[UNVALIDATED]]></EmailVerificationStatus>\n<IDENTITY><![CDATA[Individual]]></IDENTITY>\n<PROPERTY_CODE><![CDATA[35833]]></PROPERTY_CODE>\n<SubUserName><![CDATA[]]></SubUserName>\n<ProdId Status=\"\" Type=\"OA\"><![CDATA[35833]]></ProdId>\n</QryDtl>\n<CntctDtl>\n<Name><![CDATA[Raju Nalawade]]></Name>\n<Email><![CDATA[nalawaderaju44@gmail.com]]></Email>\n<Phone><![CDATA[+91-8652847932]]></Phone>\n</CntctDtl>\n</Resp>\n<Resp>\n<QryDtl ResType=\"Query\" QueryId=\"OMNI_ADS_RESPONSE-3391887\">\n<CmpctLabl><![CDATA[Runwal gardens+OA]]></CmpctLabl>\n<QryInfo><![CDATA[This project looks good! Please send me more details]]></QryInfo>\n<RcvdOn><![CDATA[2019-12-06 09:11:38]]></RcvdOn>\n<ProjId><![CDATA[342109]]></ProjId>\n<ProjName><![CDATA[Runwal Gardens]]></ProjName>\n<PhoneVerificationStatus><![CDATA[VERIFIED]]></PhoneVerificationStatus>\n<EmailVerificationStatus><![CDATA[UNVALIDATED]]></EmailVerificationStatus>\n<IDENTITY><![CDATA[Individual]]></IDENTITY>\n<PROPERTY_CODE><![CDATA[35833]]></PROPERTY_CODE>\n<SubUserName><![CDATA[]]></SubUserName>\n<ProdId Status=\"\" Type=\"OA\"><![CDATA[35833]]></ProdId>\n</QryDtl>\n<CntctDtl>\n<Name><![CDATA[Pooja Naringrekar]]></Name>\n<Email><![CDATA[poojanaringrekar3@gmail.com]]></Email>\n<Phone><![CDATA[+91-8655775542]]></Phone>\n</CntctDtl>\n</Resp>\n<Resp>\n<QryDtl ResType=\"Query\" QueryId=\"OMNI_ADS_RESPONSE-3391569\">\n<CmpctLabl><![CDATA[Runwal gardens+OA]]></CmpctLabl>\n<QryInfo><![CDATA[This project looks good! Please send me more details]]></QryInfo>\n<RcvdOn><![CDATA[2019-12-06 08:08:41]]></RcvdOn>\n<ProjId><![CDATA[342109]]></ProjId>\n<ProjName><![CDATA[Runwal Gardens]]></ProjName>\n<PhoneVerificationStatus><![CDATA[UNVALIDATED]]></PhoneVerificationStatus>\n<EmailVerificationStatus><![CDATA[UNVALIDATED]]></EmailVerificationStatus>\n<IDENTITY><![CDATA[Individual]]></IDENTITY>\n<PROPERTY_CODE><![CDATA[35833]]></PROPERTY_CODE>\n<SubUserName><![CDATA[]]></SubUserName>\n<ProdId Status=\"\" Type=\"OA\"><![CDATA[35833]]></ProdId>\n</QryDtl>\n<CntctDtl>\n<Name><![CDATA[Shailesh Parab]]></Name>\n<Email><![CDATA[shaileshparab31@gmail.com]]></Email>\n<Phone><![CDATA[+91-8104775234]]></Phone>\n</CntctDtl>\n</Resp>\n</Xml>';
	    // parser.parseString(resultobj)
	    // res.set('Content-Type', 'text/xml');
	    // resultobj1 = parser.parseString(xml_data)
		   xml_data  = xmll.toJson(xml_data);
	 //    parseString(xml_data, function (err, result) {
	 //    	var rr =util.inspect(result, false, null);
	 //    	rr = JSON.stringify(rr);
	 //    	// rr = JSON.parse(rr);
		//     // console.log(rr['Xml']);

			var xml_parsed = JSON.parse(xml_data);
			xml_parsed = xml_parsed.Xml.Resp;

		    // console.looksg(xml_parsed);
		    xml_parsed.forEach(function(value,key){ 
		    	var obj = {}

				obj.p_city = "Mumbai";
				obj.p_email = value.CntctDtl.Email;
				obj.p_ipaddress = "122.170.14.101";
				obj.p_launchname = "";
				obj.p_leadtype = value.QryDtl.ProjName;
				obj.p_mobilenumber = value.CntctDtl.Phone;
				obj.p_pref = "top_enquire_form";
				obj.p_projectid = value.QryDtl.ProjId;
				obj.p_source = "99acres";
				obj.p_useragent = "Desktop";
				obj.p_userbrowser = "Chrome";
				obj.p_username = value.CntctDtl.Name;

		    	let insert_data_qrydtl = value.QryDtl; 
		    	let insert_data_cntctdtl = value.CntctDtl; 
		    }); 	
		    // console.log(typeof(tt));	
		// });
	    // res.send(convert.xml2json(xml_data, {compact: true, spaces: 4}));

	    // res.send(resultobj1);

    }
}