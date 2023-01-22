const router =require("express").Router();
const stockController = require("../controllers/stockController");

//all products
router.get('/stock',stockController.index);

router.get('/stock/search',stockController.index1);
router.post('/stock/sma',stockController.smaSave);

router.get('/api/stock/:symbol/:interval',stockController.show);

module.exports = router;