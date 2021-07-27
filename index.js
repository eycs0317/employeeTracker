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
      addEmployee()
    } else if (answer === 'Update Employee Role') {

    } else if (answer === 'View All Role') {
      showAllRole()
    } else if (answer === 'Add Role') {
      addRole()
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

// var str = `SELECT e.id, e.first_name, e.last_name, role.title, role.salary, d.name as dept, e.manager_id, m.manager_id
// FROM employee e
// inner join role on e.role_id = role.id
// inner join department d on role.department_id = d.id
// inner join employee m on m.manager_id = e.manager_id;
// `

//missing manager name
function showAllEmpl() {
  var str = `SELECT e.id, e.first_name, e.last_name, role.title, role.salary, d.name AS dept, e.manager_id
              FROM employee e
              LEFT JOIN role ON e.role_id = role.id
              LEFT JOIN department d ON role.department_id = d.id
              LEFT JOIN employee ON employee.manager_id = employee.id`
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

var arrayOfRoleSelection = [];
function roleSelection() {
  connection.promise().query('SELECT role.title FROM role')
  .then(result => {

  })
    if (err) throw err
    console.log('results -->', results.length)
    for (var i = 0; i < results.length; i++) {
      arrayOfRoleSelection.push(results[i].title)
    }
    console.log('arrayOfRoleSelection',arrayOfRoleSelection)
    return arrayOfRoleSelection;

  // console.log('outtt',arrayOfRoleSelection)
  // return arrayOfRoleSelection;
}
// addEmployeeQuestion
function addEmployee() {
  connection.promise().query('SELECT * FROM role')
  .then(rows => {
    let roleTable = rows[0]
    for (var i = 0; i < roleTable.length; i++) {
      addEmployeeQuestion[2].choices.push({name:roleTable[i].title, value: roleTable[i].id});
    }
    connection.promise().query('SELECT * FROM employee WHERE manager_id IS NULL')
    .then(rows => {
      let allManager = rows[0];
      // console.log('allManager------->', allManager[0].id)
      for (var i = 0; i < allManager.length; i++) {

        addEmployeeQuestion[3].choices.push({'name': allManager[i].first_name + ' ' + allManager[i].last_name, value: allManager[i].id })
      }
      // console.log('new qqqqqq', addEmployeeQuestion[3].choices[1])
      inquirer.prompt(addEmployeeQuestion)
      .then(answers => {
        const {newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManagerRole} = answers;
        let value = [newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManagerRole];
        let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`
        connection.promise().query(query, value)
        .then(res => {
          console.log('res - added', res)
        })
      })
    })

  })
}

