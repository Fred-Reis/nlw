// function to get states from IBGE Api

function getUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (state of states) {
        ufSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>`;
      }
    });
}
getUFs();

// function to get cities from IBGE Api

function getCityForUF(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const id = event.target.value;

  const idx = event.target.selectedIndex;

  stateInput.value = event.target.options[idx].text;

  citySelect.innerHTML = "<option value>Selecione a cidade</option></option>";

  citySelect.disabled = true;

  fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`
  )
    .then((res) => res.json())
    .then((cities) => {
      for (city of cities) {
        citySelect.innerHTML += `<option value=${city.nome}>${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

// event listener when change tag select as name = uf

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCityForUF);

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

function handleSelectedItem(event) {
  console.log(event.target.dataset.id);
}
