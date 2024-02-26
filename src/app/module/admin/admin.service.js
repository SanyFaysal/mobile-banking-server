const Admin = require("./admin.model");

exports.increaseAdminIncome = async (amount) => {
  await Admin.updateOne(
    { _id: "65dcd92dbaadeb50e0915ece" },
    { $inc: { income: amount } }
  );
};
