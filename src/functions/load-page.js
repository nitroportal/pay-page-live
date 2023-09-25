import axios from "axios";

export default async function loadPage(manageState, merchant_id, token) {
  try {
    let response = await axios.post(baseUrl, { merchant_id, token });

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
