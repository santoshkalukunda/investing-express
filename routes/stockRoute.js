const router =require("express").Router();
const stockController = require("../controllers/stockController");

//all products
router.get('/stock',stockController.index);

router.get('/stock/search',stockController.search);
router.post('/stock/macd-save',stockController.macdSave);
router.post('/stock/sma',stockController.smaSave);

router.get('/api/stock/:symbol/:interval',stockController.show);
router.get('/api/stock/:stock/:symbol/:interval',stockController.stock);

module.exports = router;