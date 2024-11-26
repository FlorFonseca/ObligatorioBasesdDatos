FROM node:16 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app
COPY . /app

# Copia los archivos necesarios
COPY package.json .
COPY package-lock.json .

# Instala las dependencias
RUN npm install

# Copia el resto del proyecto al contenedor
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen base para servir los archivos estáticos
FROM nginx:alpine

# Copia los archivos de construcción al servidor Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
