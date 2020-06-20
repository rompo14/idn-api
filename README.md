# idn-api
API для поддержки интернационализованных доменных имен

API работает на основе
* https://www.npmjs.com/package/punycode-regex
* https://www.npmjs.com/package/domain-info

### Как запустить:
`npm run dev` - Запускает сервер для разработки

`npm build` - Делает сборку проекта

### Как использовать:
| endpoint | описание |
| ------ | ------ |
| GET /api/punycode/test | проверить на соответствие punycode |
| GET /api/punycode/encode | зашифровать в  punycode |
| GET /api/punycode/decode | расшифровать punycode |
| GET /api/punycode/convert | конвертировать строку без проверки на соответствие |
| GET /api/email/convert | конвертировать email |
| GET /api/domain/info | получить инфо о домене |
| GET /api/domain/reverse | получить домене по ip |
