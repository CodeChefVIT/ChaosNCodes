const { execFile } = require('child_process');

module.exports=function(req,res){
  const child = execFile('python3' ,['main.py'],(err, stdout, stderr) => {
    if(err){
        console.log(err)
        return res.redirect("/dashboard");
      }
    let output=stdout.split("\n")[stdout.split("\n").length-2];
    return res.render("prediction",{crops:output})
  });

}
