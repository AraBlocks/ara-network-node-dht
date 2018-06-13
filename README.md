<img src="https://github.com/AraBlocks/docs/blob/master/ara.png" width="30" height="30" /> ara-network-node-dht
====================

[![Build Status](https://travis-ci.com/AraBlocks/ara-network-node-dht.svg?token=r6p7pesHZ9MRJsVsrYFe&branch=master)](https://travis-ci.com/AraBlocks/ara-network-node-dht)

An ARA Network node that runs a DHT.

## Installation

```sh
$ npm install ara-network ara-network-node-dht
```

## Usage

### Runtime Configuration

[rc]: https://github.com/arablocks/ara-runtime-configuration

[Runtime configuration][rc] can be specified by targeting the
`[network.node.dht]` _INI_ section or the nested _JSON_ object
`{ network: { node: { dht: { ... }}}`. For clarity, we detail the
options below in _INI_ format.

```ini
[network.node.dht]
  ; maximum query concurrency

  concurrency = 16
  ; maximum tables stored
  maxTables = 1000

  ; maximum values stored
  maxValues = 1000

  ; in milliseconds
  timeout = 2000

  ; how long records (peers) are cached
  maxAge = 0

  ; bootstrap nodes
  nodes[] = 192.168.0.111

  ; port for DHT server to listen on
  port = 6881

  ; number of buckets (k-buckets)
  k = 20
```

### Programmatic

[interface]: https://github.com/AraBlocks/ara-network/blob/master/nodes/README.md

The `ara-network-node-dht` module can be used programmatically as it
conforms to the [`ara-network` node interface][interface].

```js
const { argv } = require('yargs')
const dht = require('ara-network-node-dht')
const rc = require('ara-runtime-configuration')

void async function main() {
  try { await dht.configure(rc.network.node.dht, require('yargs')) }
  catch (err) { await dht.configure(null, require('yargs')) }
  await dht.start(argv)
}()
```

### Command Line (ann)

With the `ann` (or `ara-network-node`) command line interface, you can
invoke this network node by running the following:

```sh
$ ann --type dht
```

To see usage help about this network node interface, run the following:

```sh
$ ann --type dht --help
```

## See Also

* [ara-network](https://github.com/arablocks/ara-network)
* [bittorrent-dht](https://www.npmjs.com/package/bittorrent-dht)
* [k-rpc](https://github.com/mafintosh/k-rpc)
* [k-rpc-socket](https://github.com/mafintosh/k-rpc-socket)

## License

LGPL-3.0
