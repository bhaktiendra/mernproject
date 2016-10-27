import Employee from '../models/employee';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all employees
 * @param req
 * @param res
 * @returns void
 */
export function getEmployees(req, res) {
  Employee.find().sort('-dateAdded').exec((err, employees) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ employees });
  });
}

/**
 * Save a employee
 * @param req
 * @param res
 * @returns void
 */
export function addEmployee(req, res) {
  if (!req.body.employee.name || !req.body.employee.employeeNumber || !req.body.employee.stream) {
    res.status(403).end();
  }

  const newEmployee = new Employee(req.body.employee);

  // Let's sanitize inputs
  newEmployee.name = sanitizeHtml(newEmployee.name);
  newEmployee.employeeNumber = sanitizeHtml(newEmployee.employeeNumber);
  newEmployee.stream = sanitizeHtml(newEmployee.stream);

  newEmployee.slug = slug(newEmployee.employeeNumber.toLowerCase(), { lowercase: true });
  newEmployee.cuid = cuid();
  newEmployee.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ employee: saved });
  });
}

/**
 * Get a single employee
 * @param req
 * @param res
 * @returns void
 */
export function getEmployee(req, res) {
  Employee.findOne({ cuid: req.params.cuid }).exec((err, employee) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ employee });
  });
}

/**
 * Delete a employee
 * @param req
 * @param res
 * @returns void
 */
export function deleteEmployee(req, res) {
  Employee.findOne({ cuid: req.params.cuid }).exec((err, employee) => {
    if (err) {
      res.status(500).send(err);
    }

    employee.remove(() => {
      res.status(200).end();
    });
  });
}
