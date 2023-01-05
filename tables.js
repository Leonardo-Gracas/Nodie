let Data
let Table
let saves = [null, null, null]
let this_file = 0;

let exibition = false

getSaves()

function getSaves() {
    let _header = document.getElementById('header')
    _header.innerHTML = ''
    _header.innerHTML += '<h1>Selecione um slot</h1>'
    _header.innerHTML += '<div id="slots"></div>'
    _header.setAttribute('class', 'center')

    let _body = document.querySelector('body')
    _body.setAttribute('class', 'center')

    let _slots = document.getElementById('slots')

    let _content_body = document.getElementById('main')
    _content_body.innerHTML = ''
    for (let i = 0; i < 3; i++) {
        saves[i] = JSON.parse(localStorage.getItem('save_' + i))
        if (saves[i] != null) {
            nome = saves[i].NomePersonagem == '' ? 'Sem Nome' : saves[i].NomePersonagem
            _slots.innerHTML += '<button class="save_slot" onclick="upload(\'s\', ' + i + ')">' + nome + '</button>'
        } else {
            _slots.innerHTML += '<button class="save_slot" onclick="upload(\'n\', ' + i + ')">Vazio</button>'
        }
    }
}

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

function upload(tem_salvo, num) {

    let _body = document.getElementsByTagName('body')[0]
    _body.setAttribute('class', '')
    _body.innerHTML = ''
    _body.innerHTML += '<header id="header"> <button onclick="getSaves()">↩</button> </header>'
    _body.innerHTML += '<div id="main"></div>'


    let _header = document.getElementById('header')
    _header.setAttribute('class', '')
    _header.innerHTML += '<div id="files"><button id="download_file">Download da ficha</button></div>'
    let _dowload = document.getElementById("download_file")
    _dowload.setAttribute('onclick', 'dowload_file()')

    let _files = document.getElementById('files')
    _files.innerHTML += '<label id="file_custom"><input type="file" Name="." accept=".json" oninput="open_file()" id="open_file">Abrir arquivo</label>'



    let _main = document.getElementById('main')
    _main.innerHTML = ''
    _main.innerHTML += '<button class="Mode" defer onclick=changeMode()><svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 48 48"><title>eye-open</title><g id="Layer_2" data-name="Layer 2">  <g id="invisible_box" data-name="invisible box"><rect width="48" height="48" fill="none"/>  </g>  <g id="icons_Q2" data-name="icons Q2"><path d="M45.3,22.1h0C43.2,19.5,35.4,11,24,11S4.8,19.5,2.7,22.1a3,3,0,0,0,0,3.8C4.8,28.5,12.6,37,24,37s19.2-8.5,21.3-11.1A3,3,0,0,0,45.3,22.1ZM24,33c-8.8,0-15.3-6.2-17.7-9,2.4-2.8,8.9-9,17.7-9s15.3,6.2,17.7,9C39.3,26.8,32.8,33,24,33Z"/><circle cx="24" cy="24" r="6"/></g></g></svg></button>'
    _main.innerHTML += '<div class="front"><section id="Perfil"></section><section id="Tabelas"></section></div>'
    _main.innerHTML += '<div id="lists"><section id="pericias"></section><section id="inventory"></section></div>'


    this_file = num
    try {
        if (tem_salvo == 's') {
            let index = 'save_' + num

            let data = JSON.parse(localStorage.getItem(index))
            Data = data
            Table = data.tables
            readCode(Table)
            return
        }

    }
    catch (err) {
        localStorage.removeItem('save_' + tem_salvo)
    }

    fetch('./content.json')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            Data = data
            Table = data.tables
            readCode(Table)
        });
}

function save() {
    Data.tables = Table
    let nome = document.getElementById('NomePersonagem')
    Data.NomePersonagem = nome.value
    localStorage.setItem('save_' + this_file, JSON.stringify(Data))
}

