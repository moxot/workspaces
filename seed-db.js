const mongoose = require('mongoose');
const argon2 = require('argon2');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    login: String,
    password: String,
  },
  { collection: 'users' },
);

const workspaceSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
  },
  { collection: 'workspaces' },
);

const messageSchema = new Schema(
  {
    date: Date,
    likes: { type: Number, default: 0 },
    content: String,
    workspace: { type: Schema.Types.ObjectId, ref: 'Workspace' },
  },
  { collection: 'messages' },
);

const User = mongoose.model('User', userSchema);
const Workspace = mongoose.model('Workspace', workspaceSchema);
const Message = mongoose.model('Message', messageSchema);

async function seedDatabase() {
  try {
    mongoose.connect('mongodb://user:password@localhost:27017/workspaces?authSource=admin');
    // Create a User
    const user = await User.create({ name: 'John Doe', login: 'john', password: await argon2.hash('secret') });

    // Create a few Workspaces for the User
    const workspaceNames = ['Workspace 1', 'Workspace 2'];
    const workspaces = await Promise.all(
      workspaceNames.map((name) => Workspace.create({ user: user._id, name })),
    );

    // Create Messages for each Workspace
    for (const workspace of workspaces) {
      await Message.create([
        { content: 'Hello World!', date: new Date(), workspace: workspace._id },
        { content: 'Another message.', date: new Date(), workspace: workspace._id },
      ]);
    }

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
