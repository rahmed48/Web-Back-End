const Users = require("../models/Users");
const Materi = require("../models/Materi");
const Sub = require("../models/Sub");
const Uji = require("../models/Uji");
const Latihan = require("../models/Latihan");
const bcrypt = require("bcrypt");

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user == null || req.session.user == undefined) {
        res.render("index", {
          alert,
          title: "MTK App | Login",
        });
      } else {
        res.redirect("/admin/dashboard");
      }
    } catch (error) {
      res.redirect("/admin/signin");
    }
  },
  actionSignin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Users.findOne({ username: username });
      if (!user) {
        req.flash("alertMessage", "User yang anda masukan tidak ada!!");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        req.flash("alertMessage", "Password yang anda masukan tidak cocok!!");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      }
      const status = await Users.findOne({ username: username });
      status.status = "Aktif";
      await status.save();

      req.session.user = {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        status: user.status,
      };
      // const role = user.status
      // console.log(role);
      res.redirect("/admin/dashboard");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/signin");
    }
  },

  actionLogout: async (req, res) => {
    try {
      const { id } = req.body;
      const status = await Users.findOne({ _id: id });
      status.status = "Non Aktif";
      await status.save();
      req.session.destroy();
      res.redirect("/admin/signin");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/dashboard");
    }
  },

  viewMateri: async (req, res) => {
    try {
      const sub = await Sub.find().populate({
        path: "materiId",
        select: "title",
      });
      const materi = await Materi.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/materi/view_materi", {
        title: "MTK App | Materi",
        sub,
        materi,
        users: req.session.user,
        alert,
      });
      console.log(sub);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/materi");
    }
  },

  addMateri: async (req, res) => {
    try {
      const { judul, isi, materiId } = req.body;
      const materi = await Materi.findOne({ _id: materiId });
      const newSub = { judul, isi, materiId };

      const sub = await Sub.create(newSub);

      materi.subMateriId.push({ _id: sub._id });
      await materi.save();
      await sub.save();
      req.flash("alertMessage", "Success Add Materi");
      req.flash("alertStatus", "success");
      res.redirect("/admin/materi");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/materi");
    }
  },

  deleteMateri: async (req, res) => {
    try {
      const { id } = req.params;
      const materi = await Sub.findOne({ _id: id });
      await materi.remove();
      req.flash("alertMessage", "Success Delete Materi");
      req.flash("alertStatus", "success");
      res.redirect("/admin/materi");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/materi");
    }
  },
  viewLatihan: async (req, res) => {
    try {
      const latihan = await Latihan.find().populate({
        path: "materiId",
        select: "title",
      });
      const materi = await Materi.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/latihan/view_latihan", {
        title: "MTK App | Latihan",
        latihan,
        materi,
        users: req.session.user,
        alert,
      });
      console.log(sub);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/latihan");
    }
  },
  addLatihan: async (req, res) => {
    try {
      const { judul, isi, materiId } = req.body;
      const materi = await Materi.findOne({ _id: materiId });
      const newLatihan = { judul, isi, materiId };

      const latihan = await Latihan.create(newLatihan);

      materi.latihanId.push({ _id: latihan._id });
      await materi.save();
      await latihan.save();
      req.flash("alertMessage", "Success Add Latihan");
      req.flash("alertStatus", "success");
      res.redirect("/admin/latihan");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/latihan");
    }
  },
  deleteLatihan: async (req, res) => {
    try {
      const { id } = req.params;
      const latihan = await Latihan.findOne({ _id: id });
      await latihan.remove();
      req.flash("alertMessage", "Success Delete Latihan");
      req.flash("alertStatus", "success");
      res.redirect("/admin/latihan");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/latihan");
    }
  },

  viewQuiz: async (req, res) => {
    try {
      const quiz = await Uji.find().populate({
        path: "materiId",
        select: "title",
      });
      const materi = await Materi.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/quiz/view_quiz", {
        title: "MTK App | Quiz",
        quiz,
        materi,
        users: req.session.user,
        alert,
      });
      console.log(sub);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/quiz");
    }
  },
  addQuiz: async (req, res) => {
    try {
      const { materiId, question, a, b, c, d, correct_option } = req.body;
      const materi = await Materi.findOne({ _id: materiId });
      const newQuiz = {
        materiId,
        question,
        options: [a, b, c, d],
        correct_option,
      };

      const quiz = await Uji.create(newQuiz);

      materi.ujiId.push({ _id: quiz._id });
      await materi.save();
      await quiz.save();
      req.flash("alertMessage", "Success Add Quiz");
      req.flash("alertStatus", "success");
      res.redirect("/admin/quiz");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/quiz");
    }
  },

  deleteQuiz: async (req, res) => {
    try {
      const { id } = req.params;
      const quiz = await Uji.findOne({ _id: id });
      await quiz.remove();
      req.flash("alertMessage", "Success Delete Quiz");
      req.flash("alertStatus", "success");
      res.redirect("/admin/quiz");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/quiz");
    }
  },

  viewDashboard: async (req, res) => {
    try {
      res.render("admin/dashboard/view_dashboard", {
        title: "MTK App | Dashboard",
        users: req.session.user,
      });
    } catch (error) {
      res.redirect("/admin/dashboard");
    }
  },
  //  <---------- MODULE USER ---------->
  viewUser: async (req, res) => {
    try {
      const user = await Users.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      console.log(user);
      res.render("admin/user/view_user", {
        title: "My Menu | Toko",
        alert,
        user,
        users: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/user");
    }
  },
  addUser: async (req, res) => {
    try {
      const { name, role, username, password } = req.body;
      await Users.create({ name, role, username, password });
      req.flash("alertMessage", "Success Add User");
      req.flash("alertStatus", "success");
      res.redirect("/admin/user");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/user");
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Users.findOne({ _id: id });
      await user.remove();
      req.flash("alertMessage", "Success Delete User");
      req.flash("alertStatus", "success");
      res.redirect("/admin/user");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/user");
    }
  },
};