function readCode(table) {
    let _perfil = document.getElementById('Perfil')
    _perfil.innerHTML = ''
    _perfil.innerHTML += '<input type="text" placeholder="Nome" onchange=save() id="NomePersonagem">'
    _perfil.innerHTML += '<div id="stats"></div>'

    let _stats = document.getElementById('stats')
    _stats.innerHTML += '<strong id="hp"></strong>'
    _stats.innerHTML += '<strong id="def"></strong>'
    _stats.innerHTML += '<strong id="red"></strong>'
    _stats.innerHTML += '<strong id="agl"></strong>'
    _stats.innerHTML += '<strong id="dmg"></strong>'

    let _input_nome = document.getElementById('NomePersonagem')
    _input_nome.setAttribute('value', Data.NomePersonagem)

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
            '<td><input class="main_input" type="text" oninput="setMain()" placeholder=0 value=' + table[0].value[i] + '></td>'
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
                '<td><input class="add" type="text" placeholder=0 oninput="setTable(' + "'" + table.title + "'" + ', ' + j + ')" value=' + table.add[i] + '></td>' +
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
    for (let i = 0; i < ps.length; i++) {
        ps[i].setAttribute('class', 'Exibition-P')
        let str = ps[i].innerText
        if (str.includes('Armamento')) {
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
    setStats()
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
        console.log(add[i].value)
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
    save()
}

function setStats() {
    let MainValues = Data.tables[0].value

    let _hp = document.getElementById('hp')
    let hp = 1 + MainValues[2] * 3 + MainValues[0] * 2
    _hp.innerHTML = 'Hp:  <input type="text"  oninput="resize()"id="hpAtual" value=' + hp + ' />/' + hp
    Data.stats.hp = hp

    let guarda = Data.tables[1].tot[4]
    let _def = document.getElementById('def')
    let def = 1 + MainValues[2] * 4 + MainValues[0] + guarda
    _def.innerHTML = 'Defesa: ' + def
    Data.stats.def = def

    let _red = document.getElementById('red')
    let red = MainValues[2] * 2
    let extra = guarda > 1 ? ' + 1d' + (Math.floor(guarda / 2) * 2) : ''
    _red.innerHTML = red > 0 ? 'Redução: 1d' + red + extra : 'Redução: 0'
    Data.stats.red = red

    let atletismo = Data.tables[2].tot[0]
    let _agl = document.getElementById('agl')
    let agl = -5 + MainValues[1] * 4 + MainValues[3] + atletismo
    _agl.innerHTML = 'Agilidade: 1d6 ' + (agl == 0 ? '' : agl < 0 ? '- ' : '+ ') + (agl == 0 ? '' : Math.abs(agl))
    Data.stats.agl = agl

    let _dmg = document.getElementById('dmg')
    let dmg = MainValues[0] * 1.20
    _dmg.innerHTML = 'Dano: ' + dmg
    Data.stats.dmg = dmg

    setInventory()
    setPericias()
}

function setInventory() {
    let _inventory = document.getElementById('inventory')
    _inventory.innerHTML = ''
    _inventory.innerHTML += '<h3>Inventário</h3>'
    _inventory.innerHTML += '<div id="itens"></div>'
    _inventory.innerHTML += '<div id="foot"></div>'

    let _itens = document.getElementById('itens')
    _itens.innerHTML = ''

    for (let i = 0; i < Data.inventory.length; i++) {
        _itens.innerHTML += '<div class="item"><textarea type="text" id="item_' + i + '_nome">' + Data.inventory[i].nome + '</textarea><input type="number" min=1 id="item_' + i + '_qtd"><button onclick="removeItem(' + i + ')" id="remove_button_' + i + '">x</button></div>'

        let item_nome = document.getElementById("item_" + i + "_nome")
        item_nome.setAttribute('oninput', 'setItems(), resize(' + i + ')')
        item_nome.setAttribute('class', 'nome')

        let item_qtd = document.getElementById("item_" + i + "_qtd")
        item_qtd.setAttribute('value', Data.inventory[i].qtd)
        item_qtd.setAttribute('oninput', 'setItems()')
        item_qtd.setAttribute('class', 'qtd')
        item_qtd.setAttribute('placeholder', 'Qtd')
        resize(i)
    }

    window.addEventListener('resize', (e) => {
        for (let j = 0; j < Data.inventory.length; j++) {
            resize(j)
        }
        for (let j = 0; j < Data.pericias.length; j++) {
            habResize(j)
        }
    })
    let _foot = document.getElementById('foot')
    _foot.innerHTML = ''
    _foot.innerHTML += '<button id="add_item" onclick="addItem()">Adicionar</button>'

    save()
}

function setPericias(){
    let _pericias = document.getElementById('pericias')
    _pericias.innerHTML = ''
    _pericias.innerHTML += '<h3>Perícias / Habilidades</h3>'
    _pericias.innerHTML += '<div id="habs"></div>'
    _pericias.innerHTML += '<div id="hab_foot"></div>'

    let _habs = document.getElementById('habs')
    _habs.innerHTML = ''
    console.log(Data.pericias)

    for(let i = 0; i < Data.pericias.length; i++){
        _habs.innerHTML += '<div class="hab"><textarea type="text" id="hab_' + i + '_nome">' + Data.pericias[i].nome + '</textarea><input type="number" min=1 id="hab_' + i + '_qtd"><button onclick="removeHab(' + i + ')" id="remove_hab_button_' + i + '">x</button></div>'

        let hab_nome = document.getElementById("hab_" + i + "_nome")
        hab_nome.setAttribute('oninput', 'setHabs(), habResize(' + i + ')')
        hab_nome.setAttribute('class', 'nome')

        let hab_qtd = document.getElementById("hab_" + i + "_qtd")
        hab_qtd.setAttribute('value', Data.pericias[i].qtd)
        hab_qtd.setAttribute('oninput', 'setHabs()')
        hab_qtd.setAttribute('class', 'qtd')
        hab_qtd.setAttribute('placeholder', 'Qtd')
    }

    let _foot = document.getElementById('hab_foot')
    _foot.innerHTML = ''
    _foot.innerHTML += '<button id="add_hab" onclick="addHab()">Adicionar</button>'

    save()
}

function setItems() {
    let inventory = Data.inventory

    let _itens = document.getElementById('itens')
    let inps = _itens.getElementsByTagName('input')
    let texts = _itens.querySelectorAll('textarea')

    for (let i = 0; i < inventory.length; i++) {
        inventory[i].nome = texts[i].value
        inventory[i].qtd = Number(inps[i].value)
    }

    Data.inventory = inventory
    save()
}

function setHabs(){
    let pericias = Data.pericias

    let _habs = document.getElementById('habs')
    let inps = _habs.getElementsByTagName('input')
    let texts = _habs.querySelectorAll('textarea')

    for (let i = 0; i < pericias.length; i++) {
        pericias[i].nome = texts[i].value
        pericias[i].qtd = Number(inps[i].value)
    }

    Data.pericias = pericias
    save()
}

function addItem() {
    Data.inventory[Data.inventory.length] = { nome: '', qtd: 0 }
    setInventory()
}

function addHab() {
    Data.pericias[Data.pericias.length] = { nome: '', qtd: 0 }
    setPericias()
}

function removeItem(index) {
    let nome = Data.inventory[index].nome
    if(nome == ''){
        nome = 'Sem nome'
    }
    let permissao = confirm("Deseja mesmo excluir o seguinte item:\n" + nome)
    if (permissao) {
        console.log(`Removido: ${Data.inventory[index].nome}, x${Data.inventory[index].qtd}`)
        Data.inventory.splice(index, 1)
        setInventory()
    }
}

function removeHab(index) {
    let nome = Data.pericias[index].nome
    if(nome == ''){
        nome = 'Sem nome'
    }
    let permissao = confirm("Deseja mesmo excluir a seguinte habilidade:\n" + nome)
    if (permissao) {
        console.log(`Removido: ${Data.pericias[index].nome}, x${Data.pericias[index].qtd}`)
        Data.pericias.splice(index, 1)
        setPericias()
    }
}

function resize(index) {
    let _hp = document.getElementById('hpAtual')
    _hp.style.width = '14px'
    _hp.style.width = _hp.scrollWidth + 'px'
    try {
        let element = document.getElementById('item_' + index + '_nome')
        element.style.height = '16px'
        element.style.height = element.scrollHeight + 'px'

        let qtd = document.getElementById('item_' + index + '_qtd')
        qtd.style.height = '16px'
        qtd.style.height = element.scrollHeight + 'px'

        let button = document.getElementById('remove_button_' + index)
        button.style.height = '16px'
        button.style.height = element.scrollHeight + 'px'
    } catch (err) {
        return
    }
}

function habResize(index) {
    try {
        let element = document.getElementById('hab_' + index + '_nome')
        element.style.height = '16px'
        element.style.height = element.scrollHeight + 'px'

        let qtd = document.getElementById('hab_' + index + '_qtd')
        qtd.style.height = '16px'
        qtd.style.height = element.scrollHeight + 'px'

        let button = document.getElementById('remove_hab_button_' + index)
        button.style.height = '16px'
        button.style.height = element.scrollHeight + 'px'
    } catch (err) {
        return
    }
}

function dowload_file() {
    let dataStr = JSON.stringify(Data);
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    let exportFileDefaultName = Data.NomePersonagem + '.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click()
}

function open_file() {
    let _input = document.getElementById('open_file')

    let reader = new FileReader()
    reader.onload = log_file
    reader.readAsText(_input.files[0])

}

function log_file(event) {

    localStorage.setItem('save_' + this_file, event.target.result)
    upload('s', this_file)
}