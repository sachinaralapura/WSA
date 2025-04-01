import { data } from "react-router-dom"

const BASE_URL = import.meta.env.VITE_BASE_URL;


async function VerifySessionApi(handleResponse, handleError) {
  const url = `${BASE_URL}/auth/session`
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
    })

    const data = await response.json()

    if (!response.ok) {
      handleError(data)
      return
    }

    handleResponse(data)
  } catch (error) {
    console.log(error)
  }
}

async function LoginApi(
  values,
  handleResponse,
  handleError
) {
  const url = `${BASE_URL}/user/login`
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: values?.email, password: values?.password }),
      credentials: "include",
    })

    const data = await response.json()
    if (!response.ok) {
      handleError(data)
      return
    }

    handleResponse(data)
  } catch (error) {
    console.log(error)
    handleError(data)
  }
}

async function LoginGoogleApi(
  credential,
  handleResponse,
  handleError
) {
  const url = `${BASE_URL}/auth/google`
  try {
    if (credential == undefined) {
      handleError("Invalid Input")
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: credential }),
      credentials: "include",
    })

    const data = await response.json()
    if (!response.ok) {
      handleError(data)
      return
    }
    handleResponse(data)
  } catch (error) {
    handleError(error)
  }
}

async function RegisterApi(
  values,
  handleResponse,
  handleError,
) {
  const url = `${BASE_URL}/user/register`
  const body = { name: values.name, email: values.email, password: values.password }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    })

    const data = await response.json()

    if (!response.ok) {
      handleError(data)
      return
    }

    handleResponse(data)
  } catch (error) {
    console.log(error)
    handleError(error)
  }
}

export { VerifySessionApi, LoginApi, LoginGoogleApi, RegisterApi }
