const express = require("express");
const router = express.Router();
const Student = require("../model/student");

router.get("/students", async (req, res, next) => {
	// Student.find({})
	// 	.then((students) => {
	// 		res.send(students);
	// 	})
	// 	.catch(next);
	try {
		const data = await Student.find();
		res.json(data);
	} catch {
		res.send({ message: "Some error occured" });
	}
});
router.get("/students/:id", async (req, res, next) => {
	try {
		const data = await Student.findById(req.params.id);
		res.json(data);
	} catch (err) {
		res.send({ message: err });
	}
});

router.post("/students", async (req, res, next) => {
	// Student.create(req.body)
	// 	.then((student) => {
	// 		res.send(student);
	// 	})
	// 	.catch(next);

	try {
		const structure = {
			name: req.body.name,
			roll: req.body.roll,
			present: req.body.present,
		};
		const data = await Student.create(structure);
		res.json(data);
	} catch (err) {
		res.send({ message: err.message });
	}
});

router.put("/students/:id", (req, res, next) => {
	Student.findOneAndUpdate({ _id: req.params.id }, req.body).then(
		(student) => {
			Student.findOne({ _id: req.params.id }).then((student) => {
				res.send(student);
			});
		}
	);
});

router.delete("/students/:id", async (req, res) => {
	// Student.findOneAndDelete({ _id: req.params.id }).then((student) => {
	// 	res.send({
	// 		message: "Deleted " + req.body.name + " from the database",
	// 	});
	// });

	try {
		const data = await Student.findOneAndDelete({ _id: req.params.id });
		res.send({
			status: "removed from the database",
			data,
		});
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
