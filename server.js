const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());


const port = 3000;

const tasks = [
  { id: 1, title: 'Task 1' },
  { id: 2, title: 'Task 2' },
  { id: 3, title: 'Task 3' },
  { id: 4, title: 'Task 4' }
];

// Inicie o servidor
app.listen(port, () => {
  console.log(`O servidor foi iniciado com sucesso na porta: http://localhost:${port}`);
});

// Retorna as tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Irá adicionar uma nova task com ID automático.
app.post('/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title
  };
  tasks.push(newTask);
  res.json(newTask);
});



app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) { 
    tasks[taskIndex].title = req.body.title;
    res.json(tasks[taskIndex]);
  } else {res.status(404).json({ message: 'A task não foi encontrada.' }); }
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.json({ message: 'A Task foi excluída com sucesso!', task: deletedTask });
  } else { res.status(404).json({ message: 'A task não foi encontrada.' });}
});


