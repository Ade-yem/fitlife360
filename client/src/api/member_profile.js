import axios from "axios";

export const editMemberProfile = async (data) => {
  const response = await axios.put('/member', data,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }
  );
  if (response.status !== 201) {
    console.error(response.data.error)
    throw new Error('Could not update user')
  }
  const dat = await response.data
  return dat
}

export const getProfile = async () => {
  const res = await axios.get(`/member`);
  if (res.status !== 200) {
    throw new Error('Unable to fetch profile data')
  }
  const data = await res.data
  return data
}
export const getGoals = async () => {
  const res = await axios.get(`/goals`);
  if (res.status !== 200) {
    throw new Error('Unable to fetch profile data')
  }
  const data = await res.data
  return data
}

export const addGoal = async (data) => {
  const res = await axios.post('/goals', data)
  if (res.status !== 201) {
    console.log(res.data.error)
    throw new Error(res.data.error)
  }
  const dat = await res.data
  return dat
}

export const updateGoal = async (id, goal) => {
  const res = await axios.put(`/goal/${id}`, goal)
  if (res.status !== 201) {
    console.log(res.data.error)
    throw new Error(res.data.error)
  }
  const data = await res.data
  return data
}