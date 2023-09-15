const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type:String,
    required:true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type:String,
    required: true,
    validate: {
      validator : function (v){
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);
      },
      message: (prop) => `Invalid email: ${prop.value}`
    }
  },
  password: {
    type: String,
    minlength: [6,'Password is too short'],
    required:true
  },
  roles: {
    type: [String],
    required: true,
  },
  accountStatus: {
    type: String,
    enum: ['PENDING',"ACTIVE",'REJECTED'],
    default: 'PENDING',
    required: true,
  },
});

const User = model("User", userSchema);

module.exports = User;
