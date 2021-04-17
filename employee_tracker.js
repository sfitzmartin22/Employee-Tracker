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
        'add employees',
        'update employee roles',
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
          addDepartment();
          break;

        case 'Add Role':
         addRole();
          break;

        case 'add employees':
         console.log("add employees");
         break;

        case 'update employee roles':
        console.log("update employee roles");
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

const viewEmployees = () => {
    const query = "select * from employee"      
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

  const addDepartment = () => {
    const addDepartmentQuestions = [
    {
      type: "input",
      name: "departmentName",
      message: "What is the name of the department that you would like to add?"
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
      message: "What is the title of the role that you would like to add?"
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
    console.log(`Role Title: ${answer.roleTitle}, Role Salary: ${answer.roleSalary}, Role Department: ${answer.roleDepartment} has been added to the database!  Please see the updated role table below:`);
    viewRoles();
    })
  })
  };