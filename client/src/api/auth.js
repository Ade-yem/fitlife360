import axios from "axios";

export const loginUser = async (data) => {
  const res = await axios.post(`/api/login`, data)
  if (res.status !== 200) {
    console.log(res.data.error);
    throw new Error("Unable to login")
  }
  const dat = await res.data;
  return dat;        
}

export const signupUser = async (data) => {
  const res = await axios.post(`/api/register`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (res.status !== 201) {
    console.log(res.data.error);
    throw new Error(res.data.error)
  }
  const dat = await res.data;
  return dat; 
}
export const logoutUser = async () => {
  const res = await axios.post("/logout")
  if (res.status !== 201) {
    console.log(res.data.error);
    throw new Error("Unable to logout")
  }
  const dat = await res.data;
  return dat;
}
export const registerUser = async (endpoint, data) => {
  const res = await axios.post(endpoint, data);
  if (res.status !== 201) {
    console.log(res.data.error);
    throw new Error(res.data.error)
  }
  const dat = await res.data;
  return dat;          
}
export const selectRole = async (role, token) => {
  const res = await axios.post("/api/role", {role}, {
    headers: {
      'Authorization': token
    }
  });
  if (res.status !== 201) {
    console.log(res.data.error);
    throw new Error(res.data.error)
  }
  const dat = await res.data;
  return dat;          
}

export const authStatus = async () => {
  const res = await axios.get("api/status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
}

