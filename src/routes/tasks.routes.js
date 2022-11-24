const { Router } = require('express')
const { getAllTasks, getOneTask, deleteTask, createTask, updateTask } = require('../controllers/tasks.controller')

const router = Router()

router.get('/tasks', getAllTasks)

router.get('/tasks/:id', getOneTask)

router.post('/tasks', createTask)

router.delete('/tasks/:id', deleteTask)

router.put('/tasks/:id', updateTask)

module.exports = router