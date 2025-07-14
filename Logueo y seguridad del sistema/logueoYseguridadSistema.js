let N = 0 ; //number of attempts

 /*DESCOMENTAR PARA EL CASO DE ERROR Y COMENTAR LO SIGUIENTE*/
do{
    let userCredential = "userStudentA" ;
    let passwordCredential = "passwordStudent1" ;
    let hashSecret = "ABC123" ;
    let hashFinal = " ";
    let foundKey = null ;

    hashFinal = userCredential + passwordCredential + hashSecret;

    console.log("BIENVENIDO AL LOGIN DE LA WEB!!!!");

    console.log("Credencial Usuario:  "+userCredential);
    console.log("Contraseña Usuario:  "+passwordCredential);
    console.log("Hash Usuario:  "+hashSecret);

    console.log("hash Final Usuario:  "+hashFinal);


    let hashStore = {
        hashZero: "userStudent0passwordStudent0ABC123",
        hashOne: "userStudent1passwordStudent1ABC123",
        hashTwo: "userStudent2passwordStudent2ABC123",
        hashThree: "userStudent3passwordStudent3ABC123",
        hashFour: "userStudent4passwordStudent4ABC123",
        hashFive: "userStudent5passwordStudent5ABC123",
    };

    for (const key in hashStore){
        if(hashStore[key] === hashFinal){
            foundKey = key;
            break;
        }
    }

    if(foundKey){
        console.log("Credenciales Correctas, EL CLIENTE ACCEDE AL DASHBOARD DE: ECOMERCE");
    }else{
        console.log("Credenciales incorrectas, REGRESO AL LOGIN DE LA WEB")
        N++;
        console.log("Intento numero:  "+N);
        if(N == 4){
            console.log("**********************************************************************");
            const originalConsoleLog = console.log;
            console.log = function() {};
            console.log = originalConsoleLog;
            console.log("EL LOGIN HA SIDO BLOQUEADO, MAXIMO NUMERO DE INTENTOS:  "+N);
        }
    }
}while(N < 4)

    /*DESCOMENTAR PARA EL HAPPY PATH Y COMENTAR LO ANTERIOR*/
    // let userCredential = "userStudent1" ;
    // let passwordCredential = "passwordStudent1" ;
    // let hashSecret = "ABC123" ;
    // let hashFinal = " ";
    // let foundKey = null ;

    // hashFinal = userCredential + passwordCredential + hashSecret;

    // console.log("BIENVENIDO AL LOGIN DE LA WEB!!!!");

    // console.log("Credencial Usuario:  "+userCredential);
    // console.log("Contraseña Usuario:  "+passwordCredential);
    // console.log("Hash Usuario:  "+hashSecret);

    // console.log("hash Final Usuario:  "+hashFinal);


    // let hashStore = {
    //     hashZero: "userStudent0passwordStudent0ABC123",
    //     hashOne: "userStudent1passwordStudent1ABC123",
    //     hashTwo: "userStudent2passwordStudent2ABC123",
    //     hashThree: "userStudent3passwordStudent3ABC123",
    //     hashFour: "userStudent4passwordStudent4ABC123",
    //     hashFive: "userStudent5passwordStudent5ABC123",
    // };

    // for (const key in hashStore){
    //     if(hashStore[key] === hashFinal){
    //         foundKey = key;
    //         break;
    //     }
    // }

    // if(foundKey){
    //     console.log("Credenciales Correctas, EL CLIENTE ACCEDE AL DASHBOARD DE: ECOMERCE");
    // }else{
    //     console.log("Credenciales incorrectas, REGRESO AL LOGIN DE LA WEB")
    //     N++;
    //     if(N == 4){
    //         console.log("**********************************************************************");
    //         const originalConsoleLog = console.log;
    //         console.log = function() {};
    //         console.log = originalConsoleLog;
    //         console.log("EL LOGIN HA SIDO BLOQUEADO, MAXIMO NUMERO DE INTENTOS:  "+N);
    //     }
    // }