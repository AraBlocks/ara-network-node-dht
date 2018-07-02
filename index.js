const { info, warn } = require('ara-console')
const extend = require('extend')
const debug = require('debug')('ara:network:node:dht')
const dht = require('ara-network/dht')
const rc = require('ara-runtime-configuration')()

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

let server = null

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

async function configure(opts, program) {
  let rc = {}
  if (rc.network.node && rc.network.node.dht) {
    rc = rc.network.node.dht
  }
  // eslint-disable-next-line no-param-reassign
  opts = extend(true, {}, conf, rc, opts)
  if (program) {
    const { argv } = program
      .option('port', {
        alias: 'p',
        type: 'number',
        describe: 'Port or ports to listen on',
        default: opts.port
      })
    if (argv.port) {
      // eslint-disable-next-line no-param-reassign
      opts.port = argv.port
    }
  }
  return extend(true, conf, opts)
}

async function getInstance() {
  return server
}

module.exports = {
  getInstance,
  configure,
  start,
  stop,
}
