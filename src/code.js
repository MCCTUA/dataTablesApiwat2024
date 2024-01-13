function doGet() {
    return HtmlService.createTemplateFromFile('index')
        .evaluate()
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

function getData() {
    let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sheet1')
    let data = ss.getDataRange().getDisplayValues()
    Logger.log(data)
    let headers = data.shift()
    Logger.log(headers)
    return { data: data, headers: headers }
}

function saveData(obj) {
    const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1')
    const folder = DriveApp.getFolderById('1hjgAMvEB2t5h3B4e5T2nSgVdbZUdbAp6')
    if (obj.myfile) {
        const fileUrl = folder.createFile(obj.myfile).getUrl()
        const fileId = fileUrl.split('/')[5]
        ss.appendRow([obj.input1, obj.input2, "'" + obj.input3, obj.input4, obj.input5, obj.input6, `https://lh3.googleUserContent.com/d/${fileId}`])
    } else {
        ss.appendRow([obj.input1, obj.input2, "'" + obj.input3, obj.input4, obj.input5, obj.input6])
    }


}