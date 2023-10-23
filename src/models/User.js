const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String,required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true},
    password: { type: String, required: true, trim: true}
}, {
    timestamps: true
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // asyncronous call, wait till it end and conitune thread
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password); // compare db value and function parameter
};

module.exports =  model('User', UserSchema);