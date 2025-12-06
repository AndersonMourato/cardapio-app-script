function doGet() {
  const htmlOutput = HtmlService.createTemplateFromFile('index').evaluate();
  
  htmlOutput.setTitle('Cardápio');

  return htmlOutput;
}

function adicionarDados(tabela, dados) {
  const tabelaSheet = getTabela(tabela);

  try {
    tabelaSheet.appendRow(dados);
    Logger.log(`Dados adicionado com sucesso.`);
    return { success: true, message: 'Dados adicionados com sucesso!' };

  } catch (error) {
    Logger.log(`Não foi gravar os dados na tabela ${tabela}. Erro: ${error.message}`);
    return { success: false, message: `Não foi gravar os dados na tabela ${tabela}. Erro: ${error.message}` };
  }
}

function lerDadosPlanilha(tabela) {
  const tabelaSheet = getTabela(tabela);
  
  const intervaloComDados = tabelaSheet.getDataRange();
  const dados = intervaloComDados.getValues();
  
  if (!dados) {
    return { success: false, message: `Erro: Não foi encontrado dados na tabela "${tabela}".` };
  }
  return dados;
}

function getTabela(tabela){
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  const tabelaSheet = planilha.getSheetByName(tabela); 
  
  if (!tabelaSheet) {
    return { success: false, message: `Erro: A tabela "${tabela}" não foi encontrada.` };
  }

  return tabelaSheet;
}