const model = require("../models/index");
var express = require("express");
let router = express.Router();
let async = require("async");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const commonFunction = require("./commonFunction");

router.get("/", function (req, res, next) {
  model.Employee.findAll({}).then(result => {
    res.json(result);
  });
});
router.post("/cr", function (req, res, next) {
  req.body.RowStatus = 1;
  model.Employee.findAll({
    where: req.body,
    attributes: {
      exclude: ["CreateDate", "CreateBy", "UpdateDate", "UpdateBy", "RowStatus"]
    },
    include: [
      { model: model.EmployeeTemp, where: { RowStatus: 1 }, required: false },
      {
        model: model.EmployeeTrainingTemp,
        where: { RowStatus: 1 },
        required: false
      },
      {
        model: model.EmployeeFamilyTemp,
        where: { RowStatus: 1 },
        required: false
      },
      {
        model: model.EmployeeEduTemp,
        where: { RowStatus: 1 },
        required: false
      },
      {
        model: model.EmployeeAttachmentTemp,
        where: { RowStatus: 1 },
        required: false
      },
      {
        model: model.EmployeeTraining,
        where: { RowStatus: 1 },
        required: false
      },
      { model: model.EmployeeFamily, where: { RowStatus: 1 }, required: false },
      { model: model.EmployeeEdu, where: { RowStatus: 1 }, required: false },
      {
        model: model.EmployeeAttachment,
        where: { RowStatus: 1 },
        required: false
      }
    ]
  }).then(result => {
    res.json(result);
  });
});
//attach
router.post("/attachtemp", function (req, res, next) {
  model.EmployeeAttachmentTemp.create(req.body).then(result => {
    res.json(result);
  });
});
router.post("/attach", function (req, res, next) {
  model.EmployeeAttachment.create(req.body).then(result => {
    res.json(result);
  });
});
router.put("/attachtemp", function (req, res, next) {
  let obj = req.body;
  model.EmployeeAttachmentTemp.update(obj, {
    where: { Filename: obj.Filename }
  }).then(result => {
    res.json(result);
  });
});
router.put("/attach", function (req, res, next) {
  let obj = req.body;
  model.EmployeeAttachment.update(obj, { where: { Id: req.body.Id } }).then(
    result => {
      res.json(result);
    }
  );
});

//edu
router.post("/edutemp", function (req, res, next) {
  model.EmployeeEduTemp.create(req.body).then(result => {
    res.json(result);
  });
});
router.post("/edu", function (req, res, next) {
  model.EmployeeEdu.create(req.body).then(result => {
    res.json(result);
  });
});
router.put("/edutemp", function (req, res, next) {
  let obj = req.body;
  model.EmployeeEduTemp.update(obj, { where: { Id: req.body.Id } }).then(
    result => {
      res.json(result);
    }
  );
});

//put on edu need to delete previous data
router.put("/edu", function (req, res, next) {
  let obj = req.body;
  model.EmployeeEdu.destroy({ where: { Id: req.body.Id } }).then(del => {
    if (del) {
      model.EmployeeEduTemp.create(obj).then(result => {
        commonFunction.sendToAdmin(req, cb => {
          res.json(result);
        });
      });
    }
  });
});

//trn
router.post("/trntemp", function (req, res, next) {
  model.EmployeeTrainingTemp.create(req.body).then(result => {
    res.json(result);
  });
});
router.post("/trn", function (req, res, next) {
  model.EmployeeTraining.create(req.body).then(result => {
    res.json(result);
  });
});
router.put("/trntemp", function (req, res, next) {
  let obj = req.body;
  model.EmployeeTrainingTemp.update(obj, { where: { Id: req.body.Id } }).then(
    result => {
      res.json(result);
    }
  );
});

//put on trn need to delete previous data
router.put("/trn", function (req, res, next) {
  let obj = req.body;
  model.EmployeeTraining.destroy({ where: { Id: req.body.Id } }).then(del => {
    if (del) {
      model.EmployeeTrainingTemp.create(obj).then(result => {
        commonFunction.sendToAdmin(req, cb => {
          res.json(result);
        });
      });
    }
  });
});

