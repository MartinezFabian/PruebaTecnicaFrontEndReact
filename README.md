# Prueba Técnica FrontEnd React

## Requerimientos de la aplicación

- El sistema debe tener como origen de datos el archivo JSON: pacientes.json
- Ordenar y formatear pacientes.
  - Ordenar lista alfabéticamente
  - mostrar fecha en formato dd/mm/aaaa
  - calcular edad.
  - colorear filas si el paciente posee alergias.
  - filtrar paciente por nombre.
- Realizar inicio de sesión, almacenar datos en el localstorage.
- Realizar ABM de pacientes con sus respectivos formularios y validaciones, mostrar mensaje de éxito o error de las operaciones.
  - Nuevo Paciente
  - Editar Paciente
  - Eliminar Paciente
  - Detalle Paciente

## Cómo probar el proyecto localmente

Para probar el proyecto, sigue estos pasos:

#### Clonar el repositorio

Primero, asegúrate de estar en la ubicación deseada en tu terminal y luego clona el repositorio:

```sh
git clone https://github.com/MartinezFabian/PruebaTecnicaFrontEndReact.git
```

#### Instalar dependencias

Asegúrate de tener Node.js y `npm` instalados en tu sistema. Si no los tienes, puedes descargarlos e instalarlos desde https://nodejs.org/. Node.js incluirá `npm` ((gestor de dependencias de Node.js) durante la instalación.

Ahora, instala `yarn` (gestor de dependencias) si aún no lo tienes:

```sh
  npm install --global yarn
```

Luego, navega al directorio del proyecto clonado e instala las dependencias:

```sh
cd …/PruebaTecnicaFrontEndReact
yarn install
```

#### Ejecutar la aplicación

Una vez que las dependencias estén instaladas, puedes ejecutar la aplicación localmente con el siguiente comando:

```sh
yarn run dev
```

Esto iniciará un servidor de desarrollo. Para ver la aplicación, abre tu navegador web y navega a la dirección URL que se muestra en la terminal después de ejecutar el comando anterior.

#### Correr las pruebas con Jest

Para ejecutar las pruebas con Jest, puedes utilizar el siguiente comando:

```sh
yarn run test
```

---

### Dependencias Utilizadas en el proyecto

| Dependencia            | Versión  | Finalidad                                                                               |
| ---------------------- | -------- | --------------------------------------------------------------------------------------- |
| vite                   | ^5.2.0   | Herramienta de compilación que proporciona una experiencia de desarrollo rápida y ágil. |
| @reduxjs/toolkit       | ^2.2.3   | Manejo del estado con Redux Toolkit                                                     |
| react-redux            | ^9.1.2   | Integración de Redux con React                                                          |
| react-hook-form        | ^7.51.4  | Gestión de formularios en React                                                         |
| react-router-dom       | ^6.23.0  | Permite el enrutamiento y la navegación en la aplicación.                               |
| @mui/material          | ^5.15.16 | Componentes de Material-UI                                                              |
| @mui/icons-material    | ^5.15.16 | Iconos de Material-UI                                                                   |
| moment                 | ^2.30.1  | Manipulación de fechas y horas                                                          |
| jest                   | ^29.7.0  | Framework de Pruebas de JavaScript                                                      |
| @testing-library/react | ^15.0.7  | Pruebas unitarias en React                                                              |
