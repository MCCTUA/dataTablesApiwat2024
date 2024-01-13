function doGet() {
    return HtmlService.createTemplateFromFile('index')
        .evaluate()
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

function getDataWorkSheet() {
    let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sheet1')
    let data = ss.getDataRange().getDisplayValues()

    let dataObj = {
        ss,
        data
    }

    return dataObj
}

function getData() {
    let { data } = getDataWorkSheet()
    let headers = data.shift()
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

function deleteRecord(numId) {
    const { data, ss } = getDataWorkSheet()
    let idRow = data.map(row => row[0])
    let index = idRow.indexOf(numId)
    ss.deleteRow(index + 1)
}