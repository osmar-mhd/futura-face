import json
import numpy as np
from sklearn.metrics.pairwise import euclidean_distances
from sklearn.metrics import precision_score, recall_score, f1_score
from sklearn.preprocessing import StandardScaler
from collections import Counter
import os

# Definir el diccionario de rutas por etnia
etnia_rutas = {
    "Hispanos": "/home/mxn/Documents/2024-A022/DatasetAgeGif/Hispano/datos.json",
    "Afrodescendientes": "/home/mxn/Documents/2024-A022/DatasetAgeGif/Afro/datos.json",
    "Arabes": "/home/mxn/Documents/2024-A022/DatasetAgeGif/Árabes/datos.json",
    "Asia": "/home/mxn/Documents/2024-A022/DatasetAgeGif/Asia/datos.json",
    "Europa": "/home/mxn/Documents/2024-A022/DatasetAgeGif/Europa/datos.json"
}

# Cargar y combinar los datos de todas las etnias
data_combined = []
for etnia, json_file_path in etnia_rutas.items():
    with open(json_file_path, 'r') as json_file:
        data = json.load(json_file)
        data_combined.extend(data)

# Extraer características y rutas de los datos combinados
X = []
rutas = []
etiquetas = []

for instance in data_combined:
    # Verificar que todas las claves están presentes en el vector
    vector = instance.get("vector", {})
    required_keys = ["distancia_36_33", "distancia_39_33", "distancia_42_33", "distancia_45_33", "distancia_48_33", "distancia_54_33"]
    if all(key in vector for key in required_keys):
        # Usar las distancias como características
        distancia_36_33 = vector["distancia_36_33"][0]
        distancia_39_33 = vector["distancia_39_33"][0]
        distancia_42_33 = vector["distancia_42_33"][0]
        distancia_45_33 = vector["distancia_45_33"][0]
        distancia_48_33 = vector["distancia_48_33"][0]
        distancia_54_33 = vector["distancia_54_33"][0]

        X.append([distancia_36_33, distancia_39_33, distancia_42_33, distancia_45_33, distancia_48_33, distancia_54_33])
        rutas.append(instance["ruta_imagen"])
        etiquetas.append(instance["etiqueta"])
    else:
        print(f"Instancia ignorada por falta de claves: {instance}")

# Convertir a array de NumPy
X = np.array(X)
rutas = np.array(rutas)
etiquetas = np.array(etiquetas)

# Verificar la forma de los datos
print(f"Forma de X: {X.shape}")

# Normalizar los datos
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Definir los índices de prueba basados en las etiquetas
test_labels = ["man_30", "man_50", "man_70", "woman_30", "woman_50", "woman_70"]
test_indices = np.isin(etiquetas, test_labels)
train_indices = ~test_indices

# Dividir los datos en conjuntos de entrenamiento y prueba
X_train, X_test = X[train_indices], X[test_indices]
rutas_train, rutas_test = rutas[train_indices], rutas[test_indices]
etiquetas_train, etiquetas_test = etiquetas[train_indices], etiquetas[test_indices]

# Verificar las divisiones
print(f"Total de instancias: {len(data_combined)}")
print(f"Instancias de entrenamiento: {len(X_train)}")
print(f"Instancias de prueba: {len(X_test)}")

if len(X_train) == 0 or len(X_test) == 0:
    raise ValueError("Uno de los conjuntos de datos (entrenamiento o prueba) está vacío.")

# Implementar KNN para encontrar los 5 vecinos más cercanos en el conjunto de entrenamiento
def encontrar_vecinos_mas_cercanos(Y, X_train, rutas_train, k=5):
    distancias_euclidianas = euclidean_distances(Y, X_train)
    indices_menores_distancias = np.argsort(distancias_euclidianas.ravel())[:k]
    return rutas_train[indices_menores_distancias], indices_menores_distancias

# Función para obtener la carpeta específica de la ruta de una imagen
def obtener_carpeta_especifica(ruta):
    return os.path.basename(os.path.dirname(ruta))

# Evaluar el clasificador
y_true = []
y_pred = []

for i in range(len(X_test)):
    y_test = X_test[i].reshape(1, -1)
    rutas_vecinas, _ = encontrar_vecinos_mas_cercanos(y_test, X_train, rutas_train, k=1)
    
    # Obtener la carpeta específica de la imagen de prueba y las carpetas de las imágenes vecinas
    carpeta_test = obtener_carpeta_especifica(rutas_test[i])
    carpetas_vecinas = [obtener_carpeta_especifica(ruta) for ruta in rutas_vecinas]
    
    # Predicción basada en si al menos una de las carpetas de los vecinos coincide
    carpeta_predicha = carpeta_test if carpeta_test in carpetas_vecinas else Counter(carpetas_vecinas).most_common(1)[0][0]
    
    y_true.append(carpeta_test)
    y_pred.append(carpeta_predicha)

# Calcular métricas de evaluación
precision = precision_score(y_true, y_pred, average='weighted', zero_division=1)
recall = recall_score(y_true, y_pred, average='weighted', zero_division=1)
f1 = f1_score(y_true, y_pred, average='weighted', zero_division=1)

print(f"Precisión: {precision}")
print(f"Recall: {recall}")
print(f"F1-score: {f1}")