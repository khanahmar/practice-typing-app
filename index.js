const inpEl = document.querySelector("#inp")
const textEl = document.querySelector(".text")
const minEl = document.querySelector(".min")
const secEl = document.querySelector(".sec")
const result = document.querySelector(".result")
let time = true
let text
let sec = 0
let min = 0
let timer

window.addEventListener("load", getSentence)

inpEl.addEventListener("input", (e) => {
  if (time == true) {
    startTime()
  }
  time = false
  let charArr = Array.from(textEl.querySelectorAll("span"))
  let inpArr = inpEl.value.split("")
  let item
  charArr.forEach((character, i) => {
    let char = character.innerText
    if (inpArr[i] == null) {
      character.classList.remove("incorrect")
      character.classList.remove("correct")
    } else if (char === inpArr[i]) {
      character.classList.remove("incorrect")
      character.classList.add("correct")
      item = inpArr[i]
    } else if (char != inpArr[i]) {
      character.classList.remove("correct")
      character.classList.add("incorrect")
    }
  })

  if (
    item == charArr[charArr.length - 1].innerText &&
    inpArr.length == charArr.length
  ) {
    text = ""
    textEl.innerHTML = ""
    inpEl.value = ""
    result.innerText = `You have finished it in ${min} min ${sec} sec.`
    stopTime()
    getSentence()
  }
})

async function getSentence() {
  const url = await fetch("http://api.quotable.io/random")
  const data = await url.json()
  text = data.content
  if (text.length < 80) {
    text.split("").map((char) => {
      let span = document.createElement("span")
      span.innerText = char
      textEl.appendChild(span)
    })
  } else {
    getSentence()
  }
}

function startTime() {
  timer = setInterval(() => {
    sec++
    secEl.innerText = sec < 10 ? `0${sec}` : sec
    if (sec == 60) {
      min++
      minEl.innerText = min < 10 ? `0${min}` : min
    }
  }, 1000)
}

function stopTime() {
  clearInterval(timer)
  minEl.innerText = "00"
  secEl.innerText = "00"
  sec = 0
  min = 0
  time = true
}
