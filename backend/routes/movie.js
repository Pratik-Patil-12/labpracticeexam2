const express = require('express')
const db = require('../db')
const utils = require('../utils')
const router = express.Router()

router.get('/all',(request,response)=>{
    const connection = db.openConnection()
    const query = `SELECT * FROM movie`
    connection.query(query,(error,data)=>{
        connection.end()
        if(error){
            response.send(utils.createResult(error))
        }else{
            response.send(utils.createResult(error,data))
        }
    })
})
router.post('/add',(request,response)=>{
    const {movie_title, movie_release_date, movie_time,director_name}= request.body
    const connection = db.openConnection()
    const query = `INSERT INTO movie (movie_id, movie_title, movie_release_date, movie_time,director_name)
                    values(default,'${movie_title}','${movie_release_date}','${movie_time}','${director_name}')`
    connection.query(query,(error,data)=>{
        connection.end()
        if(error){
            response.send(utils.createResult(error))
        }else{
            response.send(utils.createResult(error,data))
        }
    })
})
router.put('/edit/:id',(request,response)=>{
    const {movie_release_date,movie_time} = request.body
    const {id} = request.params
    const connection = db.openConnection()
    const query = `UPDATE movie SET movie_release_date='${movie_release_date}', movie_time='${movie_time}' WHERE movie_id = '${id}'`
    connection.query(query,(error,data)=>{
        connection.end()
        if(error){
            response.send(utils.createResult(error))
        }else{
            response.send(utils.createResult(error,data))
        }
    })
})
router.delete('/delete/:id',(request,response)=>{
    const {id} = request.params
    const connection = db.openConnection()
    const query = `DELETE FROM movie WHERE movie_id = '${id}'`
    connection.query(query,(error,data)=>{
        connection.end()
        if(error){
            response.send(utils.createResult(error))
        }else{
            response.send(utils.createResult(error,data))
        }
    })
})

module.exports = router

