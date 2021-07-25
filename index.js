const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'cms_db',
  password: 'databasehell'
});


// SELECT e.* r.*
// FROM employee e
//     inner join role r on e.role_id = r.id
// WHERE e.role_id = 2


function showAllEmpl() {
  var str = `SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name
              FROM employee e
              inner join role r on e.role_id = r.id
              inner join department d on r.department_id = d.id;`
  connection.query(str, (err,results) => {
    if (err) throw err;
    console.log('results', results)
    console.table(results)
  })
}

