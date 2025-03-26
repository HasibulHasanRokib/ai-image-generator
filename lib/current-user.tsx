import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export async function CurrentUser() {
  const user = await currentUser();
  if (!user) return null;

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    if (loggedInUser) return loggedInUser;
    const newUser = await db.user.create({
      data: {
        clerkId: user.id,
        name: user.fullName,
        image: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    return newUser;
  } catch (error) {
    console.log(error);
    return;
  }
}
