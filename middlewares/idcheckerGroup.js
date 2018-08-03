const createError = require('http-errors');
const mongoose = require('mongoose');
const Group = require('../models/group');

const idCheckGroup = (req, res, next) => {
    const { id } = req.params;
    const regExp = RegExp('^[a-fA-F0-9]{24}$');
    if (!mongoose.Types.ObjectId.isValid(id) || !regExp.test(id)) {
        next(createError(404));
    } else {
        next();
    }
};

module.exports = idCheckGroup;