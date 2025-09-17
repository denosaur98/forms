import express from 'express';
import cors from 'cors';

const app = express()
const PORT = 4200

app.use(cors())
app.use(express.json())

app.get('/api', (req, res) => {
  res.send('API START!')
})

app.post('/api/form/a', (req, res) => {
  console.log('Form A:', req.body)
  
  setTimeout(() => {
    res.json({
      requestId: Math.random().toString(36).substr(2, 9),
      classifier: `classifier-a-${Date.now()}`
    })
  }, 1000)
  
})

app.post('/api/form/b', (req, res) => {
  console.log('Form B:', req.body)
  
  setTimeout(() => {
    res.json({
      requestId: Math.random().toString(36).substr(2, 9),
      classifier: `classifier-b-${Date.now()}`
    })
  }, 1000)
})

app.listen(PORT, () => {
  console.log(`API START: http://localhost:${PORT}`)
})