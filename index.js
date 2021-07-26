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
      addRole(showAllDept)
    } else if (answer === 'View All Departments') {
      showAllDept()
    } else if (answer === 'Add Department') {
      addDept()
    } else {
      console.log('quittttt')
      connection.end();
      return;
    }
}).catch(err => {
  if (err) console.log('errorrrr', err)
})
}

initPrompt()



//Show
function showAllDept() {
  connection.promise().query('SELECT * FROM department')
    .then(rows => {
      console.log('rows',rows[0])
      console.table(rows[0])
      initPrompt();
    })
    .catch(err => {
      console.log('showAllDept error', err)
    })
}
// showAllDept()

function showAllRole() {
  var str = `SELECT r.id, r.title, r.salary, d.name
            FROM role r
            inner join department d on r.department_id = d.id;`
  connection.promise().query(str)
  .then(rows => {
    console.table(rows[0])
    initPrompt();
  })
  .catch(err => {
    console.log('showAllRole error', err)
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
  connection.promise().query(str)
  .then(rows => {
    console.table(rows[0])
    initPrompt();
  })
 .catch(err => {
    console.log('showAllRole error', err)
  })

}

// showAllEmpl();

//Add
function addDept() {
  inquirer.prompt(addDepartmentQuestion)
  .then(answer => {
    answer = answer.newDepartmentName;
    connection.query(`INSERT INTO department (name) VALUES ('${answer}')`, (err, results, fields) => {
      if (err) throw err;
      initPrompt();
    })
  })
}

function addRole() {
  connection.promise().query('SELECT * FROM department')
  .then(rows => {
    let allDeptTable = rows[0]
    for(var i = 0; i < allDeptTable.length; i++) {
      addRoleQuestion[2].choices.push(allDeptTable[i].name)
    }
    // console.log('addRoleQuestion', addRoleQuestion)
    inquirer.prompt(addRoleQuestion)
    .then(answer => {
      // console.log('answer=====', answer)
      let deptName = answer.newDepartmentName;
      connection.promise().query(`SELECT * FROM department WHERE name = '${deptName}'`)
      .then(rows => {
        let deptId = rows[0][0].id;
        // console.log('rows', rows[0].length)
        // console.log('rows[0].id', rows[0].id)
        // console.log('ans', answer)
        // console.log('answer.newRoleName', answer.newRoleName)
        // console.log('answer.newRoleSalary', answer.newRoleSalary)
        // console.log('deptId', deptId)
        connection.query(`INSERT INTO role (title, salary, department_id) VALUE ('${answer.newRoleName}', ${Number(answer.newRoleSalary)}, ${deptId})`, err => {
          if (err) throw err;
          initPrompt();
        })
      })
    })
  })
  .catch(err => {
    console.log('error', err)
  })
}

// addRole()

