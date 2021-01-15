const { RegisteredSeller } = require('../models/registerSellerModel')
const { RegisteredBuyer } = require('../models/registerBuyerModel')

const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.get('/:id', auth, async (req, res) => {
    try{
    const seller = await RegisteredSeller.findById(req.params.id);
    const buyer = await RegisteredBuyer.findById(req.params.id);

    //res.send(seller.allowed)
//checking if its a buyer or seller, then checking if their allowed is true or not

    if (buyer) {
        if (buyer.allowed) {
            res.send(buyer.allowed);
        }
        else {
            res.send(false)
        }
    }
    else if (seller) {
        if (seller.allowed) {
            res.send(seller.allowed);
        }
        else {
            res.send(false)
        }
    }
    else {
        res.send("User Not found")
    }
}
catch (ex) {
   res.status(500).send('Something failed from the server.')
}
});



module.exports = router;