// src/lib/db.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // Atur lokasi database Anda
});

export default sequelize;