//fam
router.post("/famtemp", function (req, res, next) {
  model.EmployeeFamilyTemp.create(req.body).then(result => {
    res.json(result);
  });
});
router.post("/fam", function (req, res, next) {
  model.EmployeeFamily.create(req.body).then(result => {
    res.json(result);
  });
});
router.put("/famtemp", function (req, res, next) {
  let obj = req.body;
  model.EmployeeFamilyTemp.update(obj, { where: { Id: req.body.Id } }).then(
    result => {
      res.json(result);
    }
  );
});
//put on fam need to delete previous data
router.put("/fam", function (req, res, next) {
  let obj = req.body;
  model.EmployeeFamily.destroy({ where: { Id: req.body.Id } }).then(del => {
    if (del) {
      model.EmployeeFamilyTemp.create(obj).then(result => {
        commonFunction.sendToAdmin(req, cb => {
          res.json(result);
        });
      });
    }
  });
});

//emp
router.post("/", function (req, res, next) {
  model.Employee.create(req.body).then(result => {
    res.json(result);
  });
});
router.get("/temp/reject/:idabs", function (req, res, next) {
  if (req.params.idabs) {
    model.EmployeeTemp.findAll({
      where: {
        EmployeeID: req.params.idabs
      },
      raw: true
    }).then(emp => {
      if (emp.length == 0) {
        res.redirect(config.baseUrl + "/#/main/inbox/3");
        return;
      }

      //setting message
      let getAdmin = new Promise((resolve, reject) => {
        commonFunction.getEmployee(null, "80000000", cb => {
          resolve(cb);
        });
      });
      let getEmp = new Promise((resolve, reject) => {
        commonFunction.getEmployee(req.params.idabs, null, cb => {
          resolve(cb);
        });
      });
      let people = async () => {
        let admin = await getAdmin;
        let emp = await getEmp;
        return {
          Admin: admin[0],
          Employee: emp[0]
        };
      };

      people().then(peopleRes => {
        let objEmail = {
          Message:
            "Konfirmasi data diri " +
            peopleRes.Employee.FullName +
            " ditolak. <br/>. Mohon hubungi HC terkait.",
          Sender: "ess-app@acset.co",
          Receiver: [
            peopleRes.Admin.EmailOffice,
            peopleRes.Employee.EmailOffice
          ],
          Subject:
            "[ess-app] Perubahan Data Diri ditolak - " +
            peopleRes.Employee.FullName,
          Cc: [peopleRes.Admin.EmailPrivate, peopleRes.Employee.EmailPrivate]
        };
        commonFunction.sendEmail(objEmail, cb => {
          console.log(cb);
        });
        commonFunction.saveMessage(
          objEmail,
          peopleRes.Employee,
          peopleRes.Admin,
          cb => {
            console.log(cb);
          }
        );
        commonFunction.saveMessage(
          objEmail,
          peopleRes.Admin,
          peopleRes.Employee,
          cb => {
            console.log(cb);
          }
        );
      });

      model.EmployeeTemp.destroy({
        where: { EmployeeID: req.params.idabs }
      }).then(del => {
        if (del) {
          res.redirect(config.baseUrl + "/#/main/inbox/2");
          return;
        }
      });
    });
  } else {
    res.redirect(config.baseUrl + "/#/main/inbox/3");
    return;
  }
});
router.get("/temp/approve/:idabs", function (req, res, next) {
  if (req.params.idabs) {
    model.EmployeeTemp.findAll({
      where: {
        EmployeeID: req.params.idabs
      },
      raw: true
    }).then(emp => {
      if (emp.length == 0) {
        res.redirect(config.baseUrl + "/#/main/inbox/3");
        return;
      }
      emp = emp[0];
      delete emp.CreateBy;
      delete emp.CreateDate;
      delete emp.EmployeeID;

      //cleansing null value
      let editedObj = Object.keys(emp).reduce((newObj, key) => {
        if (emp[key] !== null) {
          newObj[key] = emp[key];
        }
        return newObj;
      }, {});

      //moving to real one
      model.Employee.update(editedObj, {
        where: { Id: req.params.idabs }
      }).then(result => {
        //setting message
        let getAdmin = new Promise((resolve, reject) => {
          commonFunction.getEmployee(null, "80000000", cb => {
            resolve(cb);
          });
        });
        let getEmp = new Promise((resolve, reject) => {
          commonFunction.getEmployee(req.params.idabs, null, cb => {
            resolve(cb);
          });
        });
        let people = async () => {
          let admin = await getAdmin;
          let emp = await getEmp;
          return {
            Admin: admin[0],
            Employee: emp[0]
          };
        };

        people().then(peopleRes => {
          let objEmail = {
            Message:
              "Konfirmasi perubahan data diri " +
              peopleRes.Employee.FullName +
              " telah disetujui.",
            Sender: "ess-app@acset.co",
            Receiver: [
              peopleRes.Admin.EmailOffice,
              peopleRes.Employee.EmailOffice
            ],
            Subject:
              "[ess-app] Perubahan Data Diri - " + peopleRes.Employee.FullName,
            Cc: [peopleRes.Admin.EmailPrivate, peopleRes.Employee.EmailPrivate]
          };
          commonFunction.sendEmail(objEmail, cb => {
            console.log(cb);
          });
          commonFunction.saveMessage(
            objEmail,
            peopleRes.Employee,
            peopleRes.Admin,
            cb => {
              console.log(cb);
            }
          );
          commonFunction.saveMessage(
            objEmail,
            peopleRes.Admin,
            peopleRes.Employee,
            cb => {
              console.log(cb);
            }
          );
        });

        //cleasing temp after approve
        model.EmployeeTemp.destroy({
          where: { EmployeeID: req.params.idabs }
        }).then(del => {
          res.redirect(config.baseUrl + "/#/main/inbox/1");
          return;
        });
      });
    });
  } else {
    res.redirect(config.baseUrl + "/#/main/inbox/3");
    return;
  }
});

