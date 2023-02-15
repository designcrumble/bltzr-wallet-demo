import React, { useState, useEffect } from 'react';
import { createHash } from 'crypto';

const HashGenerator = ({ handleNext }) => {
    const [textInput, setTextInput] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [imageInput, setImageInput] = useState(null);
    const [generatedHash, setGeneratedHash] = useState(null);

    const generateHash = () => {
        // Create a buffer from the concatenated text and image inputs
        const inputData = Buffer.from(textInput + imageInput);

        // Use the SHA256 algorithm to generate the hash
        const hash = createHash('sha256');
        hash.update(inputData);
        const generatedHash = hash.digest('hex');

        // Store the generated hash in state
        setGeneratedHash(generatedHash);
        // Save data to local storage on change
        localStorage.setItem('secureHash', generatedHash);
    };
    // Handle Image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImageInput(file)
        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
            generateHash();
        }
    };
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewImage(event.target.result);
            generateHash();
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };


    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setTextInput(storedUsername);
        }
    }, []);

    return (
        <div>
            <h2>Unique Image</h2>


            <div className='image-container'>
                <label htmlFor="profilePicture">
                    <div>
                        <h6>Drag in an image or upload</h6>
                        <p>JPG, PNG, GIF upto 10mb</p>
                    </div>
                    {previewImage && <div style={{ backgroundImage: `url(${previewImage})`, inset: '0', position: 'absolute', backgroundSize: "cover" }} />}
                    <input id="profilePicture" type="file" onChange={handleImageUpload} onDrop={handleDrop} onDragOver={handleDragOver} />
                </label>
            </div>
            {/* <button onClick={generateHash}>Generate Hash</button> */}
            {generatedHash && <p>Generated Hash: {generatedHash}</p>}
            {previewImage ?
                <button className='btn-primary mt-16' onClick={handleNext}>Next</button>
                :
                <button className='btn-primary mt-16' disabled >Next</button>}
        </div>
    );
};

export default HashGenerator;