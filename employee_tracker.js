const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '22seanfitz22',
  database: 'employee_trackerDB',
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
        'add departments',
        'add roles',
        'add employees',
        'view departments',
        'view roles',
        'view employees',
        'update employee roles',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'add departments':
         // artistSearch();
         console.log("add department");
          break;

        case 'add roles':
         // multiSearch();
         console.log("add roles");
          break;

        case 'add employees':
         // rangeSearch();
         console.log("add employees");
         break;

        case 'view departments':
        // songSearch();
        console.log("view departments");
          break;

        case 'view roles':
         // songAndAlbumSearch();
         console.log("view roles");
          break;

        case 'view employees':
        //  rangeSearch();
        console.log("view employees");
          break;

        case 'update employee roles':
        //  rangeSearch();
        console.log("update employee roles");
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

