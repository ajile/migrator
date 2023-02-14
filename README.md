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

```sh
./index.ts migrator generate-export-json --issue-id=MERCHANT-9150
```
