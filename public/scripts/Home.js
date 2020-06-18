
function startScanning(){
      let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
      scanner.addListener('scan', function (content) {
            //alert(content);
            scanner.stop();
            alert('Scanning Completed click OK to view Menu!!')
            window.location = content;

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