const jwt = require('jsonwebtoken')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE2ODk1ODAzNzZ9.Pi558IbBOgL2PvyBLzva6HJ8q0Dj3fVoyH2tD8Ncnbc'
const tokenData = jwt.verify(token, 'dctdct111') 
console.log(tokenData)
