let express = require('express');
let app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.listen(app.get('port'), function() {
    console.log('Dashboard is running on port', app.get('port'));
});
