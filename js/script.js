class Pix {
    constructor(pixKey, description, merchantName, merchantCity, txid, amount) {
      this.pixKey = pixKey;
      this.description = description;
      this.merchantName = merchantName;
      this.merchantCity = merchantCity;
      this.txid = txid;
      this.amount = amount.toFixed(2);
  
      this.ID_PAYLOAD_FORMAT_INDICATOR = "00";
      this.ID_MERCHANT_ACCOUNT_INFORMATION = "26";
      this.ID_MERCHANT_ACCOUNT_INFORMATION_GUI = "00";
      this.ID_MERCHANT_ACCOUNT_INFORMATION_KEY = "01";
      this.ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION = "02";
      this.ID_MERCHANT_CATEGORY_CODE = "52";
      this.ID_TRANSACTION_CURRENCY = "53";
      this.ID_TRANSACTION_AMOUNT = "54";
      this.ID_COUNTRY_CODE = "58";
      this.ID_MERCHANT_NAME = "59";
      this.ID_MERCHANT_CITY = "60";
      this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE = "62";
      this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID = "05";
      this.ID_CRC16 = "63";
    }
  
    _getValue(id, value) {
      const size = String(value.length).padStart(2, "0");
      return id + size + value;
    }
  
    _getMechantAccountInfo() {
      const gui = this._getValue(
        this.ID_MERCHANT_ACCOUNT_INFORMATION_GUI,
        "br.gov.bcb.pix"
      );
      const key = this._getValue(
        this.ID_MERCHANT_ACCOUNT_INFORMATION_KEY,
        this.pixKey
      );
      const description = this._getValue(
        this.ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION,
        this.description
      );
  
      return this._getValue(
        this.ID_MERCHANT_ACCOUNT_INFORMATION,
        gui + key + description
      );
    }
  
    _getAdditionalDataFieldTemplate() {
      const txid = this._getValue(
        this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID,
        this.txid
      );
      return this._getValue(this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE, txid);
    }
  
    getPayload() {
      const payload =
        this._getValue(this.ID_PAYLOAD_FORMAT_INDICATOR, "01") +
        this._getMechantAccountInfo() +
        this._getValue(this.ID_MERCHANT_CATEGORY_CODE, "0000") +
        this._getValue(this.ID_TRANSACTION_CURRENCY, "986") +
        this._getValue(this.ID_TRANSACTION_AMOUNT, this.amount) +
        this._getValue(this.ID_COUNTRY_CODE, "BR") +
        this._getValue(this.ID_MERCHANT_NAME, this.merchantName) +
        this._getValue(this.ID_MERCHANT_CITY, this.merchantCity) +
        this._getAdditionalDataFieldTemplate();
  
      return payload + this._getCRC16(payload);
    }
  
    _getCRC16(payload) {
      function ord(str) {
        return str.charCodeAt(0);
      }
      function dechex(number) {
        if (number < 0) {
          number = 0xffffffff + number + 1;
        }
        return parseInt(number, 10).toString(16);
      }
  
      //ADICIONA DADOS GERAIS NO PAYLOAD
      payload = payload + this.ID_CRC16 + "04";
  
      //DADOS DEFINIDOS PELO BACEN
      let polinomio = 0x1021;
      let resultado = 0xffff;
      let length;
  
      //CHECKSUM
      if ((length = payload.length) > 0) {
        for (let offset = 0; offset < length; offset++) {
          resultado ^= ord(payload[offset]) << 8;
          for (let bitwise = 0; bitwise < 8; bitwise++) {
            if ((resultado <<= 1) & 0x10000) resultado ^= polinomio;
            resultado &= 0xffff;
          }
        }
      }
  
      //RETORNA CÓDIGO CRC16 DE 4 CARACTERES
      return this.ID_CRC16 + "04" + dechex(resultado).toUpperCase();
    }
};
  
let dicionario_presentes = [{
    "link":"/images/presentes/presente0.jpg",
    "desc":"Roupa de cama",
    "preço":265
},{
    "link":"/images/presentes/presente1.jpg",
    "desc":"Lençol",
    "preço":165
},{
    "link":"/images/presentes/presente2.jpg",
    "desc":"Ventilador de teto",
    "preço":380
},{
    "link":"/images/presentes/presente3.jpg",
    "desc":"Televisão",
    "preço":2000
},{
    "link":"/images/presentes/presente4.jpg",
    "desc":"Talheres",
    "preço":154
},{
    "link":"/images/presentes/presente5.jpg",
    "desc":"Guarda roupa",
    "preço":1418
},{
    "link":"/images/presentes/presente6.jpg",
    "desc":"Ar condicionado",
    "preço":2800
},,{
    "link":"/images/presentes/presente7.jpg",
    "desc":"Sofá",
    "preço":2070
},{
    "link":"/images/presentes/presente8.jpg",
    "desc":"Máquina de lavar",
    "preço":2700
},{
    "link":"/images/presentes/presente9.jpg",
    "desc":"Jogo de panelas",
    "preço":428
},{
    "link":"/images/presentes/presente10.jpg",
    "desc":"Fogão",
    "preço":1700
},{
    "link":"/images/presentes/presente11.jpg",
    "desc":"Jogo de potes",
    "preço":280
},{
    "link":"/images/presentes/presente12.jpg",
    "desc":"Panela de Pressão Elétrica",
    "preço":393
},{
    "link":"/images/presentes/presente13.jpg",
    "desc":"Microondas",
    "preço":693.99
},{
    "link":"/images/presentes/presente14.jpg",
    "desc":"Geladeira",
    "preço":5185
},{
    "link":"/images/presentes/presente15.jpg",
    "desc":"Air Fryer",
    "preço":355
},{
    "link":"/images/presentes/presente16.jpg",
    "desc":"Chuveiro",
    "preço":199
},{
    "link":"/images/presentes/presente17.jpg",
    "desc":"Utensílios de cozinha",
    "preço":145
},{
    "link":"/images/presentes/presente18.jpg",
    "desc":"Kit de Ferramentas",
    "preço":150
},{
    "link":"/images/presentes/presente19.jpg",
    "desc":"2 meses de academia",
    "preço":200
},{
    "link":"/images/presentes/presente20.jpg",
    "desc":"RP no LOL",
    "preço":84
},{
    "link":"/images/presentes/presente21.jpg",
    "desc":"Acessórios de computador",
    "preço":350
},{
    "link":"/images/presentes/presente22.jpg",
    "desc":"Jogo Black Myth: Wukong",
    "preço":230
},{
    "link":"/images/presentes/presente23.jpg",
    "desc":"Kimono",
    "preço":290
},{
    "link":"/images/presentes/presente24.jpg",
    "desc":"Jantar de lua de mel",
    "preço":300
},{
    "link":"/images/presentes/presente25.jpg",
    "desc":"Passeio de escuna para o casal",
    "preço":300
},{
    "link":"/images/presentes/presente26.jpg",
    "desc":"Celular",
    "preço":899
},{
    "link":"/images/presentes/presente27.jpg",
    "desc":"Monitor de computador",
    "preço":877
}
]

