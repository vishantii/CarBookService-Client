import { Button, Card, Input, List, message, Image, Progress } from "antd";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../utils/firebase";
import v4 from "uuid";
import { useRouter } from "next/router";
import { setSignUp } from "../services/auth";
import { toast } from "react-toastify";

const UploadImageToStorage = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);
  const [localForm, setLocalForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    avatar: "",
  });
  const router = useRouter();

  useEffect(() => {
    const getLocalForm = localStorage.getItem("user-form");
    setLocalForm(JSON.parse(getLocalForm!));
  }, []);

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);
    } else {
      message.error("File size to large");
    }
  };

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgressUpload(progress); // to show progress upload

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          message.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //url is download url of file
            setDownloadURL(url);
          });
        }
      );
    } else {
      message.error("File not found");
    }
  };

  const handleRemoveFile = () => setImageFile(undefined);

  const onSubmit = async () => {
    const getLocalForm = localStorage.getItem("user-form");
    const form = JSON.parse(getLocalForm!);
    const data = new FormData();

    data.append("avatar", downloadURL);
    data.append("email", form.email);
    data.append("name", form.name);
    data.append("password", form.password);
    data.append("username", form.name);
    data.append("phoneNumber", form.phoneNumber);
    data.append("address", form.address);
    data.append("role", "user");
    data.append("status", "Y");

    const result = await setSignUp(data);
    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success("Register Berhasil");
      router.replace("/sign-up-success");
      // [CODE UPDATE] di tutorial saya simpan remove user-form disini,
      // saya rubah remove nya menjadi di halaman setelahnya.
      // localStorage.removeItem('user-form');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-4xl fw-bold color-palette-1 text-center mb-30">
        Upload Profile Photo
      </h2>
      <div className="col-lg-8 offset-lg-2">
        <Input
          type="file"
          placeholder="Select file to upload"
          accept="image/png"
          onChange={(files) => handleSelectedFile(files.target.files)}
        />

        <div className="mt-5">
          <Card>
            {imageFile && (
              <>
                <List.Item
                  extra={[
                    <Button
                      key="btnRemoveFile"
                      onClick={handleRemoveFile}
                      type="text"
                      icon={<i className="fas fa-times"></i>}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={imageFile.name}
                    description={`Size: ${imageFile.size}`}
                    className="text-xl fw-bold color-palette-1 mb-30"
                  />
                </List.Item>

                <div className="text-right mt-3">
                  <Button
                    loading={isUploading}
                    type="primary"
                    className="btn-create rounded-pill"
                    onClick={handleUploadFile}
                  >
                    Upload
                  </Button>

                  <Progress percent={progressUpload} />
                </div>
              </>
            )}

            {downloadURL && (
              <>
                <Image
                  src={downloadURL}
                  alt={downloadURL}
                  style={{ width: 200, height: 200, objectFit: "cover" }}
                />
              </>
            )}
            <div className="text-right mt-5 text-center">
              <Button
                type="primary"
                className="btn-create rounded-pill"
                onClick={onSubmit}
              >
                Create My Account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadImageToStorage;
