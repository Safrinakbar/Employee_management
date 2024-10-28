import mongoose from "mongoose";
import { Schema } from "mongoose";

const employeeSchema = new mongoose.Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        password:{
            type: String,
            required: true,
        },
        employeeId: {
            type: String,
            unique: true
        },
        dob: {
            type: Date
        },
        gender: {
            type: String
        },
        maritalStatus: {
            type: String
        },
        designation: {
            type: String
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: "Department",
            required: true
        },
        salary: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            enum: ['admin', 'employee'],
            required: true
        },
        image: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    });

const Employee = mongoose.model("employee", employeeSchema);
export default Employee;
