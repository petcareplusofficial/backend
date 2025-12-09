import mongoose from "mongoose";

// this will be temporarely to create a user model so
// we can have a table to initialize the database

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  profileImage: {
    data: Buffer,
    contentType: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("User", UserSchema);

class User {
  constructor(email, password, name, location, profileImage = null) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.location = location;
    this.profileImage = profileImage;
  }

  async save() {
    const user = new UserModel(this);
    await user.save();
  }
  static async getAll() {
    return UserModel.find();
  }
  static async getById(id) {
    return UserModel.findOne({
      _id: id,
      isDeleted: false,
    });
  }
  async login() {
    let user = await UserModel.findOne({
      email: this.email,
      password: this.password,
      isDeleted: false,
    }).lean();
    return user;
  }

  static async updateUserImage(id, image) {
    await UserModel.findByIdAndUpdate(id, { profileImage: image });
  }

  static async softDelete(id) {
    await UserModel.findByIdAndUpdate(id, { isDeleted: true });
  }
  async UpdateById(id) {
    await UserModel.findByIdAndUpdate(id, this);
  }
}

export { User };
