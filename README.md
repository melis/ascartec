Тестовое задание от Аскартек на позицию backend nodejs разработчик
1.	Эндпоинт для регистрации пользователя, логин пароль. возвращает сессионный ключ
POST:       localhost:5000/api/user/signup
Body: {email: xxx@xxx.ru, password: xxxx, name: xxxxx}
2. Эндпоинт для аутентификации пользователя по логину и паролю, возвращает сессионный ключ.
 POST:       localhost:5000/api/user/login  
Body: {email: xxx@xxx.ru, password: xxxx}
3. Эндпоинт для получения товаров, у товара есть name, category_id. Если в запросе передается category_id, нужно отдать товары, относящиеся только к указанной категории
GET:   localhost:5000/api/product?< categoryId=id>
4. Эндпоинт для получения списка категорий товаров, у категории есть name, products_count (количество товаров для этой категории)
GET: localhost:5000/api/categories
5. Эндпоинт для добавления товара в избранное для конкретного пользователя (требуется аутентификация  )
POST:  localhost:5000/api/user/faworites
{productId: xxx} Bearer Token
6. Эндпоинт для получения избранных товаров пользователя. (требуется аутентификация  )
GET: localhost:5000/api/user/faworites
7. Эндпоинт на создание нового товара, должна быть указана категория
POST:  localhost:5000/api/product
Body { name: xxxxx, categoryId: xxxxx}
8. Эндпоинт на удаление товара по id
DELETE: localhost:5000/api/product/<idProduct>
9. Категории создавать через эндпоинт не надо, можно просто внести в базу данных 20 разных категорий.


Бэкенд должен состоять из двух "приложений на node js". Первое приложение несет собой всю логику. Второе приложение - сервис аутентификации. При запросе на аутентификацию, первое приложение делает запрос на второе, и получает данные пользователя и сессионный ключ.

При запросах на первое приложение, в которых нужна аутентификация, например "Эндпоинт для получения избранных товаров пользователя", получение айди пользователя по сессионному ключу должно быть через сервис аутентификации, т.е. пришел запрос на основное приложение, основное приложение берет сессионный ключ и делает запрос на сервис аутентификации, он отвечает кому принадлежит эта сессия и валидна ли она. Время жизни сессии - 10 минут





 

