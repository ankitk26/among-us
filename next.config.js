const removeImports = require("next-remove-imports")();

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
};
module.exports = removeImports({});
