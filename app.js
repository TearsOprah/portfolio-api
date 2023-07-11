const express = require('express');
const path = require('path');

const app = express();

const projects = [
  {
    id: 1,
    name: 'Проект 1',
    images: [
      { id: 1, name: 'project1_1.jpg', path: 'project1_1.jpg' },
    ]
  },
  {
    id: 2,
    name: 'Проект 2',
    images: [
      { id: 1, name: 'project2_1.jpg', path: 'project2_1.jpg' },
      { id: 2, name: 'project2_2.jpg', path: 'project2_2.jpg' }
    ]
  },
  {
    id: 3,
    name: 'Проект 3',
    images: [
      { id: 1, name: 'project3_1.jpg', path: 'project3_1.jpg' }
    ]
  }
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

app.get('/projects/:id/images', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);

  if (project && project.images) {
    res.json(project.images);
  } else {
    res.status(404).json({ error: 'Изображения не найдены' });
  }
});

app.get('/projects/:id/images/:imageId', (req, res) => {
  const projectId = parseInt(req.params.id);
  const imageId = parseInt(req.params.imageId);
  const project = projects.find(p => p.id === projectId);

  if (project && project.images) {
    const image = project.images.find(img => img.id === imageId);

    if (image) {
      const imagePath = path.join(__dirname, 'images', image.path);
      res.sendFile(imagePath);
    } else {
      res.status(404).json({ error: 'Изображение не найдено' });
    }
  } else {
    res.status(404).json({ error: 'Проект не найден' });
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
