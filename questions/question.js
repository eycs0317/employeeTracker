const initQuestion = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'userInitInput',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Role', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
  }
]

const addDepartmentQuestion = [
  {
    type: 'input',
    message: 'What is the name of the department?',
    name: 'newDepartmentName'
  }
]

/////////// need to get it from the db
const addRoleQuestion = [
  {
    type: 'input',
    message: 'What is the name of the role?',
    name: 'newRoleName'
  },
  {
    type: 'input',
    message: 'What is the salary of the role?',
    name: 'newRoleSalary'
  },
  {
    type: 'list',
    message: 'Which department does the role? belong to?',
    name: 'newDepartmentName',
    choices: ['a','b']
  }
]

/////////// need to get it from the db  newEmployeeRole and newEmployeeManagerRole
const addEmployeeQuestion = [
  {
    type: 'input',
    message: `What is the employee's first name?`,
    name: 'newEmployeeFirstName'
  },
  {
    type: 'input',
    message: `What is the employee's last name?`,
    name: 'newEmployeeLastName'
  },
  {
    type: 'input',
    message: "What is the employee's role?",
    name: 'newEmployeeRole',
    list: ['a','b']
  },
  {
    type: 'list',
    message: "Who is the employee's manager?",
    name: 'newEmployeeManagerRole',
    list: ['a','b']
  }
]
//need to get from db   updateEmployeeName / updateEmployeetoNewDepartment
const updateEmployeeRoleQuestion = [
  {
    type:'list',
    message: "Which employee's role do you want to update?",
    name: 'updateEmployeeName',
    choices: ['a', 'b']
  },
  {
    type: 'list',
    message: 'Which role do you want to assign the selected employee?',
    name: 'updateEmployeetoNewDepartment',
    choices: ['a', 'b']
  }
]

module.exports.initQuestion = initQuestion
module.exports.addDepartmentQuestion = addDepartmentQuestion
module.exports.addRoleQuestion = addRoleQuestion
module.exports.addEmployeeQuestion = addEmployeeQuestion
module.exports.updateEmployeeRoleQuestion = updateEmployeeRoleQuestion


