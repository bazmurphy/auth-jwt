import { Request, Response } from "express";
import { database } from "../database/database";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const findUsers = await database.query(`SELECT * FROM users`);
    const users = findUsers.rows;
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
