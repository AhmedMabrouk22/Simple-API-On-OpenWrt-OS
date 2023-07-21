const express = require("express");
const os = require("os");
const { exec } = require("child_process");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("server run");
});

app.post("/api/reboot", (req, res) => {
  const cmd = "reboot";
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.log("Error while rebooting:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while rebooting OpenWrt." });
    }

    res.json({ message: "OpenWrt is rebooting..." });
  });
});

app.post("/api/stop", (req, res) => {
  const cmd = "poweroff";
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.log("Error while shutting down:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while stopping OpenWrt." });
    }
    res.json({ message: "OpenWrt is shutting down..." });
  });
});

app.get("/api/system-info", (req, res) => {
  const systemInfo = {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    release: os.release(),
    uptime: os.uptime(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpus: os.cpus(),
  };

  res.json(systemInfo);
});

app.listen(port, () => {
  console.log("Server Run");
});
