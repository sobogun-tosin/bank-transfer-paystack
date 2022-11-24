import axios from "axios";

export const Axios = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_API_KEY}`,
    "Content-Type": "application/json",
  },
});
