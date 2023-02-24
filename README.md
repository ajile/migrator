# Мигратор (наколеночный)

## Подготовка

1. Создайте файл `.env` и определите в нем значения переменных на примере файла `.env.example`.
2. Установите нод-зависимости

## Создание словарей

```sh
# Создаем словарь соответствия пользователей в YouTrack с пользователями Jira.
DEBUG=migrator:* ./index.ts migrator generate-user-map > ./src/converter/dicts/users.json
```

## Запуск

Help:

```sh
DEBUG=migrator:* ./index.ts --help
```

## Создание экспорт файла под задачу

Эта команда будет постранично получать задачи из YouTrack и походу приводить к формату Jira. В конце команда выдаст JSON для экспортирования задач в Jira.

```sh
./index.ts migrator generate-export-json
```
