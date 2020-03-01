const route = require('express').Router()
const nodeFetch = require('node-fetch')
const parseString = require('xml2js').parseString

const url = 'http://www.cbr.ru/scripts/XML_daily.asp'

route.post('/test', (req, res) => {
  res.send('test')
})

route.post('/fetch', (req, res) => {
  nodeFetch(url)
  .then((response) => {
    return response.text()
  })
  .then((data) => {
    res.set({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer: token',
      "Access-Control-Allow-Origin" : "*", 
      "Access-Control-Allow-Credentials" : true
    })
    parseString(data, {
      trim: true,
      xmldec: {
        'version': '1.0',
        'encoding': 'UTF-16',
        'standalone': true 
      },
    }, (err, result) => {
      if(err) return console.log(err)
      
      res.send(result)
    })

    // res.send(data)
    // console.log()
  })
  .catch(err => console.log(err))
})

module.exports = route