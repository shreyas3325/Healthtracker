const HealthLog = require("../models/Healthlog");

exports.addHealthLog = async (req, res) => {

  try {

    const {
      calories,
      water,
      sleep,
      weight,
    } = req.body;

    const log = await HealthLog.create({

      user: req.user._id,

      calories,

      water,

      sleep,

      weight,

    });

    res.status(201).json(log);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

exports.getHealthLogs = async (req, res) => {

  try {

    const logs = await HealthLog.find({
      user: req.user._id,
    });

    res.json(logs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

exports.deleteHealthLog = async (req, res) => {

  try {

    const log = await HealthLog.findById(
      req.params.id
    );

    if (!log) {

      return res.status(404).json({
        message: "Log not found",
      });

    }

    await log.deleteOne();

    res.json({
      message: "Health Log Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

exports.updateHealthLog = async (req, res) => {

  try {

    const log = await HealthLog.findById(
      req.params.id
    );

    if (!log) {

      return res.status(404).json({
        message: "Log not found",
      });

    }

    log.calories =
      req.body.calories || log.calories;

    log.water =
      req.body.water || log.water;

    log.sleep =
      req.body.sleep || log.sleep;

    log.weight =
      req.body.weight || log.weight;

    const updatedLog = await log.save();

    res.json(updatedLog);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};