router.post("/temp", function (req, res, next) {
  model.Employee.findAll({
    where: {
      Id: req.body.EmployeeID
    },
    raw: true
  }).then(emp => {
    let obj = req.body;
    let objEmp = emp[0];
    objEmp.EmployeeID = obj.EmployeeID;
    delete obj.CreateDate;
    delete obj.CreateBy;
    // model.Employee.findAll({
    //     where: {
    //         NRP: '80000000'
    //     }
    // }).then((admin) => {

    //console.log(tst)
    commonFunction.getEmployee(null, "80000000", admin => {
      //})
      let objAdmin = admin[0];
      let urlCek =
        config.baseUrl + "/#/main/reg-user/profile-main/" + objEmp.NRP;
      let urlApprove = config.apiUrl + "employee/temp/approve/" + objEmp.Id;
      let urlReject = config.apiUrl + "employee/temp/reject/" + objEmp.Id;
      let buttonCekLink =
        "<a href='" +
        urlCek +
        "' style='width: 300px; padding: 12px; cursor: pointer; box-shadow: 1px 1px 3px #000; -webkit-box-shadow: 1px 1px 3px #000; -moz-box-shadow: 1px 1px 3px #000; font-weight: bold; background: #203072; color: #fff; border-radius: 10px;text-decoration:none;font-family:verdana'>" +
        "<b>Lihat profil saat ini</b>" +
        "</a>&nbsp;<br/><br/>";
      let buttonApproveLink =
        "<a href='" +
        urlApprove +
        "' style='width: 300px; padding: 12px; cursor: pointer; box-shadow: 1px 1px 3px #000; -webkit-box-shadow: 1px 1px 3px #000; -moz-box-shadow: 1px 1px 3px #000; font-weight: bold; background: #03fc8c; color: #fff; border-radius: 10px;text-decoration:none;font-family:verdana'>" +
        "<b>Setujui</b>" +
        "</a>&nbsp;";
      let buttonRejectLink =
        "<a href='" +
        urlReject +
        "' style='width: 300px; padding: 12px; cursor: pointer; box-shadow: 1px 1px 3px #000; -webkit-box-shadow: 1px 1px 3px #000; -moz-box-shadow: 1px 1px 3px #000; font-weight: bold; background: #fc3903; color: #fff; border-radius: 10px;text-decoration:none;font-family:verdana'>" +
        "<b>Tolak perubahan</b>" +
        "</a><br/><br/>";
      let propA = "Permohonan perubahan data : <br/>";
      Object.keys(obj).forEach(key => {
        if (objEmp[key] !== obj[key]) {
          propA +=
            key +
            " : Berubah dari <b>" +
            objEmp[key] +
            "</b> menjadi <b>" +
            obj[key] +
            "</b><br/>";
        }
      });

      // let propB = "Dirubah menjadi: <br/>";
      // Object.keys(obj).forEach(key => { propB += key + " : " + obj[key] + "<br/>" });

      let signature =
        "<br/><br/>Mohon tidak membalas email ini. Email otomatis yang dikirimkan ess-app.<br/>";
      let message =
        "<b>Dh Bapak/Ibu HCD Admin,</b><br/><br/>Karyawan atas nama " +
        objEmp.FullName +
        " melakukan perubahan data diri.<br/>Mohon segera ditindaklanjut<br/><br/><br/>" +
        propA +
        "<br/><br/>" +
        buttonCekLink +
        buttonApproveLink +
        "&nbsp;&nbsp;" +
        buttonRejectLink +
        signature;

      let objEmail = {
        Message: message,
        Sender: "ess-app@acset.co",
        Receiver: [objAdmin.EmailOffice, objAdmin.EmailPrivate],
        Subject: "[ess-app] Perubahan Data Diri - " + objEmp.FullName,
        Cc: ""
      };
      commonFunction.sendEmail(objEmail, cb => {
        console.log(cb);
      });
      commonFunction.saveMessage(objEmail, objEmp, objAdmin, cb => {
        console.log(cb);
      });
    });
  });

  model.EmployeeTemp.findAll({
    where: {
      EmployeeID: req.body.EmployeeID
    },
    raw: true
  }).then(emp => {
    obj = req.body;
    if (emp.length > 0) {
      let objEmp = emp[0];
      model.EmployeeTemp.update(obj, { where: { Id: objEmp.Id } }).then(
        result => {
          res.json(result);
        }
      );
    } else {
      model.EmployeeTemp.create(obj).then(result => {
        res.json(result);
      });
    }
  });
});

