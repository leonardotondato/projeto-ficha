function infoSave (){
    const name_str = document.getElementById("charName").value;
    var race = document.getElementById("race").value;
    var classe = document.getElementById("class").value;
    var background = document.getElementById("background").value;
    const level = document.getElementById("level").value;

    const str_var = document.getElementById("str_score").value;
    const dex_var = document.getElementById("dex_score").value;
    const con_var = document.getElementById("con_score").value;
    const int_var = document.getElementById("int_score").value;
    const wis_var = document.getElementById("wis_score").value;
    const cha_var = document.getElementById("cha_score").value;
    

    charSheet = {
        Nome: name_str,
        Raça: race,
        Classe: classe,
        Antecedente: background,
        Nível: level,

        Força: str_var,
        Destreza: dex_var,
        Constituição: con_var,
        Inteligência: int_var,
        Sabedoria: wis_var,
        Carisma: cha_var
    }

    console.log(charSheet);
}