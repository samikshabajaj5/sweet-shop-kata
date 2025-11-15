import bcrypt from "bcrypt";
import db from "../src/utils/db";
import User from "../src/models/User";
import Sweet from "../src/models/Sweet";

const seed = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Reset all tables
    await db.sync({ force: true });
    console.log("🗑️ Database synced (force: true)");

    // not hasing here cause it is automatically handled on user creation
    const passwordHash = "password123";

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

    // ------------------------------------
    // 🍬 SWEETS (with images)
    // ------------------------------------
    const sweets = await Sweet.bulkCreate([
      {
        name: "Kaju Katli",
        category: "Indian Sweet",
        price: 350,
        quantity: 25,
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE92biGUAKzkJo3vEdCUMJpO_m7v4mxAth1cTXynDBXIzd7VFw2Yp7zWkqbMETS3gLNr6k8YJEykMl1v_o144XlP5TqgbYKBr7XhDTAIpRBA&s=10",
      },
      {
        name: "Gulab Jamun",
        category: "Indian Sweet",
        price: 250,
        quantity: 40,
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxEVosxGWAyCiuczLtN2lU5qIbx-l_OjlxItk5h6ooZOEOoBHc6UACnFFnWQ4PtRuQ19B3U97vv23RqIm33S-wgR7lf25eEITjNjAtc9W6&s=10",
      },
      {
        name: "Rasgulla",
        category: "Indian Sweet",
        price: 220,
        quantity: 35,
        imageUrl:
          "https://www.vegrecipesofindia.com/wp-content/uploads/2014/06/rasgulla-recipe-1.jpg",
      },
      {
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 2.5,
        quantity: 30,
        imageUrl:
          "https://images.unsplash.com/photo-1606313564200-fd6ed2d46a9f?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Dark Chocolate Truffle",
        category: "Chocolate",
        price: 4.5,
        quantity: 15,
        imageUrl:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Gummy Bears",
        category: "Candy",
        price: 1.2,
        quantity: 60,
        imageUrl:
          "https://images.unsplash.com/photo-1582053434052-5e5b59d205b5?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Sour Worms",
        category: "Candy",
        price: 1.0,
        quantity: 80,
        imageUrl:
          "https://images.unsplash.com/photo-1622485154370-6ac613046359?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Caramel Fudge",
        category: "Caramel",
        price: 3.0,
        quantity: 20,
        imageUrl:
          "https://images.unsplash.com/photo-1526080676457-4544bf0f58a8?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Milk Cake",
        category: "Indian Sweet",
        price: 280,
        quantity: 30,
        imageUrl:
          "https://www.cookwithmanali.com/wp-content/uploads/2019/10/Milk-Cake-Indian-Sweet.jpg",
      },
      {
        name: "Lollipop",
        category: "Candy",
        price: 0.8,
        quantity: 120,
        imageUrl:
          "https://images.unsplash.com/photo-1580910051074-7a30c5f708d1?auto=format&fit=crop&w=600&q=80",
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
