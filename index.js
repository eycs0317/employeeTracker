const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'cms_db',
  password: 'databasehell'
});












function showAllDept() {
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    console.table(results)
  })
}
// showAllDept()

function showAllRole() {
  var str = `SELECT r.id, r.title, r.salary, d.name
            FROM role r
            inner join department d on r.department_id = d.id;`
  connection.query(str, (err, results) => {
    if (err) throw err;
    console.table(results)
  })
}

// showAllRole();


//missing manager name
function showAllEmpl() {
  var str = `SELECT e.id, e.first_name, e.last_name, role.title, role.salary, d.name, e.manager_id, m.manager_id
              FROM employee e
              inner join role on e.role_id = role.id
              inner join department d on role.department_id = d.id
              inner join employee m on m.manager_id = e.id;
              `
  connection.query(str, (err,results) => {
    if (err) throw err;
    console.log('results', results)
    console.table(results)
  })
}

// showAllEmpl();

