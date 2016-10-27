import { Router } from 'express';
import * as EmployeeController from '../controllers/employee.controller';
const router = new Router();

// Get all Employees
router.route('/employees').get(EmployeeController.getEmployees);

// Get one Employee by cuid
router.route('/employees/:cuid').get(EmployeeController.getEmployee);

// Add a new Employee
router.route('/employees').post(EmployeeController.addEmployee);

// Delete a Employee by cuid
router.route('/employees/:cuid').delete(EmployeeController.deleteEmployee);

export default router;
