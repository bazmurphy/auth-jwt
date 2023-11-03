import { Request, Response } from "express";
import { database } from "../database/database";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const findUsers = await database.query(`SELECT * FROM users`);
    // console.log("getUsers > findUsers", findUsers);
    const users = findUsers.rows;
    // console.log("getUsers > users", users);
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
