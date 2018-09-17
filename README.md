<img src="https://github.com/AraBlocks/docs/blob/master/ara.png" width="30" height="30" /> ara-network-node-dht
====================

[![Build Status](https://travis-ci.com/AraBlocks/ara-network-node-dht.svg?token=r6p7pesHZ9MRJsVsrYFe&branch=master)](https://travis-ci.com/AraBlocks/ara-network-node-dht)

An Ara Network node that runs a DHT.

## Status
This project is still in alpha development.

> **Important**: While this project is under active development, run `npm link` in `ara-network-node-dht` directory & `npm link ara-network-node-dht` in `ara-network` directory.

## Dependencies
- [Node](https://nodejs.org/en/download/)
- [ara-network][ara-network]

## Installation
```sh
$ npm install ara-network ara-network-node-dht
```

## Configuration
[ara-runtime-configuration][ara-runtime-configuration] is a dependency of [ara-network][ara-network] and will either read from the nearest `.ararc`.  Install [ara-runtime-configuration][ara-runtime-configuration] separately to specify default values not present in an `.ararc`.

Runtime configuration can be specified by targeting the
`[network.node.dht]` _INI_ section or a nested _JSON_ object
`{ network: { node: { dht: { ... }}}}`.

### Examples
_INI_ format in an `.ararc`:
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
_JSON_ format (passed in to ara-runtime-configuration `rc` function:
```json
"network": {
  "node": {
    "dht": {
      "multicast": true,
      "loopback": true,
      "port": 6881
    }
  }
}
```

## Usage
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

#### Command Line (ann)
```bash
$ ann --type dht --help
usage: ann -t dht [options]

Options:
  --debug, -D  Enable debug output                                     [boolean]
  --conf, -C   Path to configuration file                               [string]
  --help, -h   Show help                                               [boolean]
  --port, -p   Port or ports to listen on               [number] [default: 6881]
```

### Examples
#### Command Line (ann)
Invoke a network node with the `ann` (or `ara-network-node`) command line interface:
```sh
$ ann --type dht
```
Default port is `6881`.

## Contributing
- [Commit message format](/.github/COMMIT_FORMAT.md)
- [Commit message examples](/.github/COMMIT_FORMAT_EXAMPLES.md)
- [How to contribute](/.github/CONTRIBUTING.md)

## See Also
- [ara-network](https://github.com/arablocks/ara-network)
- [bittorrent-dht](https://www.npmjs.com/package/bittorrent-dht)
- [k-rpc](https://github.com/mafintosh/k-rpc)
- [k-rpc-socket](https://github.com/mafintosh/k-rpc-socket)

## License
LGPL-3.0

[ara-network]: https://github.com/arablocks/ara-network
[ara-runtime-configuration]: https://github.com/arablocks/ara-runtime-configuration

