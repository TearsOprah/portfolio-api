const express = require('express');
const app = express();

const projects = [
  { id: 1, name: 'Проект 1' },
  { id: 2, name: 'Проект 2' },
  { id: 3, name: 'Проект 3' }
]

app.get('/projects', (req, res) => {
  res.json(projects);
});

app.get('/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);

  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Проект не найден' });
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
