import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

interface EmailFormData {
  name: string;
  email: string;
  message: string;
}

export const ApiService = {
  getEntries: async (): Promise<any> => {
    console.log("WE HERE");
    const response = await client
      .get<any>("/entries")
      .then((response) => response);
    return response.data;
  },
  getEntry: async (entry_name: string): Promise<any> => {
    const response = await client
      .get<any>(`/entries/${entry_name}`)
      .then((response) => response);
    return response.data;
  },
  getImages: async (): Promise<any> => {
    const response = await client
      .get<any>("/images")
      .then((response) => response);
    return response.data;
  },
  postEmail: async (formData: EmailFormData): Promise<any> => {
    return client
      .post<any>("/send-email", formData)
      .then((response) => response.data);
  },
};
