"ese client";

import ErrorToast from "@/Components/SharedUI/Toast/ErrorToast";
import SuccesToast from "@/Components/SharedUI/Toast/SuccesToast";

export default function ShowToastOnServer(result) {
    if (result) {
        SuccesToast("Ürün başarıyla Silindi");
      } else {
        ErrorToast("Ürün silinemedi.");
      }
}
