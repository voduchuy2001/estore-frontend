import axios from "../axios";
import { useEffect } from "react";
import { toast } from "sonner";

const CallBackVNPay = () => {
  const queryString = window.location.search;

  const callbackServer = async () => {
    await axios.get(`/callback-vnpay/${queryString}`, { withCredentials: true })
    .then(function (response) {
      toast.success(response.data.message)
    })
    .catch(function (error) {
      toast.error(error.response.data.message);
    });
  }

  useEffect(() => {
    callbackServer();
  })

  return (
    <div>CallBackVNPay</div>
  )
}

export default CallBackVNPay