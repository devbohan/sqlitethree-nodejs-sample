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