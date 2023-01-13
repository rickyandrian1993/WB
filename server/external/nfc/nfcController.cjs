const { NFC, TAG_ISO_14443_3, KEY_TYPE_B } = require("nfc-pcsc");
const lzw = require("node-lzw");
const pretty = require("./pretty-logger.cjs");

class NfcReader {
  constructor(obj) {
    this.nfc = null;
  }

  async readNfc(callback) {
    this.nfc = new NFC(pretty);
    this.nfc.once("reader", async (reader) => {
      pretty.info(`device attached`, reader);
      let loopbreak = false;
      reader.once("card", async (card) => {
        const hndlFuncReader = async function (i, blksize) {
          try {
            await reader.authenticate(i, keyType, key[1]);
            pretty.info(`sector 1 successfully authenticated`, reader);
          } catch (err) {
            pretty.error(`error when authenticating block 4 within the sector 1`, reader, err);
            callback(err);
            return;
          }
          try {
            const header = 20; // blockSize=16 must specified for MIFARE Classic cards
            let data = await reader.read(i, blksize, 16); // blockSize=16 must specified for MIFARE Classic cards
            pretty.info(`data read`, reader, data);
            const buff = data.toString("hex");
            const position = data.indexOf(endOfDataBuf);
            const postEndBuf4K = data.indexOf(endBuf4K);
            if (position > 0) {
              const dataSlice = data.slice(0, position);
              tmpstr.push(dataSlice);
              const buff1 = dataSlice.toString("hex");
              loopbreak = true;
            } else if (blksize != 48 && postEndBuf4K > 0) {
              const dataSlice = data.slice(0, postEndBuf4K);
              tmpstr.pheaderush(dataSlice);
              const buff1 = dataSlice.toString("hex");
              loopbreak = true;
            } else {
              const blockseparator = new Buffer([20, 1, 3, 225]);
              const blocksppost = data.indexOf(blockseparator);
              if (blocksppost < 0) {
                tmpstr.push(data);
              }
            }
            pretty.info(`data converted`, reader);
          } catch (err) {
            callback(err);
            pretty.error(`error when reading data`, reader, err);
          }
          let bufferData = Buffer.concat(tmpstr);
          const buff = bufferData.toString("hex");
          let headslice = bufferData.indexOf("33343b", 0, "hex");
          let sliceData = bufferData.slice(headslice);
          return sliceData;
        };
        if (card.type !== TAG_ISO_14443_3) {
          callback(null, "card not supported");
          return;
        }

        pretty.info(`card detected`, reader, card);
        pretty.info("Card Size Type ", card.sizeType);

        const key = ["D3F7D3F7D3F7", "FFFFFFFFFFFF"];
        const keyType = KEY_TYPE_B;
        const endBuf4K = new Buffer([254, 139, 0, 0]);
        const endOfDataBuf = new Buffer([254, 0]);
        let blksize = 48;
        let tmpstr = [];
        let decodeData = "";

        if (card.sizeType == "0001") {
          pretty.info("ENTRING CARD TYPE 1K");
          let buffData = null;
          for (let i = 4; i < 64; i += 4) {
            if (loopbreak) break;
            buffData = await hndlFuncReader(i, blksize);
          }
        } else if (card.sizeType == "0002") {
          let buffData = null;
          pretty.info("ENTRING CARD TYPE 4K");
          for (let i = 4; i < 128; i += 4) {
            if (loopbreak) {
              break;
            }
            buffData = await hndlFuncReader(i, blksize);
          }
          if (!loopbreak) {
            blksize = 240;
            for (let i = 128; i < 256; i += 16) {
              if (loopbreak) {
                break;
              }
              buffData = await hndlFuncReader(i, blksize);
            }
          }
        }
        const finalBuf = Buffer.concat(tmpstr);
        // console.log('NOT CUT BUF ',  finalBuf.toString('hex'))
        console.log("final buf", finalBuf);
        let headslice = finalBuf.indexOf("33343b", 0, "hex");
        if (headslice <= 0) headslice = tmpstr[0].indexOf("33313b", 0, "hex");
        // headslice = finalBuf.indexOf("33313b", 0, 'hex')
        if (headslice <= 0) headslice = tmpstr[0].indexOf("33333b", 0, "hex");
        // headslice = finalBuf.indexOf("33333b", 0, 'hex')
        if (headslice <= 0) headslice = tmpstr[0].indexOf("33323b", 0, "hex");
        // headslice = finalBuf.indexOf("33323b", 0, 'hex')

        const cut40finalbuf = finalBuf.slice(headslice);

        const dataSize = getDataSizeFromBuffer(finalBuf);
        const cutBySize = cut40finalbuf.slice(0, dataSize);

        // console.log('SLICED BUF ',  cutBySize.toString('hex'))
        decodeData = lzw.decode(cutBySize);
        // console.log('DECODED BUF ',  decodeData)
        callback(null, decodeData);
        reader.close();
        reader.disconnect();
        this.nfc.close();
      });

      function getDataSizeFromBuffer(finalBuf) {
        let postofContentType = finalBuf.indexOf("746578", 0, "hex");
        let unknowHeader = finalBuf.subarray(0, postofContentType);
        let first0A = unknowHeader.indexOf("0a", 0, "hex");
        let sizeOfData = unknowHeader.subarray(first0A + 1, postofContentType);
        let result =
          sizeOfData.length > 1 ? sizeOfData[sizeOfData.length - 1] | (sizeOfData[sizeOfData.length - 2] << 8) : sizeOfData[sizeOfData.length - 1];
        return result;
      }

      reader.once("error", (err) => {
        console.log("test EROR here", err.message);
        pretty.error(`an error occurred`, reader, err);
        callback(err);
      });

      reader.once("end", () => {
        pretty.info(`device removed 112`, reader);
      });

      reader.once("card.off", (card) => {
        try {
          pretty.info(`device card off `, reader);
          callback(null, "card off");
        } catch (err) {
          callback(err);
        }
      });
    });

    this.nfc.on("error", (err) => {
      callback(err);
      pretty.error(`an error occurred`, err);
    });
    this.nfc.on("card_not_connected", (err) => {
      callback(err);
      pretty.error(`card_not_connected`, err);
    });
    this.nfc.on("operation_failed", (err) => {
      callback(err);
      pretty.error(`operation_failed`, err);
    });
    this.nfc.on("failure", (err) => {
      callback(err);
      pretty.error(`failure`, err);
    });
  }
}

module.exports = NfcReader;
