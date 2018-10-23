const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Delete any empty fields
function deleteEmpty(e) {
  if (e === null) {
    return undefined;
  }
  return e;
}

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  technology: [
    {
      techName: { type: String, required: true },
      level: { type: String, required: true },
      description: { type: String }
    }
  ],
  bio: {
    type: String,
    set: deleteEmpty
  },
  experience: [
    {
      title: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String },
      from: { type: Date, required: true },
      to: { type: Date },
      current: { type: Boolean, default: false },
      description: { type: String }
    }
  ],
  education: [
    {
      fieldOfStudy: { type: String, required: true },
      school: { type: String, required: true },
      certification: { type: String, required: true },
      from: { type: Date, required: true },
      to: { type: Date },
      current: { type: Boolean, default: false },
      description: { type: String }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = profile = mongoose.model("profile", ProfileSchema);
