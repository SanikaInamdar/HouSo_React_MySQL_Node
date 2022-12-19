import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function Adminpage() {
    const [wingFlatno, setwingFlatno] = useState(""); //variable that can be changed and be sent to our database.
    const [flatType, setflatType] = useState("");
    const [societyName, setsocietyName] = useState("");
    const [area, setarea] = useState(0);
    const [resiStatus, setresiStatus] = useState("");
    const [floor, setfloor] = useState(0);
    //-------------
    const [governmentID, setgovernmentID] = useState(0);
    const [ownerName, setownerName] = useState("");
    const [purchaseDate, setpurchaseDate] = useState("");
    const [contactNo, setcontactNo] = useState("");
    const [country_code, setcountry_code] = useState(0)
    //---------------
    const [flatownerList, setflatownerList] = useState([]);
    //---------------
    const [monthPaid, setmonthPaid] = useState("");
    const [totalMaintenance, settotalMaintenance] = useState(0);
    //---------------
    const [paymentStatus, setpaymentStatus] = useState("");
    const [totalsocMaintenance, settotalsocMaintenance] = useState(0);
    //---------------
    const [form, setform] = useState("createflat");

    const addFlat = () => {
        //making post request to server through the endpopints
        //{key(same as in backend for catching the frontend):value(it is the variable name in state in frontend)}-> body objects
        Axios.post('https://houso-backend.up.railway.app/createflat', {
            wingFlatno: wingFlatno,
            flatType: flatType,
            societyName: societyName,
            area: area,
            resiStatus: resiStatus,
            floor: floor
        }).then(() => {
            console.log("Success");

            alert("Flat added Successfully");
        });
    };
    const addOwner = () => {
        //making post request to server through the endpoints
        //{key(same as in backend for catching the frontend):value(it is the variable name in state in frontend)}-> body objects
        Axios.post('https://houso-backend.up.railway.app/createowner', {
            wingFlatno: wingFlatno,
            governmentID: governmentID,
            ownerName: ownerName,
            purchaseDate: purchaseDate,
            contactNo: contactNo,
            country_code: country_code
        }).then(() => {
            console.log("Success");

            alert("Owner added Successfully");
        });
    };
    const updateOwner = () => {
        //making post request to server through the endpopints
        //{key(same as in backend for catching the frontend):value(it is the variable name in state in frontend)}-> body objects
        Axios.put('https://houso-backend.up.railway.app/updateowner', {

            governmentID: governmentID,
            ownerName: ownerName,
            purchaseDate: purchaseDate,
            contactNo: contactNo,
            country_code: country_code,
            wingFlatno: wingFlatno
        }).then(() => {
            console.log("Success");

            alert("Owner updated Successfully");
        });
    };
    const getFlatandowner = () => {
        Axios.get('https://houso-backend.up.railway.app/getflatandowner').then((response) => {
            console.log(response.data);
            setflatownerList(response.data);
        });
    };
    const gettotalmonthmain = () => {
        Axios.post('https://houso-backend.up.railway.app/findtotalmainten', {
            monthPaid: monthPaid
        }).then((response) => {
            //console.log(response);
            if (!response.data[0].Total) {
                settotalsocMaintenance(0);
            }
            else {
                settotalsocMaintenance(response.data[0].Total);
            }
        });
    };
    const getpaymentStatus = () => {
        Axios.post('https://houso-backend.up.railway.app/checkflatpayment', {
            wingFlatno: wingFlatno,
            monthPaid: monthPaid
        }).then((response) => {
            console.log(response.data);
            setpaymentStatus(response.data);
        });
    };
    const addmonthlyPayment = () => {

        //making post request to server through the endpopints
        //{key(same as in backend for catching the frontend):value(it is the variable name in state in frontend)}-> body objects
        Axios.post('https://houso-backend.up.railway.app/adminaddpayment', {
            monthPaid: monthPaid,
            totalMaintenance: totalMaintenance
        }).then(() => {
            console.log("Success");

            alert("Monthly Payment added Successfully");
        });
    };
    return (
        <div className="row adminpage">
            <h1 className="admintitle">Orchids Society Admin</h1>
            <div className="col-lg-6">
                <button onClick={() => {
                    setform("createflat")
                }} className="adminfuncbtn">Create a flat</button>
                <button onClick={() => {
                    setform("createowner")
                }} className="adminfuncbtn">Add Owner of flat</button>
                <button onClick={() => {
                    setform("displayflatowner")
                }} className="adminfuncbtn">Display flats and owners</button>
                <button onClick={() => {
                    setform("addmonthlypayment")
                }} className="adminfuncbtn">Add monthly payment</button>
                <button onClick={() => {
                    setform("checkpayment")
                }} className="adminfuncbtn">Check monthly payment</button>
                <button onClick={() => {
                    setform("displaytotalpayment")
                }} className="adminfuncbtn">Display total monthly payment</button>
            </div>
            <div className="col-lg-6">
                {form === "createflat" &&
                    <div className="addFlatform">
                        <label>wingFlatno</label>
                        <input type="text"
                            onChange={(event) => {
                                setwingFlatno(event.target.value);
                            }}
                        />
                        <label>flatType</label>
                        <input type="text"
                            onChange={(event) => {
                                setflatType(event.target.value);
                            }}
                        />
                        <label>Society name</label>
                        <input type="text"
                            onChange={(event) => {
                                setsocietyName(event.target.value);
                            }}
                        />
                        <label>Area</label>
                        <input type="text"
                            onChange={(event) => {
                                setarea(event.target.value);
                            }}
                        />
                        <label>Status of residence</label>
                        <input type="text"
                            onChange={(event) => {
                                setresiStatus(event.target.value);
                            }}
                        />
                        <label>floor of flat</label>
                        <input type="text"
                            onChange={(event) => {
                                setfloor(event.target.value);
                            }}
                        />
                        <button onClick={addFlat}>Add a Flat</button>
                    </div>}

                {form === "createowner" &&
                    <div className="addOwnerform">
                        <label>Wing and Flatno</label>
                        <input type="text"
                            onChange={(event) => {
                                setwingFlatno(event.target.value);
                            }}
                        />
                        <label>Government ID</label>
                        <input type="number"
                            onChange={(event) => {
                                setgovernmentID(event.target.value);
                            }}
                        />
                        <label>Name of Owner</label>
                        <input type="text"
                            onChange={(event) => {
                                setownerName(event.target.value);
                            }}
                        />

                        <label>Date of Purchase</label>
                        <input type="text"
                            onChange={(event) => {
                                setpurchaseDate(event.target.value);
                            }}
                        />

                        <label>Contact No</label>
                        <input type="text"
                            onChange={(event) => {
                                setcontactNo(event.target.value);
                            }}
                        />

                        <label>Countrycode</label>
                        <input type="number"
                            onChange={(event) => {
                                setcountry_code(event.target.value);
                            }}
                        />
                        <div className="row">
                            <div className="col">
                            <button id="b1" onClick={addOwner}>Add an OWNER</button>
                            </div>
                            <div className="col">
                            <button id="b1" onClick={updateOwner}>Update an OWNER</button>
                            </div>
                        </div>
                        
                        
                    </div>}

                {form === "displayflatowner" &&
                    <div className="showallform">
                        <button onClick={getFlatandowner}>SHOW FLAT AND OWNERS</button>
                        {flatownerList.map((val, key) => {
                            return <div className="flatandowner">
                                <div className="row">
                                    <div className="col"><h3>Name: {val.wingFlatno}</h3>
                                        <h3>Type of flat: {val.flatType}</h3>
                                        <h3>Name of Society: {val.societyName}</h3>
                                        <h3>Area: {val.area}</h3>
                                        <h3>Residence Status: {val.resiStatus}</h3>
                                        <h3>GovernmentID: {val.governmentID}</h3></div>
                                    <div className="col"><h3>floor: {val.floor}</h3>

                                        <h3>ownerName: {val.ownerName}</h3>
                                        <h3>purchaseDate: {val.purchaseDate}</h3>
                                        <h3>contactNo: {val.contactNo}</h3>
                                        <h3>country_code: {val.country_code}</h3></div>


                                </div>
                            </div>
                        })}
                    </div>}

                {form === "addmonthlypayment" &&
                    <div className="addpaymentform">
                        <label>Month of maintenance</label>
                        <input type="text"
                            onChange={(event) => {
                                setmonthPaid(event.target.value);
                            }}
                        />

                        <label>Total Month Maintenance</label>
                        <input type="number"
                            onChange={(event) => {
                                settotalMaintenance(event.target.value);
                            }}
                        />
                        <button onClick={addmonthlyPayment}>Add a monthly Payment</button>
                    </div>}

                {form === "checkpayment" &&
                    <div className="paymentstatusform">
                        <label>Wing and Flatno</label>
                        <input type="text"
                            onChange={(event) => {
                                setwingFlatno(event.target.value);
                            }}
                        />

                        <label>Month of maintenance</label>
                        <input type="text"
                            onChange={(event) => {
                                setmonthPaid(event.target.value);
                            }}
                        />
                        <button onClick={getpaymentStatus}>Check Status of Payment</button>
                        <h2>{paymentStatus}</h2>
                    </div>}

                {form === "displaytotalpayment" &&
                    <div className="totalmonthlypaymentform">
                        <label>Month of maintenance</label>
                        <input type="text"
                            onChange={(event) => {
                                setmonthPaid(event.target.value);
                            }}
                        />
                        <button onClick={gettotalmonthmain}>Total Maintenance Received</button>
                        <h2>{totalsocMaintenance}</h2>
                    </div>}
            </div>
        </div>
    );
}

export default Adminpage;
