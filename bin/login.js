var http = require('http'),
    querystring = require('querystring'),
    fs = require('fs'),
    cheerio = require('cheerio');

function requisitar(mat, senha, callback){
  var result = {
    'resultado': 'OFF'
  };
  var contentPOST = querystring.stringify({
    'edtIdUs': mat,
    'edtIdSen': senha,
    'btnIdOk': 'submit'
  });
  var headerPOST = {
    host: 'academico.ufrrj.br',
    path: '/quiosque/aluno/quiosque.php',
    method: 'POST',
    Connection: 'keep-alive',
    headers: {
      'Content-Length': contentPOST.length,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  console.log('\nRequerendo: POST /quiosque.php');
  var cliente =  http.request(headerPOST, function(resp){
    resp.setEncoding('utf8');

    var html = '';
    resp.on('data', function(data){
      html += data;
    });

    resp.on('end',function(){
      var $ = cheerio.load(html);
      var nome = $('#info_us').text();
      nome = nome.substring(19,nome.indexOf(' '));
      inicial = nome.slice(0,1);
      nome = inicial+nome.substring(1).toLowerCase();
      console.log('Quiosque acessado:');
      console.log(nome+' online.');
      result['resultado'] = 'ON';
      result['nome'] = nome;
      callback();
    });
  });

  cliente.on('error', function(e) {
    console.log('DEU ZEBU NA REQUISIçÃO: ' + e.message);
    callback();
  });
  cliente.write(contentPOST);
  cliente.end();
  return result;
}


exports.requisitar = requisitar;
