import React, {useEffect, useState} from 'react';
import axios from "axios";

function EmployeePage () {
    const employeeId = window.location.pathname.split("/")[2]
    const [employeeData, setEmployeeData] = useState({})
    const [isError, setIsError] = useState(false)

    function fetchEmployeeData() {
        axios.get(`https://pakworldbackend.herokuapp.com/employeeData/${employeeId}`)
            .then(function (response) {
                console.log(response.data);
                setEmployeeData(response.data)
            })
            .catch(function (error) {
                console.log(error);
                setIsError(true)
            })
    }

    useEffect(() => {
        if (employeeId) {
            fetchEmployeeData()
        }
        console.log("did mount")
    }, [])

    return (
        employeeData && !isError ? (
            <div>
                <h3 style={{display: 'flex', justifyContent: 'center', height: '5vh'}}> {employeeData.LastName} {employeeData.FirstName}</h3>
                <br/>
                <p style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '5vh'
                }}> Address: {employeeData.Address}</p>
                <p style={{display: 'flex', justifyContent: 'center', height: '5vh'}}> City: {employeeData.City}</p>
                <p style={{display: 'flex', justifyContent: 'center', height: '5vh'}}> Age: {employeeData.Age}</p>
            </div>
        ) : <div> Error fetching employee data</div>
    );

}

export default EmployeePage;