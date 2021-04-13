import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import AddSupplierFormDialog from "../components/addSupplierFormDialog";
import RemoveSupplierFormDialog from "../components/removeSupplierFormDialog";




function SuppliersPage() {
    const history = useHistory();
    const [supplierData, setSupplierData] = useState({});
    const [isError, setIsError] = useState(false);


    function addSupplier(name, address, contact_number) {
        axios.post("https://pakworldbackend.herokuapp.com/addSupplier", {
            supplier_name: name,
            supplier_address: address,
            supplier_contact_number: contact_number
        }).then(result => {
            if (result.status === 200) {
                //ok
                fetchSuppliers()
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    }

    function deleteSupplier(supplierName) {
        axios.delete(`https://pakworldbackend.herokuapp.com/deleteSupplier/${supplierName}`).then(result => {
            if (result.status === 200) {
                //ok
                fetchSuppliers()
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    }

    async function fetchSuppliers() {
        axios.get('https://pakworldbackend.herokuapp.com/allSuppliers')
            .then(function (response) {
                console.log(response);
                setSupplierData(response)
            })
            .catch(function (error) {
                console.log(error);
                setIsError(true)
            })
    }

    function handleSelectedSupplier(supplierId) {
        console.log("handleSelectedSupplier" + supplierId)
        history.push(`/supplier/${supplierId}`);
    }


    useEffect(()=> {
        console.log("did mount")
        fetchSuppliers().then(r => {
            console.log('Supplier fetched')
        })

    }, [])


    return (
        <div>
            <div>
                <AddSupplierFormDialog onConfirm={ (name, address, contact_number)=> {
                    return addSupplier(name, address, contact_number);
                }}
                />
            </div>
            <br/>
            <div>
                <RemoveSupplierFormDialog onConfirm={ (name)=> {
                    return deleteSupplier(name);
                }}
                />
            </div>
            <br/>
            <ul className="list-group">
                {
                    supplierData && supplierData.data ? supplierData.data.map(supplier => (
                        <div onClick={()=> handleSelectedSupplier(supplier.supplierid)} key={supplier.supplierid} className="list-group-item">{supplier.name}</div>
                    )) : null
                }
            </ul>
        </div>
    );
}

export default SuppliersPage;