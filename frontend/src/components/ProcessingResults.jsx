import React, { useState, useEffect } from 'react';

const ProcessingResults = ({ responseDataList, onSendData, resultado }) => {
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() => {
        setSelectedValues(responseDataList.map(() => ({ etnia: '', genero: '', edad: '' })));
    }, [responseDataList]);

    const handleSelectChange = (index, field, value) => {
        const updatedValues = [...selectedValues];
        updatedValues[index][field] = value;
        setSelectedValues(updatedValues);
    };

    return (
        <section id="processing">
            <h1>Módulo de Procesamiento</h1>
            <p>
                A continuación se presentan los resultados del procesamiento, incluyendo las imágenes analizadas y las 
                características extraídas:
            </p>
            {resultado && <p>{resultado}</p>}
            {responseDataList.map((data, index) => (
                <div key={index}>
                    <div className="result-container">
                        <img src={`data:image/jpeg;base64,${data.img}`} alt={`Imagen ${index}`} />
                        <table>
                            <thead>
                                <tr>
                                    <th>Medida</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>36-33</td>
                                    <td>{data.distancia_36_33}</td>
                                </tr>
                                <tr>
                                    <td>39-33</td>
                                    <td>{data.distancia_39_33}</td>
                                </tr>
                                <tr>
                                    <td>42-33</td>
                                    <td>{data.distancia_42_33}</td>
                                </tr>
                                <tr>
                                    <td>45-33</td>
                                    <td>{data.distancia_45_33}</td>
                                </tr>
                                <tr>
                                    <td>48-33</td>
                                    <td>{data.distancia_48_33}</td>
                                </tr>
                                <tr>
                                    <td>54-33</td>
                                    <td>{data.distancia_54_33}</td>
                                </tr>
                            </tbody>
                        </table>
                        <img src={`data:image/jpeg;base64,${data.landmarks}`} alt={`Landmarks ${index}`} />
                    </div>
                    <div className="form-container">
                        <p>
                            Puede ajustar los parámetros de etnia, género y edad utilizando los menús desplegables a continuación. 
                            Una vez seleccionados los valores deseados, haga clic en "Enviar Datos" para continuar con el procesamiento.
                        </p>
                        <form>
                            <label>
                                Etnia:
                                <select value={(selectedValues[index] && selectedValues[index].etnia) || ''} onChange={(e) => handleSelectChange(index, 'etnia', e.target.value)}>
                                    <option value="">Seleccione etnia</option>
                                    <option value="Afro">Afrodescendiente</option>
                                    <option value="Arab">Árabe/Medio Oriente</option>
                                    <option value="Asian">Asiático</option>
                                    <option value="Blanco">Caucásico/Blanco</option>
                                    <option value="Latin">Latinoamericano</option>
                                </select>
                            </label>
                            <label>
                                Género:
                                <select value={(selectedValues[index] && selectedValues[index].genero) || ''} onChange={(e) => handleSelectChange(index, 'genero', e.target.value)}>
                                    <option value="">Seleccione género</option>
                                    <option value="man_">Masculino</option>
                                    <option value="woman_">Femenino</option>
                                </select>
                            </label>
                            <label>
                                Edad:
                                <select value={(selectedValues[index] && selectedValues[index].edad) || ''} onChange={(e) => handleSelectChange(index, 'edad', e.target.value)}>
                                    <option value="">Seleccione rango de edad</option>
                                    <option value="20">0 - 10</option>
                                    <option value="30">10 - 20</option>
                                    <option value="40">20 - 30</option>
                                    <option value="50">30 - 40</option>
                                    <option value="60">40 - 50</option>
                                    <option value="70">50 - 60</option>
                                    <option value="80">60 - 70</option>
                                    <option value="90">70 - 80</option>
                                    <option value="100">80 - 90</option>
                                </select>
                            </label>
                        </form>
                    </div>
                    <button onClick={() => onSendData(index, selectedValues[index])}>Enviar Datos</button>
                </div>
            ))}
        </section>
    );
};

export default ProcessingResults;