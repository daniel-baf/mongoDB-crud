const app = require('./server');
require('./database');


app.listen(app.get('port'), () => {
    console.log('SERVER ON PORT: ' + app.get('port'));
});