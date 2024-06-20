import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  count: Number,
});

const Counter = mongoose.model("Counter", counterSchema);

export async function getCount() {
  const result = await Counter.find();
  if (result.length > 0) {
    return result[0].count;
  } else {
    return 0;
  }
}

export async function updateCount() {
  const count = await getCount();

  let doc = await Counter.findOne();

  if (doc) {
    doc.count = count + 1;
    await doc.save();
    return count + 1;
  } else {
    doc = new Counter({ count: count + 1 });
    await doc.save();
    return count + 1;
  }
}
