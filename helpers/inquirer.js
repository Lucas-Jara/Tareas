const inquirer = require('inquirer');
require('colors');


const preguntas = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tarea`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'3.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea (s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar Tarea (s)`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
]


const inquirerMenu = async () => {

    console.clear();
    console.log('========================================');
    console.log('         Seleccione una opcióon');
    console.log('========================================\n');

    const { option } = await inquirer.prompt(preguntas);

    return option;
}

const salir = async () => {
    console.log('\n');

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`

        }
    ]
    const { enter } = await inquirer.prompt(question);
    return enter;
}


const leerInput = async (msg) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message: msg,
            validate(value) {
                if (value.length === 0) {
                    throw 'Por favor ingrese un valor'
                }
                return true;
            }

        }
    ]

    const { desc } = await inquirer.prompt(question);
    return desc;
}


const listardoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift(
        {
            value: '0',
            name: `${'0.'.green} Cancelar`
        }
    )

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt( preguntas );

    return id;

}

const confirmar = async( message ) =>{

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    
    const { ok } = await inquirer.prompt( question );

    return ok;
}

const mostrarListadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });


    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt( pregunta );

    return ids;

}

module.exports = {
    inquirerMenu,
    salir,
    leerInput,
    listardoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}