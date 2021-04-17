const mysql = require('mysql');
const inquirer = require('inquirer');
require('dotenv').config();
const consoleTable = require('console.table');


const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: process.env.DB_USER,

  // Be sure to update with your own MySQL password!
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
 init(); 
});

 const init = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add Department',
        'Add Role',
        'Add Employees',
        'Update Employee Roles',
        'Exit the Application',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View All Departments':
        viewDepartment();
          break;

        case 'View All Roles':
          viewRoles();
          break;

        case 'View All Employees':
          viewEmployees();
          break;

        case 'Add Department':
          viewDepartmentAddHelper();
          setTimeout(addDepartment,1000);
          break;

        case 'Add Role':
          viewRolesAddHelper();
          setTimeout(addRole,1000); 
          break;

        case 'Add Employees':
          viewEmployeesAddHelper();
          setTimeout(addEmployee,1000);
         break;

        case 'Update Employee Roles':
        console.log("update employee roles");
          break;

        case 'Exit the Application':
        exit();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const viewDepartment = () => {
    const query = "select * from department"      
    connection.query(query, (err, res) => {
      console.table(res);
      init();
    })  
  };

  const viewDepartmentAddHelper = () => {
    const query = "select * from department"      
    connection.query(query, (err, res) => {
      console.table(res);
    })  
  };
  const viewEmployees = () => {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee_trackerdb.employee LEFT JOIN role on role.id = employee.role_id join department on department.id = role.department_id"      
    connection.query(query, (err, res) => {
        console.table(res);
        init();
      })  
  };

  
const viewRoles = () => {
    const query = "select * from role"      
    connection.query(query, (err, res) => {
    console.table(res);
    init();
    })  
  };

  const viewRolesAddHelper = () => {
    const query = "select * from role"      
    connection.query(query, (err, res) => {
    console.table(res);
    })  
  };

  const viewEmployeesAddHelper = () => {
    const query = "SELECT * from employee"      
    connection.query(query, (err, res) => {
        console.table(res);
      })  
  };

  const addDepartment = () => {
    const addDepartmentQuestions = [
    {
      type: "input",
      name: "departmentName",
      message: "What is the name of the department that you would like to add? (Please refer to the above roles in the database to aid in your role creation)."
    },
    {
      type: "input",
      name: "departmentID",
      message: "What is the ID of this new department?"
    }]
    inquirer
    .prompt(addDepartmentQuestions)
    .then((answer) => {
    const query = `insert into department (id, name) values (${answer.departmentID}, "${answer.departmentName}")`      
    connection.query(query, (err, res) => {
    console.log(`Department name: ${answer.departmentName} Department ID: ${answer.departmentID} has been added to the database!  Please see the update department table below:`);
    viewDepartment();
    })
  })
  };

  const addRole = () => {
    const addRoleQuestions = [
    {
      type: "input",
      name: "roleTitle",
      message: "What is the title of the role that you would like to add? (Please refer to the above roles in the database to aid in your role creation)."
    },
    {
      type: "input",
      name: "roleSalary",
      message: "What is the salary for the role that you are adding?"
    },
    {
      type: "input",
      name: "departmentID",
      message: "What is the Department ID of this new role?"
    }]
    inquirer
    .prompt(addRoleQuestions)
    .then((answer) => {
    const query = `insert into role (title, salary, department_id) values ("${answer.roleTitle}", ${answer.roleSalary}, ${answer.departmentID})`      
    connection.query(query, (err, res) => {
    console.log(`Role: ${answer.roleTitle} has been created with salary: ${answer.roleSalary} and department_id: ${answer.departmentID}`);
    viewRoles();
    })
  })
  };

  const addEmployee = () => {
    const addEmployeeQuestions = [
    {
      type: "input",
      name: "firstName",
      message: "What is the first name of the employee that you would like to add? (Please refer to the above employees in the database to aid in your employee creation this and all remaining prompts)."
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the last name of the employee that you would like to add"
    },
    {
      type: "input",
      name: "roleID",
      message: "What is the role ID of this new employee?"
    },
    {
      type: "input",
      name: "managerID",
      message: "What is the manager ID for the manager of this new employee?"
    },]
    inquirer
    .prompt(addEmployeeQuestions)
    .then((answer) => {
    const query = `insert into employee (first_name, last_name, role_id, manager_id) values ("${answer.firstName}", "${answer.lastName}", ${answer.roleID}, ${answer.managerID})`      
    connection.query(query, (err, res) => {
    console.log(`${answer.firstName} ${answer.lastName} has been added to the employee list with Role ID: ${answer.roleID}!  Please see the updated employee table below:`);
    viewEmployees();
    })
  })
  };

  const exit = () => {
    return process.exit(0);
  }

  