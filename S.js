document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("task-form");
    const taskList = document.getElementById("task-list");

    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Obtener valores del formulario
        const taskInput = document.getElementById("task-input").value;
        const deadlineInput = document.getElementById("deadline-input").value;

        // Crear elemento de lista y agregar tarea y fecha límite
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${taskInput}</strong> - ${deadlineInput}`;

        // Agregar la nueva tarea a la lista
        taskList.appendChild(listItem);

        // Limpiar campos del formulario
        taskForm.reset();
    });
});
