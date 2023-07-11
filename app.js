require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Создаем экземпляр приложения Express
const app = express();

// Подключаемся к базе данных MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Успешное подключение к базе данных MongoDB');
  })
  .catch((error) => {
    console.error('Ошибка подключения к базе данных MongoDB:', error);
  });

// Определяем схему и модель для проекта
const projectSchema = new mongoose.Schema({
  name: String,
  image: String,
});

const Project = mongoose.model('Project', projectSchema);

// Роуты
app.get('/projects', (req, res) => {
  Project.find()
    .then((projects) => {
      res.json(projects);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Произошла ошибка при получении проектов' });
    });
});

app.get('/projects/:id', (req, res) => {
  const projectId = req.params.id;
  Project.findById(projectId)
    .then((project) => {
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ error: 'Проект не найден' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Произошла ошибка при получении проекта' });
    });
});

// Запуск сервера
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
