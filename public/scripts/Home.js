
function startScanning(){
      let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
      scanner.addListener('scan', function (content) {
            scanner.stop();
            const name = prompt("Please Enter your Name");
            if (name == null || name == "") {
                  window.location = window.location.href;
            }else{
                  window.location = content+'&name='+name;
            }

      });
      Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
            scanner.start(cameras[2]);
      } else {
            alert('No cameras found.');
      }
      }).catch(function (e) {
            alert(e);
      });  
}