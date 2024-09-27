import React, { useState } from 'react';
import '../assets/css/imageService.css';

const ImageUpload = ({ onImageUpload, loading, onImageProcessed }) => {
    const [imagen, setImagen] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                if ((file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') && img.width >= 300 && img.width <= 1250 && img.height >= 300 && img.height <= 1250) {
                    setImagen(file);
                    setError('');
                } else {
                    setImagen(null);
                    setError('La imagen debe ser JPG, JPEG o PNG y tener un tamaño mayor a 300x300 píxeles y menor a 1000x1000 píxeles.');
                }
            };
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (imagen) {
            await onImageUpload(imagen);
            onImageProcessed(); // Llama al callback cuando la imagen haya sido procesada
        }
    };

    return (
        <section id="upload">
            <h1>Módulo de Carga de Imágenes</h1>
            <p>
                En este módulo, puedes cargar tu imagen facial para que sea analizada.</p>
            <form onSubmit={handleSubmit}>
                <input type="file" name="imagen" onChange={handleFileChange} />
                <button type="submit" disabled={!imagen || loading}>
                    {loading ? 'Procesando...' : 'Aceptar'}
                </button>
            </form>
            {loading && <div className="spinner-border text-light" role="status"></div>}
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
        </section>
    );
};

export default ImageUpload;
