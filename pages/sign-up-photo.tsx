import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { setSignUp } from "../services/auth";

export default function SignUpPhoto() {
  const [image, setImage] = useState<any>("");
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [localForm, setLocalForm] = useState({
    name: "",
    email: "",
  });
  const router = useRouter();

  useEffect(() => {
    const getLocalForm = localStorage.getItem("user-form");
    setLocalForm(JSON.parse(getLocalForm!));
  }, []);

  const onSubmit = async () => {
    const getLocalForm = await localStorage.getItem("user-form");
    const form = JSON.parse(getLocalForm!);
    const data = new FormData();

    data.append("image", image);
    data.append("email", form.email);
    data.append("name", form.name);
    data.append("password", form.password);
    data.append("username", form.name);
    data.append("phoneNumber", "08123456789");
    data.append("role", "user");
    data.append("status", "Y");

    const result = await setSignUp(data);
    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success("Register Berhasil");
      router.push("/sign-up-success");
      // [CODE UPDATE] di tutorial saya simpan remove user-form disini,
      // saya rubah remove nya menjadi di halaman setelahnya.
      // localStorage.removeItem('user-form');
    }
  };
  return (
    <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <div className="container mx-auto">
        <form action="">
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <h2 className="text-4xl fw-bold color-palette-1 text-center mb-30">
                Upload Profile Photo
              </h2>
              <div className="mb-20">
                <div className="image-upload text-center">
                  <label htmlFor="avatar">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        className="img-upload"
                        alt="upload"
                      />
                    ) : (
                      <Image
                        src="/icon/upload.svg"
                        width={120}
                        height={120}
                        alt="upload"
                      />
                    )}
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      const img = event.target.files![0];
                      setImagePreview(URL.createObjectURL(img));
                      return setImage(img);
                    }}
                  />
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">
                {localForm.name}
              </h2>
              <p className="text-lg text-center color-palette-1 m-0">
                {localForm.email}
              </p>
            </div>

            <div className="button-group d-flex flex-column mx-auto">
              <button
                type="button"
                className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                onClick={onSubmit}
              >
                Create My Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
