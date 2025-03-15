import { prisma } from "@repo/db/client";
import axios from "axios";
import { Key } from "react";

export default async function Home() {
  async function getUsers() {
    try {
      const userData = await axios.get("http://localhost:3001/");
      const users = userData.data.users;
      return users;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const users = await getUsers();

  return (
    <div>
      {users.length > 0 ? (
        users.map((user: { id: Key | null | undefined; }) => (
          <div key={user.id}>
            {JSON.stringify(user)}
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
