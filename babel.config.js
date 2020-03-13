const presets = [
  [
    "@babel/env",
    {
      targets: {
        ie: "9",
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1"
      },
      corejs: "3",
      useBuiltIns: "usage"
    }
  ]
];

module.exports = { presets }