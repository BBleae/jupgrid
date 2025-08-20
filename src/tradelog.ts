import fs from 'node:fs'

class TradeLogger {
  sessionstart: number
  filename: string
  initialized: boolean
  log: { settings: any, log: any[] }
  constructor() {
    this.sessionstart = Date.now()
    this.filename = `logs/${this.sessionstart}.json`
    this.initialized = false
  }

  initLog() {
    // Read userSettings.json and create log object
    this.log = {
      settings: JSON.parse(fs.readFileSync('userSettings.json', 'utf-8')),
      log: [],
    }

    // Write initial file
    this.writeLog()

    this.initialized = true
  }

  readLog() {
    this.log = JSON.parse(fs.readFileSync(this.filename, 'utf-8'))
  }

  writeLog() {
    fs.writeFileSync(this.filename, JSON.stringify(this.log, null, 4))
  }

  logTrade(object) {
    // Validate object type
    if (object.type !== 'placement' && object.type !== 'closure') {
      console.error('Invalid object type')
      return
    }
    this.readLog()
    this.log.log.push(object)
    this.writeLog()
  }
}

export { TradeLogger }
