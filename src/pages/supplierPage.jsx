import React, {useEffect, useReducer, useState} from 'react';
import "../style/supplierPage.css"
import ImageUploader from "../components/imageUploader";
import axios from "axios";
import {ImagesGallery} from "../components/imagesGallery";


function SupplierPage() {
    const supplierId = window.location.pathname.split("/")[2]
    const [supplierData, setSupplierData] = useState({})
    const [isError, setIsError] = useState(false)
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);


    function deleteImage(imageId) {
        console.log(imageId)
        axios.delete(`https://pakworldbackend.herokuapp.com/deleteInvoice/${imageId}`).then(result => {
            if (result.status === 200) {
                //ok
                fetchSupplierData()
                forceUpdate()
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });

    }


    function fetchSupplierData() {
        axios.get(`https://pakworldbackend.herokuapp.com/supplierData/${supplierId}`)
            .then(function (response) {
                console.log(response.data);
                setSupplierData(response.data)
            })
            .catch(function (error) {
                console.log(error);
                setIsError(true)
            })
    }


    useEffect(() => {
        if (supplierId) {
            fetchSupplierData()
        }
        console.log("did mount")
    }, [])

    let IMG_SET = []

    if (supplierData.invoices && supplierData.invoices) {
        for (const invoice of supplierData.invoices) {
            IMG_SET.push({src: `https://pakworldbackend.herokuapp.com/{invoice.image_url}`})
        }
    }

    const imagesGallery = supplierData && supplierData.invoices && supplierData.invoices.length > 0 ?
        <ImagesGallery
            invoices={supplierData.invoices}
            supplierId={supplierId}
            deleteImage={(imageId) => deleteImage(imageId)}/>
        : null
    return (
        supplierData ? (
            <div>
                <h3 style={{display: 'flex', justifyContent: 'center', height: '5vh'}}> {supplierData.name}</h3>
                <p style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '5vh'
                }}> Address: {supplierData.address}</p>
                <p style={{display: 'flex', justifyContent: 'center', height: '5vh'}}> Contact
                    number: {supplierData.contact_number}</p>
                {imagesGallery}
                <ImageUploader supplierId={supplierId} fetchSupplierData={() => fetchSupplierData()}/>
            </div>
        ) : <div> Error fetching supplier data</div>
    );
}

export default SupplierPage;