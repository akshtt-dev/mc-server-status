import mongoose from 'mongoose';

const serverSchema = new mongoose.Schema({
    serverIp: String,
    id: Number
});

const serverList = mongoose.model('serverList', serverSchema);

export default serverList;