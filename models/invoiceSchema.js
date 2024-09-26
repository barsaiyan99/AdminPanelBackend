import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true },
  dueDate: { type: Date, required: true },
  dateCreated: { type: Date, default: Date.now }, 
  status: {
    type: String,
    required: true,
    enum: ["pending", "paid", "overdue", "draft"],
  },
  from: {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
  },
  to: {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
  },
  items: [
    {
      itemName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      description: { type: String, required: true },
    },
  ],
  shipping: {
    cost: { type: Number, default: 0 },  
  },
  discount: {
    amount: { type: Number, default: 0 }, 
  },
  taxes: {
    amount: { type: Number, default: 0 }, 
  },
  
  totalAmount:{
    type:Number,
  }
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);
export default Invoice;