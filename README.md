# ESTUDIO DE TATUAJES TITATOO -- MI API REST

<details>
  <summary>Contenido 📝</summary>
  <ol>
    <li><a href="#objetivo">Objetivo</a></li>
    <li><a href="#sobre-el-proyecto">Sobre el proyecto</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#diagrama-bd">Diagrama</a></li>
    <li><a href="#instalación-en-local">Instalación</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#futuras-funcionalidades">Futuras funcionalidades</a></li>
    <li><a href="#contribuciones">Contribuciones</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#webgrafia">Webgrafia</a></li>
    <li><a href="#desarrollo">Desarrollo</a></li>
    <li><a href="#agradecimientos">Agradecimientos</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

## Objetivo
Este proyecto requería una API funcional conectada a una base de datos con al menos una relación de uno a muchos y una relación de muchos a muchos.

## Sobre el proyecto
Consiste en crear una aplicación web para un estudio de tatuajes, que nos permitirá registrarnos, ver y crear citas para tatuarnos con diferentes tatuadores y realizar diferentes consultas a la base de datos. Actualmente son funcionales los seeders de Roles y de Users asignando un rol para poder hacer peticiones basicas sin tener que registrar usuarios. Como peticiones tambien podremos registrar usuarios, bien clientes o artistas (tatuadores). Podremos eliminar usuarios por su id, consultar perfil de usuario por id y consultar todos los usuarios.


## Stack
Tecnologías utilizadas:
 - SQL/MySQL
 - EXPRESS
 - DOCKER
 - NODE.JS
 - TYPESCRIPT
 - TYPEORM

## Diagrama BD
!['imagen-db'](./diagram/diagramTitatoo.png)

## Instalación en local
1. Clonar el repositorio
2. ` $ npm install `
3. Conectamos nuestro repositorio con la base de datos 
4. Ejecutamos las migraciones con el siguiente comando: '$ npm run db:migrate'
5. Ejecutamos los seeders con el siguiente comando: '$ npm run db:seed'
6. Conectamos el terminal con el servidor con el siguiente comando: '$ npm run dev'
7. Para vaciar las tablas que tenemos para volver a generar las migraciones y los seeders, usamos el siguiente comando: '$ npm run db:refresh'

## Endpoints
<details>
<summary>Endpoints</summary>

- REGISTER

            POST http://localhost:3000/auth/register
        body:
        ``` js
            {
                "username": "pruebaCliente6",
                "first_name": "Cliente6",
                "last_name":"Pérez5",
                "email": "cliente6.demo@example.com",
                "password": "12345678",
                "phone_number": "646557606"
            }
        ```
- CREATE USER

            POST http://localhost:3000/api/users/
        body:
        ``` js
            {
                "username": "pruebaCliente6",
                "first_name": "Cliente6",
                "last_name":"Pérez5",
                "email": "cliente6.demo@example.com",
                "password_hash": "12345678",
                "phone_number": "646557606"
            }
        ```
 - CREATE ARTIST

            POST http://localhost:3000/api/users/CreateArtist
        body:
        ``` js
            {
                "username": "pruebaArtist",
                "first_name": "Artist",
                "last_name":"Perez",
                "email": "artist.demo@example.com",
                "password": "12345678",
                "phone_number": "646557606",
                "tatoo_style": "Old school", 
                "work_experience": "2"
            }

//Hay 5 opciones de tattoo_style (Old school, Japanese,  Blackwork, Tribal y Traditional)

- LOGIN

            POST http://localhost:3000/auth/login
            
        body:
        ``` js
            {
                
                "email": "cliente6.demo@example.com",
                "password": "12345678"

            }
        ```
- USER PROFILE

            GET http://localhost:3000/api/users/24 

- ALL USERS PROFILES

            GET http://localhost:3000/api/users?page=1&skip=20              
       
- UPDATE PROFILE (ARTIST Y CLIENT)

            PATCH http://localhost:3000/api/users/24 (id)
        body:
        ``` js
            {
                "username" : "alberto.martin",
                "first_name": "Alberto",
                "last_name": "Martin",
                "email" : "alberto.nuevo@example.com"
            }
        ```
- DELETE PROFILE (ARTIST Y CLIENT)

            DELETE http://localhost:3000/api/users/2
        body:
        ``` js
            {
                "username" : "alberto.martin",
                "first_name": "Alberto",
                "last_name": "Martin",
                "email" : "alberto.nuevo@example.com"
            }
        ```    
- APPOINTMENT CREATION

            POST http://localhost:3000/appointments/NewAppointment 
        body:
        ``` js
             {

                "client_id": 5,
                "appointment_date": "2024-02-18 20:30:00" 
            
            }
        ```
        
- APPOINTMENT UPDATE

            PATCH http://localhost:3000/appointments/UpdateAppointment/1
        body:
        ``` js
            {

                "id": 1,
                "client_id": 5,
                "artist_id": 9,
                "appointment_date": "2024-02-18 20:30:00"
            
            }
        ```
- APPOINTMENT DELETE

            DELETE http://localhost:3000/appointments/DeleteAppointment/1 (id)

- APPOINTMENT FOR USERS

            GET http://localhost:3000/appointments/1 (client_id)

- APPOINTMENT FOR TATTOO_ARTIST

            GET http://localhost:3000/appointments/artists/1 (artist_id)





</details>

## Futuras funcionalidades
[X] Desarrollo de un SuperAdmin
[X] Creación de citas con diseños

## Contribuciones
Las sugerencias y aportaciones son siempre bienvenidas.  

Puedes hacerlo de dos maneras:

1. Abriendo una issue
2. Crea un fork del repositorio
    - Crea una nueva rama  
        ```
        $ git checkout -b feature/nombreUsuario-mejora
        ```
    - Haz un commit con tus cambios 
        ```
        $ git commit -m 'feat: mejora X cosa'
        ```
    - Haz push a la rama 
        ```
        $ git push origin feature/nombreUsuario-mejora
        ```
    - Abre una solicitud de Pull Request

## Licencia
Este proyecto se encuentra bajo licencia de "Alberto Martín"

## Webgrafia:
Para conseguir mi objetivo he recopilado información de:
- Documentacion propia del curso GeeksHubs junto con las sesiones grabadas.
- Documentacion propia de TypeOrm
- https://www.npmjs.com/package//typeorm

## Desarrollo:

``` js
 const developer = "Alberto";

 console.log("Desarrollado por: Alberto Martín" + developer);
```  

## Agradecimientos:

Agradezco a mis compañeros y profesor por el tiempo dedicado a este proyecto, en especial a:

- **Fidel**

- **Hector**  

- **Reynaldo**  

- **Antonio**  

- **Gabriel**  

- **Bartomeu**  

- **Erika**  

Así como al resto de profesores de GeeksHubs Academy por acompañarnos día a día en el proceso.

## Contacto
<a href = "alberto.martinguti@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>

 
