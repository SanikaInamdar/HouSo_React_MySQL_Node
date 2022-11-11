import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function Ownerpage() {
    const [wingFlatno, setwingFlatno] = useState("");
    const [monthPaid, setmonthPaid] = useState("");
    const [getdueofflat, setgetdueofflat] = useState([]);
    const [governmentID, setgovernmentID] = useState(0);
    const [tenantName, settenantName] = useState("");
    const [contactNo, setcontactNo] = useState("");
    const [agreementDate, setagreementDate] = useState("");
    const [tenantDetails, settenantDetails] = useState([]);
    const [form, setform] = useState("checkflatdueform");
    const checkflatdue = () => {
        Axios.post('http://localhost:3001/checkduepayment', {
            wingFlatno: wingFlatno
        }).then((response) => {
            //console.log(response);
            setgetdueofflat(response.data);
        });
    };
    const makepayment = () => {
        Axios.put('http://localhost:3001/makepayment', {
            wingFlatno: wingFlatno,
            monthPaid: monthPaid
        }).then(() => {
            //console.log(response);
            alert("Payment made Successfully");
        });
    };
    const addTenant = () => {
        //making post request to server through the endpopints
        //{key(same as in backend for catching the frontend):value(it is the variable name in state in frontend)}-> body objects
        Axios.post('http://localhost:3001/createtenant', {
            wingFlatno: wingFlatno,
            governmentID: governmentID,
            tenantName: tenantName,
            contactNo: contactNo,
            agreementDate: agreementDate
        }).then(() => {
            console.log("Success");

            alert("Tenant added Successfully");
        });
    };
    const getTenant = () => {
        Axios.post('http://localhost:3001/gettenant', {
            wingFlatno: wingFlatno
        }).then((response) => {
            // if(response.data.lenght===0)
            // {
            //     alert("No Tenant for the flat");
            // }
            //console.log(response);

            settenantDetails(response.data);
        });
    };
    const deleteTenant = () => {
        Axios.post('http://localhost:3001/deletetenant', {
            wingFlatno: wingFlatno
        }).then((response) => {
            alert("Tenant Deleted Successfully");
        });
    };
    return (
        <div className="row adminpage">
            <h1 className="ownertitle">Owner's Portal</h1>
            <div className="col-lg-6">
                <button onClick={() => {
                    setform("checkflatdueform")
                }} className="adminfuncbtn">Check DUE of Flat</button>
                <button onClick={() => {
                    setform("makepaymentform")
                }} className="adminfuncbtn">Make a payment for your flat</button>
                <button onClick={() => {
                    setform("addtenantform")
                }} className="adminfuncbtn">Add a tenant to flat</button>
                <button onClick={() => {
                    setform("showanddeleteform")
                }} className="adminfuncbtn">Show and Delete Tenant</button>
            </div>
            <div className="col-lg-6">
                {form === "checkflatdueform" &&
                    <div className="checkflatdueform ff">
                        <label>wingFlatno</label>
                        <input type="text"
                            onChange={(event) => {
                                setwingFlatno(event.target.value);
                            }}
                        />
                        <button onClick={checkflatdue}>Total maintenance Payment</button>
                        {getdueofflat.map((val, key) => {
                            return <div className="flatandowner">
                                <div>
                                    <h3>totalMaintenance: {val.totalMaintenance}</h3>
                                    <h3>Due Month: {val.monthPaid}</h3>
                                </div>
                            </div>
                        })}
                    </div>}
                {form === "makepaymentform" &&
                    <div className="makepaymentform ff">
                        <label>wingFlatno</label>
                        <input type="text"
                            onChange={(event) => {
                                setwingFlatno(event.target.value);
                            }}
                        />
                        <label>Month of Payment</label>
                        <input type="text"
                            onChange={(event) => {
                                setmonthPaid(event.target.value);
                            }}
                        />
                        <button onClick={makepayment}>Make Payment</button>
                    </div>}
                {form === "addtenantform" &&
                    <div className="addtenantform ff">
                        <label>Wing Flat number</label>
                        <input type="text"
                            onChange={(event) => {
                                setwingFlatno(event.target.value);
                            }}
                        />

                        <label>Government Id</label>
                        <input type="number"
                            onChange={(event) => {
                                setgovernmentID(event.target.value);
                            }}
                        />

                        <label>Tenant name</label>
                        <input type="text"
                            onChange={(event) => {
                                settenantName(event.target.value);
                            }}
                        />

                        <label>Contact number</label>
                        <input type="text"
                            onChange={(event) => {
                                setcontactNo(event.target.value);
                            }}
                        />

                        <label>Agreement Date</label>
                        <input type="text"
                            onChange={(event) => {
                                setagreementDate(event.target.value);
                            }}
                        />
                        <button onClick={addTenant}>Add Tenant</button>
                    </div>}
                {form === "showanddeleteform" &&
                    <div className="showanddeleteform ff">
                        <label>Wing Flat number</label>
                        <input type="text"
                            onChange={(event) => {
                                setwingFlatno(event.target.value);
                            }}
                        />
                        <div className="row">
                            <div className="col">
                                <button onClick={deleteTenant}>DELETE Tenant</button>
                            </div>
                            <div className="col">
                                <button onClick={getTenant}>SHOW Tenant</button>
                            </div>
                        </div>


                        {tenantDetails.map((val, key) => {
                            return <div className="flatandowner">
                                <div>
                                    <h3>Name: {val.tenantName}</h3>
                                    <h3>Government ID: {val.governmentID}</h3>
                                    <h3>Agreement Date: {val.agreementDate}</h3>
                                    <h3>contactNo: {val.contactNo}</h3>
                                </div>
                            </div>
                        })}
                    </div>}
            </div>

        </div>
    );
}

export default Ownerpage;
