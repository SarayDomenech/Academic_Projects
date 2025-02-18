use tarea_movies

db.movies.find()

//EJERCICIO 2
db.movies.find().count()

//EJERCICIO 3
var newmovie = {"title":"Remember the Titans", "year":2000,"cast":[ ], "genres":"Drama"}
db.movies.insertOne(newmovie)
db.movies.find(newmovie)

//EJERCICIO 4
var newmovie = {"title":"Remember the Titans", "year":2000,"cast":[ ], "genres":"Drama"}
db.movies.deleteOne(newmovie)

var newmovie = {"title":"Remember the Titans", "year":2000,"cast":[ ], "genres":"Drama"}
db.movies.find(newmovie)

//EJERCICIO 5
var query1 = {"cast":"and"}
var fase1 = {$match:query1}
var query2 ={"_id":"and", "numero":{$sum:1}}
var fase2 ={$group:query2}
var etapas = [fase1, fase2]
db.movies.aggregate(etapas)


//EJERCICIO 6
var query3 = { }
var operacion = {$pull:{"cast":"and"}}
db.movies.updateMany(query3, operacion)

//EJERCICIO 7
var query4 = {"cast":[]}
var fase1 = {$match:query4}
var fase2 = {$count:"total_vacio"}
var etapas = [fase1, fase2]
db.movies.aggregate(etapas)

//EJERCICIO 8
var query5 = {"cast":[]}
var operacion = {$set:{"cast":["Undefined"]}}
db.movies.updateMany(query5, operacion)

//EJERCICIO 9
var query6 = {"genres":[]}
var fase1 = {$match:query6}
var fase2 = {$count:"total_vacio"}
var etapas = [fase1, fase2]
db.movies.aggregate(etapas)

//EJERCICIO 10
var query7 = {"genres":[]}
var operacion = {$set:{"genres":["Undefined"]}}
db.movies.updateMany(query7, operacion)

//EJERCICIO 11
var query8 = {}
var proyeccion = {"year": 1, "_id":0}
db.movies.find(query8,proyeccion).sort({"year":-1}).limit(1)

//EJERCICIO 12
var query9 = {"_id":"$year", "movies":{$sum:1}}
var fase1 = {$group:query9}
var fase2 ={$sort:{"_id":-1}}
var fase3 ={$limit:20}
var query10 = {"_id":null, "total":{$sum:"$movies"}}
var fase4 = {$group:query10}
var etapas = [fase1,fase2,fase3,fase4]
db.movies.aggregate(etapas)

//EJERCICIO 13
var query11 = {"year":{$gte:1960, $lte:1969}}
var fase1 = {$match:query11}
var query12  = {"_id":null, "total":{$sum:1}}
var fase2 = {$group:query12}
var etapas = [fase1,fase2]
db.movies.aggregate(etapas)

//EJERCICIO 14
var query13 = {"_id":"$year", "movies":{$sum:1}}
var fase1 = {$group:query13}
var fase2 ={$sort:{"movies":-1}}
var fase3 = {$limit:1}
var etapas = [fase1,fase2,fase3]
db.movies.aggregate(etapas)

// EJERCICIO  14 OTRO
var query13 = {"_id":"$year", "movies":{$sum:1}}
var fase1 = {$group:query13}
var fase2 ={$sort:{"movies":1}}
var query14 = {"_id":null, "years":{$push:"$_id"}, "totalmovies":{$push:"$movies"}}
var fase3 = {$group:query14}
var fase4 = {$limit:1}
var etapas = [fase1,fase2,fase3,fase4]
db.movies.aggregate(etapas)

//EJERCICIO 15
var query14 = {"_id":"$year", "movies":{$sum:1}}
var fase1 = {$group:query14}
var fase2 ={$sort:{"movies":1}}
var fase3 = {$limit:3}
var etapas = [fase1,fase2,fase3]
db.movies.aggregate(etapas)

//EJERCICIO 16
var fase1 = {$unwind:"$cast"}
var query15 = {"_id":0}
var fase2 = {$project:query15}
var fase3 = {$out: "actors"}
var etapas = [fase1, fase2, fase3]
db.movies.aggregate(etapas)

db.actors.find().count()

///EJERCICIO 17
var query16 = {"cast":{$ne:"Undefined"}}
var fase1 = {$match:query16}
var query17 = {"_id":"$cast", "totalmovies":{$sum:1}}
var fase2 = {$group:query17}
var fase3 = {$sort:{"totalmovies":-1}}
var fase4 = {$limit:5}
var etapas =[fase1, fase2, fase3, fase4]
db.actors.aggregate(etapas)

