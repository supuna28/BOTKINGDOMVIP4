
let moment = require('moment-timezone')
const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let fs = require('fs')
let handler = async (m, {conn}) => {
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
let anu = `${ucapan()}
හෙලෝ👋

Runtime: ${uptime}`
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           hydratedContentText: anu,
           locationMessage: { 
           jpegThumbnail: gambar() }, 
           hydratedFooterText: `${date}`,
           hydratedButtons: [{
             urlButton: {
               displayText: '📍instagram',
               url: instagram
             }

           },
               {
             quickReplyButton: {
               displayText: 'Menu',
               id: '.menu',
             }

           },
               {
             quickReplyButton: {
               displayText: 'speed',
               id: '.ping',
             }

           }]
         }
       }
     }), { userJid: m.sender, quoted: m });
    //conn.reply(m.chat, text.trim(), m)
    return await conn.relayMessage(
         m.chat,
         template.message,
         { messageId: template.key.id }
     )
}
handler.customPrefix = /^.alive$/i // ketik bot (tanpa prefix)
handler.command = new RegExp
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
module.exports = handler

function ucapan() {
  const time = moment.tz('Asia/Colombo').format('HH')
  if (time >= 5) {
    res = "සුභ උදෑසනක්🌄"
  }
  if (time > 9) {
    res = "සුභ දහවලක්🏞️"
  }
  if (time >= 15) {
    res = "සුභ සවසක්🌇"
  }
  if (time >= 19) {
    res = "සුභ රාත්‍රියක් 😴🌃"
  }
  return res
}
function gambar() {
  const time = moment.tz('Asia/Colombo').format('HH')
  if (time >= 5) {
    res = fs.readFileSync('./media/pagi.jpg')
  }
  if (time > 9) {
    res = fs.readFileSync('./media/siang.jpg')
  }
  if (time >= 15) {
    res = fs.readFileSync('./media/sore.jpg')
  }
  if (time >= 19) {
    res = fs.readFileSync('./media/malam.jpg')
  }
  return res
}
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
