
export default function handler(req, res) {
    const { token } = req.query
    const data = {
        token: token,
    }
    fetch('http://localhost:3000/api/usuarios/ejemplo', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => res.status(200).json({ error }))
        .then(response => res.status(200).json({ response }))
}