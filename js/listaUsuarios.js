/*localStorage.setItem("s21120236",
    "Mariana Rodriguez Gallardo");
localStorage.setItem("s21120236",
    "Juan Pablo Rodriguez Gallardo");

console.log(localStorage.getItem("s21120236"));

console.log(localStorage.getItem("s21120237"));
let objUsuario={contrasenia:"1234",telefono:"1234567890"};
objUsuario.nombre="Mariana";
objUsuario.email="mariana@gmail.com";

objUsuario2={};
objUsuario2["nombre"]="Juan Perez";
objUsuario2.email="jPerez@gmail.com";

console.log(objUsuario);
console.log(objUsuario2);
let usuarios=[];
usuarios[0]=objUsuario;
usuarios.push({nombre:"a",email:"a@a.aa",contrasenia:"123",telefono:""});
usuarios[5]=objUsuario2;
usuarios["hola"]="mundo";
localStorage.setItem("usuarios",JSON.stringify(usuarios));
localStorage.setItem("usuariosobj",usuarios);
console.log(usuarios);

let usuarios2=JSON.parse(localStorage.getItem("usuarios"));

*/


/*window.addEventListener("load",()=>{
    //Se ejecuta cuando se descargan todos los recursos
});*/
//que guarde en el storage al agregar
//hacer un ancla hacia el nombre, de tipo a, al dar clic, desencadene el modal con sus datos, agregar una etiqueta a en crear tabla.
document.addEventListener("DOMContentLoaded", () => {
    cargarTabla();
    const myModal = document.getElementById('mdlUsuario');
    const btnLimpiar = document.getElementById('btnLimpiar');
    const formUsuario = document.getElementById('frmUsuario');

    myModal.addEventListener('shown.bs.modal', () => {
        btnLimpiar.click(); // Reinicia el formulario al abrir el modal
    });

//BOTON DE LIMPIAR

    btnLimpiar.addEventListener('click', () => {
        formUsuario.reset(); // Reinicia el formulario
        let controles = formUsuario.querySelectorAll("input, select");
        controles.forEach(control => {
            control.classList.remove("valido");
            control.classList.remove("novalido");
        });
    });

//FUNCION PARA LA VALIDACION

    formUsuario.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que el formulario se envíe de forma tradicional
        e.target.className = "validado"; // Marca el formulario como validado

        let txtNombre = document.getElementById("txtNombre");
        let txtContrasenia = document.getElementById("txtPassword");
        let txtContrasenia2 = document.getElementById("txtConfirmarPassword");
        let txtEmail = document.getElementById("txtEmail");
        let txtTel = document.getElementById("txtTelefono");

        txtNombre.setCustomValidity("");
        txtContrasenia.setCustomValidity("");
        txtContrasenia2.setCustomValidity("");
        txtEmail.setCustomValidity("");
        txtTel.setCustomValidity("");

        if (txtNombre.value.trim().length < 2 || txtNombre.value.trim().length > 60) {
            txtNombre.setCustomValidity("El nombre es obligatorio (entre 2 y 60 caracteres)");
        }
        if (txtContrasenia.value.trim().length < 6 || txtContrasenia.value.trim().length > 20) {
            txtContrasenia.setCustomValidity("La contraseña es obligatoria (entre 6 y 20 caracteres)");
        }
        if (txtContrasenia.value !== txtContrasenia2.value) {
            txtContrasenia2.setCustomValidity("Las contraseñas no coinciden");
        }
        if (txtTel.value.trim().length > 0 && txtTel.value.trim().length !== 10) {
            txtTel.setCustomValidity("El teléfono debe tener 10 dígitos");
        }

        if (e.target.checkValidity()) {
            let usuario = {
                nombre: txtNombre.value,
                contrasenia: txtContrasenia.value,
                correo: txtEmail.value,
                telefono: txtTel.value
            };
            let usuarios = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
            let encon = usuarios.find((user) => user.correo == usuario.correo);
            if (encon) {
                txtEmail.setCustomValidity("Este correo ya existe, ingrese uno diferente");
                return;
            }
            usuarios.push(usuario);
            localStorage.setItem("listaUsuarios", JSON.stringify(usuarios));
            cargarTabla();
            formUsuario.reset(); // Reinicia el formulario después de agregar el usuario
            $('#mdlUsuario').modal('hide'); // Cierra el modal
        }
    });

    document.getElementById("txtNombre").addEventListener("keyup", () => revisar("txtNombre", 2, 60));
    document.getElementById("txtPassword").addEventListener("keyup", () => revisar("txtPassword", 6, 20));
    document.getElementById("txtConfirmarPassword").addEventListener("keyup", () => revisar("txtConfirmarPassword", 6, 20));
    document.getElementById("txtTelefono").addEventListener("keyup", () => revisar("txtTelefono", 0, 10));
});



