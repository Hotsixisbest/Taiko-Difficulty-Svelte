import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('./src/lib/module/db/main.db');