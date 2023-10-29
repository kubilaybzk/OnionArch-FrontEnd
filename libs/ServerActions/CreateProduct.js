export const handleSubmit = async (FormData) => {
  "use server";
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(
      `${Backend_URL}Products/CreateOneProductWithImage`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: FormData,
      }
    );
    // rest of your code...
  } catch (error) {
    console.error("An error occurred:", error);
  }
  revalidateTag("Products");
};

export default { handleSubmit };
