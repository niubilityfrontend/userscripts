import { getinfokey, getTeacherInfoFromDetailPage, settings, submit } from './common'

/**
 *
 *
 * @param {JQuery<Element>} jqr
 */
function processTeacherDetailPage(jqr) {
  /** @type {TeacherInfo} */
  let tinfo_saved = GM_getValue(getinfokey(), {})

  tinfo_saved = getTeacherInfoFromDetailPage(tinfo_saved, jqr, {})

  GM_setValue(getinfokey(), tinfo_saved)
}

if (settings.isDetailPage) {
  submit(function(next) {
    processTeacherDetailPage($(document))
    next()
  })
}
