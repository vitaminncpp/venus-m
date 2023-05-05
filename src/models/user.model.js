import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is Required"],
    unique: [true, "username must be unique"],
    match: [/^[a-z]+$/, 'username can only contain lowercase alphabets'],
    trim: true,
    lowercase: true
  },
  name: {type: String, required: [true, "Name is Required"]},
  pHash: {type: String, required: [true, "Password is Required"]},
  roles: [{type: String, required: [true, "Roles are Required"]}]
});

export default mongoose.model('User', UserSchema, "users");

