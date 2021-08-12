const express = require("express");
const router = express.Router();
const Student = require("../model/student");

router.get("/students", (req, res, next) => {
	Student.find({})
		.then((students) => {
			res.send(students);
		})
		.catch(next);
});
router.get("/students/:id", async (req, res, next) => {
	try {
		const data = await Student.findById(req.params.id);
		res.json(data);
	} catch (err) {
		res.send({ message: err });
	}
});

router.post("/students", (req, res, next) => {
	Student.create(req.body)
		.then((student) => {
			res.send(student);
		})
		.catch(next);
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

router.delete("/students/:id", (req, res) => {
	Student.findOneAndDelete({ _id: req.params.id }).then((student) => {
		res.send({
			message: "Deleted " + req.body.name + " from the database",
		});
	});
});

module.exports = router;
