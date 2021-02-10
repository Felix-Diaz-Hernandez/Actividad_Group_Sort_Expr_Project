

//*Para obtener beneficios de cada mes en 2020 en orden descendente*//
db.ventas2.aggregate([
        {$match: {$expr:{ $eq: [{$year:"$date" },2020] } } },
        {$group:{_id:{ month: { $month: "$date"}, year:  { year:"$date"} },
        totalAmount: { $addToSet: "$_id" },
        sell: { $sum: { $multiply: ["$price","$quantity"] } },
        count:{ $sum: 1 } } },
        {$sort:{ totalAmount: -1  } }
        
         
 ])

 /* RESULTADO
{ "_id" : { "month" : 12, "year" : { "year" : ISODate("2020-12-11T00:00:00Z") } },"totalAmount" : [ 7 ], "sell" : 1572.76, "count" : 1 }
{ "_id" : { "month" : 11, "year" : { "year" : ISODate("2020-11-09T00:00:00Z") } }, "totalAmount" : [ 6 ], "sell" : 1514.8799999999999, "count" : 1 }
{ "_id" : { "month" : 3, "year" : { "year" : ISODate("2020-03-19T00:00:00Z") } }, "totalAmount" : [ 5 ], "sell" : 2559.2, "count" : 1 }
{ "_id" : { "month" : 6, "year" : { "year" : ISODate("2020-06-05T00:00:00Z") } }, "totalAmount" : [ 4 ], "sell" : 680, "count" : 1 }
{ "_id" : { "month" : 9, "year" : { "year" : ISODate("2020-09-21T00:00:00Z") } }, "totalAmount" : [ 3 ], "sell" : 825, "count" : 1 }
{ "_id" : { "month" : 2, "year" : { "year" : ISODate("2020-02-28T00:00:00Z") } }, "totalAmount" : [ 1 ], "sell" : 270, "count" : 1 }
/*

 /*Obtener los artículos más vendidos,los repartadidores que los llevaron y si el articulo es premiun*/
db.ventas2.aggregate([
    { $match: { quantity: { $gt: 10 } } },
    {$project:{ item:true , delivery: true , quantity:true , premiun:true , _id: false  }},
    {$sort:{quantity: -1 } }
    
    
 ])

/* RESULTADO
{ "item" : "GRAUTA ANV-35", "quantity" : 40, "premiun" : true, "delivery" : "SEUR" }
{ "item" : "TP-LINK TL-WA850RE", "quantity" : 20, "premiun" : true, "delivery" : "DHL" }
{ "item" : "TP-LINK TL-WR850N", "quantity" : 15, "premiun" : true, "delivery" : "SEUR" }
{ "item" : "Cámara Domo Dahua HAC-HDW2802T-Z-A", "quantity" : 12, "premiun" : true, "delivery" : "SEUR" }
*/