function carregarPresentes(){
    for (i in dicionario_presentes){
        let divprinc = document.querySelector("div.presentes")
        let divanexo = document.createElement("div")
        divanexo.setAttribute("class", "caixa-presente")
        divanexo.setAttribute("onclick", "abrirPOPUP(this)")
        let img = document.createElement('img')
        img.setAttribute("src", dicionario_presentes[i].link)
        img.setAttribute("class","img-presente")
        img.setAttribute("alt", dicionario_presentes[i].desc)
        img.setAttribute("title", dicionario_presentes[i].desc)
        divanexo.appendChild(img)
        divprinc.appendChild(divanexo)
    }
}

function abrirPOPUP(elemento){
    let div_secret = document.querySelector('div#popup-secret')
    //let div_secret_interna = document.querySelector('div#popup-interno')
    let img_secret_interna = document.querySelector('img#img-popup')
    let tit_presente = document.querySelector('p#desc-popup')
    let preco_presente = document.querySelector('p#valor-popup')
    let codpix = document.querySelector('p#cod-pix-popup')
    let select_valor = document.querySelector("select#fracao")
    let avista = document.createElement('option')
    select_valor.innerHTML = ''
    avista.setAttribute('value', '1x')
    avista.innerHTML = "À Vista"
    select_valor.appendChild(avista)
    div_secret.style.display = "block"
    img_secret_interna.src = elemento.children[0].src
    tit_presente.innerHTML = elemento.children[0].alt
    preco_presente.innerHTML = searchValue(elemento.children[0].alt).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    codpix.innerHTML = gerarCODPIX(searchValue(elemento.children[0].alt))
    genQRcode()
    let parcelas = evaluateFractions(searchValue(elemento.children[0].alt))
    for(let inic_parc = 2;inic_parc <= parcelas; inic_parc++){
        let options = document.createElement('option')
        options.setAttribute('value', `${inic_parc}`)
        options.innerHTML = `1/${inic_parc} do Valor`
        select_valor.appendChild(options)
    }
}

function fecharPOPUP(){
    let div_secret = document.querySelector('div#popup-secret')
    let txtcop = document.querySelector('p#ver-pixcop')
    div_secret.style.display = "none"
    txtcop.style.display = "none"
}

function searchValue(desc){
    for (i in dicionario_presentes){
        if (dicionario_presentes[i].desc == desc){
            return dicionario_presentes[i].preço
        }
    }
}
function gerarCODPIX(valor_receber){
    const pix = new Pix(
        "17585043740",
        "Obrigado pelo seu presente",
        "Yan Barbosa Luiz",
        "Belford Roxo",
        "123",
        valor_receber
    )
    return pix.getPayload()
}

function genQRcode() {
    let codpix = document.querySelector('p#cod-pix-popup')
    let qrcode = document.querySelector('img#qrcode')
    if (codpix.innerHTML == "") {
        return
    } else {
       qrcode.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${codpix.innerHTML}` 
    }
}

function copiarCODPIX(){
    let codtocopy = document.querySelector('p#cod-pix-popup')
    let txtcop = document.querySelector('p#ver-pixcop')
    navigator.clipboard.writeText(codtocopy.innerHTML)
    txtcop.style.display = "block"
}

function evaluateFractions(x){
    let parcelas = 1
    let fraction = x/parcelas
    if (x>200){
        if(fraction > 200){
        while (fraction > 200) {
            fraction = x/parcelas
            parcelas ++
        }
        parcelas --
        }
        if(fraction < 200){
            parcelas --
            fraction = x/parcelas
        }
    } else {
        parcelas = 1
    }
    return parcelas
}

function onSelect_Values(elemento){
    let txtcop = document.querySelector('p#ver-pixcop')
    let val_tot = searchValue(document.querySelector('p#desc-popup').innerHTML)
    let parcelas= elemento.selectedIndex + 1
    let preco_presente = document.querySelector('p#valor-popup')
    let codpix = document.querySelector('p#cod-pix-popup')
    txtcop.style.display = "none"
    preco_presente.innerHTML = (val_tot/parcelas).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    codpix.innerHTML = gerarCODPIX(val_tot/parcelas)
    genQRcode()
}