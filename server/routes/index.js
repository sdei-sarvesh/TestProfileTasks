var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('build/index.html', { title: 'Profile' });
});

/*
createdBy:smartData
createdAt:26Feb2018
function created for get user data
*/
router.get('/readData', function (req, res, next) {
    next();
}, function (req, res, next) {
    var fs = require('fs');
    fs.readFile('./server/datafile/datajson', 'utf8', function (err, data) {
        console.log('err=>', err);
        console.log('data=>', data);
        if (err) {
            res.json({ status: 400, message: err });
        }
        res.json({ status: 200, message: "Record fetched successfully", data: JSON.parse(data) });
    });
});

/*
createdBy:smartData
createdAt:26Feb2018
function created for update user
*/
router.post('/updateData', function (req, res, next) {
    var fs = require('fs');
    fs.readFile('./server/datafile/datajson', 'utf8', function read(err, data) {
        if (err) {
            res.json({ status: 400, message: 'Something went wrong.', id: req.body.id });
        } else {
            content = JSON.parse(data);
            if (content.id == req.body.id) {
                content.name = req.body.name;
                content.city = req.body.city;
                content.id = req.body.id;
                var newData = JSON.stringify(content);
                fs.writeFile('./server/datafile/datajson', newData, function (err) {
                    res.json({ status: 200, message: 'Record updated successfully.', data: content });
                });
            } else {
                res.json({ status: 400, message: 'Record not found.' });

            }
        }
    });
});

module.exports = router;
