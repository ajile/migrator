# Мигратор (наколеночный)

## Подготовка

1. Создайте файл `.env` и определите в нем значения переменных на примере файла `.env.example`.
2. Установите нод-зависимости

## Создание словарей

```sh
# Создаем словарь соответствия пользователей в YouTrack с пользователями Jira.
DEBUG=migrator:* ./index.ts utils generate-user-map > ./src/dicts/users.json
```

## Запуск

Help:
```sh
DEBUG=migrator:* ./index.ts --help
```

Вывести список задач:
```sh
DEBUG=migrator:* ./index.ts issues --limit=10
```
