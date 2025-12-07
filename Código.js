function doGet(e) {
  try {
    const page = e.parameter.page || 'index';
    const allowedPages = ['index', 'adicionar'];
    const pageName = allowedPages.includes(page) ? page : 'index';
    const template = HtmlService.createTemplateFromFile(pageName);
    
    template.base_url = ScriptApp.getService().getUrl();
    
    const htmlOutput = template.evaluate();
    
    htmlOutput.setTitle('Cardápio - ' + pageName);
    
    return htmlOutput;
  } catch (error) {
    Logger.log(`Erro ao carregar página: ${error.message}`);
    
    const errorHtml = HtmlService.createHtmlOutput(`
      <h1>Erro ao carregar página</h1>
      <p><strong>Mensagem:</strong> ${error.message}</p>
      <p><strong>Página solicitada:</strong> ${e.parameter.page || 'index'}</p>
      <p><a href="?page=index">Voltar para página inicial</a></p>
    `);
    errorHtml.setTitle('Erro');
    
    return errorHtml;
  }
}

function addData(keyTable, data) {
  const table = getTable(keyTable);

  try {
    table.appendRow(data);

    return { success: true, message: 'Dados adicionados com sucesso!' };
  } catch (error) {
    return { success: false, message: `Não foi gravar os dados na tabela ${keyTable}. Erro: ${error.message}` };
  }
}

function getAllData(keyTable) {
  const table = getTable(keyTable);
  const data = table.getDataRange().getValues();
  
  if (!data) {
    return { success: false, message: `Erro: Não foi encontrado dados na tabela "${keyTable}".` };
  }
  return data;
}

function getTable(keyTable){
  const table = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(keyTable); 
  
  if (!table) {
    return { success: false, message: `Erro: A tabela "${keyTable}" não foi encontrada.` };
  }

  return table;
}