#tiny sqlite sample

## node + sqlite3 
- create workspace

```bash
mkdir your-directory-id
cd your-directory-id
npm init -y
touch index.js
```
</br>

- install npm package [sqlite3]

```bash
npm install sqlite3
```

</br>

- copy code to index.js

```javascript
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./somedb.db");

db.serialize(() => {
    db.run("drop table if exists sometable");
    db.run("create table if not exists sometable(id,number)");
    db.run("insert into sometable(id,number) values(?,?)", "hoge", 10);
    db.run("insert into sometable(id,number) values(?,?)", "foo", 20);
    db.run("update sometable set number = ? where id = ?", 30, "foo");
    db.each("select * from sometable", (err, row) => {
        console.log(`${row.id} ${row.number}`);
    });
    db.all("select * from sometable", (err, rows) => {
        console.log(JSON.stringify(rows));
    });
    db.get("select count(*) from sometable", (err, count) => {
        console.log(count["count(*)"]);
    })
});

db.close();
```
<br>

- node index.js

``` bash
hoge 10
foo 30
[{"id":"hoge","number":10},{"id":"foo","number":30}]
2 
``` 

## sqlite3 check database with sqlite-web

- check python & pip & install sqlite-web

``` bash
python -V
pip list 
python -m pip install --upgrade pip setuptools
pip install sqlite-web
```

- use sqlite-web
``` bash
sqlite_web /path/to/database.db
```
- get sth like following..

``` bash
* Serving Flask app "sqlite_web.sqlite_web" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:8080/ (Press CTRL+C to quit)
127.0.0.1 - - [15/Feb/2023 15:52:49] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [15/Feb/2023 15:52:52] "GET /members/ HTTP/1.1" 200 -
```

- AND browser will launch itself..