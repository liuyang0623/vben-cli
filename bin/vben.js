#! /usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const vbenVersion = require("../package.json").version;
program
  // 定义命令和参数
  .command("create <app-name>")
  .description("create a new project powered by vben-cli-service")
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option("-f, --force", "overwrite target directory if it exist")
  .option('--merge', 'Merge target directory if it exists')
  .action((name, options) => {
    // 打印执行结果
    require('../lib/create')(name, options);
  });
program
  .command("info")
  .description("print debugging information about your environment")
  .action((cmd) => {
    console.log(chalk.bold("\nEnvironment Info:"));
    require("envinfo")
      .run(
        {
          System: ["OS", "CPU"],
          Binaries: ["Node", "Yarn", "npm"],
          Browsers: ["Chrome", "Edge", "Firefox", "Safari"],
          npmPackages: "/**/{typescript,*vue*,@vue/*/}",
          npmGlobalPackages: ["@vue/cli"],
        },
        {
          showNotFound: true,
          duplicates: true,
          fullTree: true,
        }
      )
      .then(console.log);
  });
program
  // 配置版本号信息
  .version(`v${vbenVersion}`)
  .usage("<command> [options]");

// 解析用户执行命令传入参数
program.parse(process.argv);
