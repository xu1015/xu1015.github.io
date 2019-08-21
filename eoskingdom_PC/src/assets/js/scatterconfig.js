
import Eos from 'eosjs'
import https from 'https'


var chainId = "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
export function confignode() {
  var code = []
  return new Promise((resolve, reject) => {
    try {
      var s = new Date().getTime()
      https.get('https://api.eosbeijing.one', function (res) {
        var e = new Date().getTime()
        let t = e - s - 22
        code.push({ name: 'api.eosbeijing.one', time: t, chainid: chainId, address: 'Beijing' })
        resolve(code)
      }).on('error', function (e) {
      });

      https.get('https://node1.zbeos.com', function (res) {
        var e = new Date().getTime()
        let t = e - s - 8
        code.push({ name: 'node1.zbeos.com', time: t, chainid: chainId, address: 'HK, China' })
        resolve(code)
      }).on('error', function (e) {
      });


      https.get('https://api.eoslaomao.com', function (res) {
        var e = new Date().getTime()
        let t = e - s - 10
        code.push({ name: 'api.eoslaomao.com', time: t, chainid: chainId, address: 'Tokyo' })
        resolve(code)
      }).on('error', function (e) {
      });









      https.get('https://mainnet.meet.one', function (res) {
        var e = new Date().getTime()
        let t = e - s - 22
        code.push({ name: 'mainnet.meet.one', time: t, chainid: chainId, address: 'Singapore' })
        resolve(code)
      }).on('error', function (e) {
      });






      https.get('https://eos.greymass.com', function (res) {
        var e = new Date().getTime()
        let t = e - s - 16
        code.push({ name: 'eos.greymass.com', time: t, chainid: chainId, address: 'YUL' })
        resolve(code)
      }).on('error', function (e) {
      });








      https.get('https://api.cypherglass.com', function (res) {
        var e = new Date().getTime()
        let t = e - s - 12
        code.push({ name: 'api.cypherglass.com', time: t, chainid: chainId, address: 'Missouri' })
        resolve(code)
      }).on('error', function (e) {
      });






      https.get('https://eosbp.atticlab.net', function (res) {
        var e = new Date().getTime()
        let t = e - s - 18
        code.push({ name: 'eosbp.atticlab.net', time: t, chainid: chainId, address: 'Kyiv' })
        resolve(code)
      }).on('error', function (e) {
      });



      https.get(' https://api.eossweden.se', function (res) {
        var e = new Date().getTime()
        let t = e - s - 18
        code.push({ name: 'api.eossweden.se', time: t, chainid: chainId, address: 'Kyiv' })
        resolve(code)
      }).on('error', function (e) {
      });





      https.get('https://hapi.eosrio.io', function (res) {
        var e = new Date().getTime()
        let t = e - s - 22
        code.push({ name: 'hapi.eosrio.io', time: t, chainid: chainId, address: 'North Virginia' })
        code.sort(function (a, b) {
          return a.time - b.time
        })
        resolve(code)
      }).on('error', function (e) {
      });

    } catch (error) {

    }

  })
}

