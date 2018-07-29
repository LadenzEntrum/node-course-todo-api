var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
// wenn MONGODB_URI existiert, weil wir von heroku aufrufen, dann den connect mongodb://heroku_jqm8kpph:o8qp89a95ltgd2j4qknbuftcbp@ds133084.mlab.com:33084/heroku_jqm8kpph
//sonst || localhost
module.export  = {mongoose};
