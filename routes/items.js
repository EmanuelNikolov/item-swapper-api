const express = require('express');
const ItemsRepository = require("../repositories/ItemsRepository");
const router = express.Router();

/* Get items */
router.get('/', function (req, res, next) {
    const items = ItemsRepository.findAll();
    res.json(items);
});

/* Swap items */
router.patch('/swap', function (req, res, next) {
    const [itemIdA, itemIdB] = req.body;
    const itemA = ItemsRepository.findOne(itemIdA);
    const itemB = ItemsRepository.findOne(itemIdB);
    
    const tempOrder = itemA.order;
    itemA.order = itemB.order;
    itemB.order = tempOrder;
    
    ItemsRepository.persist(itemA);
    ItemsRepository.persist(itemB);
    
    res.json({ok: 1});
});

module.exports = router;
