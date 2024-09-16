export function getWebProjDevData(originDataArr, language) {
  return originDataArr
    .map((product) => {
      const { pro_id, info_zh, info_en, repo_url, web_url, guide_url, ...others } = product
      const linkUrl = []
      if (web_url !== '') {
        const web = { type: 'web', url: web_url }
        linkUrl.push(web)
      }

      if (repo_url !== '') {
        const repo = { type: 'github', url: repo_url }
        linkUrl.push(repo)
      }

      const info = language === 'en' ? info_en : info_zh
      const isShowDevelopLabel = pro_id !== '001' ? true : false

      return {
        cardId: pro_id,
        info,
        linkUrl,
        isShowDevelopLabel,
        guideUrl: guide_url,
        ...others
      }
    })
    .sort((a, b) => b.cardId.localeCompare(a.cardId, undefined, { numeric: true }))
}
