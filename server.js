var express = require('express')
var app = express();

const config = require('./system/core/config/main');
var routes = require('./system/core/router.js');
app.use('/', routes);

app.set('view engine', 'pug');
app.set('views', './views/');

global.base_url = config.baseUrl;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname+ '/public/js'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + '/public/bootstrap-4.3.1-dist'));
app.use(express.static(__dirname + '/public/fontawesome'));

app.listen(config.port, () => console.log(`Server running on ${config.host}${config.port}`));


