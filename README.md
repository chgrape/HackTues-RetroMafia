-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

![HackTues](https://user-images.githubusercontent.com/71979318/224407022-70c842d2-22f3-4e4c-ac4d-b5011d42bac0.png)
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------


# **MafiaPASS**

Нашият проект е уеб приложение за съхраняване на пароли. То позволява на нашите потребители лесно да запазват всичката си входяща информация и да имат безпроблемен достъп до нея чрез браузърно разширение.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Тема на разработка:

*Подтема на проекта ни е сигурност на данните.*

![DataSecurity](https://user-images.githubusercontent.com/71979318/224408600-2bbb2494-1f25-4de5-984e-cdbd1e8d06aa.png)


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Основна функционалност на проекта

MafiaPASS съхранява информацията на потребителя в криптирано състояние в нашите бази данни. Всяко парче уязвима информация преминава през алгоритъм за верижно шифроване на блокове, комбиниран с криптиране.

Всяка уязвима информация преминава през алгоритъм за верижно шифроване на блокове, комбиниран с криптиране.

Приложението може автоматично да генерира нови пароли, които се оценяват от скрипт за машинно обучение на PyTorch, за да се гарантира тяхната сила и безопасност.

Потребителят с разширението за браузър може също така с лекота да влезе във всеки свой акаунт.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Бъдещо развитие:

Бъдещата цел на проекта е да се разработят още по-сигурни методи за опазване на потребителските данни и да се осигури по-добра интеграция. Също така планираме да добавим физическа мярка за сигурност под формата на ключ за сигурност, който да гарантира, че никой не може дистанционно да експлоатира нашите клиенти.

## Технологии използвани в апликацията:

``` 
JavaScript, , ExpressJS, NodeJS,
Python, PyTorch,
MySQL, Docker,
HTML, CSS 
```

## Библиотеки използвани при разработка

#### Python библиотеки

```
import pandas as pd
import numpy as np
import torch
import re
import sklearn
import sys

from torch import nn
from sklearn.model_selection import train_test_split
```

#### JavaScript библиотеки

```
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors'
import knex from 'knex';
import knexConfig from './db/knexfile.js'
```

### Нашият Екип:
* Кристиян Лозанов (Капитан)
* Борис Бачев
* Бурак Бали
* Християн Петков
* Ясен Ангелов


> Теодор Стефанов (Ментор)

Повече Информация:
https://hacktues.bg/teams/34
