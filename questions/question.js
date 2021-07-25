const initQuestion = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'userInitInput',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View ALl Role', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
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
    name: 'newDepartmentName',
    list: /////////// need to get it from the db
  }
]

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
    list: /////////// need to get it from the db
  },
  {
    type: 'list',
    message: "Who is the employee's manager?",
    name: 'newEmployeeManagerRole',
    list: /////////// need to get it from the db
  }
]

const updateEmployeeRoleQuestion = [
  {
    type:'list',
    message: "Which employee's role do you want to update?",
    name: 'updateEmployeeName',
    choices: //need to get from db
  },
  {
    type: 'list',
    message: 'Which role do you want to assign the selected employee?',
    name: 'updateEmployeetoNewDepartment',
    choices: // from db all department
  }
]
