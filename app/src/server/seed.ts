import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { hashSync } from 'bcryptjs';
import * as schema from './schema';

const sqlite = new Database('./database.sqlite');
const db = drizzle(sqlite, { schema });

function seed() {
  console.log('Seeding database...');

  // Create tables if they don't exist
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at INTEGER DEFAULT (unixepoch())
    );
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at INTEGER DEFAULT (unixepoch())
    );
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      guests INTEGER NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      requests TEXT,
      seating TEXT NOT NULL,
      created_at INTEGER DEFAULT (unixepoch())
    );
  `);

  // Check if admin exists
  const adminRow = sqlite.prepare("SELECT * FROM users WHERE email = ?").get('admin@lejardin.com');
  if (!adminRow) {
    const passwordHash = hashSync('admin123', 12);
    sqlite.prepare(
      "INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)"
    ).run('admin', 'admin@lejardin.com', passwordHash, 'admin');
    console.log('Admin user created: admin@lejardin.com / admin123');
  }

  // Check if sample contacts exist
  const contactsCount = sqlite.prepare("SELECT COUNT(*) as count FROM contacts").get() as { count: number };
  if (contactsCount.count === 0) {
    sqlite.prepare(
      "INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)"
    ).run(
      'Jane Doe',
      'jane@example.com',
      '(514) 555-0123',
      'General Inquiry',
      'I would love to book a table for 6 people next Friday evening. Do you have availability around 7:30 PM? Also, do you accommodate gluten-free dietary restrictions?'
    );
    sqlite.prepare(
      "INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)"
    ).run(
      'Robert Smith',
      'robert@example.com',
      '',
      'Private Event',
      'We are planning a corporate dinner for about 25 people in December. Could you please send me information about your private dining options and customized menus?'
    );
    console.log('Sample contact submissions created');
  }

  console.log('Seeding complete!');
}

seed();