router.put("/", function (req, res, next) {
  let obj = req.body;
  model.Employee.update(obj, { where: { Id: req.body.Id } }).then(result => {
    if (obj.AttendanceLocations) {
      model.EmployeeLocation.destroy({
        where: { EmployeeID: obj.AttendanceLocations[0].EmployeeID }
      });
      model.EmployeeLocation.bulkCreate(obj.AttendanceLocations);
    }
    model.Employee.findAll({
      where: {
        Id: req.body.Id
      },
      raw: true
    }).then(emp => {
      let objEmp = emp[0];
      model.Employee.findAll({
        where: {
          NRP: "80000000"
        }
      }).then(admin => {
        let objAdmin = admin[0];
        let url =
          config.baseUrl + "/#/main/reg-user/profile-main/" + objEmp.NRP;
        let buttonLink =
          "<a href='" +
          url +
          "' style='width: 300px; padding: 12px; cursor: pointer; box-shadow: 1px 1px 3px #000; -webkit-box-shadow: 1px 1px 3px #000; -moz-box-shadow: 1px 1px 3px #000; font-weight: bold; background: #203072; color: #fff; border-radius: 10px;text-decoration:none;font-family:verdana'>" +
          "<b>Cek Sekarang</b>" +
          "</a><br/><br/>";
        let propA = "Perubahan data awal: <br/>";
        Object.keys(obj).forEach(key => {
          propA += key + " : " + objEmp[key] + "<br/>";
        });

        let propB = "Perubahan data awal: <br/>";
        Object.keys(obj).forEach(key => {
          propB += key + " : " + obj[key] + "<br/>";
        });

        let signature =
          "<br/><br/>Mohon tidak membalas email ini. Email otomatis yang dikirimkan ess-app.<br/>";
        let message =
          "<b>Dh Bapak/Ibu HCD Admin,</b><br/><br/>Karyawan atas nama " +
          objEmp.FullName +
          " melakukan perubahan data diri.<br/>Mohon segera ditindaklanjut<br/><br/><br/>" +
          propA +
          "<br/>" +
          propB +
          "<br/>" +
          buttonLink +
          signature;

        let objEmail = {
          Message: message,
          Sender: "ess-app@acset.co",
          Receiver: [objAdmin.EmailOffice, objAdmin.EmailPrivate],
          Subject: "[ess-app] Perubahan Data Diri - " + objEmp.FullName,
          Cc: ""
        };
        commonFunction.sendEmail(objEmail, cb => {
          console.log(cb);
        });
        commonFunction.saveMessage(objEmail, objEmp, objAdmin, cb => {
          console.log(cb);
        });
      });
    });
    res.json(result);
  });
});

