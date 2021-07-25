const initQuestion = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'userInitInput',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View ALl Role', 'Add Role', 'View All Departments', 'Add Department']
  }
]

const addDepartmentQuestion = [
  {
    type: 'input',
    message: 'What is the name of the department?',
    name: 'newDepartmentName'
  }
]

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
    name: 'newDepartmentName'
    list: /////////// need to get it from the db
  }
]
