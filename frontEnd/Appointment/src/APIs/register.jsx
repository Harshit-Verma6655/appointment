import React from 'react'

async function register(formData) {
    const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
            "content-type": 'application/json'
        },
        body: JSON.stringify(formData)

    })
    const status = res.status;
    const data = await res.json();
    const data2 = { ...data, status };
    console.log(data2);
    return data2
}

export default register