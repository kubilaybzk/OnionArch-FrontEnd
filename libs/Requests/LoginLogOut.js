import SuccesToast from "@/Components/SharedUI/Toast/SuccesToast";
import ErrorToast from "@/Components/SharedUI/Toast/ErrorToast";

export async function SignUpFormRequest(values, { setSubmitting }) {
  try {
    setSubmitting(true);
    // Verileri API'ya POST isteği ile gönder
    let request = await fetch("http://localhost:61850/api/Users/CreateUser", {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameSurname: values.NameSurname,
        userName: values.UserName,
        email: values.Email,
        password: values.Password,
      }),
    });

    let responce = await request.json();

    if (responce.succeeded) {
      // Başarılı bir yanıt aldığınızda burada işlem yapabilirsiniz
      SuccesToast(responce.message);
    } else {
      // Hata durumunu işlemek için gerekli kodu burada ekleyin
      ErrorToast(responce.message);
    }
  } catch (error) {
    // Hata durumunu işlemek için gerekli kodu burada ekleyin
    console.error("Bir hata oluştu", error);
  } finally {
    setSubmitting(false);
  }
}

export async function LoginFormRequest(values, { setSubmitting }) {
  try {
    setSubmitting(true);
    // Verileri API'ya POST isteği ile gönder
    let request = await fetch("http://localhost:61850/api/Users/Login", {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserNameOrEmail: values.UserNameOrEmail,
        Password: values.Password,
      }),
    });

    let responce = await request.json();

    if (request.ok) {
      // Başarılı bir yanıt aldığınızda burada işlem yapabilirsiniz
      SuccesToast("Başarılı");
    } else {
      // Hata durumunu işlemek için gerekli kodu burada ekleyin
      ErrorToast("Error");
    }
  } catch (error) {
    // Hata durumunu işlemek için gerekli kodu burada ekleyin
    console.error("Bir hata oluştu", error);
  } finally {
    setSubmitting(false);
  }
}

export default { SignUpFormRequest, LoginFormRequest };
