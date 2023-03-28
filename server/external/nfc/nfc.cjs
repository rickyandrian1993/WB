const express = require("express");
const NfcService = require("./nfcController.cjs");
const pretty = require("./pretty-logger.cjs");

const router = express.Router();

router.post("/", async (_, res) => {
  const hndlNFCService = new NfcService(this);
  await hndlNFCService.readNfc((err, data) => {
    if (err) {
      hndlNFCService.nfc.close();
      if (err.message !== undefined && err.message.indexOf("Status code: 0x6300") >= 0) {
        return res.status(500).json({ isError: "Y", message: "error failed to read nfc card" });
      } else if (err.message !== undefined && err.message.indexOf("nfc reader not present") >= 0) {
        return res.status(500).json({ isError: "Y", message: err.message });
      } else if (err.message !== undefined && err.message.indexOf("card.off") >= 0) {
        return res.status(500).json({ isError: "Y", message: "No card detect" });
      }
    } else {
      if (data === "card removed" || data === "card off") {
        hndlNFCService.nfc.close();
        pretty.info("TEST nfc 5");
        try {
          return res.status(200).json({ isError: "Y", data });
        } catch {
          pretty.info("pass");
        }
      } else {
        return res.status(200).json({ isError: "N", data });
      }
    }
  });
});

module.exports = router;
