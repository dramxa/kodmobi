export default {
  methods: {
    dateFormat(date, format) {
      const d = date.split('.')
      const serverDate = new Date(d[0])
      const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000
      const newDate = new Date(serverDate.getTime() - timezoneOffset)
      const year = newDate.getFullYear()
      let month = newDate.getMonth() + 1
      if(month < 10) month = `0${month}`
      let day = newDate.getDate()
      if (day < 10) day = `0${day}`
      let hours = newDate.getHours()
      if (hours < 10) hours = `0${hours}`
      let minutes = newDate.getMinutes()
      if (minutes < 10) minutes = `0${minutes}`
      let seconds = newDate.getSeconds()
      if (seconds < 10) seconds = `0${seconds}`
      let finalDate = format === 'time' ? `${day}/${month}/${year} ${hours}:${minutes}:${seconds}` : `${day}/${month}/${year}`
      return finalDate
    }
  }
}