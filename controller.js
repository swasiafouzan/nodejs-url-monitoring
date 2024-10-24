const monitoringService = require("./service");

const monitorUrl = (req, res) => {
  const { url, interval } = req.body;

  if (!url || !interval) {
    return res.status(400).send("Missing URL or interval");
  }

  monitoringService.startMonitoring(url, interval);
  res.send(`Started monitoring ${url} every ${interval} milliseconds`);
};

const stopMonitoring = (req, res) => {
  const { url } = req.body;

  if (monitoringService.stopMonitoring(url)) {
    res.send(`Stopped monitoring ${url}`);
  } else {
    res.status(404).send(`Was not monitoring ${url}`);
  }
};

module.exports = { monitorUrl, stopMonitoring };
