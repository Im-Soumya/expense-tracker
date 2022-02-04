const balance = document.querySelector('#balance')
const incomeEl = document.querySelector('#money-plus')
const expenseEl = document.querySelector('#money-minus')
const list = document.querySelector('#list')
const form = document.querySelector('#form')
const text = document.querySelector('#text')
const amount = document.querySelector('#amount')
const addButton = document.querySelector('.btn')

let transactions = localStorage.getItem('transactions') !== null ? JSON.parse(localStorage.getItem('transactions')) : [] 

const generateID = () => {
  return Math.floor(Math.random() * 100000)
}

const load = () => {
  list.innerHTML = ''
  transactions.forEach(item => updateDOM(item))
  updateValues()
}

const updateStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

const deleteTransaction = (id) => {
  transactions = transactions.filter(item => item.id !== id)
  updateStorage()
  load()
}

const updateDOM = (transaction) => {
  const sign = transaction.amount > 0 ? '+' : '-'
  const li = document.createElement('li')
  li.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span><button class='delete-btn' onclick='deleteTransaction(${transaction.id})'>X</button>
  `
  list.append(li)
}

const updateValues = () => {
  const amounts = transactions.map(item => item.amount)
  const total = amounts.reduce((acc, currValue) => (acc += currValue), 0).toFixed(2)
  const income = amounts.filter(item => item > 0).reduce((acc, currValue) => (acc += currValue), 0).toFixed(2)
  const expense = amounts.filter(item => item < 0).reduce((acc, currValue) => (acc += currValue), 0).toFixed(2)

  balance.innerText = `Rs. ${total}`
  incomeEl.innerText = `Rs. ${income}`
  expenseEl.innerText = `Rs. ${expense}`
}

const addTransaction = (e) => {
  e.preventDefault()

  if(text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter text and amount')
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    }
    transactions.push(transaction)
    updateDOM(transaction)
    updateValues()
    updateStorage()
    text.value = ''
    amount.value = ''
  }
}

load()

form.addEventListener('submit', addTransaction)