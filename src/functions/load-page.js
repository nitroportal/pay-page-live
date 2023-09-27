// eslint-disable-next-line no-unused-vars
import u from './utils.js'
import nitro from './nitro.js'

export default async function loadPage({ setPage, setError, setLoading, setChannels, setAmount, setStep }) {
  try {
    // const { channels } = await nitro.getChannels();

    // if (!u.isNonEmptyArray(channels)) throw Error("Invalid channels");

    const { channel_types, amount } = await nitro.getChannels({
      setError,
      setLoading
    })

    if (!u.isNonEmptyArray(channel_types) || !u.isPositiveNumber(amount)) throw Error('Invalid channel_types or amount')
    setChannels(channel_types)
    setAmount(amount)
    setStep(2)
    setPage('pay')
  } catch (error) {
    console.log('error loading page')
    console.log(error)
    setError(true)
  } finally {
    setLoading(false)
  }
}
