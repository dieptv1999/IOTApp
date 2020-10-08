
class HomeService {

  constructor() {
  }
  async uploadFile(uri: string, typeFile: string, name: string, size: number) {
    console.log("uri" + uri)
    // const split = uri.split('/');
    // const realName = split.pop();
    // const inbox = split.pop();
    // const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
    // // require the module
    var RNFS = require('react-native-fs');
    console.log(`${RNFS.TemporaryDirectoryPath}`)
    var uploadUrl = 'http://10.113.1.134:8080/v1/file/';
    // create an array of objects of the files you want to upload
    var files = [
      {
        name: name,
        filename: name,
        filepath: uri,
      },
    ];

    var uploadBegin = (response: any) => {
      var jobId = response.jobId;
      console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    };

    var uploadProgress = (response: any) => {
      var percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
      console.log('UPLOAD IS ' + percentage + '% DONE!');
    };

    // upload files
    RNFS.uploadFiles({
      toUrl: uploadUrl,
      files: files,
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      begin: uploadBegin,
      progress: uploadProgress
    }).promise.then((response: any) => {
      if (response.statusCode == 200) {
        console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
      } else {
        console.log('SERVER ERROR');
      }
    })
      .catch((err: any) => {
        if (err.description === "cancelled") {
          // cancelled by user
        }
        console.log(err);
      });
  }
}
var homeServices = new HomeService();
export default homeServices;