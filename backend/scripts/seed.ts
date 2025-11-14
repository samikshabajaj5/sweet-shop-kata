import bcrypt from "bcrypt";
import db from "../src/utils/db";
import User from "../src/models/User";
import Sweet from "../src/models/Sweet";

const seed = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Reset tables
    await db.sync({ force: true });
    console.log("🗑️ Database synced (force: true)");

    // -------------------------------
    // 👤 Create Users
    // -------------------------------
    const passwordHash = await bcrypt.hash("password123", 10);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: passwordHash,
      role: "admin",
    });

    const user1 = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: passwordHash,
      role: "user",
    });

    const user2 = await User.create({
      name: "Jane Smith",
      email: "jane@example.com",
      password: passwordHash,
      role: "user",
    });

    console.log("👤 Created users:", admin.email, user1.email, user2.email);

    // -------------------------------
    // 🍬 Create Sweets
    // -------------------------------
    const sweets = await Sweet.bulkCreate([
      {
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 2.5,
        quantity: 30,
      },
      {
        name: "Gummy Bears",
        category: "Candy",
        price: 1.2,
        quantity: 50,
      },
      {
        name: "Lollipop",
        category: "Candy",
        price: 0.8,
        quantity: 100,
      },
      {
        name: "Caramel Fudge",
        category: "Caramel",
        price: 3.0,
        quantity: 15,
      },
      {
        name: "Dark Chocolate Truffle",
        category: "Chocolate",
        price: 4.5,
        quantity: 10,
      },
      {
        name: "Sour Worms",
        category: "Candy",
        price: 1.0,
        quantity: 60,
      },
    ]);

    console.log("🍬 Created sweets:", sweets.length);

    console.log("✅ Seeding completed.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seed();
