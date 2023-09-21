

import axios from "axios"
import baseUrl from "./base-url"

export default async function loadPage(manageState, payment_id, token) {
    try {
        
        let response = await axios.post(baseUrl, { payment_id, token })

        console.log(response)

        manageState.setStep("channels")
    } catch (error) {
        console.log("error loading page")
        console.log(error)
        manageState.setError(true)
    } finally {
        manageState.setLoading(false)
    }
}