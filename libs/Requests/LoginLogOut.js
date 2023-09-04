"use client";
import SuccesToast from "@/Components/SharedUI/Toast/SuccesToast";
import ErrorToast from "@/Components/SharedUI/Toast/ErrorToast";
import { signIn } from "next-auth/react";

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

    console.log(request);
    let responce = await request.json();
    console.log(responce);
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

export async function LoginFormRequest(values, callbackUrl, { setSubmitting }) {
  try {
    setSubmitting(true);

    const request = await signIn("credentials", {
      redirect: false,
      userNameOrEmail: values.UserNameOrEmail,
      password: values.Password,
      // callbackUrl: callbackUrl,
    });

    console.log(request);

    if (request.error) {
      // Başarılı bir yanıt aldığınızda burada işlem yapabilirsiniz
      ErrorToast("Kullanıcı Adı yada şifre yanlış");
    } else {
      // Hata durumunu işlemek için gerekli kodu burada ekleyin
      SuccesToast("Başarılı");
      SuccesToast("Birazdan yönlendirileceksiniz.");
      setTimeout(function () {
        window.location.href = callbackUrl ? callbackUrl : "/";
      }, 2000);
    }
  } catch (error) {
    // Hata durumunu işlemek için gerekli kodu burada ekleyin
    console.error("Bir hata oluştu", error);
  } finally {
    setSubmitting(false);
  }
}

export default { SignUpFormRequest, LoginFormRequest };
