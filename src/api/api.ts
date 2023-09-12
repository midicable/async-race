/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Car from '../models/car'
import { BASE_URL } from '../common/constants'
import Winner from '../models/winner'

const getCar = async (id: number): Promise<Car> => {
  const response = await fetch(`${BASE_URL}/garage/${id}`, {
    method: 'GET',
  })
  const car = await response.json()

  return car
}

const getCars = async (page: number, limit = 7): Promise<[Car[], number]> => {
  const response = await fetch(
    `${BASE_URL}/garage/?_page=${page}&_limit=${limit}`,
    {
      method: 'GET',
    }
  )
  const cars = await response.json()
  const carsTotalCount = Number(response.headers.get('x-total-count'))

  return [cars, carsTotalCount]
}

const createCar = async (name: string, color: string): Promise<Car> => {
  const response = await fetch(`${BASE_URL}/garage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
  })
  const createdCar = await response.json()

  return createdCar
}

const deleteCar = async (id: number): Promise<boolean> => {
  let isDeleted = false
  const response = await fetch(`${BASE_URL}/garage/${id}`, {
    method: 'DELETE',
  })

  if (response.ok) {
    isDeleted = true
  }

  return isDeleted
}

const updateCar = async (
  id: number,
  name: string,
  color: string
): Promise<boolean> => {
  let isUpdated = false
  const response = await fetch(`${BASE_URL}/garage/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
  })

  if (response.ok) {
    isUpdated = true
  }

  return isUpdated
}

const startEngine = async (id: number): Promise<[number, number]> => {
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=started`, {
    method: 'PATCH',
  })

  const { distance, velocity } = await response.json()

  return [distance, velocity]
}

const stopEngine = async (id: number): Promise<boolean> => {
  let isCarStopped = false

  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=stopped`, {
    method: 'PATCH',
  })
  isCarStopped = response.ok

  return isCarStopped
}

const switchEngineToDrivingMode = async (id: number): Promise<boolean> => {
  let isFinished = false
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=drive`, {
    method: 'PATCH',
  })

  switch (response.status) {
    case 200:
      isFinished = true
      break
    case 429:
      throw new Error('Too many requests!')
    case 500:
      throw new Error('Car engine has broken down!')
    default:
      break
  }

  return isFinished
}

const getWinner = async (id: number): Promise<Winner> => {
  const response = await fetch(`${BASE_URL}/winners/${id}`, {
    method: 'GET',
  })

  switch (response.status) {
    case 200:
      return response.json()
    case 404:
      throw new Error('No such winner in collection!')
    default:
      throw new Error('Unknow error')
  }
}

const getWinners = async (
  page: number,
  limit = 10,
  sort = 'id',
  order = 'DESC'
): Promise<[Winner[], number]> => {
  const response = await fetch(
    `${BASE_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
    {
      method: 'GET',
    }
  )
  const winners = await response.json()
  const winnersTotalCount = Number(response.headers.get('X-Total-Count'))

  return [winners, winnersTotalCount]
}

const createWinner = async (
  id: number,
  wins: number,
  time: number
): Promise<boolean> => {
  let isCreated = false

  const response = await fetch(`${BASE_URL}/winners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, wins, time }),
  })

  switch (response.status) {
    case 201:
      isCreated = true
      break
    default:
      isCreated = false
      break
  }

  return isCreated
}

const updateWinner = async (
  id: number,
  wins: number,
  time: number
): Promise<boolean> => {
  let isUpdated = false

  const response = await fetch(`${BASE_URL}/winners/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wins, time }),
  })

  switch (response.status) {
    case 200:
      isUpdated = true
      break
    default:
      isUpdated = false
      break
  }

  return isUpdated
}

const deleteWinner = async (id: number): Promise<boolean> => {
  let isDeleted = false
  const response = await fetch(`${BASE_URL}/winners/${id}`, {
    method: 'DELETE',
  })

  switch (response.status) {
    case 200:
      isDeleted = true
      break
    case 404:
      isDeleted = true
      break
    default:
      throw new Error('No such car!')
  }

  return isDeleted
}

export {
  getCar,
  getCars,
  createCar,
  deleteCar,
  updateCar,
  startEngine,
  stopEngine,
  switchEngineToDrivingMode,
  getWinner,
  getWinners,
  createWinner,
  updateWinner,
  deleteWinner,
}
