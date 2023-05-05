import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: {
    type: String,
    required: [true, "Role name is Required"],
    unique: [true, "Role already exists"],
    match: [/^[a-z]+$/, 'Role name can only contain lowercase alphabets'],
    trim: true,
    lowercase: true
  },
  permissions: [{type: String, required: [true, "Permissions are Required"]}],
  description: {type: String}
});

export default mongoose.model('Role', RoleSchema, "roles");

