const { Theme } = require('../../models')
const { filterQuizzesFromTheme } = require('../quizzes/manager')

/**
 * Function buildTheme.
 * This function aggregates the quizzes from the database to build a theme with all the data needed by the clients.
 * @param themeId
 */
const buildTheme = (themeId) => {
  const theme = Theme.getById(themeId)
  const quizzes = filterQuizzesFromTheme(theme.id)
  
  return { ...theme, quizzes }
}

/**
 * Function buildThemes.
 * This function aggregates the quizzes from the database to build entire themes.
 */
const buildThemes = () => {
  const themes = Theme.get()
  return themes.map((theme) => buildTheme(theme.id))
}

module.exports = {
  buildTheme,
  buildThemes,
}
