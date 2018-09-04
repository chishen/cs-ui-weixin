let fs = require('fs');
let path = require('path');
const Name = 'checkbox';
//判断文件是否存在
if(!fs.existsSync(__dirname + '/packages/' + Name)){
  fs.mkdirSync(__dirname + '/packages/' + Name);
  fs.mkdirSync(__dirname + '/packages/' + Name + '/src');
  let write_data = '<template>\n' +
    '  <i class="cs-' + Name + '"></i>\n' +
    '</template>\n' +
    '\n' +
    '<script>\n' +
    '  export default {\n' +
    '    name: "Cs' + firstUpperCase(Name) + '",\n' +
    '    props: {\n' +
    '      type: String\n' +
    '    }\n' +
    '  };\n' +
    '</script>\n' +
    '<style rel="stylesheet/less" lang="less">\n' +
    '  @import "../../common.less";\n' +
    '</style>\n';
  fs.writeFile(__dirname + '/packages/' + Name + '/src' + '/' + Name + '.vue', write_data, function (err) {
    if(err) {
      console.error(err);
    } else {
      console.log('写入成功');
    }
  });
  let write_index = 'import Cs' + firstUpperCase(Name) + ' from \'./src/' + Name + '.vue\'\n' +
    '\n' +
    'Cs' + firstUpperCase(Name) + '.install = function (Vue) {\n' +
    '  Vue.component(Cs' + firstUpperCase(Name) + '.name,' +
    ' Cs' + firstUpperCase(Name) + ')\n' +
    '}\n' + '\n' + 'export default Cs' + firstUpperCase(Name) + '\n';
  fs.writeFile(__dirname + '/packages/' + Name + '/index.js', write_index, function (err) {
    if(err) {
      console.error(err);
    } else {
      console.log('写入成功');
    }
  });
}

fs.readdir(__dirname + '/packages/' ,function(err,files){
  let fileList = files.filter((name) => {
    return name.indexOf('.') <= -1 && name !== 'font'
  })

  let impt = "";
  let component = "";
  // let expt = "";
  for(var i = 0; i < fileList.length; i++){
    impt += ("import " + firstUpperCase(fileList[i]) + " from './" + fileList[i] + "/index.js'\n");
    if(i === fileList.length - 1){
      component += ("  " + firstUpperCase(fileList[i]) + "\n");
      // expt += (firstUpperCase(fileList[i]));
    }else{
      component += ("  " + firstUpperCase(fileList[i]) + ",\n");
      // expt += (firstUpperCase(fileList[i]) + ', ');
    }
  }
  let write_data = impt +
    "\n" +
    "const Component = [\n" +
    component +
    "]\n" +
    "\n" +
    "const install = function (Vue) {\n" +
    "  Component.map(component => {\n" +
    "    Vue.component(component.name, component)\n" +
    "  })\n" +
    "}\n" +
    "\n" +
    "if (typeof window !== 'undefined' && window.Vue) {\n" +
    "  install(window.Vue)\n" +
    "}\n" +
    "\n" +
    "const Cs = {\n" +
    "  install,\n" +
    component +
    "}\n" +
    "\n" +
    "export {\n" + component + "}\n" +
    "\n" +
    "export default Cs\n"
  fs.writeFile(__dirname + '/packages/' + '/index.js', write_data, function (err) {
    if(err) {
      console.error(err);
    } else {
      console.log('写入成功');
    }
  });
})

function firstUpperCase(name) {
  if(name.indexOf('-') > -1){
    let list = name.split('-');
    let str = '';
    for(let i = 0; i < list.length; i++) {
      str += list[i].substr(0, 1).toUpperCase() + list[i].substr(1)
    }
    return str
  }else{
    return name.substr(0, 1).toUpperCase() + name.substr(1)
  }
}




