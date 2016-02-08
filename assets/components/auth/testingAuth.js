var var1 = "hi";

exports.returnVar1 = function(){
  
  return var1;
}

exports.sanitize = function(x){
  console.log('running');
  return x.toLowerCase().replace(/-/g, ' ');
}