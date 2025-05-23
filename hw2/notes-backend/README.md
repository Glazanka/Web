# Homework 2 - Database Prototype for Notes in the Cloud

## Описание
Този проект представлява прототип на база данни за приложение "Notes in the Cloud". Базата данни съхранява информация за потребители, бележки и списъци със задачи (ToDo).

## Структура на проекта
- **config/db.js** - Конфигурация и връзка с MongoDB Atlas.
- **models/**
  - `user.js` - Дефиниция на User модел.
  - `note.js` - Дефиниция на Note модел.
  - `todo.js` - Дефиниция на ToDo модел.
- **scripts/test.js** - Скрипт за създаване на примерни данни и тестване на връзката с базата.

## Технологии
- Node.js
- MongoDB Atlas (Cloud база данни)
- Mongoose

## Стартиране на проекта
1. Клониране на репозиторито.
2. Инсталиране на зависимостите:

## Диаграма на връзките
В проекта е включена диаграма, показваща връзките между User, Notes и ToDo.
![Диаграма на връзките](Diagram.png)


