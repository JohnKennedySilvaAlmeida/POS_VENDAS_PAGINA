exports.geraCartelas = function(cartelas) {   
  var layoutCartelas = {
    fillColor: function (rowIndex, node, columnIndex) {
      return (rowIndex % 2 === 0) ? null : '#CCCCCC';
    }
  }

  var contentCartelas = []

  cartelas.forEach(item => {
    var cartela = [[], [], [], [], []]
    for (let index = 0; index < cartela.length; index++) {
      cartela[index].push(item.bolas[index])
      cartela[index].push(item.bolas[index+5])
      cartela[index].push(item.bolas[index+10])
      cartela[index].push(item.bolas[index+15])
      cartela[index].push(item.bolas[index+20])
    }
    cartela.unshift([{text: 'Nº:.'+item.numero, colSpan: 5, alignment: 'center'}, {}, {}, {}, {}])
    contentCartelas.push({
      style: 'tableExample',
      table: {
        body: cartela
      },
      layout: layoutCartelas
    }) 
  })

  var columns = [[],[]]

  for(let i = 1; i <= contentCartelas.length; i=i+2) {
    columns[0].push(contentCartelas[i-1])
    columns[1].push(contentCartelas[i])
  }

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [ 5, 8, 5, 0 ],
    content: cartelas.length > 1
      ? {
        columns: columns,
        style: 'columnStyle' 
      }
      : contentCartelas,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [5, 5, 5, 5],
        fontSize: 32,
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      },
      columnStyle: {
        columnGap: 20,
        margin: [5, 5, 5, 5],
      }
    },
  }

  return docDefinition;
}

exports.geraPeriodos = function(cartelas) {
  var contentCartelas = []
  cartelas.forEach(item => {
    contentCartelas.push({
      text: item.bolas
    })
  })

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [ 5, 8, 5, 0 ],
    content: contentCartelas,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [5, 5, 5, 5],
        fontSize: 32,
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      },
      columnStyle: {
        columnGap: 20,
        margin: [5, 5, 5, 5],
      }
    },
  }

  return docDefinition;
}