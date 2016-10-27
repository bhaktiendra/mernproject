import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: { type: 'String', required: true },
  employeeNumber: { type: 'String', required: true },
  address: { type: 'String', required: true },
  location: { type: 'String', required: true },
  stream: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Employee', employeeSchema);
