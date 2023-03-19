import axios from "axios";
export const getInstructorDetailsByID = async (id) => {
  const response = await axios.get(`/teacher/${id}`);


  return response.data;
};

