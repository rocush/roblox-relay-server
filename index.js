const http = require('http')
const fetch = require('node-fetch')
const port = process.env.PORT || 3000
const urlModule = require('url')

const server = http.createServer(async function(req, res) {
    if (req.method === 'GET') {
        const query = urlModule.parse(req.url, true).query
        const targetUrl = query.url // Roblox script will send the full Roblox API URL

        if (!targetUrl) {
            res.writeHead(400)
            res.end(JSON.stringify({ error: "Missing url parameter" }))
            return
        }

        try {
            const apiResponse = await fetch(targetUrl)
            const data = await apiResponse.json()

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(data))
        } catch (err) {
            res.writeHead(500)
            res.end(JSON.stringify({ error: err.message }))
        }
    } else {
        res.writeHead(405)
        res.end(JSON.stringify({ error: "GET only" }))
    }
})

server.listen(port, function(error) {
    if (error) {
        console.log('Something went wrong:', error)
    } else {
        console.log('Server running on port', port)
    }
})