function revisar(id, min, max) {
    let txt = document.getElementById(id);
    txt.setCustomValidity("");
    txt.classList.remove("valido");
    txt.classList.remove("novalido");

    if (txt.value.trim().length < min || txt.value.trim().length > max) {
        txt.setCustomValidity("Campo no válido");
        txt.classList.add("novalido");
    } else {
        txt.classList.add("valido");
    }
}

//FUNCION PARA CARGAR LA TABLA

function cargarTabla() {
    let usuarios = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
    let tbody = document.querySelector("#tblUsuarios tbody");
    tbody.innerHTML = "";
    usuarios.forEach(usuario => {
        let fila = document.createElement("tr");
        let celdaNombre = document.createElement("td");
        let celdaCorreo = document.createElement("td");
        let celdaTelefono = document.createElement("td");

        // Crear un enlace para el nombre del usuario
        let enlaceNombre = document.createElement("a");
        enlaceNombre.href = "#"; // Evitar que el enlace navegue a otra página
        enlaceNombre.textContent = usuario.nombre;
        enlaceNombre.dataset.userid = usuario.nombre; // Establecer el atributo data-userid con el ID del usuario
        celdaNombre.appendChild(enlaceNombre);

        celdaCorreo.textContent = usuario.correo;
        celdaTelefono.textContent = usuario.telefono;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaCorreo);
        fila.appendChild(celdaTelefono);

        tbody.appendChild(fila);
    });
}

//FUNCION DE EDITAR


document.addEventListener("DOMContentLoaded", () => {
    // Lógica para abrir el modal de edición al hacer clic en el nombre de usuario
    document.getElementById("tblUsuarios").addEventListener("click", (event) => {
        const target = event.target;
        if (target.tagName === "A") { // Verificar si se hizo clic en un enlace
            const userId = target.dataset.userid; // Obtener el ID del usuario
            const usuarios = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
            const usuario = usuarios.find((user) => user.nombre === userId); // Encontrar al usuario por su nombre

            // Preenlazar los campos del modal de edición con los datos del usuario seleccionado
            document.getElementById("txtEditarNombre").value = usuario.nombre;
            document.getElementById("txtEditarEmail").value = usuario.correo;
            document.getElementById("txtEditarTelefono").value = usuario.telefono;

            // Mostrar el modal de edición
            $('#mdlEditarUsuario').modal('show');
        }
    });

    // Lógica para guardar los cambios al hacer clic en el botón "Guardar Cambios"
    document.getElementById("btnGuardarCambios").addEventListener("click", () => {
        const nombre = document.getElementById("txtEditarNombre").value;
        const correo = document.getElementById("txtEditarEmail").value;
        const telefono = document.getElementById("txtEditarTelefono").value;

        // Actualizar los datos del usuario en el almacenamiento local
        const usuarios = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
        const index = usuarios.findIndex((user) => user.nombre === nombre);
        if (index !== -1) {
            usuarios[index] = { nombre, correo, telefono };
            localStorage.setItem("listaUsuarios", JSON.stringify(usuarios));

            // Recargar la tabla para reflejar los cambios
            cargarTabla();

            // Ocultar el modal de edición
            $('#mdlEditarUsuario').modal('hide');
        }
    });

    
});



//FUNCION DE ELIMINAR

document.getElementById("btnEliminar").addEventListener("click", () => {
    let usuarios = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
    let selUsuariosEliminar = document.getElementById("selUsuariosEliminar");
    selUsuariosEliminar.innerHTML = ""; // Limpiar las opciones anteriores
    usuarios.forEach((usuario, index) => {
        // Agregar una opción para cada usuario en el select
        let option = document.createElement("option");
        option.value = index; // Usamos el índice como el valor de la opción
        option.textContent = usuario.nombre;
        selUsuariosEliminar.appendChild(option);
    });

    // Mostrar el modal de eliminación
    $('#mdlEliminarUsuario').modal('show');

    // Al hacer clic en el botón de "Eliminar" en el modal de confirmación
    document.getElementById("btnConfirmarEliminar").addEventListener("click", () => {
        let indiceAEliminar = parseInt(selUsuariosEliminar.value); // Obtener el índice seleccionado del usuario
        if (!isNaN(indiceAEliminar)) { // Verificar si se seleccionó un índice válido
            usuarios.splice(indiceAEliminar, 1); // Eliminar el usuario del array
            localStorage.setItem("listaUsuarios", JSON.stringify(usuarios)); // Guardar los cambios en el almacenamiento local
            cargarTabla(); // Recargar la tabla para reflejar los cambios
            $('#mdlEliminarUsuario').modal('hide'); // Cerrar el modal de confirmación
        }
    });
});



