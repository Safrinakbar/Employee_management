import mongoose from "mongoose";
import { Schema } from "mongoose";

const salarySchema = new Schema({
    employeeId:{
        type:Schema.Types.ObjectId,
        ref:"employee",
        required:true,
    },
    basicSalary:{
        type:Number,
        required:true
    },
    allowances:{
        type:Number,
    },
    deduction:{
        type:Number,
    },
    netSalary:{
        type:Number,
    },
    payDate:{
        type:Date,
        require:true,
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default: Date.now
    },
});

const Salary = mongoose.model("Salary",salarySchema);
export default Salary;
