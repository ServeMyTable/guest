
function startScanning(){
      let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
      scanner.addListener('scan', function (content) {
            //alert(content);
            scanner.stop();
            //alert('Scanning Completed click OK to view Menu!!')
            const name = prompt("Please Enter your Name");
            //alert(name);
            window.location = content+'&name='+name;

      });
      Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
            scanner.start(cameras[2]);
      } else {
            console.error('No cameras found.');
      }
      }).catch(function (e) {
            console.error(e);
      });  
}