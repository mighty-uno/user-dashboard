"user strict";
const Busboy = require("busboy");
const fs = require("fs");
const dir = "./upload";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const { FileUpload } = require("../../models");

function parse(req) {
  return new Promise((resolve, reject) => {
    let fields = {};
    const busboy = new Busboy({
      headers: req.headers,
      limits: {
        files: 1, // allow only a single upload at a time.
      },
    });

    busboy.on("field", function (fieldname, val) {
      console.log(fieldname, val);
      fields[fieldname] = val;
    });

    busboy.once("file", onFile);

    busboy.once("error", onError);

    req.pipe(busboy);

    function cleanup() {
      busboy.removeListener("file", onFile);

      busboy.removeListener("error", onError);
    }

    function onFile(fieldname, file, filename, endcoding, mimeType) {
      cleanup();
      resolve({ file, filename, mimeType });
    }

    function onError(err) {
      cleanup();
      reject(err);
    }
  });
}

async function saveFile(req, fileInfo) {
  let saveRequest = {
    user: req.user._id,
    info: fileInfo,
  };

  let file = new FileUpload(saveRequest);
  await file.save();
  return file.toJSON();
}

class File {
  async upload(req, res) {
    try {
      let { file, filename, mimeType } = await parse(req);

      let result = await saveFile(req, {
        filename,
        mimeType,
        size: req.headers["content-length"],
      });
      const userDirName = `${dir}/${req.user.id}`;

      if (!fs.existsSync(userDirName)) {
        fs.mkdirSync(userDirName);
      }
      var writeStream = fs.createWriteStream(`${userDirName}/${filename}`);

      file.pipe(writeStream);
      delete result.user;
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }

  async list(req, res) {
    let addedFileList = await FileUpload.find({
      user: req.user._id,
    })

      .sort({
        createdAt: -1,
      })
      .lean();

    res.send(addedFileList);
  }
}

module.exports = new File();
