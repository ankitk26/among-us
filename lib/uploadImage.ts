export const getAvatar = async (
  avatarPreview: string,
  userAvatar: string,
  imageFile: string | Blob
) => {
  if (avatarPreview === userAvatar) return userAvatar;

  // Check if new avatar is uploaded from desktop
  if (!avatarPreview.includes("http://localhost:3000")) return avatarPreview;

  // Save image in cloudinary and return the uploaded image's URL
  try {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "among-us-nextjs");
    formData.append("folder", "among-us-nextjs-avatars");
    const options = {
      method: "POST",
      body: formData,
    };
    const url = "https://api.cloudinary.com/v1_1/drnu1myuq/image/upload";
    const res = await fetch(url, options);
    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.log(err.message);
  }
};
