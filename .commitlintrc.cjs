const cp = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

const apps = fs.readdirSync(path.resolve(__dirname, 'apps'))
const internal = fs.readdirSync(path.resolve(__dirname, 'internal'))
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'))
const scopes = [...apps, ...internal, ...packages]

const gitStatus = cp.execSync('git status --porcelain || true').toString().trim().split('\n')

const scopeComplete = gitStatus
  .find((r) => ~r.indexOf('M  (packages|apps)'))
  ?.replace(/\//g, '%%')
  ?.match(/(packages|apps)%%((\w|-)*)/)?.[1]

/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    scopes,
    defaultScope: scopeComplete,
    customScopesAlign: !scopeComplete ? 'top' : 'bottom',
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false
  }
}
