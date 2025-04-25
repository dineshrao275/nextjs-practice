import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profilePicture: {
        type: String,
        default: 'default.jpg',
    },
    bio: {
        type: String,
        default: '',
    },
    socialLinks: {
        facebook: {
            type: String,
            default: '',
        },
        twitter: {
            type: String,
            default: '',
        },
        instagram: {
            type: String,
            default: '',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
let User = mongoose.model('User', UserSchema);
export default User;