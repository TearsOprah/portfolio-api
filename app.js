const express = require('express');
const path = require('path');

const app = express();

const projects = [
  { id: 1, name: 'Проект 1', image: 'project1.jpg' },
  { id: 2, name: 'Проект 2', image: 'project2.jpg' },
  { id: 3, name: 'Проект 3', image: 'project3.jpg' }
];

app.use(express.static('images'));

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

app.get('/projects/:id/image', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);

  if (project && project.image) {
    const imagePath = path.join(__dirname, 'images', project.image);
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ error: 'Изображение не найдено' });
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
