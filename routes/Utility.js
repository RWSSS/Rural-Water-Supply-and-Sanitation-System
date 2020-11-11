const express = require('express');
const router = express.Router();
const connection = require('./../db');
const config = require('./../config');

router.get('/getemergencyjobs', (req, res, next) => {
    connection.query(`SELECT JobCode, Designation from Jobs where Shift<>'Full-Time'`, function (err, result) {
        if(err)
        {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Jobs Fetched Successfully!", result });
    });
});

router.post('/emergencydetails', (req, res, next) => {
    connection.query(`Select e.EmpID, e.FName, e.LName, e.EContact, j.Designation, j.Shift from Employees e INNER JOIN Jobs j on e.JobCode=j.JobCode  where j.Designation='${req.body.Designation}' and j.Shift='${req.body.Shift}' and e.Pincode = ${req.body.Pincode}`, function (err, result) {
        if(err) {
            res.status(500).json({ message: err.toString() });
            return;
        }
        res.status(200).json({ message: "Employee Details Retrieved Successfully!", result });
    });
});
module.exports = router;