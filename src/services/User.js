import axiosInstance from "../utils/axios";


export const GetUserListsService = async () => {
    return await axiosInstance().get(`/users`);
};

export const GetUserService = async (value) => {
    return await axiosInstance().get(`/users/${value}`);
};

export const AddUserService = async (values) => {
    return await axiosInstance().post(`/users?access-token=295a677b863af8198591a78a21fcf743d5af3b693c3ab660c240e9cdb03f2303`,values);
  };

  export const UpdateUserService = async (values) => {
    return await axiosInstance().put(`/users/${values.id}`,values);
  };

