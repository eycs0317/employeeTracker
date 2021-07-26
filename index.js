const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const {initQuestion, addDepartmentQuestion, addRoleQuestion, addEmployeeQuestion, updateEmployeeRoleQuestion} = require('./questions/question')



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'cms_db',
  password: 'databasehell'
});

///prompt
function initPrompt () {
  inquirer.prompt(initQuestion)
.then(answer => {
    answer = answer.userInitInput;
    if(answer === 'View All Employees') {
      showAllEmpl()
    } else if( answer === 'Add Employee') {

    } else if (answer === 'Update Employee Role') {

    } else if (answer === 'View All Role') {
      showAllRole()
    } else if (answer === 'Add Role') {

    } else if (answer === 'View All Department') {
      showAllDept()
    } else if (answer === 'Add Department') {
      addDept()
    } else {
      console.log('quittttt')
      return;
    }
}).catch(err => {
  if (err) console.log('errorrrr', err)
})
}

initPrompt()




function showAllDept() {
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    console.table(results)
  })
  initPrompt();
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
  initPrompt();
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
    console.table(results)
  })
  initPrompt();
}

// showAllEmpl();

//add
function addDept() {
  inquirer.prompt(addDepartmentQuestion)
  .then(answer => {
    answer = answer.newDepartmentName;
    let queryStr = `INSERT INTO department (name) VALUE (${answer});`
    connection.query(queryStr, (err, results) => {
      if (err) throw err;
    })
  })
  console.log('end of the addDept function')

}

