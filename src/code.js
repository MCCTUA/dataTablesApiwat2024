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