let Table

let exibition = false

function changeMode() {
    exibition = !exibition

    if (exibition) {
        document.getElementsByClassName('Mode')[0].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 306.637 306.637" xml:space="preserve"><g><g><path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.89l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"/><path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.09L265.13,75.602L231.035,41.507z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g></svg>'
        readCodeExibition(Table)
    } else {
        document.getElementsByClassName('Mode')[0].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 48 48"><title>eye-open</title><g id="Layer_2" data-name="Layer 2">  <g id="invisible_box" data-name="invisible box"><rect width="48" height="48" fill="none"/>  </g>  <g id="icons_Q2" data-name="icons Q2"><path d="M45.3,22.1h0C43.2,19.5,35.4,11,24,11S4.8,19.5,2.7,22.1a3,3,0,0,0,0,3.8C4.8,28.5,12.6,37,24,37s19.2-8.5,21.3-11.1A3,3,0,0,0,45.3,22.1ZM24,33c-8.8,0-15.3-6.2-17.7-9,2.4-2.8,8.9-9,17.7-9s15.3,6.2,17.7,9C39.3,26.8,32.8,33,24,33Z"/><circle cx="24" cy="24" r="6"/></g></g></svg>'
        readCode(Table)
    }
}

upload()

function upload() {
    fetch('./content.json')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data)
            Table = data.tables
            readCode(Table)
        });
}

function readCode(table) {
    let _main = document.getElementById('Tabelas')
    _main.innerHTML = ''
    let _main_table = document.createElement('table')
    _main_table.setAttribute('id', 'main_table')

    // CABEÇÁRIO
    let _main_table_header = document.createElement('thead')
    _main_table_header.innerHTML = '<tr><th colspan=4>' + table[0].title + '</th></tr>' +
        '<tr><th colspan="4"><strong id="main_geral">' + table[0].geral + '</strong></th></tr>'
    _main_table.appendChild(_main_table_header)

    // ATRIBUTOS
    let numLines = Math.ceil(table[0].nomes.length / 2)
    let _lines = []

    for (let i = 0; i < numLines; i++) {
        _lines[i] = document.createElement('tr')
    }

    for (let i = 0; i < table[0].nomes.length; i++) {
        _lines[Math.floor(i / 2)].innerHTML += '<td class="main_nome"><p>' + table[0].nomes[i] + '</p></td>' +
            '<td><input class="main_input" type="text" oninput="setMain()" placeholder=0 defaultvalue=' + table[0].value[i] + '></td>'
    }
    for (let i = 0; i < numLines; i++) {
        _main_table.appendChild(_lines[i])
    }

    // INSERINDO
    _main.appendChild(_main_table)


    // DIRETAS
    for (j = 1; j < table.length; j++) {
        let table = Table[j]
        let _table = document.createElement('table')
        _table.setAttribute('id', table.title)
        _table.setAttribute('class', table.color)

        // CABEÇÁRIO
        let _thead = document.createElement('thead')
        _thead.innerHTML =
            '<tr><th colspan=4>' + table.title + '</th></tr>' +
            '<tr><th colspan=4><strong>' + table.geral + '</strong></th></td>'

        _table.appendChild(_thead)

        // ATRIBUTOS
        let _tbody = document.createElement('tbody')
        let _topos = document.createElement('tr')
        _topos.setAttribute('class', 'topos')
        _topos.innerHTML = '<tr>' +
            '<td><p>Nome</p></td>' +
            '<td><p>Natural</p></td>' +
            '<td><p>Treinado</p></td>' +
            '<td><p>Total</p></td>' +
            '</tr>'

        _tbody.appendChild(_topos)

        // Linhas de atribuição
        for (let i = 0; i < table.nomes.length; i++) {
            _tbody.innerHTML +=
                '<tr>' +
                '<td class="naming"><p>' + table.nomes[i] + '</p></td>' +
                '<td><p class="nat">' + table.nat[i] + '</p></td>' +
                '<td><input class="add" type="text" placeholder=0 oninput="setTable(' + "'" + table.title + "'" + ', ' + j + ')" defaultvalue="" value=' + table.add[i] + '></td>' +
                '<td><p class="tot">' + table.tot[i] + '</p></td>' +
                '</tr>'
        }

        _table.appendChild(_tbody)

        // INSERINDO
        _main.appendChild(_table)
    }

    setNats()
}

