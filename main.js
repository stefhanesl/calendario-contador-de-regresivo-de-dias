let arr = [];
let events = [];

const eventName = document.querySelector("#texto");
const eventDate = document.querySelector("#fecha");
const buttonAdd = document.querySelector('#btn');
const eventsContainer = document.querySelector('#eventos-contenedor');

const json = load();
try {
    arr = JSON.parse(json); 
} catch (error) {
    arr = [];
}
events = arr ? [...arr] : [];
renderEvents();

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
  });
  
buttonAdd.addEventListener("click", (e) => {
    addEvent();
});

function addEvent(){
    if(eventName.value === "" || eventDate.value === "" ){
        return;
    }
    if(dateDiff(eventDate.value) < 0){
        return;
    }
    const nuevo_objeto = {
        id: (Math.random() * 100).toString(36).slice(2),
        nombre: eventName.value,
        fecha: eventDate.value,
    };

    events.unshift(nuevo_objeto);

    save(JSON.stringify(events));

    eventName.value = "";

    renderEvents();

}

function dateDiff(diaActual){
    const actual = new Date(diaActual);
    const hoy = new Date();
    const diferencia = actual.getTime() - hoy.getTime();
    const dias = Math.ceil((diferencia)/ (1000 * 3600 * 24));
    return dias;
}

function renderEvents(){
    const arreglo_evento = events.map( (event) => {
        return `    
            <div class='event'>
                <div class="days">
                    <span class='days-number'>${dateDiff(event.fecha)}</span>
                    <span class='days-text'>dias</span>
                </div>  

                <div class="event-name">${event.nombre}</div>
                <div class="event-date">${event.fecha}</div>
                <div class="actions" >
                    <button class="bDelete" data-id="${event.id}">Eliminar</button>
                </div>
            </div>
        `;
    });
    eventsContainer.innerHTML = arreglo_evento.join("");
    document.querySelectorAll('.bDelete').forEach( button => {
        button.addEventListener('click', e => {
            const id = button.getAttribute('data-id');
            events = events.filter( e => e.id !== id);
            renderEvents();
        });
    });
}
function save(data) {
    localStorage.setItem("items", data);
}
  
function load() {
    return localStorage.getItem("items");
}