# idn-api
API для поддержки интернационализованных доменных имен

API работает на основе
* https://www.npmjs.com/package/punycode-regex
* https://www.npmjs.com/package/domain-info

### Как использовать:
| endpoint | описание |
| ------ | ------ |
| /api/punycode/test | проверить на соответствие punycode |
| /api/punycode/encode | зашифровать в  punycode |
| /api/punycode/decode | расшифровать punycode |
| /api/punycode/convert | конвертировать строку без проверки на соответствие |
| /api/email/convert | конвертировать email |
| /api/domain/info | получить инфо о домене |
| /api/domain/reverse | получить домене по ip |
