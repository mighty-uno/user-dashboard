const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const { BCRYPT_SALT_ROUNDS } = require("../config/keys");

const validator = require("validator");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 30,
      minlength: 1,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 320,
    },
    password: {
      type: String,
      required: true,
      maxlength: 100,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } //adds fields createdAt & updatedAt automaticly to new Date() timestamp
);

//before saving the model run this function
UserSchema.pre("save", function (next) {
  const user = this; //this is our user model
  if (!validator.isLength(user.password, { min: 8, max: 50 }))
    return next("Invalid password length");
  bcrypt.genSalt(BCRYPT_SALT_ROUNDS, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err1, hash) => {
      if (err1) return next(err1);
      user.password = hash;
      return next();
    });
  });
});

//before updating the model run this function
UserSchema.pre("updateOne", function (next) {
  if (this._update.$set && this._update.$set.password) {
    if (!validator.isLength(this._update.$set.password, { min: 8, max: 50 }))
      return next("Invalid password length");
    //if password is updated
    bcrypt.genSalt(BCRYPT_SALT_ROUNDS, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(this._update.$set.password, salt, (err1, hash) => {
        if (err1) return next(err1);
        this.set({ password: hash });
        return next();
      });
    }); //generate salt
    //hashing our password using the salt
  } else {
    return next();
  }
});

//authenticating password
UserSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    if (!validator.isLength(candidatePassword, { min: 8, max: 40 }))
      return next("Invalid password length");
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) {
        return reject(err);
      }
      return resolve(isMatch);
    });
  });
};

module.exports = mongoose.model("users", UserSchema);
