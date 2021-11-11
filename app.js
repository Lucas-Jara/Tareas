require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const { inquirerMenu, salir, leerInput, listardoTareasBorrar, confirmar, mostrarListadoChecklist } = require("./helpers/inquirer");
const Tareas = require("./models/tareas");


const main = async () => {

    let opt = '';
    const tareas = new Tareas();


    const tareasDB = await leerDB();

    if ( tareasDB) {  // Cargar tareas
        
        tareas.cargarTareasFromArr( tareasDB );
        
    }

    do {
        //Imprimir menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput( 'Descripcion: ' );
                tareas.crearTarea( desc );
                break;

            case '2':
                // listar opciones
                tareas.listadoCompleto();
                break;
            case '3':
                // listar Competadas
                tareas.listarPendientesCompletadas( true );
                break;
            case '4':
                // listar Pendientes
                tareas.listarPendientesCompletadas( false );
                break;
            case '5':
                // Completado o Pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr);
                tareas.toggleCompletadas( ids )
                break;


            case '6':
                // Borrar
                const id = await listardoTareasBorrar( tareas.listadoArr );
                // Preguntar si esta seguro de borrar
                if ( id !== '0') {
                    const ok = await confirmar( '¿Está seguro?' );
                    if ( ok ) {
                        tareas.borrarTarea( id );
                    }
                }
                break;
        }

        guardarDB( tareas.listadoArr );


        if (opt !== '0') await salir();

    } while (opt !== '0');


}


main();

