const Workers = require("../models/workers");
const Groups = require("../models/groups");
const Children = require("../models/children");
const Admins = require("../models/admin");
const ChildrenOrder = require('../models/childrenOrder')

// Dashboard Pages and Events

// Home Pages and Events
const createWorker = async (req, res) => {
  try {
    const { groups } = req.body;
    const workers = new Workers({ ...req.body });
    await workers.save();

    await Groups.findByIdAndUpdate(groups, { $push: { teacher: workers._id } });

    res.redirect("/workers");
  } catch (error) {
    console.log(error);
  }
};
const deleteWorker = async (req, res) => {
  try {
    await Workers.findByIdAndDelete(req.params.id);
    res.redirect("/workers");
  } catch (error) {
    console.log(error);
  }
};
const updateWorker = async (req, res) => {
  try {
    await Workers.findByIdAndUpdate(req.params.id, { ...req.body });
    await Groups.findByIdAndUpdate(req.body.groups, {
      $push: { teacher: req.params.id },
    });
    res.redirect("/workers");
  } catch (error) {
    console.log(error);
  }
};

// Groups Pages and Events
// children CRUD
const createChildren = async (req, res) => {
  try {
    const { groups } = req.body;
    const children = new Children({ ...req.body });
    await children.save();

    await Groups.findByIdAndUpdate(groups, {
      $push: { children: children._id },
    });

    res.redirect("/groups");
  } catch (error) {
    console.log(error);
  }
};
const deleteChildren = async (req, res) => {
  try {
    await Children.findByIdAndDelete(req.params.id);
    res.redirect("/groups");
  } catch (error) {
    console.log(error);
  }
};
const updateChildren = async (req, res) => {
  try {
    await Children.findByIdAndUpdate(req.params.id, { ...req.body });
    await Groups.findByIdAndUpdate(req.body.groups, {
      $push: { children: req.params.id },
    });
    res.redirect("/groups");
  } catch (error) {
    console.log(error);
  }
};

// settings Pages and Events
const createGroup = async (req, res) => {
  try {
    await Groups.create({ ...req.body });
    res.redirect("/settings");
  } catch (error) {
    console.log(error);
  }
};
const deleteGroup = async (req, res) => {
  try {
    await Groups.findByIdAndDelete(req.params.id);
    res.redirect("/settings");
  } catch (error) {
    console.log(error);
  }
};
const updateGroup = async (req, res) => {
  try {
    await Groups.findByIdAndUpdate(req.params.id, { ...req.body });
    res.redirect("/settings");
  } catch (error) {
    console.log(error);
  }
};

// Admins Pages and Events
const createAdmin = async (req, res) => {
  try {
    await Admins.create({ ...req.body });
    res.redirect("/admins");
  } catch (error) {
    console.log(error);
  }
};
const deleteAdmin = async (req, res) => {
  try {
    await Admins.findByIdAndDelete(req.params.id);
    res.redirect("/admins");
  } catch (error) {
    console.log(error);
  }
};
const updateAdmin = async (req, res) => {
  try {
    await Admins.findByIdAndUpdate(req.params.id, { ...req.body });
    res.redirect("/admins");
  } catch (error) {
    console.log(error);
  }
};

// ordering of children
const childrenCreateOrder = async (req, res) => {
  try {
    const { groups } = req.body;
    const children = new Children({ ...req.body });
    await children.save();

    await Groups.findByIdAndUpdate(groups, {
      $push: { children: children._id },
    });

    await ChildrenOrder.findByIdAndDelete(req.params.id);

    res.redirect("/order/table");
  } catch (error) {
    console.log(error);
  }
};
const deleteOrder = async (req, res) => {
  try {
    await ChildrenOrder.findByIdAndDelete(req.params.id);
    res.redirect("/order/table");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createWorker,
  deleteWorker,
  updateWorker,

  createChildren,
  updateChildren,
  deleteChildren,

  createGroup,
  updateGroup,
  deleteGroup,

  createAdmin,
  updateAdmin,
  deleteAdmin,

  childrenCreateOrder,
  deleteOrder
};
