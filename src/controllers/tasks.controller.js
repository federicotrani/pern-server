const pool = require('../db')

const getAllTasks = async(req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks')    

    res.json(result.rows)    
  } catch (error) {
    console.log(error.message)
  }
}

const getOneTask = async(req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id=$1', [id])    

    if(result.rows.length===0){
      res.status(404).json({
        message: "Task not found"
      })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.log(error.message)
  }  
}

const deleteTask = async(req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id=$1', [id])    

    if(result.rowCount===0) 
      res.status(404).json({
        message: "Task not found"
      })    

    res.sendStatus(204)
  } catch (error) {
    console.log(error.message)
  }  
}

const createTask = async(req, res) => {
  const { title, description } = req. body
  
  try {
    const result =  await pool.query("INSERT INTO tasks(title, description) VALUES($1, $2) RETURNING *", [title, description])
    res.json(result.rows[0])
  
  } catch (error) {
    
    res.send({error: error.message})
  }

}

const updateTask = async(req, res) => {
  const { id } = req.params
  const { title, description } = req.body

  try {
    const result = await pool.query('UPDATE tasks SET title=$1, description=$2 WHERE id=$3 RETURNING *', [title, description, id])    

    if(result.rowCount===0) 
      res.status(404).json(result.rows[0])    

    res.sendStatus(204)
  } catch (error) {
    console.log(error.message)
  }  
}

module.exports = {
  getAllTasks,
  getOneTask,
  deleteTask,
  createTask,
  updateTask
}