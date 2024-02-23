function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

//----------------------------------------------------------------------
/**
 * Include File
 */

function include(file) {
  return HtmlService.createHtmlOutputFromFile(file).getContent()
}
//----------------------------------------------------------------------

function getDataWorkSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sheet1')
  const data = ss.getDataRange().getDisplayValues()
  const idRow = data.map((row) => row[0])
  const folder = DriveApp.getFolderById('1hjgAMvEB2t5h3B4e5T2nSgVdbZUdbAp6')

  let dataObj = {
    ss,
    data,
    idRow,
    folder,
  }

  return dataObj
}

function getData() {
  let { data } = getDataWorkSheet()
  let headers = data.shift()
  return { data: data, headers: headers }
}

function saveData(obj) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1')
    const folder = DriveApp.getFolderById('1hjgAMvEB2t5h3B4e5T2nSgVdbZUdbAp6')
    if (obj.myfile) {
      const fileUrl = folder.createFile(obj.myfile).getUrl()
      const fileId = fileUrl.split('/')[5]
      let idRec = idAuto.getID(ss)
      ss.appendRow([
        idRec,
        obj.input2,
        "'" + obj.input3,
        obj.input4,
        obj.input5,
        obj.input6,
        new Date(obj.input7).toLocaleDateString('th-TH', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        // `https://lh3.googleUserContent.com/d/${fileId}`,
        fileUrl,
      ])
    } else {
      ss.appendRow([
        obj.input1,
        obj.input2,
        "'" + obj.input3,
        obj.input4,
        obj.input5,
        obj.input6,
        obj.input7,
      ])
    }
  } catch (error) {
    console.error('Error', error)
  }
}

function updateData(obj) {
  try {
    const { ss, idRow, folder } = getDataWorkSheet()
    // rowId มาจาก <input id="rowId" name="rowId" hidden/>
    let index = idRow.indexOf(obj.rowId)
    console.log('index', idRow, index)
    let oldLink = ss.getRange(index + 1, 9).getValue()
    let saveLink = oldLink
    // เช็คว่ามี file ถูก upload มาหรือไม่
    if (obj.myfile.length > 0) {
      let file = folder.createFile(obj.myfile)
      let newLink = `https://lh3.googleUserContent.com/d/${
        file.getUrl().split('/')[5]
      }`
      //ลบไฟล์เก่าทิ้ง
      DriveApp.getFileById(oldLink.split('/')[4]).setTrashed(true)
      saveLink = newLink
    }
    let updateRow = [
      obj.input2,
      "'" + obj.input3,
      obj.input4,
      obj.input5,
      obj.input6,
      obj.input7,
      saveLink,
    ]
    console.log('update row : ', updateRow)
    // id เราไม่แก้ไขดังนี้น ต้องเร่ิมตั้งแต่ column 2 เป็นต้นไป

    ss.getRange(index + 1, 2, 1, 8).setValues([updateRow])
  } catch (error) {
    console.error('Error', error)
  }
}

/**
 * Delete ลบข้อมูลใน Sheet
 */

function deleteRecord(numId) {
  const { ss, idRow } = getDataWorkSheet()
  let index = idRow.indexOf(numId)
  // ลบไฟล์ที่ upload มาก่อนหน้าด้วย
  let file = ss.getRange(index + 1, 9).getValue()
  let idFile = file.split('/')[5]
  DriveApp.getFileById(idFile).setTrashed(true)
  // ลบข้อมูลใน sheet
  ss.deleteRow(index + 1)
}

/**
 * Check User Status เช็คสิทธิ์
 */

function getUser() {
  const ssUser = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('user')
  const dbUser = ssUser.getDataRange().getDisplayValues().slice(1)

  console.log(dbUser)
  return dbUser
}
