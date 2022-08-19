/*  Dev. Jose Armando Sanchez Jimenez  */



import '../styles/index.scss';
import { MERCHANTS } from './merchants';
import { ORDERS } from './orders';


function buscaCompletadas(id_m){
    id_m = String(id_m);
    var OrdenesCompletadas = ORDERS.filter(x => x.merchant_id === id_m && x.completed_at != "");
    return OrdenesCompletadas;
}

function buscaIncompletas(id_m){
    id_m = String(id_m);
    var OrdenesIncompletas = ORDERS.filter(x => x.merchant_id === id_m && x.completed_at === "");
    return OrdenesIncompletas;
}

function buscaNombre(id_m){
    id_m = String(id_m);
    var arr = MERCHANTS.filter(x => x.id === id_m);
    for (const [key, value] of Object.entries(arr)) {
        var name = (value.name);
      }
    return name;
}

function totalVentas(id_m){
    id_m = String(id_m);
    var Completadas = buscaCompletadas(id_m);
    var totalVentas = 0;
    for(var i=0;i<Completadas.length;i++){   
    totalVentas += (parseFloat(Completadas[i].amount,10));
    }
    return totalVentas.toFixed(2);
}

function calculaComicion(id_m){
    var taza = 0;
       if(totalVentas(id_m) < 25000){taza = 0.01;}
       if(totalVentas(id_m) >= 25000 && totalVentas(id_m)<=60000){taza = 0.0095;}
       if(totalVentas(id_m)> 60000){taza = 0.0085;}
       var comicion = totalVentas(id_m) * taza;
       return comicion.toFixed(2);
}

function calculaDesenbolso(id_m){
    id_m = String(id_m);
    var desenbolso = totalVentas(id_m) - calculaComicion(id_m);
    return desenbolso.toFixed(2);
}

function devuelveMerchant(merchant_id){
    
    if(merchant_id === undefined){
        let respuestaSinId = [];
        for(let c=1 ; c<MERCHANTS.length+1 ; c++){
            //Construye objeto
                var nuevo = {
                    id : c,
                    merchant_id : c,
                    merchant: buscaNombre(c),
                    numero_ventas : (buscaCompletadas(c)).length,
                    faltan_completar : (buscaIncompletas(c)).length,
                    total_ventas : totalVentas(c),
                    comicion : calculaComicion(c),
                    desembolso : calculaDesenbolso(c)};
                    //Agrega Objeto al aray
                respuestaSinId.push(nuevo);
            };
            return (console.log("respuestaSinId: ",respuestaSinId));    
    }
       
    else {
        if(merchant_id>0 & merchant_id<(MERCHANTS.length+1)){
            //Construir Obj
            var respuestaConId = {
            id : merchant_id,
            merchant_id : merchant_id,
            merchant: buscaNombre(merchant_id),
            numero_ventas : (buscaCompletadas(merchant_id)).length,
            faltan_completar : (buscaIncompletas(merchant_id)).length,
            total_ventas : totalVentas(merchant_id),
            comicion : calculaComicion(merchant_id),
            desembolso : calculaDesenbolso(merchant_id)
            };
        return (console.log("respuestaConId: ",respuestaConId));
        }
    else { return (console.error("ID incorrecto o no existe"));
}}}



 //Funcion principal. Si no recibe parametro regresa array de todos los objetos 'merchants'
    // Si recibe erchant_id regresa valores de ese ID

devuelveMerchant();  