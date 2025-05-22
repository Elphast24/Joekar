module.exports = function templateEngine(template, data) {
  return template.replace(/{{%(\w+)%}}/g, (_, key) => data[key] || '');
};
