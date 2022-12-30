const brightnessSlider = document.getElementById('brightnessSlider')
const brightnessNum = document.getElementById('brightnessNum')
const networkToggle = document.getElementById('networkToggle')
const ipBox = document.getElementById('ipBox')
let API_URL
networkChange()

let prevTime = Date.now() - 501
UpdateBrightness(-1)
brightnessSlider.value = parseInt(brightnessNum.innerHTML)
brightnessNum.innerHTML = brightnessSlider.value
function networkChange() {
  API_URL = networkToggle.checked ? 'http://192.168.1.24:8080/' : 'http://lightsserver.ddns.net:8080/'
  console.log(API_URL)
}

async function UpdateBrightness(value) {
  brightnessNum.innerHTML = value
  let options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ brightness: parseInt(value) }),
  }
  console.log(Date.now() - prevTime, 'Time')
  if (Date.now() - prevTime > 100) {
    prevTime = Date.now()
    const response = await fetch(API_URL + 'b', options)
    const json = await response.json()
    console.log(json)
    if (value < 0) {
      brightnessSlider.value = json
    }
    brightnessNum.innerHTML = json
  }
}
async function changeColor(value) {
  let options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ color: value }),
  }
  const response = await fetch(API_URL + 'c', options)
  const json = await response.json()
  console.log(json)
}
async function changePattern(value) {
  let options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pattern: value }),
  }
  const response = await fetch(API_URL + 'p', options)
  const json = await response.json()
  console.log(json)
}

async function ring() {
  let options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  }
  const response = await fetch(API_URL + 'ring', options)
  const json = await response.json()
  console.log(json)
}
