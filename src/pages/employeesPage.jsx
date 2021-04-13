import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import AddEmployeeFormDialog from "../components/addEmployeeFormDialog";
import RemoveEmployeeFormDialog from "../components/removeEmployeeFormDialog";
import useUser from "../components/auth/useUser";



function EmployeesPage(props) {
    const history = useHistory();
    const [employeesData, setEmployeesData] = useState({});
    const [isError, setIsError] = useState(false);
    const { user } = useUser();
    const isAdmin = user === props.authorisedUser || false

    function addEmployee(lastname, firstname, address, city, age) {
        axios.post("https://pakworldbackend.herokuapp.com/addEmployee", {
            lastname,
            firstname,
            address,
            city,
            age
        }).then(result => {
            if (result.status === 200) {
                //ok
                fetchEmployees()
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    }

    function deleteEmployee(employeeId) {
        axios.delete(`https://pakworldbackend.herokuapp.com/deleteEmployee/${employeeId}`).then(result => {
            if (result.status === 200) {
                //ok
                setIsError(false);
                fetchEmployees()
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    }

    async function fetchEmployees() {
        axios.get('https://pakworldbackend.herokuapp.com/allEmployees')
            .then(function (response) {
                console.log(response);
                setEmployeesData(response)
            })
            .catch(function (error) {
                console.log(error);
                setIsError(true)
            })
    }

    function handleSelectedEmployee(employeeId) {
        console.log("handleSelectedEmployee" + employeeId)
        history.push(`/employee/${employeeId}`);
    }


    useEffect(()=> {
        console.log("did mount")
        fetchEmployees().then(r => {
            console.log('Supplier fetched')
        })

    }, [])


    return (
        <div>
            <div>
                <AddEmployeeFormDialog onConfirm={ (employeeLastname, employeeFirstname, employeeAddress, employeeCity, employeeAge)=> {
                    return addEmployee(employeeLastname, employeeFirstname, employeeAddress, employeeCity, employeeAge);
                }}
                />
            </div>
            <div>
                {
                    isAdmin ? (
                        <div>

                            <br/>
                            <div>
                                <RemoveEmployeeFormDialog onConfirm={ (employeeID)=> {
                                    return deleteEmployee(employeeID);
                                }}
                                />
                            </div>
                            <br/>

                        </div>
                    ) : <br/>
                }
            </div>
            {
                isError ? <div>Error trying removing employee</div> : null
            }
            <br/>
            <ul className="list-group">
                {
                    employeesData && employeesData.data ? employeesData.data.map(employee => (
                        <div>
                            <div onClick={()=> handleSelectedEmployee(employee.employeeID)} key={employee.employeeID} className="list-group-item">{employee.LastName} {employee.FirstName} (ID: {employee.employeeID})</div>
                        </div>

                    )) : null
                }
            </ul>
        </div>
    );
}

export default EmployeesPage;