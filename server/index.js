const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: "password",
//     database: "society",
// });
const db = mysql.createConnection({
	user: "u4z57ss9m4ac4mzf",
	host: "byfhtzlfszq54zs6guvd-mysql.services.clever-cloud.com",
	password: "nKY7I4PErURB3wWz7sMx",
	database: "byfhtzlfszq54zs6guvd",
});

//----------------------LOGIN REQUESTS----------------------
app.post("/adminlogin", (req, res) => {

    const username = req.body.username;
    //bkend             //frontend one
    const password = req.body.password;
    db.query("SELECT * FROM SocietyAdmin WHERE adminName = ? AND adminPswrd = ?",
        [username, password], (err, result) => {
            if (err) {
                //console.log(err);
                res.send({ err: err });
            }

            if (result.length > 0) {
                console.log("present");
                res.send(result);
            }
            else {
                res.send({ message: "Wrong Username Password, try again!" });
            }

        });
});

app.post("/ownerlogin", (req, res) => {

    const username = req.body.username;
    //bkend             //frontend one
    const password = req.body.password;
    db.query("SELECT * FROM Owner WHERE wingFlatno = ? AND  governmentID = ?",
        [username, password], (err, result) => {
            if (err) {
                //console.log(err);
                res.send({ err: err });
            }

            if (result.length > 0) {
                //console.log("present");
                res.send(result);
            }
            else {
                res.send({ message: "Wrong Username Password, try again!" });
            }

        });
});
//----------------------ADMIN REQUESTS----------------------
//admin - flat create
app.post("/createflat", (req, res) => {
    let values = [
        req.body.wingFlatno,
        req.body.flatType,
        req.body.societyName,
        req.body.area,
        req.body.resiStatus,
        req.body.floor
    ]
    db.query("INSERT INTO Flat (wingFlatno, flatType, societyName, area, resiStatus, floor) values (?,?,?,?,?,?)", values, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Values Inserted");
        }
    });
});
//admin - Owner create
app.post("/createowner", (req, res) => {
    let values = [
        req.body.wingFlatno,
        req.body.governmentID,
        req.body.ownerName,
        req.body.purchaseDate,
        req.body.contactNo,
        req.body.country_code
    ]
    db.query("INSERT INTO Owner (wingFlatno, governmentID, ownerName, purchaseDate, contactNo, country_code) values (?,?,?,?,?,?)", values, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Values Inserted");
        }
    });
});

//admin - flat and owner (join) show details

app.get('/getflatandowner', (req, res) => {
    db.query("SELECT * FROM Flat natural join Owner ORDER BY wingFlatno", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            res.send(result);
        }
    });
});

//admin - update owner of a flatno (input)

app.put('/updateowner', (req, res) => {
    let values = [
        req.body.governmentID,
        req.body.ownerName,
        req.body.purchaseDate,
        req.body.contactNo,
        req.body.country_code,
        req.body.wingFlatno
    ]
    db.query("UPDATE Owner SET governmentID = ?,ownerName = ?, purchaseDate=?, contactNo=?, country_code=? WHERE wingFlatno= ?", values, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});

//Admin - add monthly payments to payments table for all flats 
app.post("/adminaddpayment", (req, res) => {
    let values = [
        req.body.monthPaid,
        req.body.totalMaintenance
    ]
    db.query("call generatePayment2(?,?)", values, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Payment Generated");
        }
    });
});

//Admin - check monthly paid status of a particular flat (input - month and flatno)

app.post('/checkflatpayment', (req, res) => {
    let values = [
        req.body.wingFlatno,
        req.body.monthPaid
    ]
    console.log(req.body.wingFlatno);
    console.log(req.body);
    db.query("SELECT * FROM Payment WHERE wingFlatno=? AND monthPaid=?", values, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            var data = JSON.parse(JSON.stringify(result));
            console.log(data[0].status);
            res.send(data[0].status);

        }
    });
});

//Admin - find total maintenance received in a particular month
app.post('/findtotalmainten', (req, res) => {
    let values = [
        req.body.monthPaid,
    ]
    db.query("SELECT SUM(totalMaintenance) as Total FROM Payment WHERE monthPaid=? AND status='PAID'", values, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            //onsole.log(result.[0].totalMaintenance);
            var data = JSON.parse(JSON.stringify(result));
            console.log(data[0].Total);
            res.send(data);
        }
    });
});

//----------------------OWNER REQUESTS----------------------
//Owner- check for DUEs of a flat
app.post('/checkduepayment', (req, res) => {
    let values = [
        req.body.wingFlatno,
    ]
    db.query("SELECT * FROM Payment WHERE wingFlatno=? AND status='DUE'", values, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            var data = JSON.parse(JSON.stringify(result));
            console.log(data);
            res.send(result);
        }
    });
});
//Owner- make payment
app.put('/makepayment', (req, res) => {
    let values = [
        req.body.wingFlatno,
        req.body.monthPaid
    ]
    db.query("UPDATE Payment SET status ='PAID' WHERE wingFlatno= ? AND monthPaid=?", values, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});

//Owner- Add Tenant-> create tenant, update Flat resiStatus
app.post("/createtenant", (req, res) => {
    let values = [
        req.body.wingFlatno,
        req.body.governmentID,
        req.body.tenantName,
        req.body.contactNo,
        req.body.agreementDate
    ]
    db.query("INSERT INTO Tenant (wingFlatno, governmentID, tenantName, contactNo, agreementDate) values (?,?,?,?,?)", values, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            db.query("UPDATE Flat SET resiStatus='tenant' WHERE wingFlatno=?", [req.body.wingFlatno], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send("Tenant Addded");
                }
            })
            // res.send("Values Inserted");
        }
    });
});

//owner - show tenant details
app.post('/gettenant', (req, res) => {
    db.query("SELECT * FROM Tenant WHERE wingFlatno=?", [req.body.wingFlatno],(err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});

//owner- delete tenant of flat
app.post("/deletetenant", (req, res) => {
    db.query("DELETE FROM Tenant WHERE wingFlatno= ?",[req.body.wingFlatno], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            db.query("UPDATE Flat SET resiStatus='owner' WHERE wingFlatno=?", [req.body.wingFlatno], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send("Tenant Deleted");
                }
            })
        }
    });
});
app.listen(3001, () => {
    console.log("yay backend server running");
});