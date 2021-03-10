const express = require('express')

const PORT = 3333

const app = express()

.listen(PORT, () => console.log(`🔥 Server started at http://localhost:${PORT}`))