const form: HTMLFormElement = document.querySelector('#defineform');

form.onsubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(form);
  const word = formData.get('defineword') as string;

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    const definitionList: HTMLUListElement = document.querySelector('#definitionList');
    definitionList.innerHTML = ''; // Clear previous definitions

    data.forEach((wordData) => {
      wordData.meanings.forEach((meaning) => {
        meaning.definitions.forEach((definition) => {
          const li = document.createElement('li');
          li.textContent = definition.definition;
          definitionList.appendChild(li);
        });
      });
    });
  } catch (error) {
    console.error('Error fetching definition:', error);

    const resultContainer: HTMLParagraphElement = document.querySelector('.bg-light p');
    resultContainer.textContent = 'Error fetching definition.';
  }

  return false; // prevent reload
};
