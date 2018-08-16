const { info, warn } = require('ara-console')
const extend = require('extend')
const debug = require('debug')('ara:network:node:dht')
const dht = require('ara-network/dht')
const rc = require('ara-network/rc')()

const conf = {
  concurrency: 16,
  maxTables: 1000,
  maxValues: 1000,
  // in milliseconds
  timeout: 2000,
  // in milliseconds
  maxAge: 0,
  nodes: [],
  port: 6881,
  // number of buckets (k-buckets)
  k: 20,
}

if (rc.network && rc.network.node && rc.network.node.dht) {
  extend(true, conf, rc.network.node.dht)
}

let server = null

async function getInstance() {
  return server
}

async function configure(opts, program) {
  if (opts) {
    conf.concurrency = opts.concurrency
    conf.timeout = opts.timeout
    conf.port = opts.port
  }

  if (program) {
    const { argv } = program
      .option('p', {
        alias: 'port',
        type: 'number',
        describe: 'Port or ports to listen on',
        default: conf.port
      })
      .option('c', {
        alias: 'concurrency',
        type: 'number',
        describe: 'Max concurrency',
        default: conf.concurrency
      })

    if (argv.port) {
      // eslint-disable-next-line no-param-reassign
      conf.port = argv.port
    }

    if (argv.timeout) {
      // eslint-disable-next-line no-param-reassign
      conf.timeout = argv.timeout
    }

    if (argv.concurrency) {
      // eslint-disable-next-line no-param-reassign
      conf.concurrency = argv.concurrency
    }
  }
}

async function start() {
  if (server) { return false }

  server = dht.createServer(conf)
  server.listen(conf.port)
  server.on('error', onerror)
  server.on('close', onclose)
  server.on('listening', onlistening)

  return true

  function onerror(err) {
    warn('dht: error:', err.message)
    debug('error:', err)
  }

  function onclose() {
    warn('dht: Closed')
  }

  function onlistening() {
    const { port } = server.address()
    info('dht: Listening on port %s', port)
  }
}

async function stop() {
  if (null == server) { return false }
  warn('dht: Stopping server')
  server.destroy(onclose)
  return true
  function onclose() {
    server = null
  }
}

module.exports = {
  getInstance,
  configure,
  start,
  stop,
}
