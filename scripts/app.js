document.getElementById('charInfo').addEventListener('submit', async function(event) {

    event.preventDefault();

    const charName = document.getElementById("charName").value;
    var race = document.getElementById("race").value;
    var classe = document.getElementById("class").value;
    var background = document.getElementById("background").value;
    const level = document.getElementById("level").value;

    const str_score = document.getElementById("str_score").value;
    const dex_score = document.getElementById("dex_score").value;
    const con_score = document.getElementById("con_score").value;
    const int_score = document.getElementById("int_score").value;
    const wis_score = document.getElementById("wis_score").value;
    const cha_score = document.getElementById("cha_score").value;

    const response = await fetch('http://localhost:3000/save-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ charName, race, classe, background, level, str_score, dex_score, con_score, int_score, wis_score, cha_score })
    });

    if (response.ok) {
        alert('Dados salvos com sucesso!');
        loadDropdown();  // Recarregar o dropdown
    } else {
        alert('Erro ao salvar os dados.');
    }

});

async function loadDropdown() {
    // Requisição para buscar os dados salvos no banco
    const response = await fetch('http://localhost:3000/get-data');
    const data = await response.json();
    
    const dropdown = document.getElementById('fichaSelect');
    dropdown.innerHTML = '<option value="">Selecionar...</option>';
    
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.char_name;
        dropdown.appendChild(option);
    });
}

document.getElementById('fichaSelect').addEventListener('change', async function() {
    const id = this.value;
    
    if (id) {
        const response = await fetch(`http://localhost:3000/get-data/${id}`);
        const data = await response.json();
        
        document.getElementById('dataDetails').textContent = `Nome: ${data.char_name}, Raça: ${data.race}, Classe: ${data.classe}, Antecedente: ${data.background}, Nível: ${data.level}, Atributos: ${data.str_score} / ${data.dex_score} / ${data.con_score} / ${data.int_score} / ${data.wis_score} / ${data.cha_score}`;
    } else {
        document.getElementById('dataDetails').textContent = '';
    }
});

document.getElementById('deleteButton').addEventListener('click', async function() {
    const dropdown = document.getElementById('fichaSelect');
    const selectedId = dropdown.value;

    if (!selectedId) {
        alert('Selecione um usuário para deletar');
        return;
    }

    const confirmDelete = confirm('Tem certeza que deseja deletar este usuário?');
    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/delete-data/${selectedId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Usuário deletado com sucesso');
            loadDropdown(); // Recarrega o dropdown após a deleção
        } else {
            const errorData = await response.json();
            alert(`Erro ao deletar o usuário: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Erro ao deletar o usuário:', error);
        alert('Erro ao deletar o usuário');
    }
});


// Carregar o dropdown ao iniciar
loadDropdown();