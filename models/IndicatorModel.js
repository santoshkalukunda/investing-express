const mongoose = require('mongoose');

const smaSchema =mongoose.Schema({
    name: {
       type: String,
    },
    smaSource : {
        type: String,
    },
    value:  {
        type: String,
    }, 
    color: {
        type: String,
    },
    lineType: {
        type: String,
    },
    lineThiknes: {
        type: String,
    }
    
});
const IndicatorModel = mongoose.model("sma", smaSchema);

module.exports = IndicatorModel;