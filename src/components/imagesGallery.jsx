import React, {useState} from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

export const ImagesGallery = (props) => {
    const [images, setImages] = React.useState(null);
    const [isError, setIsError] = useState(false);

    const refImg = React.createRef();
    const { invoices, deleteImage } = props

    console.log(images)

    React.useEffect(() => {
        let shouldCancel = false;
        let imagesList = []
        invoices && invoices.map(invoice => (
            imagesList.push({
                id: invoice.image_url,
                original: `https://pakworldbackend.herokuapp.com/${invoice.image_url}`,
                thumbnail: `https://pakworldbackend.herokuapp.com/${invoice.image_url}`,
            })
        ))
        setImages(imagesList)
        return () => (shouldCancel = true);
    }, [invoices]);

    function deleteInvoice() {
        console.log(refImg)
        const currentIndex = refImg.current.getCurrentIndex()
        if(refImg && refImg.current){
            const invoiceId = images[currentIndex].id
            deleteImage(invoiceId)
            refImg.current.slideToIndex(currentIndex == 0 ? currentIndex : currentIndex - 1);
        }
    }

    return images ? <div>
        <ImageGallery ref={refImg} items={images} showBullets={true} showNav={true} showIndex={true}/>
        <button onClick={()=> deleteInvoice()}> Delete </button>
    </div> : null;
};