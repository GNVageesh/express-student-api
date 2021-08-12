const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
	name: {
		type: String,
	},
	roll: {
		type: String,
		required: [true, "Roll field is required"],
	},
	present: {
		type: Boolean,
		default: true,
	},
});

const Student = mongoose.model("student", StudentSchema);
module.exports = Student;
