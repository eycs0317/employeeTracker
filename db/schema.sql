DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;

USE cms_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  PRIMARY KEY (id)
);

-- Seed
INSERT INTO department (name)
VALUE ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUE ('Sales Lead', 100000, 1),
      ('Salesperson', 80000, 1),
      ('Lead Engineer', 150000, 2),
      ('Software Engineer', 120000, 2),
      ('Account Manager', 160000, 3),
      ('Accountant', 125000, 3),
      ('Legal Team Lead', 250000, 4),
      ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('John', 'Doe', 1, null),
      ('Mike', 'Chan', 2, 1),
      ('Ashley', 'Rodriguez', 3, null),
      ('Kevin', 'Tupik', 4, 3),
      ('Kunal', 'Singh', 5, null),
      ('Malia', 'Brown', 6, 5),
      ('Sarah', 'Lourd', 7, null),
      ('Tom', 'Allen', 8, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
