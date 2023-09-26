import axios from "axios";

export default async function loadPage(manageState, merchant_id, token) {
  try {
    const url = process.env[`REACT_APP_${merchant_id}`];
    console.log("url from secret: ", url);
    const response = await axios.post(url, { merchant_id, token });

    console.log(response);

    manageState.setStep("channels");
  } catch (error) {
    console.log("error loading page");
    console.log(error);
    manageState.setError(true);
  } finally {
    manageState.setLoading(false);
  }
}