router.post("/quickprofile", function (req, res, next) {
  model.uv_EmployeeQuickProfile
    .findAll({
      where: req.body,
      include: [
        {
          model: model.uv_EmployeeLocations,
          as: "AttendanceLocations",
          attributes: ["EmployeeID", "LocationID", "LocationName"],
          where: req.body,
          required: false
        }
      ]
    })
    .then(result => {
      res.json(result);
    });
});
router.post("/quickprofile-simple", function (req, res, next) {
  model.uv_EmployeeQuickProfile
    .findAll({
      where: req.body,
      attributes: ["FullName", "EmployeeId", "Username"]
    })
    .then(result => {
      res.json(result);
    });
});
router.post("/quickprofile/:page/:pagesize", function (req, res, next) {
  page = +req.params.page;
  pagesize = +req.params.pagesize;
  model.uv_EmployeeQuickProfile
    .findAll({ pagesize, page, where: req.body })
    .then(result => {
      res.json(result);
    });
});

router.post("/approvechange/:type/:nrp", function (req, res, next) {
  model.Employee.findAll({
    where: { NRP: req.params.nrp },
    include: [
      {
        model: model.EmployeeTemp,
        where: { RowStatus: 1 },
        required: false,
        attributes: { exclude: ["Id"] }
      },
      {
        model: model.EmployeeTrainingTemp,
        where: { RowStatus: 1 },
        required: false,
        attributes: { exclude: ["Id"] }
      },
      {
        model: model.EmployeeFamilyTemp,
        where: { RowStatus: 1 },
        required: false,
        attributes: { exclude: ["Id"] }
      },
      {
        model: model.EmployeeEduTemp,
        where: { RowStatus: 1 },
        required: false,
        attributes: { exclude: ["Id"] }
      },
      {
        model: model.EmployeeAttachmentTemp,
        where: { RowStatus: 1 },
        required: false,
        attributes: { exclude: ["Id"] }
      },
      {
        model: model.EmployeeTraining,
        where: { RowStatus: 1 },
        required: false
      },
      { model: model.EmployeeFamily, where: { RowStatus: 1 }, required: false },
      { model: model.EmployeeEdu, where: { RowStatus: 1 }, required: false },
      {
        model: model.EmployeeAttachment,
        where: { RowStatus: 1 },
        required: false
      }
    ]
  }).then(emp => {
    let objEmp = emp[0];
    if (req.params.type === "fam" && objEmp.EmployeeFamilyTemps.length) {
      let convertObj = JSON.parse(JSON.stringify(objEmp.EmployeeFamilyTemps));
      model.EmployeeFamily.bulkCreate(convertObj, { returning: true }).then(
        bulk => {
          if (bulk.length) {
            model.EmployeeFamilyTemp.destroy({
              where: { EmployeeID: objEmp.Id }
            }).then(del => {
              res.json({ message: true });
            });
          }
        }
      );
    } else if (req.params.type === "edu" && objEmp.EmployeeEduTemps.length) {
      let convertObj = JSON.parse(JSON.stringify(objEmp.EmployeeEduTemps));
      model.EmployeeEdu.bulkCreate(convertObj, { returning: true }).then(
        bulk => {
          if (bulk.length) {
            model.EmployeeEduTemp.destroy({
              where: { EmployeeID: objEmp.Id }
            }).then(del => {
              res.json({ message: true });
            });
          }
        }
      );
    } else if (
      req.params.type === "trn" &&
      objEmp.EmployeeTrainingTemps.length
    ) {
      let convertObj = JSON.parse(JSON.stringify(objEmp.EmployeeTrainingTemps));
      model.EmployeeTraining.bulkCreate(convertObj, { returning: true }).then(
        bulk => {
          if (bulk.length) {
            model.EmployeeTrainingTemp.destroy({
              where: { EmployeeID: objEmp.Id }
            }).then(del => {
              res.json({ message: true });
            });
          }
        }
      );
    } else {
      res.json({ message: true });
    }
  });
});

