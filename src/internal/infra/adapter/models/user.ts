import mongoose from 'mongoose'
import {IUser} from "../../../domain/entity/users";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'This field is necessary'],
        trim: true,
        minLength: [6, 'The username must be at least 6 characters'],
        maxLength: 128,
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'This field is necessary'],
        trim: true,
        maxLength: 256,
    },
    lastname: {
        type: String,
        required: [true, 'This field is necessary'],
        trim: true,
        maxLength: 256,
    },
    email: {
        type: String,
        required: [true, 'This field is necessary'],
        trim: true,
        maxLength: 256,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'This field is necessary'],
        trim: true,
        minLength: [6, 'The password must be at least 6 characters'],
        maxLength: 256,
    },
},
    {
        timestamps: true,
    }
)

export function ModelToUser(user: mongoose.Document): IUser {
    const modelUser = user.toObject();
    return {
        id: modelUser._id,
        username: modelUser.username,
        name: modelUser.name,
        lastname: modelUser.lastname,
        email: modelUser.email,
        password: modelUser.password,
        createdAt:modelUser.createdAt,
        updatedAt:modelUser.updatedAt
    };
}

export const UserModel = mongoose.model('User', userSchema)
