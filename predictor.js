var {spawn}=require("child_process")
module.exports=function(temp,moisture){
  return new Promise(function(resolve,reject){
    const ls = spawn();
    ls.stdout.on('data', function(data){
      console.log(data);
      if(data=="match"){
        return resolve({success:true,message:"Found"})
      } else{
        return resolve({success:false,message:"Not found"})
      }
    });
    ls.stderr.on('data', function(data) {
      console.log(`stderr: ${data}`);
      return resolve({success:false,message:"Error matching faces"})
    });
    ls.on('close', function(code) {
      console.log(`child process exited with code ${code}`);
    });
  })
}
