
require('colors');


const mostrarMenu = () => {


    return new Promise( res =>{

        console.clear();
        console.log('========================================');
        console.log('         Seleccione una opcióon');
        console.log('========================================\n');
    
        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tarea`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'3.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea (s)`);
        console.log(`${'6.'.green} Borrar Tarea (s)`);
        console.log(`${'0.'.green} Salir\n`);
    
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question('Seleccione una opción: ', ( opt ) =>{
            readline.close();
            res( opt )
        })

    })




}


const pausa = () =>{


    return new Promise( res =>{

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`\nPresione ${ 'ENTER'.green } para continuar\n`, ( opt ) =>{
            readline.close();
            res()
        })

    })


}



module.exports = {
    mostrarMenu,
    pausa
}