router.post("/rejectchange/:type/:nrp", function (req, res, next) {
  model.Employee.findAll({
    where: { NRP: req.params.nrp }
  }).then(emp => {
    let objEmp = emp[0];
    if (req.params.type === "fam") {
      model.EmployeeFamilyTemp.destroy({
        where: { EmployeeID: objEmp.Id }
      }).then(del => {
        res.json({ message: true });
      });
    }
    if (req.params.type === "edu") {
      model.EmployeeEduTemp.destroy({ where: { EmployeeID: objEmp.Id } }).then(
        del => {
          res.json({ message: true });
        }
      );
    }
    if (req.params.type === "trn") {
      model.EmployeeTrainingTemp.destroy({
        where: { EmployeeID: objEmp.Id }
      }).then(del => {
        res.json({ message: true });
      });
    }
  });
  // model.EmployeeFamilyTemp.update(obj, { where: { Id: req.body.Id } }).then((result) => {
  //     res.json(result);
  // })
  // Model.destroy({
  //     where: {
  //         // criteria
  //     }
  // })
});

router.post("/deletefile/:nrp", function (req, res, next) {
  const fs = require("fs");
  let directoryEmployee = config.folderImageProfile + req.params.nrp + "\\";
  try {
    fs.unlinkSync(directoryEmployee + req.body.filename);
    res.status(200).send({ message: req.body.filename + " deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send(null);
  }
});

router.post("/upload/:nrp", function (req, res, next) {
  if (req.params.nrp) {
    if (!req.files) return res.status(400).send("No files were uploaded.");
    const uuidv1 = require("uuid/v1");
    let directoryEmployee = config.folderImageProfile + req.params.nrp + "\\";
    if (req.files.image) {
      try {
        var fs = require("fs");
        if (!fs.existsSync(directoryEmployee)) {
          fs.mkdirSync(directoryEmployee);
        }
        let myfile = req.files.image;
        let ftype = myfile.mimetype.split("/")[1];
        myfile.name = uuidv1() + "." + ftype;

        myfile.mv(directoryEmployee + myfile.name, function (err) {
          if (err) return res.status(500).send(err);
          res.status(200).send({ filename: myfile.name });
        });
      } catch (e) {
        res.status(500).send({ filename: e });
      }
    }

    if (req.files.attach) {
      try {
        let fs = require("fs");
        if (!fs.existsSync(directoryEmployee)) {
          fs.mkdirSync(directoryEmployee);
        }
        let myfile = req.files.attach;
        let ftype = myfile.mimetype.split("/")[1];
        let originalName = myfile.name;
        myfile.name = uuidv1() + "." + ftype;

        myfile.mv(directoryEmployee + myfile.name, function (err) {
          if (err) return res.status(500).send(err);
          res
            .status(200)
            .send({ filename: myfile.name, systemname: originalName });
        });
      } catch (e) {
        res.status(500).send({ filename: e });
      }
    }
  }
});

router.post("/sentmail/", function (req, res, next) {
  if (req.body) {
    var messagemail = req.body;
    var email = require("emailjs");
    var server = email.server.connect({
      user: "notification-master@acset.co",
      port: 587,
      password: "Vfr45tgB$%",
      host: "mail.acset.co",
      tls: true
    });

    // send the message and get a callback with an error or details of the message that was sent
    server.send(
      {
        text: messagemail.MessageBody,
        from: messagemail.MessageFrom,
        to: messagemail.MessageTo,
        subject: messagemail.MessageSubject,
        cc: messagemail.MessageCc,
        attachment: [{ data: messagemail.MessageBody, alternative: true }]
      },
      function (err, message) {
        //console.log(err || message);
        // if (err) { res.json(err); }
        // else { res.json(message); }
        res.json(err || message);
      }
    );
  }
});
module.exports = router;
