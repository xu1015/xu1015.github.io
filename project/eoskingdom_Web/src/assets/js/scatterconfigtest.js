
import https from 'https'
 
import http from 'http'
 
 
 var chainId="5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"
  export function confignode(){
   var code=[]
      return new Promise((resolve,reject)=>{
     var s=new Date().getTime()   
    //    https.get('https://kylin.eoscanada.com',function(res){
    //      var e=new Date().getTime()
    //      let t=e-s-22
    //      code.push({name:'kylin.eoscanada.com',time:t,chainid:chainId,address:'Beijing'})
    //      console.log('1')
    //  }).on('error', function(e) {
    //    }); 
 
       https.get('https://api.kylin-testnet.eospacex.com',function(res){
         var e=new Date().getTime()
         let t=e-s-8
         code.push({name:'api.kylin-testnet.eospacex.com',time:t,chainid:chainId,address:'HK, China'})
        //  console.log('1')
     }).on('error', function(e) {
       }); 
       
      
    //    http.get('http://kylin.fn.eosbixin.com',function(res){
    //      var e=new Date().getTime()
    //      let t=e-s-10
    //      code.push({name:'kylin.fn.eosbixin.com',time:t,chainid:chainId,address:'Tokyo'})
    //      console.log('1')
    //  }).on('error', function(e) {
    //    }); 
 
 
 
 
 
 
 
 
       
    //    http.get('http://kylin.fn.eosbixin.com',function(res){
    //      var e=new Date().getTime()
    //      let t=e-s-22
    //      code.push({name:'kylin.fn.eosbixin.com',time:t,chainid:chainId,address:'Singapore'})
    //      console.log('1')
    //      }).on('error', function(e) {
    //    }); 
 
 
 
 
 
       
    //    http.get('http://api.kylin.eoseco.com',function(res){
    //      var e=new Date().getTime() 
    //      let t=e-s-16
    //      code.push({name:'api.kylin.eoseco.com',time:t,chainid:chainId,address:'YUL'})
    //  }).on('error', function(e) {
    //    }); 
 
 
 
 
 
 
 
 
       http.get('http://api.kylin.eosbeijing.one',function(res){
         var e=new Date().getTime()
         let t=e-s-12
         code.push({name:'api.kylin.eosbeijing.one',time:t,chainid:chainId,address:'Missouri'})
        //  console.log('1')
     }).on('error', function(e) {
       }); 
 
 
     
 
 
 
    //    https.get('https://api-kylin.eosasia.one',function(res){
    //      var e=new Date().getTime()
    //      let t=e-s-18
    //      code.push({name:'api-kylin.eosasia.one',time:t,chainid:chainId,address:'Kyiv'})
    //      console.log('1')
    //  }).on('error', function(e) {
    //    }); 
 
 
 
 
 
 
       https.get('https://api-kylin.eosasia.one',function(res){
         var e=new Date().getTime()
         let t=e-s-22
        //  console.log('1')
         code.push({name:'api-kylin.eosasia.one',time:t,chainid:chainId,address:'North Virginia'})
                   code.sort(function(a,b){
                   return a.time-b.time
             })  
            //  console.log('code' +code)
     resolve(code)
     }).on('error', function(e) {
       }); 
 
      })
  }
 
