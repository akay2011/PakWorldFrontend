import React, { useEffect, useState } from 'react';
import "../style/imageUploader.css"
import axios from 'axios';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ImageUploader(props) {
    const [selectedFile, setSelectedFile] = useState(null)
    const [loaded, setLoaded] = useState(0)
    const MAX_FILE_SIZE = 2000000
    const {supplierId, fetchSupplierData} = props

    function maxSelectFile (event) {
        let files = event.target.files
        if (files.length > 3) {
            const msg = 'Only 3 images can be uploaded at a time'
            event.target.value = null
            toast.warn(msg)
            return false;
        }
        return true;
    }

    function checkMimeType (event){
        //getting file object
        let files = event.target.files
        //define message container
        let err = []
        // list allow mime type
        const types = ['image/png', 'image/jpeg', 'image/gif']
        // loop access array
        for(let x = 0; x<files.length; x++) {
            // compare file type find doesn't matach
            if (types.every(type => files[x].type !== type)) {
                // create error message and assign to container
                err[x] = files[x].type+' is not a supported format\n';
            }
        };
        for(let z = 0; z<err.length; z++) {// if message not same old that mean has error
            // discard selected file
            toast.error(err[z])
            event.target.value = null
        }
        return true;
    }

    function checkFileSize (event) {
        let files = event.target.files
        let err = [];
        for(let x = 0; x<files.length; x++) {
            if (files[x].size > MAX_FILE_SIZE) {
                err[x] = files[x].type + ' is too large, please pick a smaller file\n';
            }
        };
        for(var z = 0; z< err.length; z++) {// if message not same old that mean has error
            // discard selected file
            toast.error(err[z])
            event.target.value = null
        }
        return true;
    }




    function onChangeHandler(event) {
        const files = event.target.files
        if(maxSelectFile(event) && checkMimeType(event) && checkFileSize(event)){
            // if return true allow to setState
            setSelectedFile(files)
            setLoaded(0)
        }
    }


    function onClickHandler () {
        const data = new FormData()
        data.append('supplierId', supplierId)
        if(selectedFile){
            for(let x = 0; x < selectedFile.length; x++) {
                data.append('file', selectedFile[x])
            }
            axios.post("https://pakworldbackend.herokuapp.com/uploadInvoice", data, {
                onUploadProgress: ProgressEvent => {
                    setLoaded((ProgressEvent.loaded / ProgressEvent.total*100))
                },
            })
                .then(res => { // then print response status
                    toast.success('upload success')
                    fetchSupplierData()
                })
                .catch(err => { // then print response status
                    toast.error('upload failed')
                    console.log(err)
                })
        }else {
            toast.error('Please add a file to upload')
        }

    }

    return (
        <div class="container">
            <div class="row">
                <div class="offset-md-3 col-md-6">
                    <div class="form-group files">
                        <label>Upload Your File </label>
                        <input type="file" class="form-control" onChange={(event) => onChangeHandler(event)}/>
                    </div>
                    <div class="form-group">
                        <ToastContainer />
                        <Progress max="100" color="success" value={loaded} >{Math.round(loaded) }%</Progress>
                    </div>

                    <button type="button" class="btn btn-success btn-block" onClick={(event) => onClickHandler(event)}>Upload</button>

                </div>
            </div>
        </div>
    );
}

export default ImageUploader;