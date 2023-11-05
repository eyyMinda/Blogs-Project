"use server";

import { revalidatePath } from "next/cache";
import { sleep } from "./utils";

export const addContactMessage = async (prev, formData) => {
  const email = formData.get("email");
  const name = formData.get("name");
  const message = formData.get("message");
  console.log("ACTIONS: ", email, name, message);
  console.log(prev);

  await sleep(2);
  // await fetch("http://localhost:3000/api/contact", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ formData }),
  // });

  revalidatePath("/contact");
  return {
    success: false,
    error: 'Example error'
  }
}
