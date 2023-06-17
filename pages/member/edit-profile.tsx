import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/atoms/Input";
import { JWTPayloadTypes, UserTypes } from "../../services/data-types";
import { updateProfile } from "../../services/member";
import SideBar from "../../components/organisms/SideBar";

/* eslint-disable jsx-a11y/no-redundant-roles */

interface userProps {
  avatar: any;
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}
export default function EditProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<userProps>({
    name: "",
    id: "",
    email: "",
    avatar: "",
    phoneNumber: "",
  });
  const [imagePreview, setImagePreview] = useState("/");
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const dataUser: UserTypes = payload.customer;
      const IMG = process.env.NEXT_PUBLIC_IMG;
      setUser(dataUser);
    }
  }, []);

  const onSubmit = async () => {
    const data = {
      avatar: user.avatar,
      name: user.name,
      phoneNumber: user.phoneNumber,
    };

    const response = await updateProfile(data, user.id);
    if (response.error) {
      toast.error("error");
    } else {
      Cookies.remove("token");
      router.push("/sign-in");
    }
  };
  return (
    <>
      <section className="edit-profile overflow-auto">
        <SideBar
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
          activeMenu="settings"
        />
        <main className="main-wrapper">
          <div className="ps-lg-0">
            <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
            <div className="bg-card pt-30 ps-30 pe-30 pb-30">
              <form action="">
                <div className="photo d-flex">
                  <div className="position-relative me-20">
                    <img
                      src={user.avatar}
                      alt="profile"
                      width="90"
                      height="90"
                      className="img-fluid mb-20"
                      style={{ borderRadius: "100%" }}
                    />

                    {/* <div className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center">
                      <img src="/icon/upload.svg" alt="upload" />
                    </div> */}
                  </div>
                  {/* <div className="image-upload">
                    <label htmlFor="avatar">
                      <img
                        src="/icon/upload.svg"
                        alt="upload"
                        width={90}
                        height={90}
                      />
                    </label>
                    <input
                      onChange={(e) => {
                        const img = e.target.files![0];
                        setImagePreview(URL.createObjectURL(img));
                        return setUser({
                          ...user,
                          avatar: img,
                        });
                      }}
                      id="avatar"
                      type="file"
                      name="avatar"
                      accept="image/png, image/jpeg"
                    />
                  </div> */}
                </div>
                <div className="pt-30">
                  <Input
                    label="Full Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="pt-30">
                  <Input
                    label="Phone"
                    value={user.phoneNumber}
                    onChange={(e) =>
                      setUser({ ...user, phoneNumber: e.target.value })
                    }
                  />
                </div>
                <div className="pt-30">
                  <Input label="Email Address" value={user.email} disabled />
                </div>
                <div className="button-group d-flex flex-column pt-50">
                  <button
                    type="button"
                    className="btn btn-save fw-medium text-lg text-white rounded-pill"
                    onClick={onSubmit}
                  >
                    Save My Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