//EJERCICIO 18
var query18 = {"_id":{"title":"$title", "year":"$year"},"cuenta":{$addToSet:"$cast"}}
var fase1 = {$group:query18}
var query19 = {"_id":{"title":"$_id.title", "year":"$_id.year"}, "cuenta":{$size: "$cuenta"}}
var fase2= {$project:query19}
var fase3 = {$sort:{"cuenta":-1}}
var fase4 ={$limit:5}
var etapas = [fase1, fase2, fase3, fase4]
db.actors.aggregate(etapas)

//EJERCICIO 19
var query20 = {"cast":{$ne:"Undefined"}}
var fase1 = {$match:query20}
var query21 = {"_id":"$cast", "comienza": {$min:"$year"}, "termina":{$max:"$year"}}
var fase2 = {$group:query21}
var query22= {"años":{$subtract:["$termina", "$comienza"]}}
var fase3= {$addFields:query22}
var fase4= {$sort:{ "años":-1}}
var fase5= {$limit:5}
var etapas= [fase1, fase2, fase3, fase4, fase5]
db.actors.aggregate(etapas)

//EJERCICIO 20
var fase1 = {$unwind:"$genres"}
var query23 = {"_id":0}
var fase2 = {$project:query23}
var fase3 = {$out: "genres"}
var etapas = [fase1, fase2, fase3]
db.actors.aggregate(etapas)

db.genres.find().count()

//EJERCICIO 21
var query24 = {"_id":{"year":"$year", "genres":"$genres"},"movies":{$addToSet:"$title"}}
var fase1 = {$group:query24}
var query25 = {"_id":{"year":"$_id.year", "genres":"$_id.genres"}, "movies":{$size: "$movies"}}
var fase2= {$project:query25}
var fase3 = {$sort:{"movies":-1}}
var fase4 ={$limit:5}
var etapas = [fase1, fase2, fase3, fase4]
db.genres.aggregate(etapas)

//EJERCICIO 22
var query24 = {"cast": {$ne:"Undefined"}, "genres":{$ne:"Undefined"}}
var fase1 = {$match:query24}
var query25 = {"_id":"$cast", "genres":{$addToSet:"$genres"}}
var fase2 = {$group:query25}
var query26 = {"_id":"$_id", "numgeneros":{$size:"$genres"}, "genres":"$genres"}
var fase3 = {$project:query26}
var fase4 = {$sort: {"numgeneros":-1}}
var fase5 = {$limit:5}
var etapas = [fase1, fase2, fase3, fase4, fase5]
db.genres.aggregate(etapas)

//EJERCICIO 23
var query27 = {"_id":{"title":"$title", "year":"$year"}, "genres":{$addToSet:"$genres"}}
var fase1 = {$group:query27}
var query28 = {"_id":1, "title":"$id.title", "numgenres":{$size:"$genres"}, "genres":"$genres"}
var fase2 = {$project:query28}
var fase3 = {$sort:{"numgenres":-1}}
var fase4 = {$limit: 5}
var etapas = [fase1, fase2, fase3, fase4]
db.genres.aggregate(etapas)

//EJERCICIO 24 
var query1 = {"year": {$gte:2000, $lte:2018}}
var fase1 = {$match:query1}
var query2 = {"_id":"$year", "movies":{$sum:1}}
var fase2 = {$group:query2}
var query3 = {"_id": null, "media_movies":{$avg:"$movies"}}
var fase3 = {$group:query3}
var etapas = [fase1, fase2, fase3]
db.movies.aggregate(etapas)


//EJERCICIO 25
var query1 = {"cast":{$ne:"Undefined"}, "genres":{$ne:"Undefined"}}
var fase1 = {$match:query1}
var query2 = {"_id":{"genre":"$genres", "actor":"$cast"}, "movies":{$sum:1}}
var fase2 = {$group:query2}
var fase3 = {$sort:{"_id.genre":1, "movies":-1}}
var query3 = {"_id":"$_id.genre", "topactor":{$first:"$_id.actor"}, "movies":{$first:"$movies"}}
var fase4 = {$group:query3}
var etapas = [fase1,fase2,fase3,fase4]
db.genres.aggregate(etapas)


//EJERCICIO 26
var query1 = {"cast":{$ne:"Undefined"}, "genres":{$ne:"Undefined"}}
var fase1 = {$match:query1}
var query2 = {"_id":"$genres", "total_movies":{$sum:1}, "total_actors":{$addToSet:"$cast"}}
var fase2 = {$group:query2}
var query3 = {"_id":0, "genre":"$_id", "total_movies":"$total_movies", "total_actors":{$size:"$total_actors"}}
var fase3 = {$project:query3}
var fase4 = {$sort:{"total_movies":-1}}
var etapas = [fase1, fase2, fase3, fase4]
db.genres.aggregate(etapas)






