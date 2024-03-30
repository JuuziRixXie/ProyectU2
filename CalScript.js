let currentYear;
  let currentMonth;
  let currentDay;
  let events = {};

  function createCalendar(year, month) {
    const calendarDiv = document.getElementById("calendar");
    calendarDiv.innerHTML = "";

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day");
      dayDiv.addEventListener("click", function() {
        currentDay = day;
        updateEvents();
      });

      dayDiv.addEventListener("mouseenter", function() {
        dayDiv.style.backgroundColor = "#f2f2f2";
      });

      dayDiv.addEventListener("mouseleave", function() {
        dayDiv.style.backgroundColor = "";
      });

      const dayNumber = document.createElement("div");
      dayNumber.classList.add("day-number");
      dayNumber.textContent = day;

      dayDiv.appendChild(dayNumber);
      calendarDiv.appendChild(dayDiv);
    }
  }

  function updateMonthYearText() {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    document.getElementById("currentMonthYear").textContent = monthNames[currentMonth] + " " + currentYear ;
  }

  function updateEvents() {
    // Esta función se mantiene igual como antes
  }

  function searchDate() {
    const monthInput = document.getElementById("monthInput").value;
    const yearInput = document.getElementById("yearInput").value;
    const formattedMonth = formatMonth(monthInput);
    const formattedYear = formatYear(yearInput);
  
    if (formattedMonth !== null && formattedYear !== null) {
      currentMonth = formattedMonth - 1; // Se resta 1 para que el mes sea compatible con el rango 0-11
      currentYear = formattedYear;
      createCalendar(currentYear, currentMonth);
      updateMonthYearText();
      updateEvents();
    }

    if (!monthInput || !yearInput) {
      alert("Por favor, ingrese tanto el mes como el año.");
      return; // Detener la búsqueda si los campos están vacíos
    }
  }
  
  function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
      searchDate();
    }
  }
  
  function formatMonth(month) {
    const numericMonth = parseInt(month, 10);
    if (isNaN(numericMonth) || numericMonth < 1 || numericMonth > 12) {
      return null;
    }
    return numericMonth;
  }
  
  function formatYear(year) {
    const numericYear = parseInt(year, 10);
    if (isNaN(numericYear)) {
      return null;
    }
    return numericYear;
  }

  function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    createCalendar(currentYear, currentMonth);
    updateMonthYearText();
    updateEvents();
  }

  function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    createCalendar(currentYear, currentMonth);
    updateMonthYearText();
    updateEvents();
  }

  // Obtener el año y mes actual
  const today = new Date();
  currentYear = today.getFullYear();
  currentMonth = today.getMonth();
  currentDay = today.getDate();

  // Crear el calendario actual
  createCalendar(currentYear, currentMonth);
  updateMonthYearText();

  

  let selectedDay = null;

  

  // Función para añadir evento
  function addEvent() {
    // Aquí puedes agregar la lógica para añadir un evento al día seleccionado (utilizando la variable selectedDay)
    alert(`Evento añadido para el día ${selectedDay}`);
  }

  

  function handleDayClick(day, month, year) {
    // Mostrar el botón "Añadir Evento" en el contenedor azul
    document.getElementById("addEventButtonContainer").style.display = "block";
    
    // Mostrar la fecha seleccionada en el cuadro de texto
    document.getElementById("selectedDay").value = `${day}/${month + 1}/${year}`;
  }

  // Función para resaltar el día actual
  function highlightCurrentDay() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const calendarDays = document.querySelectorAll("#calendario .day");
    
    // Iterar sobre los días del calendario y resaltar el día actual
    calendarDays.forEach(day => {
      if (
        parseInt(day.textContent) === currentDay &&
        parseInt(day.dataset.month) === currentMonth &&
        parseInt(day.dataset.year) === currentYear
      ) {
        day.classList.add("current-day");
      }
    });
  }

  // Llamar a la función para resaltar el día actual al cargar la página
  highlightCurrentDay();