# Vamos a dividir el Dockerfile en varias etapas
###############################################

# Etapa de instalación de dependencias
######################################
# Vamos a partir de una imagen simple
# que tiene node, y allí instalar
# todas las dependencias de la app

# P.D. Uso la versión 20 de node porque
# con Augusto e Iñaki vimos que era la
# que estaban usando la mayoría, pero
#se puede ir por otra versión si alguno
# necesita otra.
FROM node:20-alpine AS dependency_install
WORKDIR /app
COPY package.json ./
RUN npm install

# A partir de acá podemos continuar de dicha imagen
# haciendo otras cosas, por ejemplo, corriendo la
# app en modo desarrollo, o corriendo un build

# Etapa de correr en modo desarrollo
####################################
# Como partimos de dependency_install
# ya están instaladas las dependencias
# solo debemos copiar el resto de los
# archivos, y luego correr la app
FROM dependency_install AS run_in_dev
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# Etapa de correr en modo build
###############################
# Idem, partimos de dependency_install
# pero esta vez solo corremos el build
# Notar que acá no hay app corriendo,
# solo build
FROM dependency_install AS run_build
COPY . .
RUN npm run build

# Etapa de correr el build
##########################
# Ahora lo que tenemos es que
# se buildeo la app, y queremos
# correrla. En lugar de usar node,
# como el build ya empaquetó todo
# podemos servirlo como una pagina
# web tradicional. Entonces usamos
# nginx como enstrada
FROM nginx:stable-alpine AS serve_build
# Notar que vamos a copiar del contenedor run_build, la carpeta
# dist que se generó, a la carpeta que va a servir nginx
COPY --from=run_build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Tenemos entonces un Dockerfile que va a generar 4 imágenes.
# Luego, vamos a poder elegir a cual apuntar con nuestro compose.
