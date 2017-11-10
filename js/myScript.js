var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//For keeping control of canvas's height
var height = 0;
canvas.width = window.innerWidth;
canvas.height = 12000;

//ctx.fillRect(0, 0, canvas.width, canvas.height);

var test = document.getElementById('test');
var makeFileName = document.getElementById('nameTheFile');

//event Listener for naming a link to file
makeFileName.addEventListener("click", function(e){

  e.preventDefault();

  var nameFile = document.getElementById('ticketNumber').value;
  var streetAddress = document.getElementById('streetAddress').value;
  var link = document.getElementById('linkToFile');

  link.download = nameFile + " - " + streetAddress + ".png";
  ctx.font = "30px Arial";
  ctx.fillText("ticket #: " + nameFile + "   " + "address: " + streetAddress, 10,30);
  height = 50;
  addFilesToCanvas();
  console.log(link.download);

}, false);

/**************************
Code for uploaded files
**************************/
var uploadedFiles = document.getElementById('theFiles');
var myFiles = [];
var fileShow = document.getElementById('fileShow');
fileShow.innerHTML = 'Files: ';
var fileCount = document.getElementById('fileCount');


uploadedFiles.addEventListener("change", function(e){
    e.preventDefault();
    myFiles.push(e.target.files[0]);
    //console logs how many files there are
    console.log(e.target.files.length);
    console.log(myFiles);
    //shows file count
    fileCount.innerHTML = 'File Count: '+ myFiles.length;

    //shows the files that have been uploaded on the page
    for(var i = 0; i < myFiles.length; i++){
      if(i === myFiles.length - 1){
        fileShow.innerHTML += myFiles[i].name + ','  + '\n';
      }
    }
}, false);

//Handle drawing of verizon conduit or plat
/*var getPlatRec = document.getElementById('conduitOrPlat');

/*function getPlat(){
  console.log(getPlatRec)
  //handleUploadedImg()
}

getPlatRec.addEventListener("change", function(e){
  e.preventDefault();
  var plat = e.target.files[0];
  console.log(e.target.files[0].name);
  var reader = new FileReader();
  reader.onload = function(plat){
    var img = new Image();
    img.onload = function(){
      //ctx2.width = img.width;
      //ctx2.height = img.height;
      ctx2.drawImage(img,0,img.height);
      //height += img.height;
      //console.log(height);
    }
    console.log(plat);
    console.log(e);
    img.src = event.target.result;

  }
  reader.readAsDataURL(plat);
  //ctx.height = height;
}, false);*/

/*****************************
Adds the files to the Canvas
*****************************/

function addFilesToCanvas(){
  for(var i = 0; i < myFiles.length; i++){
    var allFiles = myFiles[i];
    handleUploadedImg(allFiles);
    console.log(allFiles);
    console.log(allFiles.name);
  }
}

var handleUploadedImg = function(e){
  var reader = new FileReader();
  reader.onload = function(e){
    var img = new Image();
    img.onload = function(){
      ctx.width = img.width;
      //canvas.height = img.height;
      ctx.drawImage(img,0,height);
      height += img.height;
      console.log(height);
    }
    console.log(event);
    img.src = event.target.result;

  }
  reader.readAsDataURL(e);
  ctx.height = height;
};


/****************************
Code for pasting files
****************************/

test.addEventListener("paste",function(e){
  e.preventDefault();
  var items = (e.clipboardData || e.originalEvent.clipboardData).items;

  for(var i = 0; i < items.length; i++){
    var blob = items[i].getAsFile();
    myFiles.push(blob);
    fileCount.innerHTML = 'File Count: '+ myFiles.length;;
    //shows the files that have been uploaded on the page
    //fileShow.innerHTML = 'Files: ';
    if(i === items.length - 1){
      fileShow.innerHTML += blob.name + ','  + '\n';
    }
    //console.log(myFiles.src);
    //console.log(blob);
    console.log(blob.name);
    createImgSrc(blob);
    console.log(e.clipboardData);

  }

}, false);
/************************
Creates Img for pasted
************************/
var createImgSrc = function(src){
  console.log(src);
  //var source = window.URL.createObjectURL(src);
  var reader = new FileReader();
  reader.onload = function(src){
    var pasted = new Image();
    pasted.src = reader.readAsDataURL(src);
    console.log(pasted);
  }
}

var createImg = function(src){
  var pasted = new Image();
  var source = window.URL.createObjectURL(src);
  console.log(source);
  pasted.src = source;
  console.log(pasted);
  //ctx.clearRect(0, 0, canvas.width, canvas.height);

  pasted.onload = function(){
    ctx.drawImage(pasted, 0,height);
    ctx.width = pasted.width;
    height += pasted.height;
    ctx.height = height;

    console.log(height);
  }
};

function showAllFiles(){
  for(var i = 0; i < myFiles.length; i++){
    fileShow.innerHTML += myFiles[i].name + '\n';
  }
  console.log(myFiles.length);
}

showAllFiles();

function loadImage(e){
  img.onload = function(){
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img,0,0);
    height += img.height;
    console.log(height);
  }
}
