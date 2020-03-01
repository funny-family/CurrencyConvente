window.onload = () => {
  const url = 'http://localhost:5000/api/fetch'
  const Names2 = [
    'Россикйский рубль'
  ]
  const Names = [
    'Австралийский доллар',
    'Азербайджанский манат',
    'Фунт стерлингов Соединенного королевства',
    'Армянских драмов',
    'Белорусский рубль',
    'Болгарский лев',
    'Бразильский реал',
    'Венгерских форинтов',
    'Гонконгских долларов',
    'Датских крон',
    'Доллар США',
    'Евро',
    'Индийских рупий',
    'Казахстанских тенге',
    'Канадский доллар',
    'Киргизских сомов',
    'Китайских юаней',
    'Молдавских леев',
    'Норвежских крон',
    'Польский злотый',
    'Румынский лей',
    'СДР (специальные права заимствования)',
    'Сингапурский доллар',
    'Таджикских сомони',
    'Турецкая лира',
    'Новый туркменский манат',
    'Узбекских сумов',
    'Украинских гривен',
    'Чешских крон',
    'Шведских крон',
    'Швейцарский франк',
    'Южноафриканских рэндов',
    'Вон Республики Корея',
    'Японских иен'
  ] 

axios(url, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer: token',
    "Access-Control-Allow-Origin" : "*", 
    "Access-Control-Allow-Credentials" : true
  }
})
  .then(result => {
    const dataInfo = result.data.ValCurs.$
    const valutes = result.data.ValCurs.Valute
    const FCM = result.data.ValCurs.$.name
    const marketDate = result.data.ValCurs.$.Date

    // console.log(dataInfo)
    // console.log(valutes)
  
    const currentDate = document.getElementById('current-date')
    const maketName = document.getElementById('maket-name')

    maketName.innerHTML = FCM
    currentDate.innerHTML = marketDate

    const selectOption1 = document.getElementById('select-option-1')
    const selectOption2 = document.getElementById('select-option-2')

    for(let i = 0; i < Names.length; i++) {
      const option = document.createElement('option')
      const valuteName = document.createTextNode(Names[i])
      option.appendChild(valuteName)
      selectOption1.insertBefore(option, option.nextSibling)
    }

    for(let i = 0; i < Names2.length; i++) {
      const option = document.createElement('option')
      const valuteName = document.createTextNode(Names2[i])
      option.appendChild(valuteName)
      selectOption2.insertBefore(option, option.nextSibling)
    }
    
    // function calculateExchangeRate() {
    //   const select1 = document.getElementById('select-option-1').value
    //   const select2 = document.getElementById('select-option-2').value

    //   document.getElementById('demo').innerHTML = select1

    //   console.log('Value of first row: ' + select1)
    //   console.log('Value of second row: ' + select2)
    // }

    const calculateButton = document.getElementById('calculate-button')
    calculateButton.addEventListener('click', () => {
      const firstValuteValue = document.getElementById('select-option-1').value
      const secondValuteValue = document.getElementById('select-option-2').value

      const firstNumberValue = document.getElementById('first-number').value
      const secondNumberValue = document.getElementById('second-number').value

      // console.log('Value of first number: ' + firstNumber)
      // console.log('Value of second number: ' + secondNumber)

      // console.log('Value of first row: ' + firstValuteValue)
      // console.log('Value of second row: ' + secondValuteValue)

      function findSameValuefromArrayAndCalculate(element) {
        for(let i = 0; i < Names.length; i++) {
          if (Names[i] === element) {
            let selectedValute = result.data.ValCurs.Valute[i]
            let indexOfValuteName = Names.indexOf(element)

            let Nominal = parseFloat(result.data.ValCurs.Valute[i].Nominal.values().next().value.replace(/,/, '.'))
            let Value = parseFloat(result.data.ValCurs.Valute[i].Value.values().next().value.replace(/,/, '.'))

            // console.log(element)
            console.log(indexOfValuteName)
            console.log(selectedValute)

            // console.log(firstNumberValue)
            // console.log(secondNumberValue)

            console.log()
            
            console.log(result.data.ValCurs.Valute[i].Value.values().next().value)
            console.log(parseFloat(result.data.ValCurs.Valute[i].Value.values().next().value))

            console.log(`Nominal of ${Names[i]}: ` + Nominal)
            console.log(`Value of ${Names[i]}: ` + Value)

            let resultOfCalculation = (firstNumberValue * Value) / Nominal
            console.log(resultOfCalculation)
            document.getElementById('second-number').value = resultOfCalculation
          }
        }
      }
      findSameValuefromArrayAndCalculate(firstValuteValue)
    })

    // document.getElementById('slt-2').innerHTML = JSON.stringify(result)
    // console.log(result.data.ValCurs.Valute[1])
    // console.log(result.data.ValCurs.Valute[7])
    // console.log(Names[7])
  })
  .catch(err => console.log(err))
}