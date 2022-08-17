
const axios = require('axios').default
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU0ODE4MjMzLCJleHAiOjE2NTQ4MTgzNTN9.fIj13yc6jUqflA1iQBpdKc9Vr8BEUSLjF3Sl2GBmxIQ'
const resultado = () =>
    axios({
        method: 'post',
        url: 'http://localhost:3000/api/usuarios/ejemplo',
        data: {
            token: token
        }
    }).then(function (response) {
        return (response.data)
    })
        .catch(function (error) {
            console.log(error);
        });
const marco = () => {
    return resultado()
}
module.exports = { marco }
