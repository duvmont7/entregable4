import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Header from "./components/Header";
import Modal from "./components/Modal";
import UserList from "./components/UserList";

const BASE_URL = "https://users-crud.academlo.tech";


const DEFAULT_VALUES = 
{
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  birthday: "",
  image_url: "",
}

function App() {
  const [users, setUsers] = useState([]);
  const [isUserIdToEdit, setisUserIdToEdit] = useState();
  const [isShowForm, setIsShowForm] = useState(false);

  const { register, handleSubmit, reset, formState: {errors} } = useForm();

  const submit = (data) => {
    if(!data.birthday){
      data.birthday = null;
    }

    if(!data.image_url){
      data.image_url = null;
    }

    if(isUserIdToEdit){
      editUser(data)
    } else {
      createUser(data)
    }
  };

  const createUser = (data) => {
    const URL = BASE_URL + "/users/";

    axios
      .post(URL, data)
      .then(() => {
        getAllUsers();
        reset({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          birthday: "",
          image_url: "",
        });
        setIsShowForm(!setIsShowForm);
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (id) => {
    const URL = BASE_URL + `/users/${id}/`;

    axios
      .delete(URL)
      .then(() => getAllUsers())
      .catch((err) => console.log(err));
  };

  const editUser = (data) => {
    const URL = BASE_URL + `/users/${isUserIdToEdit}/`;

    axios
      .patch(URL, data)
      .then(() => {
        getAllUsers();
        reset(DEFAULT_VALUES);
        setIsShowForm(!isShowForm);
        setisUserIdToEdit();
      })
      .catch((err) => console.log(err));
  }

  const handleClickEdit = (data) => {
    setIsShowForm((isShowForm) => !isShowForm);
    reset(data);
    setisUserIdToEdit(data.id);
  };

  const getAllUsers = () => {
    const URL = BASE_URL + "/users/";

    axios
      .get(URL)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <main className="font-sans p-4 grid gap-3 auto-rows-auto grid-cols max-w-[1000px] mx-auto">
      <Header setIsShowForm={setIsShowForm} />
      <Modal
        handleSubmit={handleSubmit}
        register={register}
        isShowForm={isShowForm}
        setIsShowForm={setIsShowForm}
        submit={submit}
        reset={reset}
        setisUserIdToEdit={setisUserIdToEdit}
        isUserIdToEdit={isUserIdToEdit}
        errors={errors}
      />
      <UserList
        users={users}
        deleteUser={deleteUser}
        handleClickEdit={handleClickEdit}
      />
    </main>
  );
}

export default App;
