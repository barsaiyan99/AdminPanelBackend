import asyncHandler from "express-async-handler";
import User from "../models/userSchema.js";
import Invoice from "../models/invoiceSchema.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ status: false, message: "User already exists" });
    return;
  }

  const user = await User.create({ username, email, password });

  if (user) {
    res.status(201).json({
      status: true,
      message: "User created successfully",
    });
  } else {
    res.status(400).json({ status: false, message: "Invalid user data" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user);

    res.json({
      data: { token },
      status: true,
      message: "Successful login",
    });
  } else {
    res
      .status(401)
      .json({ status: false, message: "Invalid Email or Password" });
  }
});

const verifyUser = asyncHandler((req, res) => {
  return res.json({ status: true, message: "authorized" });
});

const createInvoice = asyncHandler(async (req, res) => {
  const {
    invoiceNumber,
    status,
    to,
    from,
    items,
    shipping,
    discount,
    taxes,
    dueDate,
    dateCreated,
    totalAmount,
  } = req.body;
  console.log(
    invoiceNumber,
    status,
    to,
    from,
    items,
    shipping,
    discount,
    taxes,
    dueDate,
    dateCreated,
    totalAmount
  );
  const invoice = await Invoice.create({
    invoiceNumber,
    status,
    to,
    from,
    items,
    shipping,
    discount,
    taxes,
    dueDate,
    dateCreated,
    totalAmount,
  });
  if (invoice) {
    res
      .status(201)
      .json({ message: "Invoice created successfully", data: invoice });
  } else {
    res.status(500).json({ message: "Error creating invoice", error });
  }
});
const getList = asyncHandler(async (req, res) => {
  try {
    const invoices = await Invoice.find({});
    console.log(invoices);

    res.status(200).json(invoices);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching invoices", error: error.message });
  }
});

const editList = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const invoice = await Invoice.findById(id);
    console.log(invoice);

    res.status(200).json(invoice);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching invoices", error: error.message });
  }
});
const editForm = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    invoiceNumber,
    status,
    to,
    from,
    items,
    shipping,
    discount,
    taxes,
    dueDate,
    dateCreated,
    totalAmount,
  } = req.body;

  
  const invoice = await Invoice.findById(id);

  if (!invoice) {
    res.status(404);
    throw new Error('Invoice not found');
  }
  invoice.invoiceNumber = invoiceNumber || invoice.invoiceNumber;
  invoice.status = status || invoice.status;
  invoice.to = to || invoice.to;
  invoice.from = from || invoice.from;
  invoice.items = items || invoice.items;
  invoice.shipping = shipping || invoice.shipping;
  invoice.discount = discount || invoice.discount;
  invoice.taxes = taxes || invoice.taxes;
  invoice.dueDate = dueDate || invoice.dueDate;
  invoice.dateCreated = dateCreated || invoice.dateCreated;
  invoice.totalAmount = totalAmount || invoice.totalAmount;
  const updatedInvoice = await invoice.save();

  res.status(200).json("success");
});
const deleteList = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }
    const result = await Invoice.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    console.log(`Invoice with ID ${id} deleted`);
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ message: 'Error deleting invoice', error: error.message });
  }
});
const checkUserEmail = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: false, message: "email not exists" });
    }
    return res.json({ status: true, uid: user._id });
  } catch (err) {
    return res.json(err);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { password } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.json({ status: false, message: "user not exists" });
    }
    const newhashpassword = await bcrypt.hash(password, 10);
    user.password = newhashpassword;
    await user.save();
    return res.json({ status: true, message: "password updated successfully" });
  } catch (err) {
    return res.json(err);
  }
});

export {
  registerUser,
  loginUser,
  resetPassword,
  checkUserEmail,
  verifyUser,
  createInvoice,
  getList,
  editList,
  editForm,
  deleteList,
};
