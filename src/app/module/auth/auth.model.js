const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { userRole, userStatus } = require("../../constants");
const { ObjectId } = mongoose.Schema.Types;

const authSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    mobileNumber: {
      type: String,
      unique: true,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid phone number",
      ],
    },

    accountType: {
      type: String,
      enum: {
        values: [userRole.user, userRole.agent, userRole.admin],
        message: "{VALUE} can't be an account type",
      },
    },
    status: {
      type: String,
      default: userStatus.active,
      enum: {
        values: [userStatus.active, userStatus.blocked, userStatus.pending],
        message: "{VALUE} can't be an status",
      },
    },

    password: {
      type: String,
      required: true,
      message: "Please enter a password",
    },

    user: {
      type: ObjectId,
      ref: "User",
    },
    agent: {
      type: ObjectId,
      ref: "Agent",
    },
    admin: {
      type: ObjectId,
      ref: "Admin",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timeStamps: true,
  }
);

authSchema.pre("save", function (next) {
  const password = this.password;
  const hash = bcrypt.hashSync(password);
  this.password = hash;
  next();
});

authSchema.methods.comparePassword = function (password, hash) {
  const isValidPassword = bcrypt.compareSync(password, hash);
  return isValidPassword;
};
const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
