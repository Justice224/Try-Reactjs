import React, { Component } from 'react'

import Dropzone from 'react-dropzone'

const imageMaxSize = 1000000000 // bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})
class ImgDropAndCrop extends Component {
    constructor(props){
        super(props)
        this.state = {
            imgSrc: null
        }
    }

    verifyFile = (files) => {
        if (files && files.length > 0){
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if(currentFileSize > imageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)){
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }

    handleOnDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0){
            this.verifyFile(rejectedFiles)
        }


        if (files && files.length > 0){
             const isVerified = this.verifyFile(files)
             if (isVerified){
                 // imageBase64Data 
                 const currentFile = files[0]
                 const myFileItemReader = new FileReader()
                 myFileItemReader.addEventListener("load", ()=>{
                     console.log(myFileItemReader.result)
                     this.setState({
                         imgSrc: myFileItemReader.result
                     })
                 }, false)

                 myFileItemReader.readAsDataURL(currentFile)

             }
        }
    }

  render () {
      const {imgSrc} = this.state
    return (
      <div>
        <h1>Drop and Crop</h1>
        {imgSrc !== null ? 
            <div>
                {imgSrc}
                <img src={imgSrc} /> 
             </div>: 

             <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypes} multiple={false} maxSize={imageMaxSize}>Drop image here or click to upload</Dropzone>
         }
        
      </div>
    )
  }
}

export default ImgDropAndCrop