function readCodeExibition(table) {
    let _main = document.getElementById('Tabelas')
    _main.innerHTML = ''
    let _main_table = document.createElement('table')
    _main_table.setAttribute('id', 'main_table')

    // CABEÇÁRIO
    let _main_table_header = document.createElement('thead')
    _main_table_header.innerHTML = '<tr><th colspan=4>' + table[0].title + '</th></tr>'
    _main_table.appendChild(_main_table_header)

    // ATRIBUTOS
    let numLines = Math.ceil(table[0].nomes.length / 2)
    let _lines = []

    for (let i = 0; i < numLines; i++) {
        _lines[i] = document.createElement('tr')
    }

    for (let i = 0; i < table[0].nomes.length; i++) {
        _lines[Math.floor(i / 2)].innerHTML += '<td class="main_nome"><p>' + table[0].nomes[i] + '</p></td>' +
            '<td><p>' + table[0].value[i] + '</p></td>'
    }
    for (let i = 0; i < numLines; i++) {
        _main_table.appendChild(_lines[i])
    }

    // INSERINDO
    _main.appendChild(_main_table)


    // DIRETAS
    for (j = 1; j < table.length; j++) {
        let table = Table[j]
        let _table = document.createElement('table')
        _table.setAttribute('id', table.title)
        _table.setAttribute('class', table.color)

        // CABEÇÁRIO
        let _thead = document.createElement('thead')
        _thead.innerHTML =
            '<tr><th colspan=4>' + table.title + '</th></tr>'

        _table.appendChild(_thead)

        // ATRIBUTOS
        let _tbody = document.createElement('tbody')

        // Linhas de atribuição
        for (let i = 0; i < table.nomes.length; i++) {
            _tbody.innerHTML +=
                '<tr>' +
                '<td class="naming"><p>' + table.nomes[i] + '</p></td>' +
                '<td><p class="tot">' + table.tot[i] + '</p></td>' +
                '</tr>'
        }

        _table.appendChild(_tbody)

        // INSERINDO
        _main.appendChild(_table)
    }

    let ps = document.getElementsByTagName('p')
    for(let i = 0; i < ps.length; i++){
        ps[i].setAttribute('class', 'Exibition-P')
        let str = ps[i].innerText
        if(str.includes('Armamento')){
            str = str.replace('Armamento', 'Arm.')
            ps[i].innerText = str
        }
    }
}

function setMain() {
    let _main_table = document.getElementById('main_table')
    let inps = _main_table.getElementsByTagName('input')

    // LIMPANDO OS INPUTS
    for (let i = 0; i < inps.length; i++) {
        if (isNaN(inps[i].value)) {
            inps[i].value = '0'
        }
        if (inps[i].value > 100) {
            inps[i].value = 100
        }
        inps[i].value = Math.floor(inps[i].value)


        Table[0].value[i] = Math.floor(Number(inps[i].value))
    }

    // SOMANDO OS INPUTS
    let geral = 0
    for (let i = 0; i < inps.length; i++) {
        geral += Number(inps[i].value)
    }

    Table[0].geral = Math.floor(geral)
    let main_geral = document.getElementById('main_geral')
    main_geral.innerText = Math.floor(Table[0].geral)

    setNats()
}

function setNats() {
    let _main = document.getElementById('Tabelas')

    for (let j = 1; j < Table.length; j++) {
        let table = Table[j]
        let _table = document.getElementById(table.title)
        let _nat = _table.querySelectorAll('p.nat')

        // CALCULANDO NATURAIS
        let mains = document.querySelectorAll('.main_input')
        for (let i = 0; i < _nat.length; i++) {
            let calc = table.Calcs[i]
            let result = 0
            let val1 = Number(mains[calc.val1].value)
            let val2 = Number(mains[calc.val2].value)
            if (calc.type == 'a') {
                table.nat[i] = Math.floor(linear(val1, val2))
            }
            if (calc.type == 'b') {
                table.nat[i] = Math.floor(linear3_1(val1, val2))
            }
            result = Math.floor(Number(table.nat[i]))
            _nat[i].innerHTML = result
        }

        //  CALCULANDO GERAL
        let calc = table.geralCalc
        let val1 = Number(mains[calc.val1].value)
        let val2 = Number(mains[calc.val2].value)
        let val3 = Number(mains[calc.val3].value)
        let val4 = Number(mains[calc.val4].value)
        table.geral = Math.floor(calc2211(val1, val2, val3, val4))

        _table.querySelector('strong').innerHTML = table.geral
        setTable(table.title, j)
    }

}

function calc2211(val1, val2, val3, val4) {
    let media = (val1 * 2 + val2 * 2 + val3 + val4) / 6
    media = media * 3
    return media
}

function linear(val1, val2) {
    let media = (val1 + val2) / 2
    return media
}

function linear3_1(val1, val2) {
    let media = (val1 * 3 + val2) / 4
    return media
}

function setTable(table_name, index) {
    let table = Table[index]
    let _table = document.getElementById(table_name)
    let nat = _table.querySelectorAll('p.nat')
    let add = _table.querySelectorAll('input.add')
    let tot = _table.querySelectorAll('p.tot')

    let geral = table.geral
    for (let i = 0; i < nat.length; i++) {
        // LINPANDO OS INPUTS
        if (isNaN(add[i].value)) {
            add[i].value = 0
        }
        if (add[i].value < 0) {
            add[i].value = 0
        }
        add[i].value = Number(add[i].value)
        table.add[i] = Number(add[i].value)

        // ATRIBUINDO AO JSON
        table.tot[i] = Number(table.nat[i]) + Number(table.add[i])

        tot[i].innerText = table.tot[i]
        nat[i].innerText = table.nat[i]

        geral -= table.add[i]
    }

    let _geral = _table.getElementsByTagName('strong')[0]
    _geral.innerText = geral
}